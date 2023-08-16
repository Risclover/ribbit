from flask_socketio import SocketIO, emit, join_room, leave_room, disconnect
from app.models import db, User, ChatMessage
from flask_login import current_user
from flask import request, session

import os

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://ribbit-app.herokuapp.com',
        'https://ribbit-app.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

chatUsers = []

@socketio.on("connect")
def on_connect():
    user = User.query.get(current_user.get_id()).username
    user_exists = any(username['username'] == user for username in chatUsers)
    if not user_exists:
        chatUser = {}
        chatUser['username'] = user
        chatUser['sid'] = request.sid
        chatUsers.append(chatUser)


@socketio.on("disconnect")
def on_disconnect():
    for i in range(len(chatUsers)):
        if chatUsers[i]['username'] == User.query.get(current_user.get_id()).username:
            del chatUsers[i]
            break
    disconnect()

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    if data['threadId']:
        room = data['threadId']
        emit("chat", data, broadcast=True, to=room)
        emit("new_message", data, broadcast=True, to=room)

# fake delete message (update)
@socketio.on("delete")
def fake_delete(data):
    msg_id = data['id']
    room = data['room']

    chat_message = ChatMessage.query.get(msg_id)
    chat_message.content = "Message deleted by user"
    db.session.commit()

    emit("deleted", {"id": msg_id, "msg": "Message deleted by user"}, broadcast=True, to=room)

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('joined', {'room': room})

@socketio.on('leave')
def on_leave(data):
    user_id = data['user_id']
    room = f'user_{user_id}'
    leave_room(room)
    emit('left', {'room': room})
