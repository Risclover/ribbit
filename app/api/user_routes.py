from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import ProfileUpdateForm, EmptyForm
from .auth_routes import validation_errors_to_error_messages

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route("/<int:id>")
def get_current_user(id):
    """
    Get current user
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/")
def get_users():
    """
    Query to return all users
    """
    users = User.query.all()
    return {"Users": [user.to_dict() for user in users]}


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# UPDATE PROFILE DETAILS
@user_routes.route("/<int:id>/profile/edit", methods=["PUT"])
@login_required
def update_profile_details(id):
    """
    Query to edit profile details
    """
    user = User.query.get(id)
    form = ProfileUpdateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(user, "display_name", data["display_name"])
        setattr(user, "about", data["about"])

        db.session.commit()
        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# IMAGE ENDPOINT
@user_routes.route("/<int:id>/img/<type>", methods=["POST"])
@login_required
def upload_image(id, type):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    user = User.query.get(id)

    if type == "profile":
        setattr(user, "profile_img", url)
    elif type == "banner":
        setattr(user, "banner_img", url)

    db.session.commit()
    return {"url": url}

# FOLLOW USER
@user_routes.route("/follow/<username>", methods=["POST"])
@login_required
def follow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user is None:
            return {"errors": "User not found"}, 400
        if user == current_user:
            return {"errors": "You cannot follow yourself."}, 400
        current_user.follow(user)
        db.session.commit()
        return {"user": username}
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# UNFOLLOW USER
@user_routes.route("/unfollow/<username>", methods=["POST"])
@login_required
def unfollow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user is None:
            return {"errors": "User not found"}, 400
        if user == current_user:
            return {"errors": "You cannot follow yourself."}, 400
        current_user.unfollow(user)
        db.session.commit()
        return {"user": username}
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# FOLLOW/UNFOLLOW USER
@user_routes.route("/follow/<int:id>", methods=["POST"])
@login_required
def handle_follow(id):
    """
    Follow or unfollow the user based on id
    """
    user = User.query.get(current_user.get_id())
    target = User.query.get(id)

    if not user.is_following(target):
        user.follow(target)
    else:
        user.unfollow(target)

    db.session.commit()
    return {"message": "successfully followed/unfollowed"}



# GET CURRENT USER'S FOLLOWERS
@user_routes.route("/followers")
def get_followers():
    """
    Get current user's followers
    """
    user = User.query.get(current_user.get_id())
    return {
        "Follows": [user.to_dict() for user in user.followed_users()],
        "Followers": [user.to_dict() for user in user.user_followers()]
    }


# GET ANY USER'S FOLLOWERS
@user_routes.route("/<int:id>/followers")
def get_user_followers(id):
    """
    Get user's followers
    """
    user = User.query.get(id)
    return {
        "Follows": [user.to_dict() for user in user.followed_users()],
        "Followers": [user.to_dict() for user in user.user_followers()]
    }
