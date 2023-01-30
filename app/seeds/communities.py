from app.models import db, Community


def seed_communities():
    community_1 = Community(
        name="cats",
        description="A community for people to be obsessed with cats, because duh, they're cats",
        display_name="Kitty kitty cats",
        user_id=1
    )
    community_2 = Community(
        name="movies",
        description="A place for all movie-lovers to feel free to discuss everything to do with cinema/film",
        display_name="Film enthusiasts unite!",
        user_id=1
    )
    community_3 = Community(
        name="people",
        description="Introduce yourself, make friends, and simply be a person",
        display_name="People are people so what can you do?",
        user_id=2
    )
    community_4 = Community(
        name="oddlysatisfying",
        description="For those little things that are inexplicably satisfying.",
        display_name="Oddly Satisfying",
        community_img="https://styles.redditmedia.com/t5_2x93b/styles/communityIcon_eefpey65pli21.png",
        user_id=1
    )
    community_5 = Community(
        name="aww",
        description="Things that make you go AWW! Like puppies, bunnies, babies, and so on... A place for really cute pictures and videos!",
        display_name="A subreddit for cute and cuddly pictures",
        community_img="https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_6fzlk8ukx6s51.jpg",
        user_id=1
    )
    community_6 = Community(
        name="mildlyinteresting",
        description="Aww, cripes. I didn't know I'd have to write a description. How many words is that so far, like a hundred? Soooo, yeah. Mildly interesting stuff. Stuff that interests you. Mildly. It's in the name, ffs.",
        display_name="For photos that are, you know, mildly interesting",
        community_img="https://i.imgur.com/6zYO5R7.png",
        user_id=1
    )
    community_7 = Community(
        name="ProgrammerHumor",
        description="Dedicated to humor and jokes relating to programmers and programming.",
        display_name="Memes and jokes about everything programming and CS",
        community_img="https://styles.redditmedia.com/t5_2tex6/styles/communityIcon_u89jf60zv7p41.png",
        user_id=1
    )
    community_8 = Community(
        name="YouShouldKnow",
        description="Welcome to YouShouldKnow",
        display_name="You Should Know",
        community_img="https://a.thumbs.redditmedia.com/7uVDMO7_sDgkyDpvDmAT5D777ZOWAeU82PIG-L4kHL8.png",
        user_id=1
    )
    community_9 = Community(
        name="AskMen",
        description="We don't know, but we'll answer anyway",
        display_name="We don't know, but we'll answer anyway",
        community_img="https://cdn-icons-png.flaticon.com/512/6306/6306035.png",
        user_id=1
    )

    db.session.add(community_1)
    db.session.add(community_2)
    db.session.add(community_3)
    db.session.add(community_4)
    db.session.add(community_5)
    db.session.add(community_6)
    db.session.add(community_7)
    db.session.add(community_8)
    db.session.add(community_9)
    db.session.commit()

def undo_communities():
    db.session.execute("DELETE FROM communities")
    db.session.commit()
