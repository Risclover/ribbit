from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comment_1 = Comment(
        "content": "What a great post. Thanks for sharing!",
        user_id=2,
        post_id=1
    )
    comment_2 = Comment(
        "content": "This sucks. Please do better.",
        user_id=3,
        post_id=2
    )
    comment_3 = Comment(
        "content": "Ha ha ha. You're so funny!",
        user_id=1,
        post_id=3
    )
