from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Post, User, ViewedPost
from app.extensions import db

from datetime import datetime, timezone

viewed_post_routes = Blueprint("viewed_posts", __name__)

# GET VIEWED POSTS
@viewed_post_routes.route("")
def get_viewed_posts():
    """
    Get a user's viewed posts
    """
    user_id = current_user.get_id()
    viewed_posts = ViewedPost.query.filter_by(user_id=user_id).order_by(ViewedPost.timestamp.desc()).all()

    return {"ViewedPosts": [post.to_dict() for post in viewed_posts]}

# ADD A POST TO VIEWEDPOSTS
@viewed_post_routes.route("<int:postId>", methods=["POST"])
def add_viewed_post(postId):
    """
    View a post
    """
    post = Post.query.get(postId)
    user = User.query.get(current_user.get_id())

    existing_view = ViewedPost.query.filter_by(user_id=user.id, post_id=postId).first()

    if existing_view:
        existing_view.timestamp = datetime.now(timezone.utc)
        db.session.commit()
        return jsonify({
            "status_code": 200,
            "message": "Successfully updated viewed post timestamp"
        })

    viewed_post = ViewedPost(user_id=current_user.get_id(), post_id=postId)

    user.viewed_posts.append(viewed_post)
    post.post_viewers.append(viewed_post)

    db.session.add(viewed_post)
    db.session.commit()

    return jsonify({
        "status_code": 201,
        "message": "Successfully viewed post"
    })

@viewed_post_routes.route("/delete", methods=["DELETE"])
def clear_viewed_posts():
    user_id = current_user.get_id()

    # Instead of setting the user's viewed_posts to an empty list, delete the relevant records from ViewedPost
    ViewedPost.query.filter_by(user_id=user_id).delete()

    db.session.commit()

    return jsonify({'message': 'All viewed posts deleted successfully.'}), 200
