import random
from app.models import db, Post
from datetime import datetime, timedelta

def generate_relative_timestamp(max_days_ago=30, max_hours_after_post=24):
    """
    Generate a random datetime within the past `max_days_ago` days.
    """
    now = datetime.now()
    days_ago = random.randint(0, max_days_ago)
    hours_ago = random.randint(0, 23)
    minutes_ago = random.randint(0, 59)
    seconds_ago = random.randint(0, 59)

    return now - timedelta(days=days_ago, hours=hours_ago, minutes=minutes_ago, seconds=seconds_ago)

def seed_posts():
    db.session.add_all([
        # ----------------------- COMMUNITY: 'CATS' -----------------------#
        Post(
            title="I'm really stupid. I kissed my cat with lipstick on. I washed her with cat shampoo but it didn't work. Any other solution? Should I try coconut oil?",
            img_url="https://i.redd.it/ucfbefj6o03e1.jpeg",
            user_id=2,
            community_id=1,
            created_at=generate_relative_timestamp(),  # Optional: Add if handling timestamps
            updated_at=generate_relative_timestamp()   # Optional: Add if handling timestamps
        ),
        Post(
            title="Stepan is 16 today",
            img_url="https://i.redd.it/yzzg66wv3c1e1.jpeg",
            user_id=3,
            community_id=1,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="Overthinking",
            img_url="https://i.redd.it/t0mns9uri34e1.jpeg",
            user_id=4,
            community_id=1,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'ODDLYSPECIFIC' -----------------------#
        Post(
            title="Thanks mom",
            img_url="https://i.redd.it/fhuxh5fgbg1e1.png",
            user_id=5,
            community_id=2,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="Poor grandpa.",
            img_url="https://i.redd.it/ehgxtptqa21e1.png",
            user_id=6,
            community_id=2,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="Wonder where it was hidden",
            img_url="https://i.redd.it/nxlgv116gx1e1.png",
            user_id=7,
            community_id=2,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'JAVASCRIPT' -----------------------#
        Post(
            title="Deno is filing a USPTO petition to cancel Oracle's JavaScript trademark",
            link_url="https://bsky.app/profile/tinyclouds.org/post/3lbj4due43c2v",
            user_id=8,
            community_id=3,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="[AskJS] Beginners: What do you struggle with when learning JavaScript?",
            content="""I'm thinking of writing an eBook on JavaScript aimed at mitigating common JavaScript pain points for beginners and demystifying what's actually simple.

Newbies: <strong>what are you struggling to learn at the moment?</strong>""",
            user_id=9,
            community_id=3,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="Vite 6.0 is out!",
            link_url="https://vite.dev/blog/announcing-vite6",
            user_id=10,
            community_id=3,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'ODDLYSATISFYING' -----------------------#
        Post(
            title="Fluffy round paws",
            img_url="https://i.redd.it/0zb51v7phxzd1.png",
            user_id=11,
            community_id=4,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="The way this cat blends in.",
            img_url="https://i.redd.it/s1f7z7n60g3e1.jpeg",
            user_id=10,
            community_id=4,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="This surfing themed stop motion",
            link_url="https://imgur.com/this-surfing-themed-stop-motion-gsGlhW9",
            user_id=11,
            community_id=4,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'AWW' -----------------------#
        Post(
            title="Can you spot the shy sister? Guaranteed \"aww\" when you see her!",
            img_url="https://i.redd.it/f0ghsujc8v3e1.jpeg",
            user_id=12,
            community_id=5,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="I was chosen by a kitten in a park",
            img_url="https://i.redd.it/zloc3u9r4f4e1.jpeg",
            user_id=13,
            community_id=5,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="My 16 year old cat Whiskey",
            img_url="https://i.redd.it/yzokpq9ekj4e1.jpeg",
            user_id=14,
            community_id=5,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'MILDLYINTERESTING' -----------------------#
        Post(
            title="This blue stop sign I randomly encountered today.",
            img_url="https://i.redd.it/n8lsnvs90t0e1.jpeg",
            user_id=15,
            community_id=6,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="Local Thai place closed on Tuesday due to reasons.",
            img_url="https://i.redd.it/yd46bq9phq2e1.jpeg",
            user_id=16,
            community_id=6,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="This pizzeria sign is an actual pizza encased in acrylic.",
            img_url="https://i.redd.it/89qjzrlmma1e1.jpeg",
            user_id=17,
            community_id=6,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'PROGRAMMERHUMOR' -----------------------#
        Post(
            title="unionMakesUsStrong",
            img_url="https://i.redd.it/fkidjl4zpo0e1.jpeg",
            user_id=2,
            community_id=7,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
        Post(
            title="interviewVsActualJob",
            img_url="https://i.redd.it/3x6m6vs0e60e1.jpeg",
            user_id=3,
            community_id=7,
            created_at=generate_relative_timestamp(),
            updated_at=generate_relative_timestamp()
        ),
    ])
    db.session.commit()



def undo_posts():
    db.session.execute("DELETE FROM posts")
    db.session.commit()
