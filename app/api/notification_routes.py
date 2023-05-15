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
            notification = Notification(user_id=post_author.id, post_id=comment.comment_post.id, comment_id = comment.id, sender_id=comment.user_id, title=comment.comment_post.title, icon = comment.comment_author.profile_img, message=f"u/{comment.comment_author.username} replied to your post in c/{comment.comment_post.post_community.name}", content=f"{comment.content}", type=type)
            db.session.add(notification)
            db.session.commit()
            return {"Notification": notification.to_dict()}


    # ADDING A NEW MESSAGE NOTIFICATION
    elif type == "message":
        message = Message.query.get(id)
        user = User.query.get(current_user.get_id())
        notification = Notification(
            user_id = message.receiver_id,
            sender_id=message.sender_id,
            icon = user.profile_img,
            message="",
            content="",
            type=type
        )
        db.session.add(notification)
        db.session.commit()

        return {"Notification": notification.to_dict()}


    # ADDING A NEW FOLLOWER NOTIFICATION
    elif type == "follower":
        follower = User.query.get(current_user.get_id())
        notification = Notification(user_id=id, icon = follower.profile_img, sender_id=follower.id, message=f"u/{follower.username} followed you. Follow them back or start a chat!", content="", type=type)
        db.session.add(notification)
        db.session.commit()

        return {"Notification": notification.to_dict()}


# MARKING A NOTIFICATION AS 'READ'
@notification_routes.route("/<int:id>/read", methods=["PUT"])
def read_notification(id):
    notification = Notification.query.get(id)
    if notification.read == False:
        setattr(notification, "read", True)

    db.session.commit()

    return {"message": "Successfully marked notification as read"}


# MARKING ALL NOTIFICATIONS AS 'READ'
@notification_routes.route("/read-all", methods=["PUT"])
def read_all_notifications():
    notifications = Notification.query.filter_by(user_id=current_user.get_id())
    for notification in notifications:
        if notification.type != "message":
            setattr(notification, "read", True)

    db.session.commit()
    return {"message": "Successfully read all notifications"}



# MARKING ALL MESSAGE NOTIFICATIONS AS 'READ'
@notification_routes.route("/read", methods=["PUT"])
def read_all_message_notifications():
    notifications = Notification.query.filter_by(user_id=current_user.get_id())
    for notification in notifications:
        if notification.type == "message":
            setattr(notification, "read", True)

    db.session.commit()
    return {"message": "All message notifications successfully read"}



# MARKING A NOTIFICATION AS 'UNREAD'
@notification_routes.route("/<int:id>/unread", methods=["PUT"])
def unread_notification(id):
    notification = Notification.query.get(id)
    if notification.read == True:
        setattr(notification, "read", False)

    db.session.commit()

    return {"message": "Successfully marked notification as unread"}


# DELETE A NOTIFICATION
@notification_routes.route("/<int:id>", methods=["DELETE"])
def delete_notification(id):
    notification = Notification.query.get(id)
    db.session.delete(notification)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}
