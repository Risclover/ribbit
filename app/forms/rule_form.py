from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL
from app.models import Community


class RuleForm(FlaskForm):
    title = StringField(
        "Title"
    )
    description = TextAreaField("Description")
    submit = SubmitField("Submit")
