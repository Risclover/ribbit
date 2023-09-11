from app.models import db, Community


def seed_communities():
    community_1 = Community(
        name="cats",
        description="Pictures, videos, questions, and articles featuring/about cats.",
        display_name="Cats",
        community_img="https://styles.redditmedia.com/t5_2qhta/styles/communityIcon_2fsd7ji8awg91.png",
        user_id=3
    )
    community_2 = Community(
        name="oddlyspecific",
        description="For things that are way too specific.",
        display_name="For things that are way too specific.",
        community_img="https://styles.redditmedia.com/t5_2wjlc/styles/communityIcon_oyjnznh9lcq41.png",
        user_id=3
    )
    community_3 = Community(
        name="javascript",
        description="All about the 𝚓𝚊𝚟𝚊𝚜𝚌𝚛𝚒𝚙𝚝 programming language!",
        display_name="javascript",
        community_img="https://a.thumbs.redditmedia.com/zDOFJTXd6fmlD58VDGypiV94Leflz11woxmgbGY6p_4.png",
        user_id=3
    )
    community_4 = Community(
        name="oddlysatisfying",
        description="For those little things that are inexplicably satisfying.",
        display_name="Oddly Satisfying",
        community_img="https://styles.redditmedia.com/t5_2x93b/styles/communityIcon_eefpey65pli21.png",
        user_id=3
    )
    community_5 = Community(
        name="aww",
        description="Things that make you go AWW! Like puppies, bunnies, babies, and so on... A place for really cute pictures and videos!",
        display_name="A subreddit for cute and cuddly pictures",
        community_img="https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_p20mxkvgsafb1.jpg",
        user_id=3
    )
    community_6 = Community(
        name="mildlyinteresting",
        description="Aww, cripes. I didn't know I'd have to write a description. How many words is that so far, like a hundred? Soooo, yeah. Mildly interesting stuff. Stuff that interests you. Mildly. It's in the name, ffs.",
        display_name="For photos that are, you know, mildly interesting",
        community_img="https://b.thumbs.redditmedia.com/lTgz7Yx_6n8VZemjf54viYVZgFhW2GlB6dlpj1ZwKbo.png",
        user_id=3
    )
    community_7 = Community(
        name="ProgrammerHumor",
        description="For anything funny related to programming and software development.",
        display_name="memesAndJokesAboutEverythingProgrammingAndCS",
        community_img="https://styles.redditmedia.com/t5_2tex6/styles/communityIcon_70ds7qqgfr8b1.png",
        user_id=3
    )
    community_8 = Community(
        name="YouShouldKnow",
        description="Welcome to YouShouldKnow",
        display_name="You Should Know",
        community_img="https://a.thumbs.redditmedia.com/7uVDMO7_sDgkyDpvDmAT5D777ZOWAeU82PIG-L4kHL8.png",
        user_id=3
    )
    community_9 = Community(
        name="AskMen",
        description="We don’t read the rules, but we’ll post anyway",
        display_name="AskMen",
        community_img="https://styles.redditmedia.com/t5_2s30g/styles/communityIcon_wpxjh8fuvcw51.png",
        user_id=3
    )
    community_10 = Community(
        name="funny",
        description="Ribbit's largest humour depository",
        display_name="funny",
        community_img="https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png",
        user_id=2
    )
    community_11 = Community(
        name="webdev",
        description="A community dedicated to all things web development: both front-end and back-end.",
        display_name="webdev: ribbit for web developers",
        community_img="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg",
        user_id=2
    )
    community_12 = Community(
        name="interestingasfuck",
        description="For anything truly interesting as fuck",
        display_name="Interesting As Fuck",
        community_img="https://styles.redditmedia.com/t5_2qhsa/styles/communityIcon_zp89zqe7cdlb1.png",
        user_id=2
    )
    community_13 = Community(
        name="todayilearned",
        description="You learn something new every day; what did you learn today? Submit interesting and specific facts about something that you just found out here.",
        display_name="Today I Learned (TIL)",
        community_img="https://b.thumbs.redditmedia.com/B7IpR8P1mEsQIjdizK5x79s5aGfJUtKk3u2ksGZ9n2Q.png",
        user_id=2
    )
    community_14 = Community(
        name="OldSchoolCool",
        description="/c/OldSchoolCool **History's cool kids, looking fantastic!** A pictorial and video celebration of history's coolest kids, everything from beatniks to bikers, mods to rude boys, hippies to ravers. And everything in between. If you've found a photo, or a photo essay, of people from the past looking fantastic, here's the place to share it.",
        display_name="OldSchoolCool: History's cool kids, looking fantastic",
        community_img="https://styles.redditmedia.com/t5_2tycb/styles/communityIcon_uadq4hbj2k451.png",
        user_id=2
    )
    community_15 = Community(
        name="mildlyinfuriating",
        description="jukmifgguggh fbrltbruh",
        display_name="jukmifgguggh",
        community_img="https://styles.redditmedia.com/t5_2ubgg/styles/communityIcon_lkxajjefezh51.png",
        user_id=2
    )
    community_16 = Community(
        name="reactjs",
        description="A community for learning and developing web applications using React by Facebook.",
        display_name="/c/ReactJS - The Front Page of React",
        community_img="https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png",
        user_id=2
    )
    community_17 = Community(
        name="flask",
        description="Flask is a Python micro-framework for web development. Flask is easy to get started with and a great way to build websites and web applications.",
        display_name="Flask",
        community_img="https://styles.redditmedia.com/t5_2s1s3/styles/communityIcon_o4vkby94vkz41.png",
        user_id=2
    )
    community_18 = Community(
        name="Python",
        description="The official Python community for Reddit! Stay up to date with the latest news, packages, and meta information relating to the Python programming language. If you have something to teach others post here. If you have questions or are a newbie use c/learnpython",
        display_name="Python",
        community_img="https://styles.redditmedia.com/t5_2qh0y/styles/communityIcon_h9cdwd9m75a51.png",
        user_id=2
    )
    community_19 = Community(
        name="learnpython",
        description="Subreddit for posting questions and asking for general advice about your python code.",
        display_name="Python Education",
        community_img="https://styles.redditmedia.com/t5_2r8ot/styles/communityIcon_jwr5s7l5ici61.png",
        user_id=2
    )
    community_20 = Community(
        name="facepalm",
        description="/c/facepalm - please sir can I have some more?",
        display_name="now double verified",
        community_img="https://styles.redditmedia.com/t5_2r5rp/styles/communityIcon_2c4ms7mggreb1.png",
        user_id=2
    )
    community_21 = Community(
        name="learnjavascript",
        description="This subreddit is for anyone who wants to learn JavaScript or help others do so. Questions and posts about frontend development in general are welcome, as are all posts pertaining to JavaScript on the backend.",
        display_name="Learn Javascript",
        community_img="https://styles.redditmedia.com/t5_2tugi/styles/communityIcon_7yzrvmem0wi31.png",
        user_id=3
    )
    community_22 = Community(
        name="CasualConversation",
        description="The friendlier part of Reddit. Have a fun conversation about anything that is on your mind. Ask a question or start a conversation about (almost) anything you desire. Maybe you'll make some friends in the process.",
        display_name="The friendlier part of Reddit.",
        community_img="https://styles.redditmedia.com/t5_323oy/styles/communityIcon_wqodb68q5gca1.jpg",
        user_id=4
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
    db.session.add(community_10)
    db.session.add(community_11)
    db.session.add(community_12)
    db.session.add(community_13)
    db.session.add(community_14)
    db.session.add(community_15)
    db.session.add(community_16)
    db.session.add(community_17)
    db.session.add(community_18)
    db.session.add(community_19)
    db.session.add(community_20)
    db.session.add(community_21)
    db.session.add(community_22)

    db.session.commit()

def undo_communities():
    db.session.execute("DELETE FROM subscriptions")
    db.session.execute("DELETE FROM communities")
    db.session.commit()
