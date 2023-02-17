from app.models import db, Comment

def seed_comments():
    comment_1 = Comment(
        content="What a great post. Thanks for sharing!",
        user_id=2,
        post_id=1
    )
    comment_2 = Comment(
        content="This sucks. Please do better.",
        user_id=3,
        post_id=2
    )
    comment_3 = Comment(
        content="Ha ha ha. You're so funny!",
        user_id=1,
        post_id=3
    )
    comment_4 = Comment(
        content="You should seal that in resin, save it for posterity.",
        user_id=3,
        post_id=4
    )
    comment_5 = Comment(
        content="Brings a tear to your eye....",
        user_id=8,
        post_id=4
    )
    comment_6 = Comment(
        content="Oño?",
        user_id=5,
        post_id=4
    )
    comment_7 = Comment(
        content="She is beauty she is grace",
        user_id = 10,
        post_id = 4
    )
    comment_8 = Comment(
        content="She is a calico, not a tortie, due to the red, blackish brown and white patches. Torties lack the white and colors are more blended.\n\n https://parade.com/156291/marilynvossavant/is-this-a-tortoiseshell-cat-or-a-calico/",
        user_id = 4,
        post_id = 5
    )
    comment_9 = Comment(
        content="A very cute one!",
        user_id = 8,
        post_id = 5
    )
    comment_10 = Comment(
        content="Cuteus Adorablea",
        user_id = 6,
        post_id = 5
    )
    comment_11 = Comment(
        content="Cat",
        user_id = 2,
        post_id = 5
    )
    comment_12 = Comment(
        content="My results were similar to yours. The doctor said \"Well, you're basically allergic to the outside and... the inside\"",
        user_id=12,
        post_id=6
    )
    comment_13 = Comment(
        content="Looks like you’re not allergic to PP, so that’s good.",
        user_id=3,
        post_id=6
    )
    comment_14 = Comment(
        content="I had this same crazy reaction. Did allergy shots for a couple years. Moved cities and stopped. Got tested again 5 years later. Turns out I wasn't allergic to all those things, I was allergic to the control substance they mix all the allergens with.",
        user_id=9,
        post_id=6
    )
    comment_15 = Comment(
        content="""I had similar results. My allergy was terrible spring through fall and was on Zyrtec 3x a day, steroid eye drops, and nasal spray. I had a HEPA filter in every room, had to shower if I went outside, went through 2 pairs of contacts a day, etc. This was going on since I was a kid.

        I was hesitant to try the shots but decided on it since I worked across the hall from an allergy center. 6 mos into it I had no allergy symptoms and medication free. It's been 2 years now and still doing good. Stuff I didn't think about like driving with the windows down and not carrying allergy meds everywhere (oral and eye drops) has been nice.

        The schedule and cost is a huge deterrent. It was weekly for the first 6 weeks.""",
        user_id=1,
        post_id=6
    )
    comment_16 = Comment(
        content="The one performance review trick companies don't want you to know",
        user_id=11,
        post_id=7
    )
    comment_17 = Comment(
        content="You don't remove the time out... You lower it, then you can easily improve it again later.",
        user_id=5,
        post_id=7
    )
    comment_18 = Comment(
        content="It is always good to build in timeouts. That way you can always increase the performance easily at a later stage",
        user_id=6,
        post_id=7
    )
    comment_19 = Comment(
        content="I’ve heard this exact same joke on here at least 25 times",
        user_id=2,
        post_id=7
    )
    comment_20 = Comment(
        content="""My physician friend said that in all of her career, the worst is when a teenage girl is dying in agony over a week, regretting her decision, with her family all there watching her die, and there's nothing that can be done to prevent it.

        But, as you say, OP, much of the time there's just permanent damage, not death. She said that's hard to see, too.""",
        user_id = 7,
        post_id = 8
    )
    comment_21 = Comment(
        content="I can definitely attest to this. Fucking awful experience and now I’ve got the liver of a lifelong alcoholic 🙃",
        user_id = 10,
        post_id = 8
    )
    comment_22 = Comment(
        content="""This and insulin OD.

        If you survive insulin OD but were hypolgycaemic for long enough to cause brain damage, you are left as "alive" as a vegetable.""",
        user_id = 9,
        post_id = 8
    )
    comment_23 = Comment(
        content="I was annoyed about the increased packaging my antidepressants came in, until I read that it had a similar effect in preventing purposeful overdoses. Seems like such a simple solution, especially if there's a way to compost/recycle the extra packaging!",
        user_id = 11,
        post_id = 8
    )
    comment_24 = Comment(
        content="She doesn’t want to listen to your thoughts or problems. She is only concerned about herself.",
        user_id = 4,
        post_id = 9
    )
    comment_25 = Comment(
        content="When the problems mysteriously dissappear when she's not around.",
        user_id = 6,
        post_id = 9
    )
    comment_26 = Comment(
        content="Cries every time you mention an issue on her end, and then the conversation only gets resolved when YOU apologize — leading to no actual change",
        user_id = 12,
        post_id = 9
    )
    comment_27 = Comment(
        content="Everyone is a problem or at fault except her.",
        user_id = 1,
        post_id = 9
    )
    comment_28 = Comment(
        content="If everyone she meets is doing something that pisses her off, she might be the problem.",
        user_id = 11,
        post_id = 9
    )
    comment_29 = Comment(
        content=""""I hate drama" - another way of saying that she thrives on drama

        "I can't wait to show this to My Followers On Instagram" - incapable to live the moment, 24/7 validation needed

        "I am not like the other girls" - this sentence usually means some serious fucked up shit

        "All of my exes turned out to be idiots" - there was one thing in common between all of your exes, yourself""",
        user_id = 2,
        post_id = 9
    )
    comment_30 = Comment(
        content="\"All my exes were crazy\"",
        user_id = 8,
        post_id = 9
    )
    comment_31 = Comment(
        content="\"I can't be friends with women\" has never worked out well for me.",
        user_id = 7,
        post_id = 9
    )
    comment_32 = Comment(
        content="Man I think your cats Spanish",
        user_id = 9,
        post_id = 10
    )
    comment_33 = Comment(
        content="Maine Coon",
        user_id = 1,
        post_id = 10
    )
    comment_34 = Comment(
        content="What an example of waste, that raccoon could’ve been shipped in a much smaller box..",
        user_id = 11,
        post_id = 10
    )
    comment_35 = Comment(
        content="Blind people ride in cars sometimes.",
        user_id=5,
        post_id=15
    )
    comment_36=Comment(
        content="Well I’m sure as hell not going to read the entire menu out to my blind buddy.",
        user_id=6,
        post_id=15
    )
    comment_37 = Comment(
        content="Yknow in case you have a blind passenger",
        user_id=7,
        post_id=15
    )
    comment_38 = Comment(
        content="Ice... use lots of ice.",
        user_id=8,
        post_id=14
    )
    comment_39 = Comment(
        content="Some women buy their men cookies after a vasectomy. Mine bought me gauze that STUCK TO MY STITCHES. No amount of soaking got it unstuck either. I basically ripped my stitches out trying to get it off. So much pain.",
        user_id=9,
        post_id=14
    )
    comment_40 = Comment(
        content="Yikes announced on the same day as the contraceptive pill for men that works.",
        user_id=10,
        post_id=14
    )
    comment_41 = Comment(
        content="This post is peak Ribbit.",
        user_id=11,
        post_id=14
    )
    comment_42=Comment(
        content="Unlabeled liquid containers, no lids on the cotton/gauze, used(?) rectal thermometer on the countertop. Sneaky kitty hiding in the sink.",
        user_id=12,
        post_id=15
    )
    comment_43=Comment(
        content="Sharps should not be ‘disposed’ in the sink",
        user_id=1,
        post_id=15
    )
    comment_44 = Comment(
        content="""Saw absolutely nothing. Went to the comments to see what the OSHA violations were, hoping to learn something I didn't already know.

Top comment said "Stealth 100." I did not read further, and angrily scrolled back up to find what I missed. Took me WAY too long. I now sympathize with all the NPCs I've killed as a Kajiit stealth archer.""",
        user_id=2,
        post_id=15
    )
    comment_45 = Comment(
        content="""I went to a security talk on this from github.
GitHub have a system where they will search through every bit of public code uploaded, then they have patten detection to find api keys/security tokens and they can match them to say Google, Slack, AWS, in your case OpenAI. Then github will send the found keys to the relevant organization through a batch process, then the organization will see if its real, disable it and let the customer know they stuffed up.

They build the system with Slack I think, to stop slack having to scrape GitHub constantly looking for leaked API keys in public code.""",
        user_id=12,
        post_id=16
    )
    comment_46 = Comment(
        content="Does anyone else feel a bit weary trusting their code to a third party, such as github? Wouldn't it be more secure to run on-premise GitLab self hosted solution, and use their CI/CD pipelines to publish to the cloud?",
        user_id=11,
        post_id=16
    )
    comment_47=Comment(
        content="If their bots can find the key, so have thousands of others.",
        user_id=10,
        post_id=16
    )
    comment_48=Comment(
        content="I usually use copy and paste",
        user_id=9,
        post_id=17
    )
    comment_49=Comment(
        content="All you need to do is copy the code, copy the license file and any copyright information. That's it. You must include the copyright and license information for the code used. You are otherwise free to do whatever you please including use the code commercially.",
        user_id=8,
        post_id=17
    )
    comment_50=Comment(
        content="@lurkinislife - Alright but where do I put the license file?",
        user_id=3,
        post_id=17
    )
    comment_51=Comment(
        content="Hippity hoppity your code is now my property",
        user_id=1,
        post_id=17
    )
    comment_52=Comment(
        content="Love it, but as others have said - you need to look out for yourself here - they can use this against you and make things even worse",
        user_id=5,
        post_id=18
    )
    comment_53=Comment(
        content="""This is dangerous op, you could get sued.

If a 500 error screen pops up, however, it's not your fault and they will need to contact you.

You know, from time to time a permission may get reset, or run out of storage capacity because an unnecessary debug log level you forgot to drop, or a database host was changed by the hosting company, or whatever issue that lead to a 500.

Explicitly doing this is dangerous.""",
        user_id=7,
        post_id=18
    )
    comment_54=Comment(
        content="A week isn’t that long, some companies process all their invoices once a month for example, this seems far too extreme for a week",
        user_id=8,
        post_id=18
    )
    comment_55=Comment(
        content="Expect a lawsuit. A week?! Let's maybe slow our roll here yeah?",
        user_id=3,
        post_id=18
    )


    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.add(comment_13)
    db.session.add(comment_14)
    db.session.add(comment_15)
    db.session.add(comment_16)
    db.session.add(comment_17)
    db.session.add(comment_18)
    db.session.add(comment_19)
    db.session.add(comment_20)
    db.session.add(comment_21)
    db.session.add(comment_22)
    db.session.add(comment_23)
    db.session.add(comment_24)
    db.session.add(comment_25)
    db.session.add(comment_26)
    db.session.add(comment_27)
    db.session.add(comment_28)
    db.session.add(comment_29)
    db.session.add(comment_30)
    db.session.add(comment_31)
    db.session.add(comment_32)
    db.session.add(comment_33)
    db.session.add(comment_34)
    db.session.add(comment_35)
    db.session.add(comment_36)
    db.session.add(comment_37)
    db.session.add(comment_38)
    db.session.add(comment_39)
    db.session.add(comment_40)
    db.session.add(comment_41)
    db.session.add(comment_42)
    db.session.add(comment_43)
    db.session.add(comment_44)
    db.session.add(comment_45)
    db.session.add(comment_46)
    db.session.add(comment_47)
    db.session.add(comment_48)
    db.session.add(comment_49)
    db.session.add(comment_50)
    db.session.add(comment_51)
    db.session.add(comment_52)
    db.session.add(comment_53)
    db.session.add(comment_54)
    db.session.add(comment_55)

    db.session.commit()

def undo_comments():
    db.session.execute("DELETE FROM comments")
    db.session.commit()
