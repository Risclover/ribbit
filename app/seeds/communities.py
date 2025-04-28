import random
from datetime import datetime, timedelta
from app.models import Community, User
from app.extensions import db


def generate_community_timestamp(owner_timestamp, max_delay_hours=336):
    """
    Generate a random datetime after the owner's account creation (owner_timestamp),
    within max_delay_hours hours, but no later than 'now'.
    """
    now = datetime.now()

    earliest = owner_timestamp + timedelta(seconds=1)
    latest = min(owner_timestamp + timedelta(hours=max_delay_hours), now)

    if latest < earliest:
        return earliest

    delta = latest - earliest
    random_seconds = random.randint(0, int(delta.total_seconds()))

    return earliest + timedelta(seconds=random_seconds)

def seed_communities():
    """
    Bulk-seed all communities with random creation times that come
    after their owner's creation time, but no later than now (and within
    max_delay_hours).
    """

    # 1) Get the owners by username or ID
    marnie = User.query.filter_by(username='marnie').first()
    demo = User.query.filter_by(username='Demo').first()
    user4 = User.query.get(4)  # for community #22

    # We'll map user_id -> that user's created_at so we can generate random times
    owner_map = {
        marnie.id: marnie.created_at,
        demo.id: demo.created_at,
        user4.id: user4.created_at
    }

    # 2) Define all community data in a single structure
    community_data = [
        {
            "name": "cats",
            "description": "Pictures, videos, questions, and articles featuring/about cats.",
            "display_name": "Cats",
            "user_id": marnie.id
        },
        {
            "name": "oddlyspecific",
            "description": "For things that are way too specific.",
            "display_name": "For things that are way too specific.",
            "user_id": marnie.id
        },
        {
            "name": "javascript",
            "description": "All about the 𝚓𝚊𝚟𝚊𝚜𝚌𝚛𝚒𝚙𝚝 programming language!",
            "display_name": "javascript",
            "user_id": marnie.id
        },
        {
            "name": "oddlysatisfying",
            "description": "For those little things that are inexplicably satisfying.",
            "display_name": "Oddly Satisfying",
            "user_id": marnie.id
        },
        {
            "name": "aww",
            "description": (
                "Things that make you go AWW! Like puppies, bunnies, babies, and so on... "
                "A place for really cute pictures and videos!"
            ),
            "display_name": "A subreddit for cute and cuddly pictures",
            "user_id": marnie.id
        },
        {
            "name": "mildlyinteresting",
            "description": (
                "Aww, cripes. I didn't know I'd have to write a description. How many words is that so "
                "far, like a hundred? Soooo, yeah. Mildly interesting stuff. Stuff that interests you. "
                "Mildly. It's in the name, ffs."
            ),
            "display_name": "For photos that are, you know, mildly interesting",
            "user_id": marnie.id
        },
        {
            "name": "ProgrammerHumor",
            "description": "For anything funny related to programming and software development.",
            "display_name": "memesAndJokesAboutEverythingProgrammingAndCS",
            "user_id": marnie.id
        },
        {
            "name": "YouShouldKnow",
            "description": "Welcome to YouShouldKnow",
            "display_name": "You Should Know",
            "user_id": marnie.id
        },
        {
            "name": "AskMen",
            "description": "We don’t read the rules, but we’ll post anyway",
            "display_name": "AskMen",
            "user_id": marnie.id
        },
        {
            "name": "funny",
            "description": "Ribbit's largest humour depository",
            "display_name": "funny",
            "user_id": demo.id
        },
        {
            "name": "webdev",
            "description": (
                "A community dedicated to all things web development: both front-end and back-end."
            ),
            "display_name": "webdev: ribbit for web developers",
            "user_id": demo.id
        },
        {
            "name": "interestingasfuck",
            "description": "For anything truly interesting as fuck",
            "display_name": "Interesting As Fuck",
            "user_id": demo.id
        },
        {
            "name": "todayilearned",
            "description": (
                "You learn something new every day; what did you learn today? Submit interesting "
                "and specific facts about something that you just found out here."
            ),
            "display_name": "Today I Learned (TIL)",
            "user_id": demo.id
        },
        {
            "name": "OldSchoolCool",
            "description": (
                "/c/OldSchoolCool **History's cool kids, looking fantastic!** A pictorial and video "
                "celebration of history's coolest kids, everything from beatniks to bikers..."
            ),
            "display_name": "OldSchoolCool: History's cool kids, looking fantastic",
            "user_id": demo.id
        },
        {
            "name": "mildlyinfuriating",
            "description": "jukmifgguggh fbrltbruh",
            "display_name": "jukmifgguggh",
            "user_id": demo.id
        },
        {
            "name": "reactjs",
            "description": "A community for learning and developing web applications using React by Facebook.",
            "display_name": "/c/ReactJS - The Front Page of React",
            "user_id": demo.id
        },
        {
            "name": "flask",
            "description": (
                "Flask is a Python micro-framework for web development. Flask is easy to get started "
                "with and a great way to build websites and web applications."
            ),
            "display_name": "Flask",
            "user_id": demo.id
        },
        {
            "name": "Python",
            "description": (
                "The official Python community for Reddit! Stay up to date with the latest news, packages, "
                "and meta information relating to the Python programming language. If you have something "
                "to teach others post here. If you have questions or are a newbie use c/learnpython"
            ),
            "display_name": "Python",
            "user_id": demo.id
        },
        {
            "name": "learnpython",
            "description": (
                "Subreddit for posting questions and asking for general advice about your python code."
            ),
            "display_name": "Python Education",
            "user_id": demo.id
        },
        {
            "name": "facepalm",
            "description": "/c/facepalm - please sir can I have some more?",
            "display_name": "now double verified",
            "user_id": demo.id
        },
        {
            "name": "learnjavascript",
            "description": (
                "This subreddit is for anyone who wants to learn JavaScript or help others do so. "
                "Questions and posts about frontend development in general are welcome..."
            ),
            "display_name": "Learn Javascript",
            "user_id": marnie.id
        },
        {
            "name": "CasualConversation",
            "description": (
                "The friendlier part of Reddit. Have a fun conversation about anything that is on your mind. "
                "Ask a question or start a conversation about (almost) anything you desire..."
            ),
            "display_name": "The friendlier part of Reddit.",
            "user_id": user4.id
        }
    ]

    # 3) Build the Community objects in a loop
    communities = []
    for c in community_data:
        owner_created_at = owner_map[c["user_id"]]  # get the owner's creation time
        created_at = generate_community_timestamp(owner_created_at, max_delay_hours=336)

        new_community = Community(
            name=c["name"],
            description=c["description"],
            display_name=c["display_name"],
            user_id=c["user_id"],
            created_at=created_at
        )
        communities.append(new_community)

    # 4) Add and commit
    db.session.add_all(communities)
    db.session.commit()


def undo_communities():
    # Remove or truncate communities and any related subscriptions
    db.session.execute("DELETE FROM subscriptions")
    db.session.execute("DELETE FROM communities")
    db.session.commit()
