from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, joins, User, Community

subscription_routes = Blueprint("subscriptions", __name__)

# ADD A SUBSCRIPTION:
@subscription_routes.route("", methods=["POST"])
@login_required
def add_subscription():
    """
    A logged-in user can send a post request to add a community to their subscriptions list.
    """
    user = User.query.get(current_user.get_id())

    community_id = request.json["communityId"]
    subscription = Community.query.get(community_id)

    user.subscriptions.append(subscription)

    db.session.commit()

    return jsonify({
        "status_code": 201,
        "message": "Successfully Created Subscription"
    })



# GET SUBSCRIPTIONS BY USER ID
@subscription_routes.route("")
@login_required
def get_user_subscriptions():
    """
    Query for a single user's subscriptions list.
    """
    user = User.query.get(current_user.get_id())

    user_subscriptions = user.subscriptions

    return {"Subscriptions": [subscription.to_dict() for subscription in user_subscriptions]}


# DELETE SUBSCRIPTION BY ID
@subscription_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_subscription(id):
    """
    Query for a single subscription and delete the subscription if authorized.
    """
    user = User.query.get(current_user.get_id())
    community = Community.query.get(id)
    user.subscriptions.remove(community)

    db.session.commit()

    return jsonify({
        "status_code": 200,
        "message": "Successfully Removed Subscription"
    })
