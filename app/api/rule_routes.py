from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Rule, Community
from .auth_routes import validation_errors_to_error_messages
from app.forms import RuleForm

rule_routes = Blueprint("rules", __name__)

# GET A COMMUNITY'S RULES
@rule_routes.route("/communities/<int:id>")
def get_rules(id):
    """
    Query to get all rules for a community
    """
    community = Community.query.get(id)
    community_rules = community.community_rules

    return {"Rules": [rule.to_dict() for rule in community_rules]}


# CREATE A COMMUNITY RULE
@rule_routes.route("/communities/<int:id>/submit", methods=["POST"])
def create_rule(id):
    """
    Query to create a community rule
    """
    form = RuleForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_rule = Rule(
            title=data["title"],
            description=data["description"],
            community_id=id
        )

        db.session.add(new_rule)
        db.session.commit()

        return new_rule.to_dict()
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# GET A RULE
@rule_routes.route("/<int:id>")
def get_rule(id):
    """
    Query to get a specific rule
    """
    rule = Rule.query.get(id)

    return rule.to_dict()

# EDIT A RULE
@rule_routes.route("/<int:id>/edit", methods=["PUT"])
def update_rule(id):
    """
    Query to edit a rule
    """
    rule = Rule.query.get(id)

    form = RuleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(rule, "title", data["title"])
        setattr(rule, "description", data["description"])

        db.session.commit()
        return rule.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403

# DELETE A RULE
@rule_routes.route("/<int:id>", methods=["DELETE"])
def delete_rule(id):
    """
    Query to delete a rule
    """
    rule = Rule.query.get(id)

    db.session.delete(rule)
    db.session.commit()
    return {"message": "Rule successfully deleted", "status_code": 200}
