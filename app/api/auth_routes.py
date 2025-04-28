from flask import Blueprint, request, session, redirect, abort, current_app
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash
from sqlalchemy import func

from app.models import User, Community
from app.extensions import db
from app.forms import LoginForm, SignUpForm
from app.helpers import validation_errors_to_error_messages, get_random_username

import secrets, urllib.parse, requests, logging

auth_routes = Blueprint('auth', __name__)
logger = logging.getLogger(__name__)           # module‑level logger

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route("/signup/<string:username>", methods=["POST"])
def check_username(username):
    """
    Checks if username is taken
    """
    username_lower = username.lower()
    user = User.query.filter(func.lower(User.username) == username_lower).first()
    if user:
        return {"Message": True}
    else:
        return {"Message": False}

# --------------------------------------------------------------------------- #
#  Regular username / password signup
# --------------------------------------------------------------------------- #
@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    form = SignUpForm()
    form["csrf_token"].data = request.cookies.get("csrf_token", "")
    if not form.validate_on_submit():
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    user = User(
        username=form.data["username"],
        email=form.data["email"],
        password=form.data["password"],
        about=""
    )

    _bulk_subscribe(user)
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return user.to_dict(), 201


# --------------------------------------------------------------------------- #
#  OAuth2 flow (Google in this example)
# --------------------------------------------------------------------------- #
@auth_routes.route("/authorize/<provider>")
def oauth2_authorize(provider: str):
    providers = current_app.config["OAUTH2_PROVIDERS"]
    provider_conf = providers.get(provider)
    if not provider_conf:
        abort(404, "Unknown provider")

    state_token = secrets.token_urlsafe(16)
    session["oauth_state"] = state_token

    params = {
        "client_id":     provider_conf["client_id"],
        "redirect_uri":  _callback_url(provider),
        "scope":         " ".join(provider_conf.get("scopes", [])),
        "response_type": "code",
        "state":         state_token,
        "access_type":   "offline",
        "prompt":        "consent",
    }
    redirect_url = f'{provider_conf["authorize_url"]}?{urllib.parse.urlencode(params)}'
    return redirect(redirect_url)


@auth_routes.route("/callback/<provider>")
def oauth2_callback(provider: str):
    if not current_user.is_anonymous:
        return redirect("/")

    providers     = current_app.config["OAUTH2_PROVIDERS"]
    provider_conf = providers.get(provider) or abort(404, "Unknown provider")

    # CSRF check
    if request.args.get("state") != session.pop("oauth_state", None):
        abort(401, "Invalid CSRF state token")

    code = request.args.get("code") or abort(401, "Missing authorization code")

    # Exchange code for token
    token_json = _exchange_code_for_token(code, provider_conf)
    access_token = token_json.get("access_token") or abort(401, "No access token")

    # Fetch user info
    userinfo = _fetch_userinfo(access_token, provider_conf)
    email    = provider_conf["userinfo"]["email"](userinfo) or abort(401, "Email missing")

    user = db.session.scalar(db.select(User).where(User.email == email))
    if user is None:
        user = _create_user_from_oauth(email)

    login_user(user)
    return redirect(current_app.config.get("FRONTEND_URL", "http://localhost:3000"))


# --------------------------------------------------------------------------- #
#  Helper functions
# --------------------------------------------------------------------------- #
def _callback_url(provider: str) -> str:
    """Absolute callback URL for provider."""
    return urllib.parse.urljoin(current_app.config["BACKEND_URL"], f"/api/auth/callback/{provider}")

def _exchange_code_for_token(code: str, provider_conf: dict) -> dict:
    resp = requests.post(
        provider_conf["token_url"],
        data={
            "client_id":     provider_conf["client_id"],
            "client_secret": provider_conf["client_secret"],
            "code":          code,
            "grant_type":    "authorization_code",
            "redirect_uri":  _callback_url("google"),
        },
        headers={"Accept": "application/json"},
        timeout=10,
    )
    try:
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        logger.error("Token exchange failed: %s", exc, exc_info=True)
        abort(401, "Token exchange failed")

def _fetch_userinfo(access_token: str, provider_conf: dict) -> dict:
    resp = requests.get(
        provider_conf["userinfo"]["url"],
        headers={"Authorization": f"Bearer {access_token}", "Accept": "application/json"},
        timeout=10,
    )
    try:
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        logger.error("UserInfo fetch failed: %s", exc, exc_info=True)
        abort(401, "Fetching user info failed")

def _create_user_from_oauth(email: str) -> User:
    user = User(
        email=email,
        username=get_random_username(),
        hashed_password=generate_password_hash(secrets.token_urlsafe(16)),
    )
    _bulk_subscribe(user)
    db.session.add(user)
    db.session.commit()
    return user

def _bulk_subscribe(user: "User"):
    """Subscribe the new user to seed communities."""
    seed_ids = (1, 2, 3, 4, 5)
    present  = Community.query.filter(Community.id.in_(seed_ids)).all()
    user.user_subscriptions.extend(present)



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
