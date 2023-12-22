from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment, User, CommentVote, Post
from app.forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages

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
    """
    Query for a logged-in user to create a comment on a single post
    """

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_comment = Comment(
            content=data["content"],
            user_id=current_user.get_id(),
            post_id=id
        )

        post = Post.query.get(id)
        db.session.add(new_comment)
        post.post_comments.append(new_comment)
        db.session.commit()

        return new_comment.to_dict()
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


# ADD A COMMENT VOTE
@comment_routes.route('/<int:id>/vote/<votetype>', methods=["POST"])
@login_required
def add_vote(id, votetype):
    """
    Query to add a vote to a comment
    """
    comment = Comment.query.get(id)
    user = User.query.get(current_user.get_id())

    if votetype == "upvote":
        comment_vote = CommentVote(user_id=user.id, comment_id=id, is_upvote=True)
    elif votetype == "downvote":
        comment_vote = CommentVote(user_id=user.id, comment_id=id, is_upvote=False)

    comment_vote.user_who_liked = user
    comment_vote.comment = comment
    comment.users_who_liked.append(comment_vote)

    db.session.commit()
    return comment.to_dict()


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
    return comment.to_dict()
