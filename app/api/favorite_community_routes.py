from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Community
from app.extensions import db


favorite_community_routes = Blueprint("favorite_communities", __name__)

# FAVORITE A COMMUNITY:
@favorite_community_routes.route("", methods=["POST"])
@login_required
def favorite_community():
    """
    A logged-in user can send a post request to add a community to their favorite communities list.
    """
    queried_user = User.query.get(current_user.get_id())

    community_id = request.json["communityId"]
    community = Community.query.filter(Community.id == community_id).one()

    queried_user.user_favorite_communities.append(community)

    if community not in queried_user.user_subscriptions:
        queried_user.user_subscriptions.append(community)

    db.session.commit()

    return jsonify({
        "status_code": 201,
        "message": "Successfully Favorited Community"
    })


# GET FAVORITE COMMUNITY BY ID
@favorite_community_routes.route("/<int:id>")
def get_favorite_communities(id):
    """
    Query for the favorited communities list
    """

    queried_community = Community.query.get(id)
    communities = queried_community.favorited_communities
    return {"communities": [community.to_dict() for community in communities]}




# GET USER'S FAVORITED COMMUNITIES
@favorite_community_routes.route("")
@login_required
def get_user_favorite_communities():
    """
    Query for a single user's subscriptions list.
    """
    queried_user = User.query.get(current_user.get_id())

    user_favorite_communities = queried_user.user_favorite_communities

    return {"communities": [community.to_dict() for community in user_favorite_communities]}



# DELETE FAVORITED COMMUNITY BY ID
@favorite_community_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_favorited_community(id):
    """
    Query to unfavorite the community if authorized.
    """
    user = User.query.get(current_user.get_id())
    community = Community.query.get(id)
    user.user_favorite_communities.remove(community)

    db.session.commit()

    return jsonify({
        "status_code": 200,
        "message": "Successfully Unfavorited Community"
    })
