from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

# FORM FOR CREATING A POST
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
            Length(
                max=40000,
                message="Please give your post some content. Posts are limited to 40,000 characters.",
            )
        ],
    )
    community_id = IntegerField("communityId")
    submit = SubmitField("Submit")

# FORM FOR UPDATING A POST
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

# FORM FOR CREATING AN IMAGE POST
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
    imgUrl = StringField("imgUrl")
    communityId = IntegerField("CommunityId")
    submit = SubmitField("Submit")

# FORM FOR UPDATING AN IMAGE POST
class UpdateImagePostForm(FlaskForm):
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
    img_url = StringField("imgUrl")
    submit = SubmitField("Submit")

# FORM FOR CREATING A LINK POST
class LinkPostForm(FlaskForm):
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
    link_url = StringField("linkUrl")
    community_id = IntegerField("CommunityId")
    submit = SubmitField("Submit")
