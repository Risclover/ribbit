from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Notification
from app.extensions import db

from app.socket import emit_notification_to_user
from datetime import datetime, timedelta, timezone

follower_routes = Blueprint("followers", __name__)

# GET FOLLOWERS BY USER ID
@follower_routes.route("/<int:id>")
def get_user_followers(id):
    """
    Get user's followers
    """
    user = User.query.get(id)
    return {
        "Follows": [user.to_dict() for user in user.followed_users()],
        "Followers": [user.to_dict() for user in user.user_followers()],
        "FollowedPosts": [user.to_dict() for user in user.followed_posts()]
    }


# GET CURRENT USER'S FOLLOWERS
@follower_routes.route("")
def get_current_user_followers():
    """
    Get followers of logged-in user
    """
    user = User.query.get(current_user.get_id())
    return {
        "Follows": [user.to_dict() for user in user.followed_users()],
        "Followers": [user.to_dict() for user in user.user_followers()],
        "FollowedPosts": [user.to_dict() for user in user.followed_posts()]
    }

# FOLLOW/UNFOLLOW TARGET USER
@follower_routes.route("/follow/<int:id>", methods=["POST"])
@login_required
def follow_user(id):
    """
    Follow or unfollow target user
    """
    user = User.query.get(int(current_user.get_id()))
    target = User.query.get(id)

    if not target:
        return { "Message": "Target user not found" }, 404

    if target.id == current_user.id:
        return { "Message": "You cannot follow yourself" }, 400

    if not user.is_following(target):
        user.follow(target)
        db.session.commit()

    twenty_four_hours_ago = datetime.now(timezone.utc) - timedelta(hours=24)

    existing_recent = Notification.query.filter(Notification.user_id == target.id, Notification.actor_id == user.id, Notification.action == "follow", Notification.created_at > twenty_four_hours_ago).first()

    if existing_recent:
        return { "Message": "Recent follow notification already exists." }, 200

    new_notification = Notification(
        user_id=id,
        actor_id=current_user.id,
        action="follow",
        message=f"u/{current_user.username} started following you",
    )

    db.session.add(new_notification)
    db.session.commit()

    emit_notification_to_user(new_notification)

    return {"id": id, "message": "User successfully followed"}

# UNFOLLOW TARGET USER
@follower_routes.route("/unfollow/<int:id>", methods=["POST"])
@login_required
def unfollow_user(id):
    user = User.query.get(current_user.get_id())
    target = User.query.get(id)

    user.unfollow(target)

    if target in user.favorited:
        user.favorited.remove(target)

    db.session.commit()

    return {"id": id, "message": "User successfully unfollowed"}

# GET FOLLOWED POSTS
@follower_routes.route("/posts")
def get_followed_posts():
    """
    Get the posts of the current user's followed users
    """
    user = User.query.get(current_user.get_id())
    return {
        "followedPosts": [user.to_dict() for user in user.followed_posts()]
    }
