from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Comment, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, PostUpdateForm

comment_routes = Blueprint("comments", __name__)

# GET ALL COMMENTS OF A POST:
@comment_routes.route("/<int:id>")
def get_comments(id):
    """
    Query for all of a post's comments
    """

    comments = Comment.query.filter(Comment.post_id == id).all()
    return {"Comments": [comment.to_dict() for comment in comments]}
