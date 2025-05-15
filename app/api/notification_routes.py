from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Notification, Comment, Message, User
from app.extensions import db


notification_routes = Blueprint("notifications", __name__)

# FETCH NOTIFICATIONS FOR CURRENT USER
@notification_routes.route("")
@login_required
def get_notifications():
    """
    Fetch all notifications for the logged-in user.
    """
    user_id = current_user.get_id()
    notifications = Notification.query.filter_by(user_id=user_id).all()
    return { "notifications": [n.to_dict() for n in notifications]}

# MARK ONE NOTIFICATION AS READ
@notification_routes.route("/<int:id>", methods=["PUT"])
@login_required
def mark_notification_read(id):
    """
    Mark one notification for the current_user as read.
    """
    notification = Notification.query.get(id)
    if not notification:
        return {"error": "Not found or unauthorized"}, 404

    notification.is_read = True
    db.session.commit()
    return notification.to_dict()


# MARK NOTIFICATION AS UNREAD
@notification_routes.route("/<int:id>/unread", methods=["PUT"])
@login_required
def mark_notification_unread(id):
    """
    Mark notification for the current_user as unread.
    """
    notification = Notification.query.get(id)
    if not notification:
        return {"error": "Not found or unauthorized"}, 404

    notification.is_read = False
    db.session.commit()
    return notification.to_dict()

# MARK ALL NOTIFICATIONS AS READ
@notification_routes.route('/read_all', methods=['PUT'])
@login_required
def mark_all_notifications_read():
    """
    Marks ALL unread notifications for the current_user as read.
    Returns a list of all notifications (now read).
    """
    user_id = current_user.get_id()
    unread_notifications = Notification.query.filter_by(
        user_id=user_id,
        is_read=False,
    ).all()

    for n in unread_notifications:
        n.is_read = True

    db.session.commit()

    all_notifications = Notification.query.filter_by(user_id=user_id).all()
    return {
        "notifications": [n.to_dict() for n in all_notifications]
    }


# DELETE NOTIFICATION
@notification_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_notification(id):
    notification = Notification.query.get(id)
    if not notification or notification.user_id != current_user.get_id():
        return {"error": "Not found or unauthorized"}, 404

    db.session.delete(notification)
    db.session.commit()
    return {"message": "Notification deleted"}


# DELETE ALL NOTIFICATIONS
@notification_routes.route("", methods=["DELETE"])
@login_required
def delete_all_notifications():
      user_id = current_user.get_id()

      Notification.query.filter_by(user_id=user_id).delete()
      db.session.commit()

      return {"message": "All notifications deleted"}


# MARK ALL NOTIFICATIONS AS 'SEEN'
@notification_routes.route("/seen", methods=["PUT"])
@login_required
def mark_all_seen():
    Notification.query.filter_by(
        user_id=current_user.id, is_seen=False
    ).update({ "is_seen": True })
    db.session.commit()
    return { "status": "ok" }
