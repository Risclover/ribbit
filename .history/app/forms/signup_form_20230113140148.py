from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('That email address is already associated with an account.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('That username is already taken.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(Length(min=3,max=20,message="Username must be between 3 and 20 characters.")), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(Length(min=8,message="Password must be at least 8 characters long."))])
