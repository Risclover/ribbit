from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL, ValidationError
from app.models import Message

class MessageForm(FlaskForm):
    body = StringField("Body", validators=[DataRequired()])
    submit = SubmitField("Submit")
6
