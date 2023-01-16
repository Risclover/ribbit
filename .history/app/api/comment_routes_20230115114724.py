from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Comment, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import CommentForm, UpdateCommentForm

comment_routes = Blueprint("comments", __name__)

# GET ALL COMMENTS OF A POST:
@comment_routes.route("/<int:id>")
def get_comments(id):
    """
    Query for all of a post's comments
    """

    comments = Comment.query.filter(Comment.post_id == id).all()
    return {"Comments": [comment.to_dict() for comment in comments]}


# CREATE A COMMENT
@comment_routes.route("/<int:id>", methods=["POST"])
@login_required
def create_comment(id):
    """
    Query to create a comment on a post
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


# UPDATE A COMMENT
@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_comment(id):
    """
    Query to update a comment
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


# DELETE A COMMENT
@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):
    """
    Query to delete a comment
    """

    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {"message": "Comment successfully deleted", "status_code": 200}
