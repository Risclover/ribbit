from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField

class ProfileUpdateForm(FlaskForm):
    display_name=StringField("display_name")
    about = TextAreaField("About")
    submit=SubmitField("Submit")
