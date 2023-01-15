from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL


class PostForm(FlaskForm):
    title = StringField(
        "Title",
        validators=[
            DataRequired("Please give your post a title."),
            Length(min=1, max=300, message="Please give your title some substance (4 characters or more required)"),
        ],
    )
    content = TextAreaField(
        "Content",
        validators=[
            DataRequired("You must give your post some content."),
            Length(
                min=1, max=40000
                message="Please make your post a little bit longer (10 characters or more required)",
            ),
        ],
    )
    # community_id = IntegerField("CommunityId")
    submit = SubmitField("Submit")


# class ImagePostForm(FlaskForm):
#     title = StringField(
#         "Title",
#         validators=[
#             DataRequired("Please give your post a title."),
#             Length(min=4, max=300, message="Please give your title some substance (4 characters or more required)"),
#         ],
#     )
#     preview_img_url = StringField("Preview Image URL",
#         validators=[
#             DataRequired(),
#             Length(min=0, max=1500, message="Please enter a shorter image URL."),
#             URL(message="Please enter a valid image URL.")
#         ])
#     submit = SubmitField("Submit")



class PostUpdateForm(FlaskForm):
    title = StringField("Title", validators=[            DataRequired("Please give your post a title."),
            Length(min=1, max=300, message="Please give your title some substance (4 characters or more required)"),])
    content = TextAreaField("Content", validators=[DataRequired()])
    submit = SubmitField("Submit")



# class PostImgUpdateForm(FlaskForm):
#     preview_img_url = StringField("Preview Image URL",
#         validators=[
#             DataRequired(),
#             Length(min=0, max=1500, message="Please enter a shorter image URL."),
#             URL(message="Please enter a valid image URL.")
#         ])
#     submit = SubmitField("Submit")
