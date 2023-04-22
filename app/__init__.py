import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .socket import socketio

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.post_routes import post_routes
from .api.comment_routes import comment_routes
from .api.community_routes import community_routes
from .api.subscription_routes import subscription_routes
from .api.search_routes import search_routes
from .api.rule_routes import rule_routes
from .api.follower_routes import follower_routes
from .api.favorite_community_routes import favorite_community_routes
from .api.favorite_user_routes import favorite_user_routes
from .api.viewed_post_routes import viewed_post_routes
from .api.thread_routes import thread_routes
from .api.message_routes import message_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(post_routes, url_prefix="/api/posts")
app.register_blueprint(comment_routes, url_prefix="/api/comments")
app.register_blueprint(community_routes, url_prefix="/api/communities")
app.register_blueprint(subscription_routes, url_prefix="/api/subscriptions")
app.register_blueprint(search_routes, url_prefix="/api/search")
app.register_blueprint(rule_routes, url_prefix="/api/rules")
app.register_blueprint(follower_routes, url_prefix="/api/followers")
app.register_blueprint(favorite_community_routes, url_prefix="/api/favorite_communities")
app.register_blueprint(favorite_user_routes, url_prefix="/api/favorite_users")
app.register_blueprint(viewed_post_routes, url_prefix="/api/viewed_posts")
app.register_blueprint(thread_routes, url_prefix="/api/threads")
app.register_blueprint(message_routes, url_prefix="/api/messages")

db.init_app(app)
Migrate(app, db)
socketio.init_app(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    socketio.run(app)
