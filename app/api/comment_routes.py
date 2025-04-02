from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment, User, CommentVote, Post, Notification
from app.forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime
from app.socket import emit_notification_to_user

comment_routes = Blueprint("comments", __name__)

# GET ALL COMMENTS
@comment_routes.route("")
def get_comments():
    """
    Query to get all comments
    """
    comments = Comment.query.all()
    return {"Comments": [comment.to_dict() for comment in comments]}

# GET A SINGLE COMMENT:
@comment_routes.route("/<int:id>")
def get_single_comment(id):
    """
    Query to get a specific comment
    """

    comment = Comment.query.get(id)
    return comment.to_dict()


# CREATE A COMMENT FOR A SINGLE POST:
@comment_routes.route('/<int:id>', methods=["POST"])
@login_required
def create_comment(id):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        post = Post.query.get(id)
        new_comment = Comment(
            content=data["content"],
            user_id=current_user.get_id(),
            post_id=id,
            parent_id=data.get("parentId")
        )
        parent_id = data.get("parentId")
        resource_content = data.get("content")
        if parent_id:
            parent_comment = Comment.query.get(parent_id)
            new_notification = Notification(
                user_id=parent_comment.user_id,
                actor_id=current_user.get_id(),
                action="comment_reply",
                resource_id=parent_id,
                resource_type="comment",
                resource_content=resource_content,
                message=f"u/{current_user.username} replied to your comment in c/{post.post_community.name}."
            )
            db.session.add(new_notification)
        else:
            new_notification = Notification(
                user_id=post.user_id,
                actor_id=current_user.get_id(),
                action="post_reply",
                resource_id=id,
                resource_type="post",
                resource_content=resource_content,
                message=f"u/{current_user.username} replied to your post in c/{post.post_community.name}."
            )
            db.session.add(new_notification)

        db.session.add(new_comment)
        db.session.add(new_notification)
        post.post_comments.append(new_comment)  # attach to the post

        db.session.commit()

        emit_notification_to_user(new_notification)

        # Add the upvote on behalf of the comment's author
        comment_vote = CommentVote(
            user_id=current_user.get_id(),
            comment_id=new_comment.id,
            is_upvote=True
        )
        db.session.add(comment_vote)
        db.session.commit()
        # Expire the new_comment instance so that its relationships are reloaded
        db.session.refresh(new_comment)

        # Refetch the comment so that the users_who_liked relationship is fresh and the votes are recalculated
        updated_comment = Comment.query.get(new_comment.id)
        return updated_comment.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# UPDATE A COMMENT BY ID
@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_comment(id):
    """
    Query for a logged-in user to update their comment.
    """
    comment = Comment.query.get(id)
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(comment, "content", data["content"])
        setattr(comment, "updated_at", datetime.utcnow())
        db.session.commit()
        return comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403


# DELETE A COMMENT BY ID:
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Query for a logged-in user to delete a comment on a post.
    """

    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}





# ------------------------- COMMENT VOTES ------------------------- #


# ADD A COMMENT VOTE
@comment_routes.route('/<int:id>/vote/<votetype>', methods=["POST"])
@login_required
def add_vote(id, votetype):
    """
    Query to like or dislike a comment, handling vote changes.
    """
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    user = User.query.get(current_user.get_id())
    existing_vote = CommentVote.query.filter_by(user_id=user.id, comment_id=id).first()

    if existing_vote:
        new_is_upvote = True if votetype == "upvote" else False
        if existing_vote.is_upvote == new_is_upvote:
            # Same vote type, possibly remove the vote or ignore
            # Here, we'll choose to remove the vote
            db.session.delete(existing_vote)
            if new_is_upvote:
                comment.votes -= 1
            else:
                comment.votes += 1
            db.session.commit()
            return jsonify(comment.to_dict()), 200
        else:
            # Change the vote type
            if new_is_upvote:
                comment.votes += 2  # From -1 to +1
            else:
                comment.votes -= 2  # From +1 to -1
            existing_vote.is_upvote = new_is_upvote
            db.session.commit()
            return jsonify(comment.to_dict()), 200

    # Handle new vote creation
    if votetype == "upvote":
        comment.votes += 1
        comment_vote = CommentVote(user_id=user.id, comment_id=id, is_upvote=True)
    elif votetype == "downvote":
        comment.votes -= 1
        comment_vote = CommentVote(user_id=user.id, comment_id=id, is_upvote=False)
    else:
        return jsonify({"error": "Invalid vote type"}), 400

    # Assuming you have relationships set up correctly in your SQLAlchemy models
    comment.users_who_liked.append(comment_vote)
    db.session.add(comment_vote)
    db.session.commit()
    db.session.refresh(comment)  # Force reload of joined relationships
    return jsonify(comment.to_dict()), 201  # Assuming comment.to_dict() serializes your comment object correctly


# DELETE A COMMENT VOTE
@comment_routes.route('/<int:id>/vote', methods=["DELETE"])
@login_required
def delete_vote(id):
    """
    Query to delete a comment's vote
    """
    comment = Comment.query.get(id)
    user = User.query.get(current_user.get_id())
    comment_vote = CommentVote.query.filter_by(user_id=user.id, comment_id=comment.id).first()
    db.session.delete(comment_vote)
    db.session.commit()
    db.session.refresh(comment)  # Force reload of joined relationships
    return comment.to_dict()


# GET A SPECIFIC POST'S COMMENTS COMMENTS
@comment_routes.route("/<int:id>/comments")
def get_post_comments(id):
    """
    Query a post's comments
    """
    post = Post.query.get(id)
    return {"Comments": [comment.to_dict() for comment in post.post_comments]}


# GET ALL COMMENTS FOR A POST WITH NESTED COMMENTS
@comment_routes.route('/post/<int:post_id>')
def get_comments_for_post(post_id):
    """
    Retrieve all comments for a specific post, including nested replies.
    """
    comments = Comment.query.filter_by(post_id=post_id, parent_id=None).all()  # Top-level comments
    return {"Comments": [comment.to_dict() for comment in comments]}


# SEARCH COMMENTS
@comment_routes.route("<int:post_id>/search")
def search_comments(post_id):
    query = request.args.get('q', '')

    if query:
        # Find matching comments
        matching_comments = Comment.query.filter(
            Comment.post_id == post_id,
            Comment.content.ilike(f'%{query}%')
        ).all()

        # Use a dictionary to store comments to avoid duplicates
        comments_dict = {}
        for comment in matching_comments:
            # Add the matching comment
            comments_dict[comment.id] = comment
            # Traverse up to add all ancestor comments
            parent = comment.parent
            while parent:
                if parent.id not in comments_dict:
                    comments_dict[parent.id] = parent
                else:
                    # If we've already added this parent, we can stop traversing
                    break
                parent = parent.parent

        return {"SearchedComments": [comment.to_dict() for comment in comments_dict.values()]}

    return {"SearchedComments": []}
