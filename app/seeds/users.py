from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_img="https://ribbit-img-upload.s3.us-west-1.amazonaws.com/5ed7c2f8551e42f6b6044bfe515b6288.png")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_img="https://ribbit-img-upload.s3.us-west-1.amazonaws.com/65b6239cc0b345669a2879463621e4f8.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    user_4 = User(
        username="Videowulff",
        email="Videowulff@aa.io",
        password="password"
    )
    user_5 = User(
        username="pedrowyatt",
        email="pedrowyatt@aa.io",
        password="password"
    )
    user_6 = User(
        username="lexi_the_leo",
        email="lexi_the_leo@aa.io",
        password="password"
    )
    user_7 = User(
        username="Cheris_P",
        email="Cheris_P@aa.io",
        password="password"
    )
    user_8 = User(
        username="lurkinislife",
        email="lurkinislife@aa.io",
        password="password"
    )
    user_9 = User(
        username="asilvertintedrose",
        email="asilvertintedrose@aa.io",
        password="password"
    )
    user_10 = User(
        username="Siri0usly",
        email="Siri0usly@aa.io",
        password="password"
    )
    user_11 = User(
        username="scot816",
        email="scot816@aa.io",
        password="password"
    )
    user_12 = User(
        username="Frigglefragglewaggit",
        email="Frigglefragglewaggit@aa.io",
        password="password"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.add(user_6)
    db.session.add(user_7)
    db.session.add(user_8)
    db.session.add(user_9)
    db.session.add(user_10)
    db.session.add(user_11)
    db.session.add(user_12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    db.session.execute("DELETE FROM users")

    db.session.commit()
