from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, ChatMessageThread, ChatMessage, ChatMessageReaction
from flask_socketio import SocketIO, emit, join_room, leave_room, disconnect

chat_thread_routes = Blueprint("chat_threads", __name__)

# GET CURRENT USER'S CHATS
@chat_thread_routes.route("")
def get_user_chats():
    user = User.query.get(current_user.get_id())
    if user is not None:
        user_chats = user.chat_threads
        return { "ChatThreads": [ chat.to_dict() for chat in user_chats]}
    else:
        return { "message": "error" }


# GET SINGLE CHAT BY ID
@chat_thread_routes.route("/<int:id>")
def get_user_chat(id):
    chat = ChatMessageThread.query.get(id)
    print(chat)
    if chat is not None:
        return chat.to_dict()
    else:
        return { "message": "Chat not found" }


# CREATE A CHAT THREAD
@chat_thread_routes.route("", methods=["POST"])
@login_required
def create_thread():
    data = request.get_json()
    receiver = User.query.get(data.get("receiverId"))
    sender = User.query.get(current_user.get_id())

    thread = ChatMessageThread()
    receiver.chat_threads.append(thread)
    sender.chat_threads.append(thread)

    db.session.add(thread)
    db.session.commit()


    return { thread.to_dict() }


# CREATE A NEW MESSAGE & ADD TO CHAT
@chat_thread_routes.route("/<int:id>/messages", methods=["POST"])
@login_required
def create_message(id):
    data = request.get_json()

    message = ChatMessage(
        content=data.get("content"), sender_id=current_user.get_id(), receiver_id = data.get("receiver_id"), thread_id = id
    )

    chat_thread = ChatMessageThread.query.get(id)
    chat_thread.messages.append(message)

    db.session.add(message)
    db.session.commit()

    return message.to_dict()

# "DELETE" A MESSAGE (UPDATE TO SAY '[MESSAGE DELETED]')
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


# CREATE REACTION
@chat_thread_routes.route("/messages/<int:messageId>/reactions", methods=["POST"])
def react(messageId):
    data = request.get_json()
    emoji = data["emoji"]
    reaction = ChatMessageReaction(emoji=emoji, message_id=messageId, user_id=current_user.get_id())
    message = ChatMessage.query.get(messageId)
    db.session.add(reaction)
    message.reactions.append(reaction)
    db.session.commit()

    return reaction.to_dict()
