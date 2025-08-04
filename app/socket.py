"""
Socket.IO event handlers and helper for real-time notifications.
Uses the *shared* socketio instance from app.extensions.
"""

import os
from flask import request
from flask_login import current_user
from flask_socketio import emit, join_room, leave_room

from app.extensions import db, socketio
from app.models import User, ChatMessage, Reaction, ThreadUser

# --------------------------------------------------------------------------- #
#  Origins list (informational; actual CORS set in __init__.py)
# --------------------------------------------------------------------------- #
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://ribbit-app.herokuapp.com",
        "https://ribbit-app.herokuapp.com",
    ]
else:
    origins = "*"

# --------------------------------------------------------------------------- #
#  In-memory chat user list
# --------------------------------------------------------------------------- #
chatUsers = []


# --------------------------------------------------------------------------- #
#  Event handlers
# --------------------------------------------------------------------------- #
@socketio.on("connect")
def on_connect():
    user_id = current_user.get_id()
    if not user_id:
        return False                # reject anonymous sockets if you want

    # make sure the user is in their own room
    join_room(f"user_{user_id}")
    emit_unread_chat_count(user_id)

    # optional: keep your chatUsers bookkeeping
    username = User.query.get(user_id).username
    if not any(u["username"] == username for u in chatUsers):
        chatUsers.append({"username": username, "sid": request.sid})


@socketio.on("disconnect")
def on_disconnect():
    username = User.query.get(current_user.get_id()).username
    chatUsers[:] = [u for u in chatUsers if u["username"] != username]


@socketio.on("chat")
def handle_chat(data):
    room = data.get("room")
    if room:
        emit("chat", data, to=room, broadcast=True)


@socketio.on("delete")
def fake_delete(data):
    msg_id = data["id"]
    room   = data["room"]

    chat_message = ChatMessage.query.get(msg_id)
    chat_message.content = "Message deleted by user"
    db.session.commit()

    emit(
        "deleted",
        {"id": msg_id, "msg": "Message deleted by user"},
        to=room,
        broadcast=True,
    )


@socketio.on("join")
def on_join(data):
    room = data["room"]
    join_room(room)
    emit("joined", {"room": room})


@socketio.on("leave")
def on_leave(data):
    user_id = data["user_id"]
    room    = f"user_{user_id}"
    leave_room(room)
    emit("left", {"room": room})


@socketio.on("add_reaction")
def handle_add_reaction(data):
    message_id    = data["messageId"]
    reaction_type = data["reactionType"]
    room          = data["room"]
    user_id       = current_user.get_id()

    existing = Reaction.query.filter_by(
        message_id=message_id,
        user_id=user_id,
        reaction_type=reaction_type,
    ).first()

    if existing:
        emit("error", {"error": "Reaction already exists"}, room=request.sid)
        return

    new_reaction = Reaction(
        message_id=message_id,
        user_id=user_id,
        reaction_type=reaction_type,
    )
    db.session.add(new_reaction)
    db.session.commit()

    emit("reaction_added", new_reaction.to_dict(), room=room)


@socketio.on("remove_reaction")
def handle_remove_reaction(data):
    message_id    = data["messageId"]
    reaction_type = data["reactionType"]
    room          = data["room"]
    user_id       = current_user.get_id()

    reaction = Reaction.query.filter_by(
        message_id=message_id,
        user_id=user_id,
        reaction_type=reaction_type,
    ).first()

    if not reaction:
        emit("error", {"error": "Reaction does not exist"}, room=request.sid)
        return

    reaction_data = reaction.to_dict()
    db.session.delete(reaction)
    db.session.commit()

    emit("reaction_removed", reaction_data, room=room)


# --------------------------------------------------------------------------- #
#  Helper: emit a notification to its owner
# --------------------------------------------------------------------------- #
def emit_notification_to_user(notification):
    """
    Broadcast a newly-created Notification to its owner in real time.
    """
    room = f"user_{notification.user_id}"
    socketio.emit("new_notification", notification.to_dict(), to=room)


# --------------------------------------------------------------------------- #
#  Helper: emit # of threads that have unread messages
# --------------------------------------------------------------------------- #
def emit_unread_chat_count(user_id: int) -> None:
    """
    Compute “unread chat thread” badge and push it to the owner’s personal room.
    """
    unread_total = (
        db.session.query(ThreadUser)
        .filter_by(user_id=user_id, has_unread=True)
        .count()
    )
    socketio.emit(                     # personal room ⇒ real‑time only to that user
        "unread_count",
        {"count": unread_total},
        to=f"user_{user_id}",
    )
