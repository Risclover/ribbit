from flask import Blueprint, jsonify, request, redirect, render_template
from app.models import db, Community, User
from sqlalchemy import or_

search_routes = Blueprint("search", __name__)

@search_routes.route("/<query>")
def search(query):
    """
    Query for searching all communities and users
    """

    formatted_query = " ".join(query.split('+'))

    print("""







    """, formatted_query)

    queried_communities = Community.query.filter(Community.name.ilike(f"%{formatted_query}%")).all()
    queried_users = User.query.filter(User.username.ilike(f"%{formatted_query}%")).all()
    combined_query = queried_communities + queried_users


    print("""








    """, combined_query)

    print({"query": [query.to_dict() for query in combined_query]})
    return {"query": [query.to_dict() for query in combined_query]}
