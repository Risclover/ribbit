from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField

class RuleForm(FlaskForm):
    title = StringField(
        "Title"
    )
    description = TextAreaField("Description")
    submit = SubmitField("Submit")
