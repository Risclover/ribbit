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

@viewed_post_routes.route("/<int:post_id>", methods=["POST"])
def view_post(post_id):
    user_id = request.json.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Check for existing views of the same post by the same user
    existing_view = ViewedPost.query.filter_by(user_id=user_id, post_id=post_id).first()
    if existing_view:
        # Update the timestamp to now
        existing_view.timestamp = datetime.now(timezone.utc)
        db.session.commit()
        return jsonify({'message': 'View updated'}), 200

    # Record a new view
    new_view = ViewedPost(user_id=user_id, post_id=post_id)
    db.session.add(new_view)
    db.session.commit()
    return jsonify({'message': 'View recorded'}), 201

@viewed_post_routes.route("/delete", methods=["DELETE"])
def clear_viewed_posts():
    user_id = current_user.get_id()

    # Instead of setting the user's viewed_posts to an empty list, delete the relevant records from ViewedPost
    ViewedPost.query.filter_by(user_id=user_id).delete()

    db.session.commit()

    return jsonify({'message': 'All viewed posts deleted successfully.'}), 200
