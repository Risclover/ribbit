from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Post, User, PostVote, ViewedPost
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, PostUpdateForm, ImagePostForm, UpdateImagePostForm, LinkPostForm
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint("posts", __name__)

# GET ALL POSTS:
@post_routes.route("")
def get_posts():
    """
    Query for all posts and returns them in a list of post dictionaries.
    """
    posts = Post.query.all()
    return {"Posts": [post.to_dict() for post in posts]}

# GET A SINGLE POST:
@post_routes.route("/<int:id>")
def get_single_post(id):
    """
    Query for a single post by id and return it as a dictionary.
    """
    post = Post.query.get(id)
    return post.to_dict()

# CREATE A SINGLE POST:
@post_routes.route("/submit", methods=["POST"])
@login_required
def create_post():
    """
    Query for creating a new post.
    """
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_post = Post(
            title=data["title"],
            content=data["content"],
            user_id=current_user.get_id(),
            community_id=data["communityId"]
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

    print(form.errors)

    user = User.query.get(current_user.get_id())
    user.user_post_votes.append(new_post)
    new_post.users_who_liked.append(user)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# CREATE AN IMAGE POST:
@post_routes.route("/img/submit", methods=["POST"])
@login_required
def create_image_post():
    """
    Query for creating a new image post.
    """
    form = ImagePostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_post = Post(
            title=data["title"],
            img_url=data["imgUrl"],
            user_id=current_user.get_id(),
            community_id=data["communityId"]
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict()
    print(form.errors)

    user = User.query.get(current_user.get_id())
    user.user_post_votes.append(new_post)
    new_post.users_who_liked.append(user)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# CREATE A LINK POST
@post_routes.route("/url/submit", methods=["POST"])
@login_required
def create_link_post():
    data = request.json

    # Directly access the keys from the JSON payload
    title = data.get("title")
    linkUrl = data.get("linkUrl")  # Using the JavaScript convention
    communityId = data.get("communityId")

    # Ensure all required data is present
    if not title or not linkUrl or not communityId:
        return jsonify({"error": "Missing required fields"}), 400

    new_post = Post(
        title=title,
        link_url=linkUrl,  # Notice the model attribute is likely named with underscore
        user_id=current_user.get_id(),
        community_id=communityId
    )

    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.to_dict()), 201

# UPDATE A SINGLE POST
@post_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def update_post(id):
    """
    Query for a single post by id and update the post if logged in.
    """
    post = Post.query.get(id)
    form = PostUpdateForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(post, 'title', data['title'])
        setattr(post, 'content', data['content'])
        print(data)

        db.session.commit()
        # print(post.to_dict())
        return post.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# UPDATE AN IMAGE POST:
@post_routes.route("/img/<int:id>/edit", methods=["PUT"])
@login_required
def update_image_post(id):
    """
    Query to edit an image post
    """
    post = Post.query.get(id)
    form = UpdateImagePostForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(post, 'title', data['title'])
        setattr(post, 'img_url', data['imgUrl'])

        db.session.commit()
        return post.to_dict()

    print(validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# DELETE A SINGLE POST:
@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
    """
    Query for a single product by id and delete the post if logged in.
    """

    post = Post.query.get(id)
    ViewedPost.query.filter_by(post_id=id).delete()

    db.session.delete(post)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}

# GET COMMUNITY POSTS
@post_routes.route("/communities/<int:community_id>")
def get_community_posts(community_id):
    """
    Query for community posts
    """

    posts = Post.query.filter(Post.community_id == community_id).all()
    return {"CommunityPosts": [post.to_dict() for post in posts]}

# GET POSTS FROM FOLLOWED USERS
@post_routes.route("/followed")
@login_required
def get_followed_posts():
    """
    Query for the posts by the user's followed users.
    """

    user = User.query.get(current_user.get_id())
    posts = user.followed_posts()

    return {"Posts": [post.to_dict() for post in posts]}

# ADD A VOTE
@post_routes.route('/<int:id>/vote/<votetype>', methods=["POST"])
@login_required
def add_vote(id, votetype):
    """
    Query to like or dislike a post
    """
    post = Post.query.get(id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    user = User.query.get(current_user.get_id())
    existing_vote = PostVote.query.filter_by(user_id=user.id, post_id=id).first()

    if existing_vote:
        # If you prefer to update the vote instead of doing nothing, you can handle it here.
        return jsonify({"message": "User has already voted on this post."}), 400

    # Handle vote creation
    if votetype == "upvote":
        post_vote = PostVote(user_id=user.id, post_id=id, is_upvote=True)
    elif votetype == "downvote":
        post_vote = PostVote(user_id=user.id, post_id=id, is_upvote=False)
    else:
        return jsonify({"error": "Invalid vote type"}), 400

    # Assuming you have relationships set up correctly in your SQLAlchemy models
    post.users_who_liked.append(post_vote)
    db.session.add(post_vote)
    db.session.commit()

    return jsonify(post.to_dict()), 201  # Assuming `post.to_dict()` serializes your post object correctly

# DELETE VOTE
@post_routes.route("/<int:id>/vote", methods=["DELETE"])
@login_required
def delete_vote(id):
    """
    Query to delete a post's vote
    """
    post = Post.query.get(id)
    user = User.query.get(current_user.get_id())
    post_vote = PostVote.query.filter_by(user_id=user.id, post_id=post.id).first()
    db.session.delete(post_vote)
    db.session.commit()
    return post.to_dict()

# UPLOAD A POST IMG
@post_routes.route("/images", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    return {"url": url}


# GET A POST'S COMMENTS
@post_routes.route("/<int:id>/comments")
def get_post_comments(id):
    """
    Query a post's comments
    """
    post = Post.query.get(id)
    post_comments = post.post_comments

    return {"Comments": comment.to_dict() for comment in post_comments}
