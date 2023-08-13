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


# ADD A REACTION TO A MESSAGE
@chat_thread_routes.route("/messages/<int:id>/reactions", methods=["POST"])
def create_reaction(id):
    reaction_type = request.json.get('reactionType')

    # Create or update the reaction
    reaction = ChatMessageReaction.query.filter_by(user_id=current_user.get_id(), message_id=id).first()
    if reaction:
        reaction.reaction_type = reaction_type
    else:
        reaction = ChatMessageReaction(user_id=current_user.get_id(), message_id=id, reaction_type=reaction_type)
        db.session.add(reaction)

    db.session.commit()

    # Calculate reaction count for the message
    reaction_count = ChatMessageReaction.query.filter_by(message_id=id, reaction_type=reaction_type).count()

    # Emit a socket event
    emit("message_reaction", {'messageId': id, 'reactionType': reaction_type, 'reactionCount': reaction_count})

    return jsonify({'reactionCount': reaction_count})


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
