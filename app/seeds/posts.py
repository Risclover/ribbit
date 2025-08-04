import random
from datetime import datetime, timedelta
from app.models import Post, User, Community
from app.extensions import db


def generate_relative_timestamp(author_timestamp, community_timestamp, max_days_ago=7):
    """
    Generate a random datetime within the past `max_days_ago` days,
    ensuring it is never before the author's creation date or the
    community's creation date.
    """
    now = datetime.now()

    # Earliest must be the latest of:
    #   - the author's creation time
    #   - the community's creation time
    #   - (now - max_days_ago)
    earliest_date = max(
        author_timestamp,
        community_timestamp,
        now - timedelta(days=max_days_ago)
    )

    delta_seconds = int((now - earliest_date).total_seconds())
    if delta_seconds < 0:
        # If earliest_date is in the future (or no valid range), default to now
        return now

    # Choose a random offset between 0 and delta_seconds
    random_offset = random.randint(0, delta_seconds)
    return now - timedelta(seconds=random_offset)


def seed_posts():
    """
    Refactored post seeding:
      - Bulk load of users (IDs 2..50) and communities (IDs 1..22)
      - A big list of post data
      - Single loop to build Post objects
      - One commit at the end
    """

    # 1) BULK LOAD USERS & COMMUNITIES
    users = User.query.filter(User.id.in_(range(2, 51))).all()
    user_map = {u.id: u for u in users}

    communities = Community.query.filter(Community.id.in_(range(1, 23))).all()
    community_map = {c.id: c for c in communities}

    # 2) DEFINE ALL POST DATA IN A LIST OF DICTS
    #    Each dict includes: title, content, img_url, link_url, etc.
    #    The 'created_at' is generated automatically below.
    post_data = [
        # ----------------------- COMMUNITY: 'CATS' (ID=1) -----------------------#
        {
            "title": (
                "I'm really stupid. I kissed my cat with lipstick on. I washed her with cat "
                "shampoo but it didn't work. Any other solution? Should I try coconut oil?"
            ),
            "img_url": "https://i.redd.it/ucfbefj6o03e1.jpeg",
            "user_id": 2,
            "community_id": 1,
        },
        {
            "title": "Stepan is 16 today",
            "img_url": "https://i.redd.it/yzzg66wv3c1e1.jpeg",
            "user_id": 3,
            "community_id": 1,
        },
        {
            "title": "Overthinking",
            "img_url": "https://i.redd.it/t0mns9uri34e1.jpeg",
            "user_id": 4,
            "community_id": 1,
        },

        # ----------------------- COMMUNITY: 'ODDLYSPECIFIC' (ID=2) -----------------------#
        {
            "title": "Thanks mom",
            "img_url": "https://i.redd.it/fhuxh5fgbg1e1.png",
            "user_id": 5,
            "community_id": 2,
        },
        {
            "title": "Poor grandpa.",
            "img_url": "https://i.redd.it/ehgxtptqa21e1.png",
            "user_id": 6,
            "community_id": 2,
        },
        {
            "title": "Wonder where it was hidden",
            "img_url": "https://i.redd.it/nxlgv116gx1e1.png",
            "user_id": 7,
            "community_id": 2,
        },

        # ----------------------- COMMUNITY: 'JAVASCRIPT' (ID=3) -----------------------#
        {
            "title": "Deno is filing a USPTO petition to cancel Oracle's JavaScript trademark",
            "link_url": "https://bsky.app/profile/tinyclouds.org/post/3lbj4due43c2v",
            "user_id": 8,
            "community_id": 3,
        },
        {
            "title": "[AskJS] Beginners: What do you struggle with when learning JavaScript?",
            "content": (
                "I'm thinking of writing an eBook on JavaScript aimed at mitigating "
                "common JavaScript pain points for beginners and demystifying what's actually simple.\n\n"
                "Newbies: <strong>what are you struggling to learn at the moment?</strong>"
            ),
            "user_id": 9,
            "community_id": 3,
        },
        {
            "title": "Vite 6.0 is out!",
            "link_url": "https://vite.dev/blog/announcing-vite6",
            "user_id": 10,
            "community_id": 3,
        },

        # ----------------------- COMMUNITY: 'ODDLYSATISFYING' (ID=4) -----------------------#
        {
            "title": "Fluffy round paws",
            "img_url": "https://i.redd.it/0zb51v7phxzd1.png",
            "user_id": 11,
            "community_id": 4,
        },
        {
            "title": "The way this cat blends in.",
            "img_url": "https://i.redd.it/s1f7z7n60g3e1.jpeg",
            "user_id": 10,
            "community_id": 4,
        },
        {
            "title": "This surfing themed stop motion",
            "link_url": "https://imgur.com/this-surfing-themed-stop-motion-gsGlhW9",
            "user_id": 11,
            "community_id": 4,
        },

        # ----------------------- COMMUNITY: 'AWW' (ID=5) -----------------------#
        {
            "title": "Can you spot the shy sister? Guaranteed \"aww\" when you see her!",
            "img_url": "https://i.redd.it/f0ghsujc8v3e1.jpeg",
            "user_id": 12,
            "community_id": 5,
        },
        {
            "title": "I was chosen by a kitten in a park",
            "img_url": "https://i.redd.it/zloc3u9r4f4e1.jpeg",
            "user_id": 13,
            "community_id": 5,
        },
        {
            "title": "My 16 year old cat Whiskey",
            "img_url": "https://i.redd.it/yzokpq9ekj4e1.jpeg",
            "user_id": 14,
            "community_id": 5,
        },

        # ----------------------- COMMUNITY: 'MILDLYINTERESTING' (ID=6) -----------------------#
        {
            "title": "This blue stop sign I randomly encountered today.",
            "img_url": "https://i.redd.it/n8lsnvs90t0e1.jpeg",
            "user_id": 15,
            "community_id": 6,
        },
        {
            "title": "Local Thai place closed on Tuesday due to reasons.",
            "img_url": "https://i.redd.it/yd46bq9phq2e1.jpeg",
            "user_id": 16,
            "community_id": 6,
        },
        {
            "title": "This pizzeria sign is an actual pizza encased in acrylic.",
            "img_url": "https://i.redd.it/89qjzrlmma1e1.jpeg",
            "user_id": 17,
            "community_id": 6,
        },

        # ----------------------- COMMUNITY: 'PROGRAMMERHUMOR' (ID=7) -----------------------#
        {
            "title": "unionMakesUsStrong",
            "img_url": "https://i.redd.it/fkidjl4zpo0e1.jpeg",
            "user_id": 2,
            "community_id": 7,
        },
        {
            "title": "interviewVsActualJob",
            "img_url": "https://i.redd.it/3x6m6vs0e60e1.jpeg",
            "user_id": 3,
            "community_id": 7,
        },
        {
            "title": "progress",
            "img_url": "https://i.redd.it/a6dpvmtdwu7e1.jpeg",
            "user_id": 4,
            "community_id": 7,
        },

        # ----------------------- COMMUNITY: 'YOUSHOULDKNOW' (ID=8) ----------------------- #
        {
            "title": "YSK there is a website which lets you watch thousands of public domain movies and cartoons for free",
            "content": (
                "Why YSK: https://www.retroflix.org/ is a website archiving thousands of public "
                "domain films and cartoons. You can browse their directory for free without ads "
                "or an account, as the videos are hosted on The Internet Archive. It's a great "
                "resource to just kill some time, or rediscover films from your childhood!"
            ),
            "user_id": 5,
            "community_id": 8,
        },
        {
            "title": "YSK: Active Service Military Members are generally not paid in a government shutdown, despite continuing to report for duty.",
            "content": (
                "Why YSK: If you are an active duty member in the military, it would be really "
                "really good time to save some emergency money just in case the government shuts "
                "down if it happens. You will be paid back in full when it reopens but good to be "
                "safe than sorry."
            ),
            "user_id": 6,
            "community_id": 8,
        },
        {
            "title": "YSK: Librarians aren't just random people that roam around libraries. They are actually well-trained professionals that helps you find books to research on any topic.",
            "content": (
                "Why YSK: Next time, when you are looking for books in a library for research, "
                "utilize the expertise of librarians. They can really help a lot in finding what "
                "you want, and ultimately increasing productivity."
            ),
            "user_id": 7,
            "community_id": 8,
        },

        # ----------------------- COMMUNITY: 'ASKMEN' (ID=9) ----------------------- #
        {
            "title": "Men who make 85k to 100k a year what do you do and how did you get there",
            "content": (
                "I work in apartment maintenance and I am 32 years old with full custody of my "
                "daughter. I make about 53k a year. I want to move on from this industry and use my "
                "leadership, management and possibly tech skills someplace else and make more to "
                "better provide for my daughter. What have yall done?"
            ),
            "user_id": 8,
            "community_id": 9,
        },
        {
            "title": "How do I tell my long term gf she is letting herself go?",
            "content": (
                "Weight and health have always been sensitive topics in my girlfriend’s family, "
                "and she’s made it clear that she hates when people comment on her eating habits "
                "or suggest exercise. I’ve always respected her wishes...\n\nShe’s the person I "
                "picture having kids with one day... I want to find a way to talk about it that "
                "shows I care about her health and our future without hurting her or making her "
                "feel judged. She does need to eat healthier and go excersise."
            ),
            "user_id": 9,
            "community_id": 9,
        },
        {
            "title": "Women get bigger boobs and ass when they gain weight. What silver lining do heavier men have?",
            "content": "",
            "user_id": 10,
            "community_id": 9,
        },

        # ----------------------- COMMUNITY: 'FUNNY' (ID=10) ----------------------- #
        {
            "title": "Congrats Nick",
            "img_url": "https://i.redd.it/g8lnkc98vm9e1.jpeg",
            "user_id": 11,
            "community_id": 10,
        },
        {
            "title": "haha that’s the actual size",
            "img_url": "https://i.redd.it/pqhynnmsuwae1.jpeg",
            "user_id": 12,
            "community_id": 10,
        },
        {
            "title": "My son tried to unlock an old iPhone. I guess we’ll try again in 2039!",
            "img_url": "https://i.redd.it/a3aivc1v00be1.jpeg",
            "user_id": 13,
            "community_id": 10,
        },

        # ----------------------- COMMUNITY: 'WEBDEV' (ID=11) ----------------------- #
        {
            "title": "Merry Christmas! Don't forget to pay your devs! lol",
            "img_url": "https://i.redd.it/4tqc1tbxhs8e1.jpeg",
            "user_id": 14,
            "community_id": 11,
        },
        {
            "title": (
                "My boss told me developers “don’t get paid as much these days” when I asked "
                "for a raise"
            ),
            "content": (
                "Context - I’m a self taught web developer with a year and a half at a nonprofit "
                "organization. I started as a frontend dev and have since expanded my role to full stack.\n\n"
                "We’re a small team of 5 technical people and I’ve been at 60k CAD salary since I started..."
            ),
            "user_id": 15,
            "community_id": 11,
        },
        {
            "title": "I was told I don't sound professional enough at work so I made this",
            "img_url": "https://i.redd.it/91rka6pw1m8e1.png",
            "user_id": 16,
            "community_id": 11,
        },

        # ----------------------- COMMUNITY: 'INTERESTINGASFUCK' (ID=12) ----------------------- #
        {
            "title": "A doctor’s letter to UnitedHeathcare for denying nausea medication to a child on chemotherapy",
            "img_url": "https://i.redd.it/om5ar9kve35e1.jpeg",
            "user_id": 17,
            "community_id": 12,
        },
        {
            "title": "Iranian women standing in front of a hijab poster",
            "img_url": "https://i.redd.it/k2yd23cz709e1.png",
            "user_id": 18,
            "community_id": 12,
        },
        {
            "title": "There’s cities, there’s metropolises, and then there’s Tokyo.",
            "img_url": "https://i.redd.it/918dc69wt79e1.jpeg",
            "user_id": 19,
            "community_id": 12,
        },

        # ----------------------- COMMUNITY: 'TODAYILEARNED' (ID=13) ----------------------- #
        {
            "title": "TIL Danny Trejo has a clause in his movie contracts that requires his villainous characters to die by the end of the film. He wants children to learn that crime doesn't pay.",
            "link_url": "https://toofab.com/2023/05/26/unexpected-clauses-that-ended-up-in-actors-contracts/",
            "user_id": 20,
            "community_id": 13,
        },
        {
            "title": "TIL about Andrew Carnegie, the original billionaire who gave spent 90% of his fortune creating over 3000 libraries worldwide because a free library was how he gained the eduction to become wealthy.",
            "link_url": "https://en.wikipedia.org/wiki/Andrew_Carnegie",
            "user_id": 21,
            "community_id": 13
        },
        {
            "title": "TIL After Joan of Arc was executed on charges of heresy, her mother spent 25 years clearing her name. She convinced the pope to reopen Joan's case and attended the retrial despite being in her 70s and in poor health. The retrial ended with Joan's complete acquittal.",
            "link_url": "https://en.wikipedia.org/wiki/Isabelle_Rom%C3%A9e",
            "user_id": 22,
            "community_id": 13
        },

        # ----------------------- COMMUNITY: 'OLDSCHOOLCOOL' (ID=14) ----------------------- #
        {
            "title": "Posing for my boyfriend after our high school dance, 1970",
            "img_url": "https://i.redd.it/72ma8lf0mbhe1.jpeg",
            "user_id": 23,
            "community_id": 14
        },
        {
            "title": "My dad with the same bag he had when travelling india back in 1982",
            "img_url": "https://i.redd.it/u5x06vrmlmde1.jpeg",
            "user_id": 24,
            "community_id": 14
        },
        {
            "title": "My grandfather in Paris after winning the war to stomp down Nazis. (1944)",
            "img_url": "https://i.redd.it/pmqyejjaldee1.jpeg",
            "user_id": 25,
            "community_id": 14
        },

        # ----------------------- COMMUNITY: 'MILDLYINFURIATING' (ID=15) ----------------------- #
        {
            "title": "My printer printed a 2 foot by three foot black page of its own volition and then said it was out of black ink.",
            "img_url": "https://i.redd.it/vwvi8bakuzde1.jpeg",
            "user_id": 26,
            "community_id": 15
        },
        {
            "title": "Third party food delivery services are not a good idea",
            "img_url": "https://i.redd.it/d2doqpl11bhe1.jpeg",
            "user_id": 27,
            "community_id": 15
        },
        {
            "title": "I'm crying",
            "img_url": "https://i.redd.it/8gngqt2ypsee1.jpeg",
            "user_id": 28,
            "community_id": 15
        },

        # ----------------------- COMMUNITY: 'REACTJS' (ID=16) ----------------------- #
        {
            "title": "What does a frontend framework like React ACTUALLY do?",
            "content": """Coming from gamedev (C#), I have an idea for an small interactive website which doesn't (I think) need a backend.

I've made a few websites with wordpress in my life, so I'll just say I have 0 webdev experience.

I know I can do this with C# via asp.net core and blazor, but I couldn't hurt me to learn some js/ts.

So, I learn html, css and js. I can make a website with it fully. So what is the role of frameworks like React? What does it do to make things easier for me?

Is it just a library of useful functions? Like, otherwise I'd need to type out a bunch of html and redirect via javascript and with React I can call something like void doThatThing();

Thanks for clarifying.""",
            "user_id": 29,
            "community_id": 16
        },
        {
            "title": "I'm really enjoying React!",
            "content": """Hi! I'm a relatively new, self taught developer. I've been learning HTML/CSS and Javascript for the last year or so. Web dev is what I want to do, but vanilla HTML/CSS really made me want to never code again. I'm not sure if that is a common feeling but I just really didn't find it fun at all.

A couple weeks ago, I figured I knew enough to start learning React so I can make some personal projects for my portfolio. I feel new motivation to keep at it and learn as much as I can. Hopefully, I can get a job with it eventually!

I don't have developer friends and I just wanted to say something to someone about how much fun I'm having learning React! Thanks for reading. If you wanna be my developer friend, please dm me! (25m)""",
            "user_id": 30,
            "community_id": 16
        },
        {
            "title": "Accessibility essentials every React developer should know",
            "link_url": "https://martijnhols.nl/blog/accessibility-essentials-every-front-end-developer-should-know",
            "user_id": 31,
            "community_id": 16
        },

        # ----------------------- COMMUNITY: 'FLASK' (ID=17) ----------------------- #
        {
            "title": "Long time listener, first time caller",
            "content": """I have been using Django for the last few years and always wanted to check flask out.

2 days ago i started playing around with it.... I love it.

Compared to Django development has been so fast and way more flexible (which can be good and bad)

I have built a basic app with user auth and org level and test deployed using mongodb, gunicorn, docker on google cloud run all within a day basically

Great job devs 👍

Sorry for the useless post but thought id share my experience""",
            "user_id": 32,
            "community_id": 17
        },
        {
            "title": "I made this! Flask and Jinja templates, and MongoDB for the database.",
            "link_url": "https://www.spacetranslate.org/",
            "user_id": 33,
            "community_id": 17
        },
        {
            "title": "Need help hosting flask app",
            "content": """Hi,

I’m sure I’ll get hell for this as I often do, I’m an educator for a niche field and built a flask app with the help of ai, basically a flashcard tool to help me at my practice. App works great, no errors on the user side, now I want to host it so I can access it. Truth be told, I also want to share with others in my field.

I’m so frustrated with hosting, it’s true that ai led me down a road where I got lost, but it’s also true that I have a tool I couldn’t find anywhere else, a tool I’ve dreamed about since being in the field.

Any simple ways to get around this? Not opposed to fiverr, but I didn’t have great experience with them before. For the record I’ve tried PythonAnywhere, Heroku, and AWS and keep getting errors I cannot make sense of. I would LOVE to learn hosting so I could truly do it on my own, but tutorials go from “the back end talks to the front end” to “you need to configure the WSGI, route here route there” very quickly.""",
            "user_id": 34,
            "community_id": 17
        },

        # ----------------------- COMMUNITY: 'PYTHON' (ID=18) ----------------------- #
        {
            "title": "Why Rust has so much marketing power ?",
            "content": """Ruff, uv and Polars presents themselves as fast tools writter in Rust.

It seems to me that "written in Rust" is used as a marketing argument. It's supposed to mean, it's fast because it's written in Rust.

These tools could have been as fast if they were written in C. Rust merely allow the developpers to write programms faster than if they wrote it in C or is there something I don't get ?""",
            "user_id": 35,
            "community_id": 18

        },
        {
            "title": "Python users, how did you move on from basics to more complex coding?",
            "content": """I am currently in college studying A level Computer science. We are currently taught C#, however I am still more interested in Python coding.

Because they won't teach us Python anymore, I don't really have a reliable website to build on my coding skills. The problem I am having is that I can do all the 'basics' that they teach you to do, but I cannot find a way to take the next step into preparation for something more practical.

Has anyone got any youtuber recommendations or websites to use because I have been searching and cannot fit something that is matching with my current level as it is all either too easy or too complex.

(I would also like more experience in Python as I aspire to do technology related degrees in the future)

Thank you ! :)

Edit: Thank you everyone who has commented! I appreciate your help because now I can better my skills by a lot!!! Much appreciated""",
            "user_id": 36,
            "community_id": 18
        },
        {
            "title": "Must know Python libraries, new and old?",
            "content": """I have 4YOE as a Python backend dev and just noticed we are lagging behind at work. For example, I wrote a validation library at the start and we have been using it for this whole time, but recently I saw Pydantic and although mine has most of the functionality, Pydantic is much, much better overall. I feel like im stagnating and I need to catch up. We don't even use Dataclasses. I recently learned about Poetry which we also don't use. We use pandas, but now I see there is polars. Pls help.

Please share: TLDR - what are the most popular must know python libraries? Pydantic, poetry?""",
            "user_id": 37,
            "community_id": 18
        },

        # ----------------------- COMMUNITY: 'LEARNPYTHON' (ID=19) ----------------------- #
        {
            "title": "There are no shortcuts when learning Python",
            "content": """I see the same questions on here (totally fine by the way) and give the same answers.

I get it. A lot of you want to change careers because maybe you’re unhappy in your current job or maybe you’re excited to get your first job as a new graduate. Being an engineer is fun (most of the time). You get paid fairly well to solve problems and build things every day.

A few tips for the overeager

<strong>Using Copilot / ChatGPT early on to assist in your code writing is detrimental to your learning</strong>

Don’t get me wrong, it’s great for generating practice problems and asking it to explain concepts to you. I use Copilot as an engineer to autocomplete sometimes and verify. If you don’t have the knowledge to understand what it’s doing, you shouldn’t let it write code for you.

<strong>Stop rushing through your learning</strong>

You can’t brute force it. Our brains don’t have the neuroplasticity to retain hours of study lessons every day. It takes a lot of energy to form new neural connections. An hour a day is a doable amount without turning your life upside down, and consistency is shown to always win out in retention vs. cramming.

<strong>Reviewing is arguably more important than learning</strong>

You should be carving out time to review your previous learnings, preferably at the start of each one of your study sessions. You are much more likely to retain information after reviewing it multiple times. If you study an hour a day for example, try reviewing for at least 15 minutes of it at the start.

<strong>You don’t need to know everything about Python to be a successful engineer</strong>

If you slow down and spend a TON of time on the core concepts (variables, lists, dictionaries, functions, conditionals, loops, and OOP) and practice them extensively, you’re likely set for Python knowledge to get an interview as a junior engineer. You don’t need to know iterators, decorators, dunders, etc. day one. I rarely even use them at all.

Edit: Thanks for all of the love. I’ll add one bonus tip below since everyone is enjoying this post.

<strong>The correct resource to learn from is what works for you</strong>

I spent so many hours debating which course to take or which book to read. Because like everyone else, I wanted the ‘optimal’ way to learn and got decision paralysis. I’ve learned that what worked for others may not work for you, and that’s okay. Try out a few courses or books to see what best enables you to build the learning routine you want.""",
            "user_id": 38,
            "community_id": 19
        },
        {
            "title": "Is building a GUI always going to be THIS painful?",
            "content": """I have been programming in Python for about 2 years know, I've gotten pretty comfortable with the language and I almost always find it a joy to work with. EXCEPT when trying to make a GUI.

I've tried on several occasions now to develop a GUI using both tkinter and CustomTkinter. My experience has been pure pain. It has been super confusing and the docs will tell me one thing and then I'll try it exactly how they say and it doesn't work. I definitely am still in the learning process when it comes to developing a graphical interface, but my question is, does everyone else find building a GUI in python to be this painful? Are the other libraries out there any better or are there other tools that make GUI development easier? Because I am almost in disbelief at how unbelievably annoying and overwhelming it feels for me to try to implement a GUI that is anything beyond the simplest possible, to any program I write.""",
            "user_id": 39,
            "community_id": 19
        },
        {
            "title": "Something I just learned the hard way",
            "content": """Do NOT modify the list you are iterating through. Make a second list and apply changes to it instead. I spent 4 hours trying to understand why sometimes my code works and sometimes it doesn't. I felt equally stupid and smart when I finally got it. At least I doubt I'll quickly forget that lesson.""",
            "user_id": 40,
            "community_id": 19
        },

        # ----------------------- COMMUNITY: 'FACEPALM' (ID=20) ----------------------- #
        {
            "title": "Hypocrisy anyone?",
            "img_url": "https://i.redd.it/v9p4fol59dde1.jpeg",
            "user_id": 41,
            "community_id": 20
        },
        {
            "title": "Stop the testing!",
            "img_url": "https://i.redd.it/4p3p6qekeefe1.jpeg",
            "user_id": 42,
            "community_id": 20
        },
        {
            "title": "That escalated quickly",
            "img_url": "https://i.redd.it/h7a9ub7es3ge1.png",
            "user_id": 43,
            "community_id": 20
        },

        # ----------------------- COMMUNITY: 'LEARNJAVASCRIPT' (ID=21) ----------------------- #
        {
            "title": "To anyone learning JavaScript.",
            "content": """A few years ago, I remember doing JavaScript for the first time.

I followed a few courses on Udemy and leaned HTML and CSS. Then JS.

To me HTML and CSS related to each other and I jumped into JS thinking it would be similar, I thought there would be some similarities but NOPE.

It was hard at first and I thought about giving up so many times but I'm glad I didn't. Now I've built a life long career and it's just second nature. I'm so glad I didn't give up because it was honestly life-changing and a gateway into so many other programming languages.

At this point only 3 years later learning a new language or framework is just another day in the office and just second nature. Currently working full time, work from home and earning twice as much as I was working a blue collar job.

Current stack is react front end and .net backend, working on a couple of different projects. Mostly the same backend stack but Bau has me across vue, angular and react all at the same time. Pretty wild tbh but they are really old dog front ends with the react projects slowly taking over and replacing them all.

Anyway, what I'm trying to say is if your just jumping into JS, don't give it up. It can be life changing if you stick to it and don't take shortcuts ( ie: abusing ai )""",
            "user_id": 44,
            "community_id": 21
        },
        {
            "title": "There are people, among them Zuckerberg, saying that AI will replace the need for programmers, and there are people saying it won't and that it'll be a good tool in the programmer's kit. I don't know who to believe. I'm really anxious because of it. I just started to learn JavaScript.",
            "content": "",
            "user_id": 45,
            "community_id": 21
        },
        {
            "title": "I started to like JavaScript. Is it really used only in web dev?",
            "content": """I began to like JavaScript as a beginner and wonder if I can translate the knowledge of it to other languages. I have no prior experience in coding. I’m just learning and doing CS50 and the Odin project.""",
            "user_id": 46,
            "community_id": 21
        },

        # ----------------------- COMMUNITY: 'CASUALCONVERSATION' (ID=22) ----------------------- #
        {
            "title": "My son missed school today because he stuck a suction cup to his head",
            "content": """He's 16, so I let him stay home, rather than die of embarrassment. There is a perfectly round, pinkish-purple circle right in the middle of his forehead. He has agreed to cover it with makeup and go to school if it's still visible tomorrow. I asked him if he wanted to take a selfie to remember this experience, and he said no. I also asked if he had a comment to add to my story. He pointed to my winter gloves. They're propped up on a chair, drying, with the middle fingers extended.

Edit to add:

I tried telling him that there are dozens of people here saying they did something similar. He said, \"Yeah, but those are internet people.\"""",
            "user_id": 47,
            "community_id": 22
        },
        {
            "title": "Does anyone else’s family have 'home clothes,' or is it just us?",
            "content": """Are we the only weird family that does this, or is it a universal thing?

At home, we look... well, "homeless chic" is the vibe. We call it "home clothes." It’s basically my dad’s old shirts that are one step away from disintegrating—stained, torn, ridiculously oversized, but somehow the most comfortable things in existence.

Had a rough day? Get home, slap on some home clothes, and boom—instant therapy. BUT, when people come over or stay the night, we have to scramble to look like we’re not living in a sitcom about struggling artists. As soon as they leave? Right back into the post-apocalyptic wardrobe.

To be clear, they're clean (ish). The stains are from noble pursuits like painting, hair dyeing, or accidentally wielding spaghetti sauce like it’s a Jackson Pollock piece.

Anyone else have \"home clothes,\" or is my family just running a secret cult of comfort?""",
            "user_id": 48,
            "community_id": 22
        },
        {
            "title": "Anyone else not ever use TikTok whatsoever?",
            "content": """Not a moral judgement about those that did or anything, but I’ve never downloaded it, try to mute subreddits based on it, every bit of content I’ve seen from it was without my consent.

It’s hard to gauge the exact quality/experience from the outside, but I know it was a huge and popular app that millions of people enjoyed. Just wondering who else avoided it like a mind plague, and why if you feel like sharing.

Maybe I’m just too much of a grumpy millennial but I did not jive with 99% of the content, delivery method, pretty much anything about. Got shown a lot of videos and don’t remember any worth so much as a chuckle on the humor scale.""",
            "user_id": 49,
            "community_id": 22
        }
    ]

    # 3) BUILD POST OBJECTS IN ONE PASS
    post_objects = []
    for p in post_data:
        user = user_map.get(p["user_id"])
        community = community_map.get(p["community_id"])
        if not user or not community:
            # If something’s missing, skip or raise an exception
            continue

        # Generate 'created_at' respecting author & community creation times
        created_at = generate_relative_timestamp(
            user.created_at,
            community.created_at,
            max_days_ago=7
        )

        # Build the Post object
        post = Post(
            title=p["title"],
            user_id=p["user_id"],
            community_id=p["community_id"],
            created_at=created_at,
            img_url=p.get("img_url"),
            link_url=p.get("link_url"),
            content=p.get("content"),
        )
        post_objects.append(post)

    # 4) ADD ALL AT ONCE & COMMIT
    db.session.add_all(post_objects)
    db.session.commit()


def undo_posts():
    db.session.execute("DELETE FROM posts")
    db.session.commit()
