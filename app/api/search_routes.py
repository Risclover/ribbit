from flask import Blueprint, jsonify, request, redirect, render_template
from app.models import db, Community, User, Post, Comment
from sqlalchemy import or_

search_routes = Blueprint("search", __name__)


@search_routes.route("/<query>")
def search(query):
    """
    Query for searching all communities and users
    """

    formatted_query = " ".join(query.split('+'))

    queried_communities = Community.query.filter(Community.name.ilike(f"%{formatted_query}%")).all()
    queried_users = User.query.filter(User.username.ilike(f"%{formatted_query}%")).all()
    queried_posts = Post.query.filter(or_(Post.title.ilike(f"%{formatted_query}%"), Post.content.ilike(f"%{formatted_query}%"))).all()
    queried_comments = Comment.query.filter(Comment.content.ilike(f"%{formatted_query}%")).all()
    combined_query = queried_users + queried_communities + queried_posts + queried_comments


    print({"query": [query.to_dict() for query in combined_query]})
    return {"query": [query.to_dict() for query in combined_query]}
