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



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
