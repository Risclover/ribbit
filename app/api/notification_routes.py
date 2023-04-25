from builtins import print, setattr
from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Notification, Comment
from .auth_routes import validation_errors_to_error_messages

notification_routes = Blueprint("notifications", __name__)

def create_notification_for_post_comment(comment):
    post_author = comment.comment_post.post_author
    if post_author != comment.comment_author:
        notification = Notification(user=post_author, message=f"{comment.comment_author.username} replied to your post '{comment.comment_post.title}'")
        db.session.add(notification)
        db.session.commit()


@notification_routes.route("/")
def get_notifications():
    user_id = current_user.get_id()
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    return {"Notifications": [notification.to_dict() for notification in notifications]}


@notification_routes.route("/<int:id>", methods=["POST"])
def add_comment_notification(id):
    comment = Comment.query.get(id)
    post_author = comment.comment_post.post_author
    if post_author != comment.comment_author:
        notification = Notification(user_id=post_author.id, message=f"{comment.comment_author.username} replied to your post '{comment.comment_post.title}'")
        db.session.add(notification)
        db.session.commit()
