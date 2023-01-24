from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL


class PostForm(FlaskForm):
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
    content = TextAreaField(
        "Content",
        validators=[
            DataRequired("You must give your post some content."),
            Length(
                min=1,
                max=40000,
                message="Please give your post some content. Posts are limited to 40,000 characters.",
            )
        ],
    )
    community_id = IntegerField("CommunityId")
    submit = SubmitField("Submit")


class PostUpdateForm(FlaskForm):
    title = TextAreaField("Title",
        validators=[
            DataRequired("Please give your post a title."),
            Length(
                min=1,
                max=300,
                message="Please give your post a title. Titles are limited to 300 characters."
            )
        ]
    )
    content = TextAreaField("Content",
        validators=[
            DataRequired("You must give your post some content."),
            Length(
                min=1,
                max=40000,
                message="Please give your post some content. Posts are limited to 40,000 characters.",
            )
        ]
    )
    submit = SubmitField("Submit")


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
    image_url = StringField("imageUrl")
    community_id = IntegerField("CommunityId")
    submit = SubmitField("Submit")
