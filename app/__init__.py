import pip._vendor.requests as requests
import os
import secrets
import urllib.parse
from app.utils import get_random_username  # Import your helper
from flask import (
    Flask, request, redirect, current_app, abort, session, url_for, flash, send_from_directory
)
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager, login_user, current_user
# If you want to display flash messages in server-side templates, you also need 'render_template'
# from flask import render_template
from werkzeug.security import generate_password_hash  # Add this import at the top with your others
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Community
from app.forms import SignUpForm
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
from .api.notification_routes import notification_routes
from .api.chat_thread_routes import chat_thread_routes
from .api.community_settings_routes import community_settings_routes
from .api.chat_reaction_routes import chat_reaction_routes

from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')
app.config.from_object(Config)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')  # Important for session

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    # Return the user from your database
    return User.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

# Register all your blueprints
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
app.register_blueprint(notification_routes, url_prefix="/api/notifications")
app.register_blueprint(chat_thread_routes, url_prefix='/api/chat_threads')
app.register_blueprint(community_settings_routes, url_prefix="/api/community_settings")
app.register_blueprint(chat_reaction_routes, url_prefix="/api/chat_reactions")

db.init_app(app)
Migrate(app, db)
socketio.init_app(app)

# Application Security
CORS(app)

# Enforce HTTPS in production
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            return redirect(url, code=301)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True
    )
    return response

# Example route for your React build:
@app.route('/', defaults={'path': ''})

@app.errorhandler(404)
def spa_fallback(e):
    """Anything that isn’t an /api route falls through to React."""
    return send_from_directory("static", "index.html")

@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

##################################################
#     OAUTH CONFIG AND ROUTES (Google, etc.)     #
##################################################

# Store client credentials and endpoints
app.config['OAUTH2_PROVIDERS'] = {
    'google': {
        'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
        'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
        'authorize_url': 'https://accounts.google.com/o/oauth2/v2/auth',
        'token_url': 'https://oauth2.googleapis.com/token',
        'userinfo': {
            'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
            'email': lambda json_data: json_data.get('email'),
        },
        # Optional: keep a list of scopes here
        'scopes': ['openid', 'email', 'profile'],
    }
}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies.get('csrf_token', '')
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            about=""
        )

        # List of community IDs to subscribe to
        community_ids = [1, 2, 3, 4, 5]
        missing_communities = []

        for cid in community_ids:
            community = Community.query.get(cid)
            if community:
                user.user_subscriptions.append(community)
            else:
                missing_communities.append(cid)

        if missing_communities:
            # Handle missing communities as needed
            # For example, log a warning or raise an error
            print(f"Warning: Communities with IDs {missing_communities} do not exist.")
            # Optionally, you can return an error response
            return {'errors': [f"Communities with IDs {missing_communities} do not exist."]}, 400

        db.session.add(user)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            # Log the error using logging instead of print for production
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Database commit failed: {e}")
            return {'errors': ['An error occurred while creating the user. Please try again.']}, 500

        login_user(user)
        return user.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@app.route('/authorize/<provider>')
def oauth2_authorize(provider):
    """Initiate the OAuth2 flow for Google."""
    providers = app.config['OAUTH2_PROVIDERS']
    if provider not in providers:
        abort(404, description="Unknown provider")

    provider_conf = providers[provider]

    # Generate random 'state' token for CSRF protection
    state_token = secrets.token_urlsafe(16)
    session['oauth_state'] = state_token

    # Build query params
    params = {
        'client_id': provider_conf['client_id'],
        'redirect_uri': url_for('oauth2_callback', provider=provider, _external=True),
        'scope': ' '.join(provider_conf.get('scopes', [])),  # space-separated
        'response_type': 'code',
        'state': state_token,
        'access_type': 'offline',
        'prompt': 'consent',
    }

    # Construct full auth URL
    query_string = urllib.parse.urlencode(params)
    auth_redirect_url = f"{provider_conf['authorize_url']}?{query_string}"

    # Redirect to the provider's OAuth screen
    return redirect(auth_redirect_url)

@app.route('/callback/<provider>')
def oauth2_callback(provider):
    """
    Process the OAuth2 callback from Google.
    Exchange the authorization code for an access token, fetch user info,
    and log the user in (or create a new user) via Flask-Login.
    """
    if not current_user.is_anonymous:
        # Already logged in? Send them somewhere (e.g. the homepage).
        return redirect('/')

    providers = app.config['OAUTH2_PROVIDERS']
    provider_data = providers.get(provider)
    if provider_data is None:
        abort(404, description="Unknown provider")

    # Check for OAuth errors in the querystring
    if 'error' in request.args:
        for k, v in request.args.items():
            if k.startswith('error'):
                flash(f"{k}: {v}")
        return redirect('/')

    # Compare the 'state' param to what we saved in the session
    if request.args.get('state') != session.get('oauth_state'):
        abort(401, description="Invalid CSRF state token")

    # Grab the code
    code = request.args.get('code')
    if not code:
        abort(401, description="Missing authorization code")

    # Exchange the code for an access token
    token_resp = requests.post(provider_data['token_url'], data={
        'client_id': provider_data['client_id'],
        'client_secret': provider_data['client_secret'],
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': url_for('oauth2_callback', provider=provider, _external=True),
    }, headers={'Accept': 'application/json'})

    if token_resp.status_code != 200:
        abort(401, description="Token exchange failed")

    token_json = token_resp.json()
    access_token = token_json.get('access_token')
    if not access_token:
        abort(401, description="No access token returned")

    # Fetch user info (e.g. email) using the access token
    userinfo_resp = requests.get(
        provider_data['userinfo']['url'],
        headers={
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json',
        }
    )
    if userinfo_resp.status_code != 200:
        abort(401, description="Fetching user info failed")

    userinfo = userinfo_resp.json()
    email = provider_data['userinfo']['email'](userinfo)
    if not email:
        abort(401, description="Could not retrieve email")

    # Find or create the user in the database.
    # Note: We need to supply a dummy hashed_password because your schema requires it.
    user = db.session.scalar(db.select(User).where(User.email == email))
    if user is None:
        dummy_password = generate_password_hash(secrets.token_urlsafe(16))
        user = User(
            email=email,
            username=get_random_username(),
            hashed_password=dummy_password  # Provide a dummy password hash
        )

        # List of community IDs to subscribe to
        community_ids = [1, 2, 3, 4, 5]
        missing_communities = []

        for cid in community_ids:
            community = Community.query.get(cid)
            if community:
                user.user_subscriptions.append(community)
            else:
                missing_communities.append(cid)

        if missing_communities:
            # Handle missing communities as needed
            # For example, log a warning or raise an error
            print(f"Warning: Communities with IDs {missing_communities} do not exist.")
            # Optionally, you can return an error response
            return {'errors': [f"Communities with IDs {missing_communities} do not exist."]}, 400

        db.session.add(user)
        db.session.commit()

    # Log in with Flask-Login
    login_user(user)

    frontend_url = current_app.config.get("FRONTEND_URL", "http://localhost:3000")
    return redirect(frontend_url)
