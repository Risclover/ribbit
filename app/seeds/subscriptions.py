from app.models.joins import db, subscriptions

def seed_subscriptions():
    sub1 = subscriptions(
        user_id=1,
        community_id=1
    )

    db.session.add(sub1)
    db.session.commit()

def undo_subscriptions():
    db.session.execute("DELETE FROM subscriptions")
    db.session.commit()
