from flask import Blueprint, request
from app.models import db, PreviewCommunity


preview_community_routes = Blueprint("preview_communities", __name__)

# GET COMMUNITY PREVIEW
@preview_community_routes.route("/<int:id>/style")
def get_community_preview(id):
    community = PreviewCommunity.query.filter_by(community_id=id).first()
    return community.to_dict()


# UPDATE COMMUNITY PREVIEW
@preview_community_routes.route("/<int:id>/style/edit", methods=["PUT"])
def update_community_appearance(id):
    community = PreviewCommunity.query.filter_by(community_id=id).first()
    data = request.get_json()

    setattr(community, "base_color", data["baseColor"])
    setattr(community, "highlight", data["highlight"])
    setattr(community, "body_background", data["bodyBackground"])

    db.session.commit()

    return community.to_dict()
