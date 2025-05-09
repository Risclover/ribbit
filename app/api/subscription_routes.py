from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Community
from app.extensions import db


subscription_routes = Blueprint("subscriptions", __name__)

# ADD A SUBSCRIPTION:
@subscription_routes.route("", methods=["POST"])
@login_required
def add_subscription():
    """
    A logged-in user can send a post request to add a community to their subscriptions list.
    """
    queried_user = User.query.get(current_user.get_id())

    community_id = request.json["communityId"]
    community = Community.query.filter(Community.id == community_id).one()

    queried_user.user_subscriptions.append(community)
    db.session.commit()

    return jsonify({
        "status_code": 201,
        "message": "Successfully Created Subscription"
    })


# GET COMMUNITY SUBSCRIBERS
@subscription_routes.route("/<int:id>")
def get_subscribers(id):
    """
    Query for a community's subscribers list
    """

    queried_community = Community.query.get(id)
    subscribers = queried_community.subscribers
    return {"Subscriptions": [subscriber.to_dict() for subscriber in subscribers]}




# GET SUBSCRIPTIONS BY USER ID
@subscription_routes.route("")
@login_required
def get_user_subscriptions():
    """
    Query for a single user's subscriptions list.
    """
    queried_user = User.query.get(current_user.get_id())

    users_subscriptions = queried_user.user_subscriptions

    return {"Subscriptions": [subscription.to_dict() for subscription in users_subscriptions]}



# DELETE SUBSCRIPTION BY ID
@subscription_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_subscription(id):
    """
    Query for a single subscription and delete the subscription if authorized.
    """
    user = User.query.get(current_user.get_id())
    community = Community.query.get(id)

    user.user_subscriptions.remove(community)

    if community in user.user_favorite_communities:
        user.user_favorite_communities.remove(community)

    db.session.commit()

    return jsonify({
        "status_code": 200,
        "message": "Successfully Removed Subscription"
    })
