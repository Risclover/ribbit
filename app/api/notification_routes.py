from builtins import setattr
from flask import Blueprint
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
    if type == "post reply":
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
        notification = Notification(user_id = message.receiver_id, message="", type="message")
        db.session.add(notification)
        db.session.commit()

        return {"Notification": notification.to_dict()}



# MARK ALL NOTIFICATIONS AS 'READ'
notification_routes.route("/read", methods=["PUT"])
def read_notifications():
    user_id = current_user.get_id()
    Notification.query.filter_by(user_id=user_id, is_read=False).update({Notification.is_read: True})
    db.session.commit()

    return {"message": "Notifications successfully marked as 'read'"}


# MARK ONE NOTIFICATION AS 'READ'
notification_routes.route("/read/<int:id>", methods=["PUT"])
def read_notification(id):
    notification = Notification.query.get(id)

    setattr(notification, "is_read", True)
    db.session.commit()

    return {"message": "Notification successfully marked as 'read'"}

# # ADD A NOTIFICATION FOR A POST REPLY (COMMENT)
# @notification_routes.route("/post_reply/<int:id>", methods=["POST"])
# def add_comment_notification(id):
#     comment = Comment.query.get(id)
#     post_author = comment.comment_post.post_author
#     if post_author != comment.comment_author:
#         notification = Notification(user_id=post_author.id, message=f"{comment.comment_author.username} replied to your post '{comment.comment_post.title}'")

#         db.session.add(notification)
#         db.session.commit()

#     return {"Notification": notification.to_dict()}
