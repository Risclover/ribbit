from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Community, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, PostUpdateForm

community_routes = Blueprint("communities", __name__)

# GET ALL COMMUNITIES
@community_routes.route("/")
def get_communities():
    """
    Query to get all communities
    """

    communities = Community.query.all()
    return {"Communities": [community.to_dict() for community in communities]}


# GET A USER'S SUBSCRIBED COMMUNITIES
@community_routes.route("/users/<int:id>")
def get_user_communities(id):
    """
    Query to get all of a user's owned communities
    """

    communities = Community.query.filter(Community.owner_id == id).all()
    return {"OwnedCommunities": [community.to_dict() for community in communities]}
