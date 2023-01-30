from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


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
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
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

# # UPDATE USER KARMA
# @user_routes.route('/<int:id>/karma', methods=['POST'])
# def update_user_karma(id):
#     if 'username' in db.session:
#         user = User.query.get(id)
#         if request.json['action'] == 'increment':
#             user.karma += 1
#         elif request.json['action'] == 'decrement':
#             user.karma -= 1
#         db.session.commit()
#         return jsonify({'karma': user.karma})
#     else:
#         return jsonify({'error': 'You must be logged in to update karma'})
