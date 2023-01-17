from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL

class CommunityForm(FlaskForm):
    name = TextAreaField(
        "Name",
        validators=[
            DataRequired("Please give your community a name."),
            Length(
                min=1,
                max=20,
                message="Please give your community a name. Names are limited to 20 characters."
            )
        ]
    )
