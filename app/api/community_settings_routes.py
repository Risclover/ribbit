from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, CommunitySettings, Community
from .auth_routes import validation_errors_to_error_messages

community_settings_routes = Blueprint("community_settings", __name__)

# GET A COMMUNITY'S SETTINGS
@community_settings_routes.route("/communities/<int:id>")
def get_settings(id):
    """
    Query to get a community's settings
    """
    community = Community.query.get(id)
    community_settings = community.community_settings

    return {"Settings": [settings.to_dict() for settings in community_settings]}

# UPDATE A COMMUNITY'S SETTINGS: COLOR THEME
@community_settings_routes.route("/<int:id>/color-theme/edit", methods=["PUT"])
def update_color_theme(id):
    """
    Query to edit a community's color theme settings
    """
    settings = CommunitySettings.query.get(id)
    data = request.get_json()

    setattr(settings, "base_color", data["baseColor"])
    setattr(settings, "highlight", data["highlight"])
    setattr(settings, "bg_color", data["bgColor"])
    setattr(settings, "background_img_format", data["backgroundImgFormat"])

    db.session.commit()
    return settings.to_dict()


# UPDATE A COMMUNITY'S SETTINGS: NAME & ICON
@community_settings_routes.route("/<int:id>/name-and-icon/edit", methods=["PUT"])
def update_name_and_icon(id):
    """
    Query to edit a community's name and icon settings
    """
    settings = CommunitySettings.query.get(id)
    data = request.get_json()

    setattr(settings, "name_format", data["nameFormat"])
    setattr(settings, "hide_community_icon", data["hideCommunityIcon"])
    setattr(settings, "community_icon", data["communityIcon"])

    db.session.commit()
    return settings.to_dict()


# UPDATE A COMMUNITY'S SETTINGS: BANNER
@community_settings_routes.route("/<int:id>/banner/edit", methods=["PUT"])
def update_banner_settings(id):
    """
    Query to edit a community's banner settings
    """
    settings = CommunitySettings.query.get(id)
    data = request.get_json()

    setattr(settings, "banner_height", data["bannerHeight"])
    setattr(settings, "banner_color", data["bannerColor"])
    setattr(settings, "custom_banner_color", data["customBannerColor"])
    setattr(settings, "banner_img", data["bannerImg"])
    setattr(settings, "banner_img_format", data["bannerImgFormat"])
    setattr(settings, "secondary_banner_img", data["secondaryBannerImg"])
    setattr(settings, "hover_banner_img", data["hoverBannerImg"])
    setattr(settings, "secondary_banner_format", data["secondaryBannerFormat"])
    setattr(settings, "mobile_banner_img", data["mobileBannerImg"])

    db.session.commit()
    return settings.to_dict()



# UPDATE A COMMUNITY'S SETTINGS: MENU
@community_settings_routes.route("/<int:id>/menu/edit", methods=["PUT"])
def update_menu_settings(id):
    """
    Query to edit a community's menu settings
    """
    settings = CommunitySettings.query.get(id)
    data = request.get_json()

    setattr(settings, "active_link_color", data["activeLinkColor"])
    setattr(settings, "inactive_link_color", data["inactiveLinkColor"])
    setattr(settings, "hover_link_color", data["hoverLinkColor"])
    setattr(settings, "menu_bg_color", data["menuBgColor"])
    setattr(settings, "submenu_bg_color", data["submenuBgColor"])


# UPDATE A COMMUNITY'S SETTINGS: POST
@community_settings_routes.route("/<int:id>/posts/edit", methods=["PUT"])
def update_post_settings(id):
    """
    Query to edit a community's post settings
    """
    settings = CommunitySettings.query.get(id)
    data = request.get_json()

    setattr(settings, "post_title_color", data["postTitleColor"])
    setattr(settings, "upvote_img_active", data["upvoteImgActive"])
    setattr(settings, "upvote_img_inactive", data["upvoteImgInactive"])
    setattr(settings, "downvote_img_active", data["downvoteImgActive"])
    setattr(settings, "downvote_img_inactive", data["downvoteImgInactive"])
    setattr(settings, "upvote_count_color", data["upvoteCountColor"])
    setattr(settings, "downvote_count_color", data["downvoteCountColor"])
    setattr(settings, "post_bg_color", data["postBgColor"])
    setattr(settings, "post_bg_img", data["postBgImg"])
    setattr(settings, "post_bg_img_format", data["postBgImgFormat"])
    setattr(settings, "link_placeholder_img", data["linkPlaceholderImg"])
    setattr(settings, "link_placeholder_img_format", data["linkPlaceholderImgFormat"])

    db.session.commit()
    return settings.to_dict()


# RESET A COMMUNITY'S SETTINGS TO DEFAULT
@community_settings_routes.route("/<int:id>/reset", methods=["PUT"])
def reset_community_settings(id):
    """
    Query to reset a community's settings to default settings
    """
    settings = CommunitySettings.query.get(id)

    setattr(settings, "base_color", "#0079d3")
    setattr(settings, "highlight", "#0079d3")
    setattr(settings, "bg_color", "#dae0e6")
    setattr(settings, "background_img_format", "fill")
    setattr(settings, "name_format", "c/")
    setattr(settings, "hide_community_icon", False)
    setattr(settings, "community_icon", "https://i.imgur.com/9CI9hiO.png")
    setattr(settings, "banner_height", "80px")
    setattr(settings, "banner_color", "#33a8ff")
    setattr(settings, "custom_banner_color", False)
    setattr(settings, "banner_img", "")
    setattr(settings, "active_link_color", "#0079d3")
    setattr(settings, "inactive_link_color", "#0079d3")
    setattr(settings, "hover_link_color", "#0079d3")
    setattr(settings, "menu_bg_color", "#dbf0ff")
    setattr(settings, "submenu_bg_color", "#dbf0ff")
    setattr(settings, "post_title_color", "#222222")
    setattr(settings, "upvote_count_color", "#FF4500")
    setattr(settings, "downvote_count_color", "#7193FF")
    setattr(settings, "post_bg_color", "#FFFFFF")
    setattr(settings, "post_bg_img_format", "fill")
    setattr(settings, "link_placeholder_img_format", "fill")

    db.session.commit()
    return settings.to_dict()



# RESET TO DEFAULT COMMUNITY ICON
@community_settings_routes.route("/<int:id>/icon/reset", methods=["PUT"])
def default_community_icon(id):
    """
    Query to reset a community's icon to default icon
    """
    community = CommunitySettings.query.get(id)

    setattr(community, "community_icon", "https://i.imgur.com/9CI9hiO.png")
    db.session.commit()

    return community.to_dict()
