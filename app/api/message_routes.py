from flask import Blueprint
from flask_login import current_user
from app.models import db, User, Message

message_routes = Blueprint("messages", __name__)

# GET LOGGED-IN USER'S MESSAGES
@message_routes.route("")
def get_user_messages():
    """
    Get user messages
    """
    user = User.query.get(current_user.get_id())

    if user.user_messages is not None:
        messages = user.user_messages

    return {"Messages": [message.to_dict() for message in messages]}


# MARK A MESSAGE AS 'READ'
@message_routes.route("<int:id>", methods=["PUT"])
def read_message(id):
    message = Message.query.get(id)
    setattr(message, "read", True)

    db.session.commit()

    return {"message": "Successfully read message"}
