from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL, ValidationError
from app.models import Community

def community_exists(form, field):
    # Checking if community name is already in use
    name = field.data
    community = Community.query.filter(Community.name == name).first()
    if community:
        raise ValidationError('That name is already taken.')


class CommunityForm(FlaskForm):
    name = TextAreaField(
        "Name",
        validators=[
            DataRequired("Please give your community a name."),
            Length(
                min=1,
                max=21,
                message="Please give your community a name. Names are limited to 21 characters."
            ),
            community_exists
        ]
    )
    description = TextAreaField(
        "Description",
        validators=[
            DataRequired("Tell us about your community."),
            Length(
                max=300,
                message="Why don't you tell people what your community is about?"
            )
        ]
    )
    submit=SubmitField("Submit")
