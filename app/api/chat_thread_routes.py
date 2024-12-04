from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, ChatMessageThread, ChatMessage, ThreadUser

chat_thread_routes = Blueprint("chat_threads", __name__)

# GET CURRENT USER'S CHATS
@chat_thread_routes.route("")
@login_required
def get_user_chats():
    """
    Get current user's chat threads
    """
    user = User.query.get(current_user.get_id())
    if user is not None:
        user_chats = user.chat_threads
        return { "ChatThreads": [ chat.to_dict() for chat in user_chats]}
    else:
        return { "error": "User not found" }


# GET SINGLE CHAT BY ID
@chat_thread_routes.route("/<int:id>")
@login_required
def get_user_chat(id):
    """
    Get a specific chat thread by its id
    """
    chat = ChatMessageThread.query.get(id)
    if chat is not None:
        # Update has_unread status for current user
        thread_user = ThreadUser.query.filter_by(thread_id=id, user_id=current_user.get_id()).first()
        if thread_user:
            thread_user.has_unread = False

        # Optionally, mark messages as read
        for message in chat.messages:
            if not message.read and message.receiver_id == current_user.get_id():
                message.read = True

        db.session.commit()

        return chat.to_dict()
    else:
        return { "error": "Chat not found" }


# GET CHAT MESSAGE
@chat_thread_routes.route("/messages/<int:id>")
def get_message(id):
    """
    Create a new message
    """
    message = ChatMessage.query.get(id)
    if message is not None:
        return message.to_dict()
    else:
        return { "error": "Message not found" }



# CREATE A CHAT THREAD
@chat_thread_routes.route("", methods=["POST"])
@login_required
def create_thread():
    """
    Create a new chat thread
    """
    data = request.get_json()
    receiver = User.query.get(data["receiverId"])
    sender = User.query.get(current_user.get_id())

    thread = ChatMessageThread()
    receiver.chat_threads.append(thread)
    sender.chat_threads.append(thread)

    db.session.add(thread)
    db.session.commit()

    return thread.to_dict()


# CREATE A NEW MESSAGE & ADD TO CHAT
@chat_thread_routes.route("/<int:id>/messages", methods=["POST"])
@login_required
def create_message(id):
    data = request.get_json()

    message = ChatMessage(
        content=data["content"], sender_id=current_user.get_id(), receiver_id = data["receiver_id"], thread_id = id
    )

    chat_thread = ChatMessageThread.query.get(id)
    chat_thread.messages.append(message)

    for thread_user in chat_thread.thread_users:
        if thread_user.user_id != current_user.get_id():
            thread_user.has_unread = True

    db.session.add(message)
    db.session.commit()

    return message.to_dict()

# "DELETE" A MESSAGE
@chat_thread_routes.route("/messages/<int:id>", methods=["PUT"])
@login_required
def fake_delete_message(id):
    message = ChatMessage.query.get(id)
    setattr(message, "content", "Message deleted by user")
    db.session.commit()
    return message.to_dict()


# READ ALL MESSAGES IN A THREAD
@chat_thread_routes.route("/<int:id>/read", methods=["PUT"])
def read_messages(id):
    chat_thread = ChatMessageThread.query.get(id)
    messages = chat_thread.messages

    for message in messages:
        if message.read == False:
            setattr(message, "read", True)


    db.session.commit()

    return chat_thread.to_dict()
