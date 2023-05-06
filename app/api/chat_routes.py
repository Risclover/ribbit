from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Message, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import MessageForm
from flask_socketio import SocketIO, emit, join_room, leave_room


chat_routes = Blueprint("chats", __name__)

# GET CURRENT USER'S CHAT THREADS
@chat_routes.route('')
@login_required
def get_chat_threads():
    """
    Get chat threads of current user
    """

    user = User.query.get(current_user.get_id())
    user_chats = user.user_chats

    return {"Chats": [thread.to_dict() for thread in user_chats]}


# GET ONE CHAT BY ID
@chat_routes.route('/<int:id>')
@login_required
def get_one_chat(id):
    """
    Get one chat thread by its ID
    """

    chat = MessageThread.query.get(id)

    return {"Chat": chat.to_dict()}


# CREATE NEW MESSAGE THREAD BETWEEN CURR USER AND TARGET USER
@chat_routes.route('', methods=["POST"])
@login_required
def create_thread():
    """
    Create a new message thread between the current user and a selected user
    """

    targetUser = User.query.get(request.json["targetUserId"])
    currUser = User.query.get(current_user.get_id())

    for chat in [chat.to_dict() for chat in targetUser.user_chats]:
        for user in chat["chatUsers"]:
            if user["id"] == currUser.to_dict()["id"]:
                return {"chat": chat}

    new_thread = MessageThread()
    currUser.user_chats.append(new_thread)
    targetUser.user_chats.append(new_thread)
    db.session.add(new_thread)
    db.session.commit()

    return {"chat": new_thread.to_dict()}


# ADD A MESSAGE TO A THREAD BY ITS ID
@chat_routes.route('/<int:id>', methods=["POST"])
@login_required
def add_message(id):
    """
    Add message to a chat thread by its ID
    """

    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_msg = Message(
            message=data["body"],
            user_id=current_user.get_id(),
            message_thread_id=id
        )

        db.session.add(new_msg)
        db.session.commit()

        return new_msg.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403


# READ MESSAGES
@chat_routes.route('/read', methods=["PUT"])
def read_messages():
    """
    Change the "read" status of a list of message IDs to True
    """

    for msgId in request.json['unreadMsgs']:
        db_msg = Message.query.get(msgId)
        setattr(db_msg, "read", True)

    db.session.commit()
    return {"message": "all messages read"}


# DELETE A THREAD BY ITS ID
@chat_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_thread(id):
    """
    Delete a thread by its ID
    """

    thread = MessageThread.query.get(id)
    db.session.delete(thread)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}


# DELETE A MESSAGE BY ITS ID
@chat_routes.route('/message/<int:id>', methods=["DELETE"])
@login_required
def delete_message(id):
    """
    Delete a message by its ID
    """

    message = Message.query.get(id)
    db.session.delete(message)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}
