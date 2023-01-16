from app.models import db, Post, environment, SCHEMA

def seed_posts():
    post_1 = Post(
        title="This is my first post!",
        content="Hey everyone! I made an account today and this is my very first post. Just wanted to introduce myself and say hello!",
        user_id=1
    )
    post_2 = Post(
        title="Has anyone seen the movie M3GAN?",
        content="It didn't look amazing in trailers, and seems more for Gen Z folks, but I've been hearing from a lot of peers that it was actually a decent movie. What gives?",
        user_id=2
    )
    post_3 = Post(
        title="Anyone want a tiger?",
        content="I'm selling my tiger for 50 gold. Reminder that you must be level 30 or higher to be able to buy it. Message me if interested.",
        user_id=3
    )

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.commit()

def undo_posts():
    db.session.execute("DELETE FROM posts")
    db.session.commit()
