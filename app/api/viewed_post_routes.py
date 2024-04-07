from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Post, User, ViewedPost
from datetime import datetime, timezone

viewed_post_routes = Blueprint("viewed_posts", __name__)

# DISPLAY VIEWED POSTS
@viewed_post_routes.route("")
def viewed_posts():
    user_id = current_user.get_id()
    viewed_posts_with_timestamps = ViewedPost.query.filter_by(user_id=user_id).order_by(ViewedPost.viewed_at.desc()).all()
    posts_data = [viewed_post.post.to_dict() for viewed_post in viewed_posts_with_timestamps]
    return jsonify(posts=posts_data)

@viewed_post_routes.route("", methods=["POST"])
def view_post():
    user_id = current_user.get_id()
    post_id = request.json["postId"]

    existing_view = ViewedPost.query.filter_by(user_id=user_id, post_id=post_id).first()

    if existing_view:
        # If the post has already been viewed, update the `viewed_at` timestamp to the current time
        existing_view.viewed_at = datetime.now(timezone.utc)
    else:
        # If this is a new view, create a new ViewedPost record
        new_view = ViewedPost(user_id=user_id, post_id=post_id)
        db.session.add(new_view)

    db.session.commit()

    return jsonify({"status_code": 201, "message": "Post view updated successfully"})


@viewed_post_routes.route("/delete", methods=["DELETE"])
def clear_viewed_posts():
    user_id = current_user.get_id()

    # Instead of setting the user's viewed_posts to an empty list, delete the relevant records from ViewedPost
    ViewedPost.query.filter_by(user_id=user_id).delete()

    db.session.commit()

    return jsonify({'message': 'All viewed posts deleted successfully.'}), 200
