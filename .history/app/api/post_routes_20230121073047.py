from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Post, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, PostUpdateForm

post_routes = Blueprint("posts", __name__)



# GET ALL POSTS:
@post_routes.route("/")
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
            community_id=data["community_id"]
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict()
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# CREATE A COMMUNITY POST
# CREATE A SINGLE POST:
# @post_routes.route("/<int:communityId>/submit", methods=["POST"])
# @login_required
# def create_community_post(communityId):
#     """
#     Query for creating a new post.
#     """
#     form = PostForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         data = form.data

#         new_post = Post(
#             title=data["title"],
#             content=data["content"],
#             user_id=current_user.get_id(),
#             # community_id=communityId
#         )

#         db.session.add(new_post)
#         db.session.commit()

#         return new_post.to_dict()
#     print(form.errors)
#     return {"errors": validation_errors_to_error_messages(form.errors)}, 400




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

        db.session.commit()
        return post.to_dict()
    print(post.to_dict())
    print(data)
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


# LIKE A POST
@post_routes.route('/<int:id>/like', methods=["POST"])
@login_required
def like_post(id):
    post = Post.query.get(id)
    post.post_likers += 1
    db.session.commit()
    return jsonify({'likes': post.likes})

# DISLIKE A POST
@post_routes.route('/<int:id>/dislike', methods=['POST'])
def dislike_post(id):
    post = Post.query.get(id)
    post.dislikes += 1
    db.session.commit()
    return jsonify({'dislikes': post.dislikes})
