# socket.py

from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db, User, ChatMessage, Reaction
from flask_login import current_user
from flask import request
import os

# Configure CORS
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://ribbit-app.herokuapp.com',
        'https://ribbit-app.herokuapp.com'
    ]
else:
    origins = "*"

# Initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

chatUsers = []
last_emit_time = {}

@socketio.on("connect")
def on_connect():
    """
    Runs automatically each time a client connects.
    """
    # Make sure there's a current_user
    if current_user.is_authenticated:
        user_obj = User.query.get(current_user.get_id())
        if not user_obj:
            return

        # Existing chat-user logic
        username = user_obj.username
        user_exists = any(u['username'] == username for u in chatUsers)
        if not user_exists:
            chatUsers.append({
                'username': username,
                'sid': request.sid
            })

        # -- NEW: Join personal room for real-time notifications --
        # e.g. "user_4"
        personal_room = f"user_{user_obj.id}"
        join_room(personal_room)

@socketio.on("disconnect")
def on_disconnect():
    """
    Runs each time a client disconnects.
    """
    if current_user.is_authenticated:
        user_obj = User.query.get(current_user.get_id())
        if user_obj:
            username = user_obj.username
            for i in range(len(chatUsers)):
                if chatUsers[i]['username'] == username:
                    del chatUsers[i]
                    break

@socketio.on("chat")
def handle_chat(data):
    """
    Handle chat messages.
    Broadcast to everyone in that 'room' (the chat thread).
    """
    if 'room' in data:
        room = data['room']
        emit("chat", data, broadcast=True, to=room)

@socketio.on("delete")
def fake_delete(data):
    """
    'Delete' a message by updating its content to
    'Message deleted by user', then broadcast the change.
    """
    msg_id = data['id']
    room = data['room']

    chat_message = ChatMessage.query.get(msg_id)
    if chat_message:
        chat_message.content = "Message deleted by user"
        db.session.commit()

        emit("deleted", {"id": msg_id, "msg": "Message deleted by user"}, broadcast=True, to=room)

@socketio.on('join')
def on_join(data):
    """
    Joins a chat 'room', for real-time messages in a chat thread.
    """
    room = data['room']
    join_room(room)
    emit('joined', {'room': room})

@socketio.on('leave')
def on_leave(data):
    """
    Leaves a chat 'room'.
    """
    user_id = data['user_id']
    room = f'user_{user_id}'
    leave_room(room)
    emit('left', {'room': room})

@socketio.on('add_reaction')
def handle_add_reaction(data):
    """
    Handle adding a reaction to a message.
    Expects data to have: messageId, reactionType, room
    """
    message_id = data['messageId']
    reaction_type = data['reactionType']
    room = data['room']
    user_id = current_user.get_id()

    existing_reaction = Reaction.query.filter_by(
        message_id=message_id,
        user_id=user_id,
        reaction_type=reaction_type
    ).first()

    if existing_reaction:
        emit('error', {'error': 'Reaction already exists'}, room=request.sid)
        return

    new_reaction = Reaction(
        message_id=message_id,
        user_id=user_id,
        reaction_type=reaction_type
    )

    db.session.add(new_reaction)
    db.session.commit()

    reaction_data = new_reaction.to_dict()

    emit('reaction_added', reaction_data, room=room)

@socketio.on('remove_reaction')
def handle_remove_reaction(data):
    """
    Handle removing a reaction from a message.
    Expects data to have: messageId, reactionType, room
    """
    message_id = data['messageId']
    reaction_type = data['reactionType']
    room = data['room']
    user_id = current_user.get_id()

    reaction = Reaction.query.filter_by(
        message_id=message_id,
        user_id=user_id,
        reaction_type=reaction_type
    ).first()

    if not reaction:
        emit('error', {'error': 'Reaction does not exist'}, room=request.sid)
        return

    reaction_data = reaction.to_dict()

    db.session.delete(reaction)
    db.session.commit()

    emit('reaction_removed', reaction_data, room=room)

# -------------------------------------------------------------------
# NEW HELPER FOR NOTIFICATIONS:
# -------------------------------------------------------------------
def emit_notification_to_user(notification):
    """
    Helper function to broadcast a new notification in real-time
    to the user who owns it (e.g. user_5).
    """
    room = f"user_{notification.user_id}"
    socketio.emit(
        "new_notification",
        notification.to_dict(),
        to=room
    )
