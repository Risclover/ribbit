import random
from app.models import db, Post
from datetime import datetime, timedelta

def generate_relative_timestamp(max_days_ago=7):
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

        ),
        Post(
            title="Stepan is 16 today",
            img_url="https://i.redd.it/yzzg66wv3c1e1.jpeg",
            user_id=3,
            community_id=1,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="Overthinking",
            img_url="https://i.redd.it/t0mns9uri34e1.jpeg",
            user_id=4,
            community_id=1,
            created_at=generate_relative_timestamp(),
            ),

        # ----------------------- COMMUNITY: 'ODDLYSPECIFIC' -----------------------#
        Post(
            title="Thanks mom",
            img_url="https://i.redd.it/fhuxh5fgbg1e1.png",
            user_id=5,
            community_id=2,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="Poor grandpa.",
            img_url="https://i.redd.it/ehgxtptqa21e1.png",
            user_id=6,
            community_id=2,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="Wonder where it was hidden",
            img_url="https://i.redd.it/nxlgv116gx1e1.png",
            user_id=7,
            community_id=2,
            created_at=generate_relative_timestamp(),
            ),

        # ----------------------- COMMUNITY: 'JAVASCRIPT' -----------------------#
        Post(
            title="Deno is filing a USPTO petition to cancel Oracle's JavaScript trademark",
            link_url="https://bsky.app/profile/tinyclouds.org/post/3lbj4due43c2v",
            user_id=8,
            community_id=3,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="[AskJS] Beginners: What do you struggle with when learning JavaScript?",
            content="""I'm thinking of writing an eBook on JavaScript aimed at mitigating common JavaScript pain points for beginners and demystifying what's actually simple.

Newbies: <strong>what are you struggling to learn at the moment?</strong>""",
            user_id=9,
            community_id=3,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="Vite 6.0 is out!",
            link_url="https://vite.dev/blog/announcing-vite6",
            user_id=10,
            community_id=3,
            created_at=generate_relative_timestamp(),
            ),

        # ----------------------- COMMUNITY: 'ODDLYSATISFYING' -----------------------#
        Post(
            title="Fluffy round paws",
            img_url="https://i.redd.it/0zb51v7phxzd1.png",
            user_id=11,
            community_id=4,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="The way this cat blends in.",
            img_url="https://i.redd.it/s1f7z7n60g3e1.jpeg",
            user_id=10,
            community_id=4,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="This surfing themed stop motion",
            link_url="https://imgur.com/this-surfing-themed-stop-motion-gsGlhW9",
            user_id=11,
            community_id=4,
            created_at=generate_relative_timestamp(),
            ),

        # ----------------------- COMMUNITY: 'AWW' -----------------------#
        Post(
            title="Can you spot the shy sister? Guaranteed \"aww\" when you see her!",
            img_url="https://i.redd.it/f0ghsujc8v3e1.jpeg",
            user_id=12,
            community_id=5,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="I was chosen by a kitten in a park",
            img_url="https://i.redd.it/zloc3u9r4f4e1.jpeg",
            user_id=13,
            community_id=5,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="My 16 year old cat Whiskey",
            img_url="https://i.redd.it/yzokpq9ekj4e1.jpeg",
            user_id=14,
            community_id=5,
            created_at=generate_relative_timestamp(),
            ),

        # ----------------------- COMMUNITY: 'MILDLYINTERESTING' -----------------------#
        Post(
            title="This blue stop sign I randomly encountered today.",
            img_url="https://i.redd.it/n8lsnvs90t0e1.jpeg",
            user_id=15,
            community_id=6,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="Local Thai place closed on Tuesday due to reasons.",
            img_url="https://i.redd.it/yd46bq9phq2e1.jpeg",
            user_id=16,
            community_id=6,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="This pizzeria sign is an actual pizza encased in acrylic.",
            img_url="https://i.redd.it/89qjzrlmma1e1.jpeg",
            user_id=17,
            community_id=6,
            created_at=generate_relative_timestamp(),
            ),

        # ----------------------- COMMUNITY: 'PROGRAMMERHUMOR' -----------------------#
        Post(
            title="unionMakesUsStrong",
            img_url="https://i.redd.it/fkidjl4zpo0e1.jpeg",
            user_id=2,
            community_id=7,
            created_at=generate_relative_timestamp(),
            ),
        Post(
            title="interviewVsActualJob",
            img_url="https://i.redd.it/3x6m6vs0e60e1.jpeg",
            user_id=3,
            community_id=7,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="progress",
            img_url="https://i.redd.it/a6dpvmtdwu7e1.jpeg",
            user_id=4,
            community_id=7,
            created_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'YOUSHOULDKNOW' ----------------------- #
        Post(
            title="YSK there is a website which lets you watch thousands of public domain movies and cartoons for free",
            content="Why YSK: https://www.retroflix.org/ is a website archiving thousands of public domain films and cartoons. You can browse their directory for free without ads or an account, as the videos are hosted on The Internet Archive. It's a great resource to just kill some time, or rediscover films from your childhood!",
            user_id=5,
            community_id=8,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="YSK: Active Service Military Members are generally not paid in a government shutdown, despite continuing to report for duty.",
            content="Why YSK: If you are an active duty member in the military, it would be really really good time to save some emergency money just in case the government shuts down if it happens. You will be paid back in full when it reopens but good to be safe than sorry.",
            user_id=6,
            community_id=8,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="YSK: Librarians aren't just random people that roam around libraries. They are actually well-trained professionals that helps you find books to research on any topic.",
            content="Why YSK: Next time, when you are looking for books in a library for research, utilize the expertise of librarians. They can really help a lot in finding what you want, and ultimately increasing productivity.",
            user_id=7,
            community_id=8,
            created_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'ASKMEN' ----------------------- #
        Post(
            title="Men who make 85k to 100k a year what do you do and how did you get there",
            content="I work in apartment maintenance and I am 32 years old with full custody of my daughter. I make about 53k a year. I want to move on from this industry and use my leadership, management and possibly tech skills someplace else and make more to better provide for my daughter. What have yall done?",
            user_id=8,
            community_id=9,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="How do I tell my long term gf she is letting herself go?",
            content="""Weight and health have always been sensitive topics in my girlfriend’s family, and she’s made it clear that she hates when people comment on her eating habits or suggest exercise. I’ve always respected her wishes, never brought it up, and made sure she knows I find her beautiful.

That said, over the years, her health and weight has visibly started to suffer. She gets tired easily, struggles with activities she used to enjoy, like basketball, and doesn’t exercise anymore, saying it’s due to work. I’m genuinely worried about her well-being—physically, mentally, and even sexually. I don’t need her to look a certain way, and I don’t have a six-pack myself, but I do try to stay active because I value a healthy lifestyle.

She’s the person I picture having kids with one day, and I dream of a future where we’re both fit, healthy, and able to be active parents who can run around with our children. I hate feeling like I’m criticizing her, and I’ve struggled with even writing this because I love her deeply. But I want to find a way to talk about it that shows I care about her health and our future without hurting her or making her feel judged. She does need to eat healthier and go excersise.""",
            user_id=9,
            community_id=9,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="Women get bigger boobs and ass when they gain weight. What silver lining do heavier men have?",
            content="",
            user_id=10,
            community_id=9,
            created_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'FUNNY' ----------------------- #
        Post(
            title="Congrats Nick",
            img_url="https://i.redd.it/g8lnkc98vm9e1.jpeg",
            user_id=11,
            community_id=10,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="haha that’s the actual size",
            img_url="https://i.redd.it/pqhynnmsuwae1.jpeg",
            user_id=12,
            community_id=10,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="My son tried to unlock an old iPhone. I guess we’ll try again in 2039!",
            img_url="https://i.redd.it/a3aivc1v00be1.jpeg",
            user_id=13,
            community_id=10,
            created_at=generate_relative_timestamp()
        ),


        # ----------------------- COMMUNITY: 'WEBDEV' ----------------------- #
        Post(
            title="Merry Christmas! Don't forget to pay your devs! lol",
            img_url="https://i.redd.it/4tqc1tbxhs8e1.jpeg",
            user_id=14,
            community_id=11,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="My boss told me developers “don’t get paid as much these days” when I asked for a raise",
            content="""Context - I’m a self taught web developer with a year and a half at a nonprofit organization. I started as a frontend dev and have since expanded my role to full stack.

We’re a small team of 5 technical people and I’ve been at 60k CAD salary since I started. I figured it was time to ask for a bump considering the value I’ve added (I have implemented cost-saving solutions on my own initiative and am often praised for my work & efficiency).

I’d have no issue if funds were tight, being it’s a nonprofit and I generally enjoy the work & team. But nothing I’ve found online points to dev salaries decreasing. Is this true?

Also, my boss is my uncle.""",
            user_id=15,
            community_id=11,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="I was told I don't sound professional enough at work so I made this",
            img_url="https://i.redd.it/91rka6pw1m8e1.png",
            user_id=16,
            community_id=11,
            created_at=generate_relative_timestamp()
        ),

        # ----------------------- COMMUNITY: 'INTERESTINGASFUCK' ----------------------- #
        Post(
            title="A doctor’s letter to UnitedHeathcare for denying nausea medication to a child on chemotherapy",
            img_url="https://i.redd.it/om5ar9kve35e1.jpeg",
            user_id=17,
            community_id=12,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="Iranian women standing in front of a hijab poster",
            img_url="https://i.redd.it/k2yd23cz709e1.png",
            user_id=18,
            community_id=12,
            created_at=generate_relative_timestamp()
        ),
        Post(
            title="There’s cities, there’s metropolises, and then there’s Tokyo.",
            img_url="https://i.redd.it/918dc69wt79e1.jpeg",
            user_id=19,
            community_id=12,
            created_at=generate_relative_timestamp()
        )
    ])
    db.session.commit()



def undo_posts():
    db.session.execute("DELETE FROM posts")
    db.session.commit()
