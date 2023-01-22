from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Community, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import CommunityForm, UpdateCommunityForm

community_routes = Blueprint("communities", __name__)

# GET ALL COMMUNITIES
@community_routes.route("")
def get_communities():
    """
    Query to get all communities
    """

    communities = Community.query.all()
    return {"Communities": [community.to_dict() for community in communities]}


# GET A USER'S OWNED COMMUNITIES
@community_routes.route("/users/<int:id>")
def get_user_communities(id):
    """
    Query to get all of a user's owned communities
    """

    communities = Community.query.filter(Community.user_id == id).all()
    return {"UserCommunities": [community.to_dict() for community in communities]}


# GET A SINGLE COMMUNITY
@community_routes.route("/<name>")
def get_single_community(name):
    """
    Query to get a single community
    """


    community = Community.query.filter(Community.name == name).one()
    return community.to_dict()


# CREATE A COMMUNITY
@community_routes.route("", methods=["POST"])
@login_required
def create_community():
    """
    Query for creating a community
    """
    form = CommunityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_community = Community(
            name=data["name"],
            description=data["description"],
            display_name=data["name"],
            user_id = current_user.get_id()
        )

        db.session.add(new_community)
        db.session.commit()

        return new_community.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# UPDATE A COMMUNITY
@community_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def update_community(id):
    """
    Query for updating a community's details
    """
    community = Community.query.get(id)
    form = UpdateCommunityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(community, 'display_name', data['display_name'])
        setattr(community, 'description', data['description'])

        db.session.commit()
        return community.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# DELETE A COMMUNITY
@community_routes.route("/<name>", methods=["DELETE"])
@login_required
def delete_community(name):
    """
    Query to delete a community
    """
    community = Community.query.filter(Community.name == name).one()

    db.session.delete(community)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}
