from app.models import db, Post

def seed_posts():
    post_1 = Post(
        title="This is my first post!",
        content="Hey everyone! I made an account today and this is my very first post. Just wanted to introduce myself and say hello!",
        user_id=1,
        community_id=3
    )
    post_2 = Post(
        title="Has anyone seen the movie M3GAN?",
        content="It didn't look amazing in trailers, and seems more for Gen Z folks, but I've been hearing from a lot of peers that it was actually a decent movie. What gives?",
        user_id=2,
        community_id=2
    )
    post_3 = Post(
        title="Anyone want a tiger?",
        content="I'm selling my tiger for 50 gold. Reminder that you must be level 30 or higher to be able to buy it. Message me if interested.",
        user_id=3,
        community_id=1
    )
    post_4 = Post(
        title="This flawless yellow onion",
        img_url="https://i.redd.it/bpq28osspxda1.jpg",
        user_id=4,
        community_id=4
    )
    post_5 = Post(
        title="Any idea what kind of cat I just adopted? [oc]",
        img_url = "https://i.redd.it/7giweloj1uda1.jpg",
        user_id = 5,
        community_id = 5
    )
    post_6 = Post(
        title="Of the 69 things they tested me for, I'm allergic to 60 of them.",
        img_url = "https://i.redd.it/a3wj960mpwda1.jpg",
        user_id = 6,
        community_id = 6
    )
    post_7 = Post(
        title="Accomplishments",
        img_url = "https://i.redd.it/50fhg3lhmzda1.jpg",
        user_id = 7,
        community_id = 7
    )
    post_8 = Post(
        title="YSK Overdosing on Tylenol (Acetaminophen/Paracetamol/Panadol) is a slow, painful way to die",
        content='''Why YSK: Due to being cheap, readily available, and easily accessible, Tylenol overdose has become one of the most common suicide methods. However, people don’t realize how truly awful a Tylenol overdose really is.

        The first 0-24 hours you may feel nothing, or mild symptoms. After that, the torture begins. You will suffer profuse vomiting, edema (your body swells up), a crushing headache, turn yellow, and feel like your liver and kidneys are being stabbed nonstop, what people often describe as the worst pain they’ve ever experienced, and bleeding. This goes on for days or even weeks. Meanwhile, if you reach the final stage, you are suffering as you wait for a liver transplant or death (when your organs shut down).

        Most people survive Tylenol overdoses; however, they are often left with permanent liver/kidney damage, which can require things such as dialysis for multiple hours several times per week, medication, and lifestyle changes.

        What can be done? 3 things:

        Educate people on the reality of an OD.

        Mandate that Tylenol be sold in blister-pack form. When the UK implemented this, intentional overdoses declined by 43 percent!

        Treat the underlying problem. We have a mental health crisis, and it’s not going to go away on its own. Developed countries especially need to work on providing resources to people with mental health conditions, before it escalates to suicide.

        Source: https://www.merckmanuals.com/home/injuries-and-poisoning/poisoning/acetaminophen-poisoning
        ''',
        user_id = 8,
        community_id = 8
    )
    post_9 = Post(
        title="Fellas what are some subtle signs a women is “toxic”?",
        content="",
        user_id = 9,
        community_id = 9
    )
    post_10 = Post(
        title="Any idea what kind of cat I just adopted? [OC]",
        img_url = "https://i.redd.it/26r2fc2miyda1.jpg",
        user_id = 10,
        community_id = 5
    )
    post_11 = Post(
        title="These rice fields shaped like spiderwebs at Indonesia",
        img_url = "https://i.redd.it/ipedxxzg4tda1.jpg",
        user_id = 11,
        community_id = 4
    )

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(post_5)
    db.session.add(post_6)
    db.session.add(post_7)
    db.session.add(post_8)
    db.session.add(post_9)
    db.session.add(post_10)
    db.session.add(post_11)
    db.session.commit()

def undo_posts():
    db.session.execute("DELETE FROM posts")
    db.session.commit()
