from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
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




# GET USER KARMA
@user_routes.route('/<int:id>/karma', methods=['GET'])
def get_user_karma(id):
    user = User.query.get(id)
    return jsonify({'karma': user.karma})


# UPDATE USER KARMA
@user_routes.route('/<int:id>/karma', methods=['POST'])
def update_user_karma(id):
    if 'username' in db.session:
        user = User.query.get(id)
        if request.json['action'] == 'increment':
            user.karma += 1
        elif request.json['action'] == 'decrement':
            user.karma -= 1
        db.session.commit()
        return jsonify({'karma': user.karma})
    else:
        return jsonify({'error': 'You must be logged in to update karma'})
