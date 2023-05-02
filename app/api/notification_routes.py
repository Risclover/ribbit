from builtins import setattr
from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Notification, Comment, Message, User

notification_routes = Blueprint("notifications", __name__)

# GET CURRENT USER'S NOTIFICATIONS
@notification_routes.route("/user/<int:id>")
def get_user_notifications(id):
    notifications = Notification.query.filter_by(user_id=id).all()
    return {"Notifications": [notification.to_dict() for notification in notifications]}



# GET ALL NOTIFICATIONS
@notification_routes.route("")
def get_notifications():
    notifications = Notification.query.all()
    return {"Notifications": [notification.to_dict() for notification in notifications]}


# ADD A NOTIFICATION
@notification_routes.route("/<string:type>/<int:id>", methods=["POST"])
def add_notification(type, id):
    # ADDING A POST REPLY NOTIFICATION
    if type == "post-reply":
        comment = Comment.query.get(id)
        post_author = comment.comment_post.post_author
        if post_author != comment.comment_author:
            notification = Notification(user_id=post_author.id, message=f"{comment.comment_author.username} replied to your post '{comment.comment_post.title}'", type=type)
            db.session.add(notification)
            db.session.commit()
            return {"Notification": notification.to_dict()}


    # ADDING A NEW MESSAGE NOTIFICATION
    elif type == "message":
        message = Message.query.get(id)
        notification = Notification(user_id = message.receiver_id, message="", type=type)
        db.session.add(notification)
        db.session.commit()

        return {"Notification": notification.to_dict()}


    # ADDING A NEW FOLLOWER NOTIFICATION
    elif type == "follower":
        follower = current_user.get_id()
        notification = Notification(user_id=id, message=f"{follower.username} followed you. Follow them back or start a chat!", type=type)
        db.session.add(notification)
        db.session.commit()

        return {"Notification": notification.to_dict()}



# MARK ALL NOTIFICATIONS AS 'READ'
notification_routes.route("/read", methods=["PUT"])
def read_notifications():
    user_id = current_user.get_id()
    notifications = Notification.query.filter_by(user_id=user_id, read=False).all()
    for notification in notifications:
        notification.read = True
    db.session.commit()


    print(request.method, """











    """)
    return {"message": "Notifications successfully marked as 'read'"}



# MARK ONE NOTIFICATION AS 'READ'
notification_routes.route("/read/<int:id>", methods=["PUT"])
def read_notification(id):
    notification = Notification.query.get(id)

    if notification:
        notification.read = True
        db.session.commit()

        return {"message": "Notification successfully marked as 'read'"}
    else:
        return {"error": "Notification not found"}, 404
