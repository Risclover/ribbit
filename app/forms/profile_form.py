from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL


class ProfileUpdateForm(FlaskForm):
    display_name=StringField("display_name")
    about = TextAreaField("About")
    submit=SubmitField("Submit")
