from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db

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


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

@socketio.on('join')
def on_join(data):
    user_id = data['user_id']
    room = f'user_{user_id}'
    join_room(room)
    emit('joined', {'room': room})

@socketio.on('leave')
def on_leave(data):
    user_id = data['user_id']
    room = f'user_{user_id}'
    leave_room(room)
    emit('left', {'room': room})

# @socketio.on('send_message')
# def send_message(data):
#     sender_id = data['sender_id']
#     receiver_id = data['receiver_id']
#     text = data['text']
#     message = Chat(sender_id=sender_id, receiver_id=receiver_id, text=text)
#     db.session.add(message)
#     db.session.commit()
#     room = f'user_{receiver_id}'
#     emit('receive_message', {'sender_id': sender_id, 'text': text}, room=room)
