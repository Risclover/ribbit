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
            DataRequired(),
            Length(min=1,
                max=300,
                message="Keep descriptions under 300 characters please."
            )
        ]
    )
    display_name = StringField(
        "DisplayName",
        validators=[
            DataRequired()
        ]
    )
    submit=SubmitField("Submit")
