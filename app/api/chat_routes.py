from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Chat, Message, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import MessageForm

chat_routes = Blueprint("chats", __name__)

# GET USER'S CHAT LOGS
@chat_routes.route("")
@login_required
def get_chats():
    """
    Query to get a user's chat logs
    """
    user = User.query.get(current_user.get_id())
    chats = user.user_chats
    return {"Chats": [chat.to_dict() for chat in chats]}
