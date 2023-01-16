from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    content = TextAreaField(
        "Content",
        validators=[
            DataRequired("Didn't you want to say something?"),
            Length(min=1, max=10000, message="You must type something to leave a comment."),
        ],
    )
    submit = SubmitField("Submit")
