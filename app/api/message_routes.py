from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, MessageThread, Message
from app.forms.message_form import MessageForm
from .auth_routes import validation_errors_to_error_messages

message_routes = Blueprint("messages", __name__)

# # GET ALL MESSAGES
# @message_routes.route("")
# def get_messages():
#     """
#     Get all messages
#     """
#     messages = Message.query.all()
#     return {"Messages": [message.to_dict() for message in messages]}


# GET LOGGED-IN USER'S MESSAGES
@message_routes.route("")
def get_user_messages():
    """
    Get user messages
    """
    user = User.query.get(current_user.get_id())
    messages = user.user_messages

    return {"Messages": [message.to_dict() for message in messages]}
