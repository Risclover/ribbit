from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class ImagePostForm(FlaskForm):
    title = TextAreaField(
        "Title",
        validators=[
            DataRequired("Please give your post a title."),
            Length(
                min=1,
                max=300,
                message="Please give your post a title. Titles are limited to 300 characters."
            ),
        ],
    )
    image_url = StringField("image_url")
    community_id = IntegerField("CommunityId")
