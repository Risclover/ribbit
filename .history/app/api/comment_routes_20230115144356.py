from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint("comments", __name__)

# GET ALL COMMENTS OF POST
@comment_routes.route("/<int:id>")
def get_comments(id):
    """
    Query to get all comments of a post
    """
    comments = Comment.query.filter(Comment.post_id == id).all()
    return {"Comments": [comment.to_dict() for comment in comments]}


# # GET ALL COMMENTS OF A SPECIFIC USER
# @comment_routes.route("/users/<int:id>/comments")
# def get_user_comments(id):
#     """
#     Query to get all comments of a specific user
#     """
#     comments = Comment.query.filter(Comment.user_id == id).all()
#     return {"Comments": [comment.to_dict() for comment in comments]}


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

        db.session.add(new_comment)
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
