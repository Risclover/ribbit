from app.models import db, Post

def seed_posts():
    post_1=Post(
        title="Pancake found a leaf and she's been sleeping with it for three days.",
        img_url="https://i.redd.it/up65rjnrm61e1.jpeg"
        user_id=13,
        community_id=5
    )
    post_2=Post(
        title="Mostly adequate guide to functional programming (in JavaScript)",
        link_url="https://mostly-adequate.gitbook.io/mostly-adequate-guide/",
        user_id=14,
        community_id=3
    )
    post_3=Post(
        title="Anyone want a tiger?",
        content="I'm selling my tiger for 50 gold. Reminder that you must be level 30 or higher to be able to buy it. Message me if interested.",
        user_id=3,
        community_id=1,
    )
    post_4=Post(
        title="This flawless yellow onion",
        img_url="https://i.redd.it/bpq28osspxda1.jpg",
        user_id=4,
        community_id=4
    )
