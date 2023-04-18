from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Post, User, viewed_posts
import datetime

viewed_post_routes = Blueprint("viewed_posts", __name__)

# DISPLAY VIEWED POSTS
@viewed_post_routes.route("")
def viewed_posts():
    user_id = current_user.get_id()
    queried_user = User.query.get(user_id)
    user_viewed_posts = queried_user.user_viewed_posts

    return {"posts": [post.to_dict() for post in user_viewed_posts]}


# VIEW A POST
@viewed_post_routes.route("", methods=["POST"])
def view_post():
    user_id = current_user.get_id()
    queried_user = User.query.get(user_id)
    post_id = request.json["postId"]
    post = Post.query.filter(Post.id == post_id).one()

    if post not in queried_user.user_viewed_posts:
        queried_user.user_viewed_posts.append(post)

    db.session.commit()

    return jsonify({
        "status_code": 201,
        "message": "Successfully viewed post"
    })


# CLEAR ALL VIEWED POSTS
@viewed_post_routes.route("/delete", methods=["DELETE"])
def clear_viewed_posts():
    user_id = current_user.get_id()
    queried_user = User.query.get(user_id)
    queried_user.user_viewed_posts = []

    db.session.commit()

    return jsonify({'message': 'All viewed posts deleted successfully.'}), 200
