from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Message, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import MessageForm
from flask_socketio import SocketIO, emit, join_room, leave_room


chat_routes = Blueprint("chats", __name__)

# GET USER'S CHAT LOGS
@chat_routes.route("")
@login_required
def get_chats():
    """
    Query to get a user's chat logs
    """
    user = User.query.get(current_user.get_id())
    chats = user.user_chats
    return {"Chats": [chat.to_dict() for chat in chats]}


@chat_routes.route("/")
def on_connect():
    emit('connected', {'data': 'Connected'})

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    emit('joined', {'username': username, 'room': room})

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    emit('left', {'username': username, 'room': room})

@socketio.on('send_message')
def on_send_message(data):
    sender_username = data['sender_username']
    recipient_username = data['recipient_username']
    message = data['message']

    sender = User.query.filter_by(username=sender_username).first()
    recipient = User.query.filter_by(username=recipient_username).first()

    if sender and recipient:
        chat = Chat(user_id=sender.id, recipient_id=recipient.id, message=message)
        db.session.add(chat)
        db.session.commit()

        room = f'{sender_username}_{recipient_username}'
        emit('receive_message', {'sender_username': sender_username, 'message': message}, room=room)

if __name__ == '__main__':
    db.create_all()
    socketio.run(app, debug=True)
