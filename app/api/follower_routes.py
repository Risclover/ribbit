from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post

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
@follower_routes.route("/<int:id>", methods=["POST"])
@login_required
def follow_user(id):
    """
    Follow or unfollow target user
    """
    user = User.query.get(current_user.get_id())
    target = User.query.get(id)

    if not user.is_following(target):
        user.follow(target)
    else:
        user.unfollow(target)

    if target in user.favorited:
        user.favorited.remove(target)

    db.session.commit()
    return {"id": id, "message": "User successfully followed/unfollowed"}

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
