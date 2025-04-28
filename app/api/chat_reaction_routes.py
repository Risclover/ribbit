from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Reaction, User, ChatMessage, ChatMessageThread
from app.extensions import db


chat_reaction_routes = Blueprint("chat_reactions", __name__)

# GET ALL REACTIONS
@chat_reaction_routes.route("")
def get_all_reactions():
    """
    Query all reactions
    """
    reactions = Reaction.query.all()
    return {"Reactions": [reaction.to_dict() for reaction in reactions]}

# GET SPECIFIC MESSAGE'S REACTIONS
@chat_reaction_routes.route("/messages/<int:message_id>", methods=["GET"])
def get_reactions_for_message(message_id):
    """
    Query reactions for a specific message
    """
    reactions = Reaction.query.filter_by(message_id=message_id).all()
    return jsonify({"reactions": [reaction.to_dict() for reaction in reactions]})


# CREATE A REACTION
@chat_reaction_routes.route("/messages/<int:id>", methods=["POST"])
def create_reaction(id):
    """
    Create a reaction
    """
    data = request.get_json()
    reaction_type = data["reaction"]

    # Check if reaction already exists
    existing_reaction = Reaction.query.filter_by(
        message_id=id,
        user_id=current_user.get_id(),
        reaction_type=reaction_type
    ).first()

    if existing_reaction:
        return jsonify({'error': 'Reaction already exists'}), 400

    # Create new reaction
    new_reaction = Reaction(
        reaction_type=reaction_type,
        message_id=id,
        user_id=current_user.get_id()
    )

    # Add new_reaction to the session
    db.session.add(new_reaction)
    db.session.commit()

    return new_reaction.to_dict()

# REMOVE A REACTION
@chat_reaction_routes.route("/messages/<int:id>", methods=["DELETE"])
def remove_reaction(id):
    """
    Remove a message's reaction
    """
    data = request.get_json()
    reaction_type = data.get("reaction")

    reaction = Reaction.query.filter_by(
        message_id=id,
        user_id=current_user.get_id(),
        reaction_type=reaction_type
    ).first()

    if not reaction:
        return jsonify({'error': 'Reaction does not exist'}), 404

    # Convert reaction to dict before deleting
    reaction_data = reaction.to_dict()
    db.session.delete(reaction)
    db.session.commit()

    return jsonify(reaction_data), 200
