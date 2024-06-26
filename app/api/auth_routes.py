from flask import Blueprint, jsonify, session, request
from app.models import User, db, Community, Notification
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import func

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}{error}')
    return errorMessages


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

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            about=""
        )

        community_1 = Community.query.get(1)
        community_2 = Community.query.get(2)
        community_3 = Community.query.get(3)
        community_4 = Community.query.get(4)
        community_5 = Community.query.get(5)

        user.user_subscriptions.append(community_1)
        user.user_subscriptions.append(community_2)
        user.user_subscriptions.append(community_3)
        user.user_subscriptions.append(community_4)
        user.user_subscriptions.append(community_5)

        admin = User.query.get(1)

        welcome_notification = Notification(user_id=user.id, sender_id=admin.id, content="", icon=admin.profile_img, message="Welcome to Ribbit! Click here to open the user manual in a new tab.", notification_type="welcome")

        db.session.add(user)
        db.session.add(welcome_notification)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
