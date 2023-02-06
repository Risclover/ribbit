from app.models import db, Rule

def seed_rules():
    community1_rule1 = Rule(
        title = "No kissing",
        description = "No kissing ok",
        community_id = 1
    )
    community1_rule2 = Rule(
        title = "Nudists only",
        description = "Only nudists allowed. Take your clothes off.",
        community_id = 1
    )
    community2_rule1 = Rule(
        title = "Be nice!!",
        description = "Those who aren't nice will get booted and banned.",
        community_id = 2
    )

    db.session.add(community1_rule1)
    db.session.add(community1_rule2)
    db.session.add(community2_rule1)

    db.session.commit()

def undo_rules():
    db.session.execute("DELETE FROM rules")
    db.session.commit()
