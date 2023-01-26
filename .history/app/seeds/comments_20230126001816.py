from app.models import db, Comment

def seed_comments():
    comment_1 = Comment(
        content="What a great post. Thanks for sharing!",
        user_id=2,
        post_id=1
    )
    comment_2 = Comment(
        content="This sucks. Please do better.",
        user_id=3,
        post_id=2
    )
    comment_3 = Comment(
        content="Ha ha ha. You're so funny!",
        user_id=1,
        post_id=3
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.commit()

def undo_comments():
    db.session.execute("DELETE FROM comments")
    db.session.commit()
