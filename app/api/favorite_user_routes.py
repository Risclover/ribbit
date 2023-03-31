from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, joins, User

favorite_user_routes = Blueprint("favorite_users", __name__)

# FAVORITE A COMMUNITY:
@favorite_user_routes.route("", methods=["POST"])
@login_required
def favorite_user():
    """
    A logged-in user can send a post request to add a user to their favorite communities list.
    """
    queried_user = User.query.get(current_user.get_id())

    user_id = request.json["userId"]
    user = User.query.filter(User.id == user_id).one()

    queried_user.favorited.append(user)


    db.session.commit()

    return jsonify({
        "status_code": 201,
        "message": "Successfully Favorited User"
    })

# GET USER'S FAVORITED USERS
@favorite_user_routes.route("")
@login_required
def get_user_favorite_users():
    """
    Query for a single user's favorited users list.
    """
    queried_user = User.query.get(current_user.get_id())

    user_favorite_users = queried_user.favorited

    return {"users": [user.to_dict() for user in user_favorite_users]}



# DELETE FAVORITED USER BY ID
@favorite_user_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_favorited_user(id):
    """
    Query to unfavorite the user if authorized.
    """
    user = User.query.get(current_user.get_id())
    target = User.query.get(id)
    user.favorited.remove(target)

    db.session.commit()

    return jsonify({
        "status_code": 200,
        "message": "Successfully Unfavorited User"
    })
