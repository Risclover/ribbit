from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL

class CommentForm(FlaskForm):
    content = StringField(
        "Content",
        validators=[
            DataRequired("Please give your comment some content."),
            Length(
                min=1,
                max=10000,
                message="Please give your comment some content. Comments are limited to 10,000 characters."
            )
        ]
    )
    submit = SubmitField("Submit")

class UpdateCommentForm(FlaskForm):
    content = StringField(
        "Content",
        validators=[
            DataRequired("Please give your comment some content."),
            Length(
                min=1,
                max=10000,
                message="Please give your comment some content. Comments are limited to 10,000 characters."
            )
        ]
    )
    submit = SubmitField("Submit")
