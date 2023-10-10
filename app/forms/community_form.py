from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Community

def community_exists(field):
    # Checking if community name is already in use
    name = field.data
    community = Community.query.filter(Community.name == name).first()
    if community:
        raise ValidationError('That name is already taken.')


class CommunityForm(FlaskForm):
    name = StringField(
        "Name",
        validators=[
            DataRequired(),
            community_exists
        ]
    )
    description = TextAreaField(
        "Description",
        validators=[
            Length(
                max=300,
                message="Keep descriptions under 300 characters please."
            )
        ]
    )
    display_name = StringField(
        "DisplayName"
    )
    submit=SubmitField("Submit")


class UpdateCommunityForm(FlaskForm):
    display_name=StringField("DisplayName")
    description = TextAreaField("Description")
    submit=SubmitField("Submit")
