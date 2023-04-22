from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, MessageThread, Message
from app.forms.message_form import MessageForm
from .auth_routes import validation_errors_to_error_messages

thread_routes = Blueprint("threads", __name__)

# GET LOGGED-IN USER'S MESSAGE THREADS
@thread_routes.route("")
def get_user_threads():
    """
    Get current user's message threads
    """
    user = User.query.get(current_user.get_id())
    user_threads = user.user_threads
    return {"Threads": [thread.to_dict() for thread in user_threads]}


# GET ONE THREAD
@thread_routes.route("/<int:id>")
def get_thread(id):
    """
    Get a single message thread
    """
    thread = MessageThread.query.get(id)
    return {"Thread": thread.to_dict()}


# CREATE MESSAGE THREAD
@thread_routes.route("", methods=["POST"])
def create_thread():
    """
    Create a new message thread
    """
    receiver = User.query.get(request.json["receiverId"])
    sender = User.query.get(current_user.get_id())

    thread = MessageThread(subject=request.json["subject"])
    receiver.user_threads.append(thread)
    sender.user_threads.append(thread)
    db.session.add(thread)
    db.session.commit()

    return {"thread": thread.to_dict()}


# ADD A MESSAGE TO A MESSAGE THREAD
@thread_routes.route("/<int:id>", methods=["POST"])
def send_message(id):
    data2 = request.get_json()

    form = MessageForm()
    thread = MessageThread.query.get(id)

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        message = Message(
            content = data["content"],
            sender_id = current_user.get_id(),
            receiver_id = data2["receiverId"],
            thread_id = id
        )

        thread.messages.append(message)

        db.session.add(message)
        db.session.commit()

        return message.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 403



# SET A MESSAGE STATUS TO 'READ'
@thread_routes.route("/<int:id>/read", methods=["PUT"])
def read_message(id):
    message = Message.query.get(id)
    setattr(message, "read", True)

    db.session.commit()
    return {"message": "Message successfully read"}
