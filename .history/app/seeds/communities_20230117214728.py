from app.models import db, Community


def seed_communities():
    community_1 = Community(
        name="cats",
        description="A community for people to be obsessed with cats, because duh, they're cats",
        display_name="Kitty kitty cats",
        owner_id=1
    )
    community_2 = Community(
        name="movies",
        description="A place for all movie-lovers to feel free to discuss everything to do with cinema/film",
        display_name="Film enthusiasts unite!"
        owner_id=1
    )
    community_3 = Community(
        name="people",
        description="Introduce yourself, make friends, and simply be a person",
        owner_id=1
    )

    db.session.add(community_1)
    db.session.add(community_2)
    db.session.add(community_3)
    db.session.commit()

def undo_communities():
    db.session.execute("DELETE FROM communities")
    db.session.commit()
