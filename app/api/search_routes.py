from flask import Blueprint, request, jsonify
from app.models import Community, User, Post, Comment
from sqlalchemy import or_
from bs4 import BeautifulSoup

search_routes = Blueprint("search", __name__)

# SEARCH ALL COMMUNITIES AND USERS
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


@search_routes.route("/posts")
def search_posts():
    query = request.args.get('q', '')
    clean_query = strip_tags(query)
    search_result = Post.query.filter((
        Post.title.ilike(f'%{clean_query}%')) | (Post.content.ilike(f'%{clean_query}%'))
    ).all()

    return jsonify({"PostResults": [post.to_dict() for post in search_result]})


@search_routes.route("/comments")
def search_comments():
    query = request.args.get('q', '')

    search_result = Comment.query.filter(
        (Comment.content.ilike(f'%{query}%'))
    ).all()

    return {"CommentResults": [comment.to_dict() for comment in search_result]}


@search_routes.route("/users")
def search_users():
    query = request.args.get('q', '')
    search_result = User.query.filter(
        User.username.ilike(f'%{query}%')
    ).all()

    return {"UserResults": [user.to_dict() for user in search_result]}


@search_routes.route("/communities")
def search_communities():
    query = request.args.get('q', '')
    search_result = Community.query.filter(
        Community.name.ilike(f'%{query}%')
    ).all()

    return {"CommunityResults": [community.to_dict() for community in search_result]}

def strip_tags(html):
    soup = BeautifulSoup(html, "html.parser")
    return soup.get_text()
