from app.models import db, Community


def seed_communities():
    community_1 = Community(
        name="cats",
        description="A community for people to be obsessed with cats, because duh, they're cats",
        owner_id=1
    )
    community_2 = Community(
        name="movies",
        description="A place for all movie-lovers to feel free to discuss everything to do with cinema/film",
        owner_id=1
    )
    community_3 = Community(
        name="people",
        description="Introduce yourself, make friends, and simply be a person",
        owner_id=1
    )
