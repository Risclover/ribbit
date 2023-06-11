from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, ChatMessageThread, ChatMessage


chat_routes = Blueprint("chats", __name__)

# GET CURRENT USER'S CHATS
@chat_routes.route("")
def get_user_chats():
    user = User.query.get(current_user.get_id())
    if user is not None:
        user_chats = user.chat_threads
        return { "ChatThreads": [ chat.to_dict() for chat in user_chats]}
    else:
        return { "message": "error" }


# GET SINGLE CHAT BY ID
@chat_routes.route("/<int:id>")
def get_user_chat(id):
    chat = ChatMessageThread.query.get(id)
    print(chat)
    if chat is not None:
        return chat.to_dict()
    else:
        return { "message": "Chat not found" }


# CREATE A CHAT THREAD
@chat_routes.route("", methods=["POST"])
@login_required
def create_thread():
    receiver = User.query.get(request.json["receiverId"])
    sender = User.query.get(current_user.get_id())

    thread = ChatMessageThread()
    receiver.chat_threads.append(thread)
    sender.chat_threads.append(thread)

    db.session.add(thread)
    db.session.commit()


    return { "chatThread": thread.to_dict() }


# CREATE A NEW MESSAGE & ADD TO CHAT
@chat_routes.route("/<int:id>/messages", methods=["POST"])
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


# # ADD A REACTION TO MESSAGE
# @chat_routes.route("/messages/<int:messageId>/reactions", methods=["POST"])
# @login_required
# def create_reaction(messageId):
#     data = request.get_json()
#     emoji = data.get("emoji")
#     user_id = data.get("user_id")

#     message = ChatMessage.query.get(messageId)
#     user = User.query.get(user_id)

#     new_reaction = Reaction(
#         emoji=emoji
#     )

#     new_reaction.user = user

#     message.reactions.append(new_reaction)

#     db.session.add(new_reaction)
#     db.session.commit()

#     return new_reaction.to_dict()


# "DELETE" A MESSAGE (UPDATE TO SAY '[MESSAGE DELETED]')
@chat_routes.route("/messages/<int:id>", methods=["PUT"])
@login_required
def fake_delete_message(id):
    message = ChatMessage.query.get(id)
    setattr(message, "content", "[Message deleted]")

    db.session.commit()
    return message.to_dict()


# READ ALL MESSAGES IN A THREAD
@chat_routes.route("/<int:id>/read", methods=["PUT"])
def read_messages(id):
    chat_thread = ChatMessageThread.query.get(id)
    messages = chat_thread.messages

    for message in messages:
        if message.read == False:
            setattr(message, "read", True)


    db.session.commit()

    return chat_thread.to_dict()
