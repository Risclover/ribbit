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

    post19_comment1=Comment(
        content="We had a similar scare with our 8 year old cat. We found a lump on her shoulder and freaked out. We took her to vet in the height of covid and couldn’t go in with her. When they brought her out to the car they told us she was fine, she just has fat shoulders! Anyway she’s on a diet now lol",
        user_id=21,
        post_id=19
    )
    post19_comment2=Comment(
        content="""So, our "fat" cat Rosie got sick during lockdowns in UAE. We lived in a remote city that truly locked down. No vet within 250km. No leaving town, except for emergencies. Rosie was sick, losing weight, vomiting all of the time (anytime she ate or drank water). Luckily, after a few days of the serious concern setting in my wife and I were able to get a 12 hour pass to leave and come back for a "Dental emergency", which we actually went to the appointment.

Rosie had surgery. She had swallowed a rubber piece to a kids toy. It was blocking her stomach. We had to leave her at the vet for a bit, since we had to leave. We had the dentist office give us a followup appointment and state that it was medically required, to get another pass.

The vet said we were lucky that she had been slightly overweight, a skinnier kitty would not have had the reserves to last as long as she had to wait.""",
        user_id=24,
        post_id=19
    )
    post19_comment3=Comment(
        content="Look at her little face. That's a cat who knows she's just fat and is 100% fine with it.",
        user_id=29,
        post_id=19
    )
    post19_comment4=Comment(
        content="As someone who’s cat won over FIP, Richard is sending good vibes and munchies!",
        user_id=34,
        post_id=19
    )
    post19_comment5=Comment(
        content="I lost a kitten to FIP, I’m so glad you don’t have to go through that. Thank god it’s only a little chubs 😂",
        user_id=35,
        post_id=19
    )

    post20_comment1=Comment(
        content="OC credit to Faris <a href='https://www.instagram.com/sirfaristhevoid/?igshid=YmMyMTA2M2Y%3D' target='_blank'>@sirfaristhevoid</a>.",
        user_id=24,
        post_id=20
    )
    post20_comment2=Comment(
        content="This is so adorable <3",
        user_id=49,
        post_id=20
    )
    post20_comment3=Comment(
        content="Which one’s Faris and which one’s squishy again?",
        user_id=4,
        post_id=20
    )
    post20_comment4=Comment(
        content="What kind of edibles did he get into",
        user_id=9,
        post_id=20
    )

    post21_comment1=Comment(
        content="\"Fuck your historical documents. Pet me! WITH YOUR EYES!\" <em>bites</em>",
        user_id=35,
        post_id=21
    )
    post21_comment2=Comment(
        content="Cats have no chill and I'm all about it. 😼",
        user_id=10,
        post_id=21
    )
    post21_comment3=Comment(
        content="""Weird thought but like maybe out of frustration people connected them to the devil and witche's because they were mischievous, and it just got blown out of proportion at some point.

I know I say my cat is Satan sometimes because she's an asshole....""",
        user_id=21,
        post_id=21
    )

    post22_comment1=Comment(
        content="Plot twist, he’s only renting Goosebumps books.",
        user_id=3,
        post_id=22
    )
    post22_comment2=Comment(
        content="This should not be as funny to me as it is",
        user_id=28,
        post_id=22
    )
    post22_comment3=Comment(
        content="So this is how megamind came to be",
        user_id=38,
        post_id=22
    )
    post22_comment4=Comment(
        content="I want to know how the story ends",
        user_id=47,
        post_id=22
    )
    post22_comment5=Comment(
        content="Imagine what he could accomplish if he used his powers for good",
        user_id=5,
        post_id=22
    )
    post22_comment6=Comment(
        content="""/s the librarian is making a killing renting out books, and would pretend not to notice if he came in the next day looking like sloth from the goonies. /s

Rent seems like the wrong word here.""",
        user_id=27,
        post_id=22
    )

    post23_comment1=Comment(
        content="""Back in the day it was normal for parents to leave their kids in the car while they went into stores, gas station bathrooms, etc. We were always told, “Don’t touch the lighter!”

So of course the first thing we did was push in the lighter then wave it around and pretend we were lighting a cigarette. Ahhhhh…..youth.""",
        user_id=50,
        post_id=23
    )
    post23_comment2=Comment(
        content="Oh yeah I burned the shit out of my finger when I was a kid once. Never again.",
        user_id=13,
        post_id=23
    )

    post24_comment1=Comment(
        content="It’s worth reading this all the way through. This guy has suffered for his work and we have all benefitted from it.",
        user_id=2,
        post_id=24
    )
    post24_comment2=Comment(
        content="This poor guy can't catch a fucking break. Been following his story since years ago, I remember when I first saw core-js in my vue template and decided to do some research on him. He probably is the sole reason why the modern web even exists. I don't think we would have seen all this breakout of libraries and frameworks if his contributions to backwards compatibility wouldn't exist",
        user_id=7,
        post_id=24
    )
    post24_comment3=Comment(
        content="He needs to send that write up to each of the top 1000 companies using his work. Everything aside, damn this guy is a rockstar. Any company would be lucky to have him on their team. He should be getting job offers left and right.",
        user_id=16,
        post_id=24
    )
    post24_comment4=Comment(
        content="People are dickhead assholes. Jesus Christ this guy suffered so much writing open source code. Fuck people",
        user_id=18,
        post_id=24
    )

    post25_comment1=Comment(
        content="""i feel like slack is the device by which most of these things actually occur

managers needing to check up on you several times a day because they don't have any of their own work to do and because 30 years of "fuck off i'm busy" hasn't gotten them fired yet

i actually have managers underneath of me doing this to me and i have no idea how to communicate to them to stop

every time i tell them "you reach out too much" they try phrasing it more artificially politely, adding to the mess the greasy slime of insincerity, instead of just stopping

three times yesterday, by someone i've been telling literally every day "i do not know when this is in, stop asking me to make external promises"

so he just carbon copies other people and keeps asking, like he thinks ramping up the pressure and manufacturing shame will help. i don't know what to do

fundamentally, it's because we're still pretending that managers exist for a reason

burnout is the direct result of having the extra workload of making your manager feel like they exist for a business reason""",
        user_id=47,
        post_id=25
    )
    post25_comment2=Comment(
        content="""This reminds me when I was working in a company that wanted us to polish software for months. It was ready in December, but we had to make sure every little things sparks and released 8 months later.

Then I was a part-time consultant to a startup company, they said "we're releasing next Monday, here we have another Jira board for bugs". And sure, bugs were reported, but the software was released and used and devs were happier fixing bugs found in a live app rather than ones found internally.""",
        user_id=1,
        post_id=25
    )
    post25_comment3=Comment(
        content="Drives me nuts these are never articles. I don’t want to listen to a podcast.",
        user_id=46,
        post_id=25
    )
    post25_comment4=Comment(
        content="I agree with the sentiment, I want to add a caveat. If you ship things every week, great. If you have a deadline every week, this will lead to burnout even quicker than a deadline every 6 months.",
        user_id=43,
        post_id=25
    )
    post25_comment5=Comment(
        content="Burn out is not getting a break... or not getting even some down time to learn something new",
        user_id=41,
        post_id=25
    )
    post25_comment6=Comment(
        content="So much truth to this, when I first started at this company we were shipping every 3-6 months it was super stressful. Now we're shipping multiple times a week and even at my worst I haven't felt nearly as stressed as I did years ago. I still get burned out from time to time but that's usually because I've become a bit of workaholic as I get to code for like 95% of my days and I tend lose track of time, but usually a couple extra days off tacked onto a weekend is enough for me to recharge.",
        user_id=36,
        post_id=25
    )

    post26_comment1=Comment(
        content="All about the TypeScript tbh. I could never go back",
        user_id=1,
        post_id=26
    )
    post26_comment2=Comment(
        content="I started an IT undergrad this year and they told us after their 5 year review, they changed what programming language is taught in first from C++ to JS. So im really glad for that :).",
        user_id=27,
        post_id=26
    )

    post27_comment1=Comment(
        content="""I work with vanilla Js.

My environment is sealed. And any library has to go through an intensive inspection to be approved for use. 4 weeks to be able to link bootstrap cdn. Imagine a JS library.

I asked to use date.js and never got an answer.""",
        user_id=16,
        post_id=27
    )

    post28_comment1=Comment(
        content="There is a special kind of awe that you feel when you see those things by yourself.",
        user_id=10,
        post_id=28
    )
    post28_comment2=Comment(
        content="Mesmerizing!! Thanks for sharing your amazing photo!",
        user_id=30,
        post_id=28
    )
    post28_comment3=Comment(
        content="Holy shit that's cool",
        user_id=35,
        post_id=28
    )
    post28_comment4=Comment(
        content="Does it look even better in person? Because that’s beautiful",
        user_id=49,
        post_id=28
    )

    post29_comment1=Comment(
        content="\"write what you know\" really paid off there.",
        user_id=5,
        post_id=29
    )
    post29_comment2=Comment(
        content="""Imagine being a rapper in the late 80's, rapping in the style that was popular at the time and being successful at it, and then NWA drops Straight Outta Compton and changes the entire landscape, completely changing what many people expected and wanted to hear in rap music.

It had to be jarring for a lot of artists.""",
        user_id=21,
        post_id=29
    )
    post29_comment3=Comment(
        content="I remember when this song came out. I was a high school senior and had a part time job in a tool supply warehouse. A guy I worked with didn't quite know the words and would walk around singing \"I'm gonna knock you out! Mama's gonna knock you out!\" It still works.",
        user_id=30,
        post_id=29
    )

    post30_comment1=Comment(
        content="Are those spoons hanging?",
        user_id=1,
        post_id=30
    )
    post30_comment2=Comment(
        content="now THIS is cool. these kind of pictures are why i joined.",
        user_id=3,
        post_id=30
    )
    post30_comment3=Comment(
        content="I absolutely LOVE this. Looks like hanging polaroids on the wall has been a staple college students decor for over 100 years. I totally love that.",
        user_id=8,
        post_id=30
    )
    post30_comment4=Comment(
        content="The bed screams back pain treated with a cocaine tonic",
        user_id=9,
        post_id=30
    )

    post31_comment1=Comment(
        content="The team even posted a farewell tweet as if they were sad to see him go. Truly scummy behaviour from them.",
        user_id=4,
        post_id=31
    )
    post31_comment2=Comment(
        content="""What's the team? Time to name and shame.

edit: it's <a href='https://esports.gg/news/dota-2/ninjaboogie-kicked-from-team-smg-talks-about-the-messy-situation/' target='_blank'>Team SMG</a>.""",
        user_id=7,
        post_id=31
    )
    post31_comment3=Comment(
        content="A leave of absence would have been more appropriate",
        user_id=12,
        post_id=31
    )
    post31_comment4=Comment(
        content="This is not just mildly infuriating",
        user_id=18,
        post_id=31
    )

    post32_comment1=Comment(
        content="Thanks OP I needed this 💙 Currently watching Wes. Bos’ advanced React and GraphQL and feeling a bit lost 😓",
        user_id=21,
        post_id=32
    )
    post32_comment2=Comment(
        content="Thanks OP! You goddamn wholesome bastard, you.",
        user_id=26,
        post_id=32
    )
    post32_comment3=Comment(
        content="""That's one thing I am loving about getting into a developer career. We're just people who love making cool stuff and are willing to continually learn. The whole profession is built on learning and practicing and experimenting. I love that. It's a cool space to be in.

I'm learning React and JavaScript at the same time (my path was more on the design side of things for a long time, and I'm just now taking the deep dive beyond HTML/CSS, and my company uses React), so it's been quite a ride.. sometimes I feel like I'll go insane trying to figure out how some of this stuff works. But it's always encouraging to know that so many people have been on the same journey, and so many people are helpful and willing to share their knowledge and ideas.

It's the only job where I feel like I'm actually getting paid to learn and have fun.. and by fun, I mean puzzling over a labyrinthine problem for hours until the lightbulb goes off and your work comes to life. It's like being in college, except I get paid to be there.""",
        user_id=33,
        post_id=32
    )
    post32_comment4=Comment(
        content="Much needed. Haha",
        user_id=37,
        post_id=32
    )
    post32_comment5=Comment(
        content="""This. You're in an industry that is bound to give you an imposter complex. I'm a lead engineer for a critical organisation. My knowledge pool is vast and wide. I've been developing applications, websites and games for two decades now. And yet there isn't a day that I don't encounter something that will make me feel like a compete n00b.

To any starter; it's not you. Don't be discouraged. Don't see it as not knowing but as a chance to learn. You will encounter snob seniors, ignore them. Make learning things your enjoyment. Make teaching your enjoyment. Sooner or later there will come a day when you are starting to remove things from you linked in profile because you know too much and you will realise that you have become a senior.""",
        user_id=42,
        post_id=32
    )

    post33_comment1=Comment(
        content="I've been working with the <a href='https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world' target='_blank'>Flask Mega Tutorial</a>, it's been great so far. I didn't see it in your list, but it has been a great tool for me.",
        user_id=13,
        post_id=33
    )
    post33_comment2=Comment(
        content="""Looks like you gathered up quite a few!

Which ones are worth people's time, though? Such a list would be more valuable if it recommended the best tutorials. The summaries read like cut-and-paste advertisements for the tutorials, rather than evaluations. Combined with all the referral links, it makes you seem biased.

Thanks for collecting these. Even better would be a curated list of recommendations.""",
        user_id=11,
        post_id=33
    )
    post33_comment3=Comment(
        content="Thanks for sharing this 😻",
        user_id=25,
        post_id=33
    )
    post33_comment4=Comment(
        content="Solid effort! Have bookmarked that. Well done.",
        user_id=39,
        post_id=33
    )

    post34_comment1=Comment(
        content="I’ll be honest, I was expecting a Cease and Desist from Amazon.",
        user_id=10,
        post_id=34
    )
    post34_comment2=Comment(
        content="""Very cool. That’s the beauty of sharing. You never know who or how it will help someone, but you post it anyway because that’s just being awesome.

Thanks for sharing.""",
        user_id=20,
        post_id=34
    )
    post34_comment3=Comment(
        content="I feel that. It must be gratifying to do some good in the world, even if by accident. To diminish another's suffering just a little bit. RIP Mrs. Roberts.",
        user_id=30,
        post_id=34
    )
    post34_comment4=Comment(
        content="reminds me of that black mirror episode",
        user_id=40,
        post_id=34
    )
    post34_comment5=Comment(
        content="Beautiful! :-)",
        user_id=50,
        post_id=34
    )

    post35_comment1=Comment(
        content="Victories are victories, regardless of size. Enjoy the feeling! :)",
        user_id=5,
        post_id=35
    )
    post35_comment2=Comment(
        content="""Now you’ll be trying to automate everything… and you won’t be satisfied with “good enough”. Plodding through hours upon hours trying to optimize some inconsequential details when just doing it manually would save you all the time that you spent working on it already.

Oh the humanity!

But also, congrats. It does make you feel like you have an “insiders” view of things once you build your first program.""",
        user_id=15,
        post_id=35
    )
    post35_comment3=Comment(
        content="THIS is why we do what we do. :-)",
        user_id=25,
        post_id=35
    )
    post35_comment4=Comment(
        content="Congrats. Soon you’ll be fiddling with classes and objects and building APIs, maybe training some models along the way. Good luck on your long learning journey ahead.",
        user_id=35,
        post_id=35
    )
    post35_comment5=Comment(
        content="No matter how simple the script, the first time it runs and executes properly, it's magical.",
        user_id=45,
        post_id=35
    )

    post36_comment1=Comment(
        content="ipads can be exchanged for goods and services",
        user_id=48,
        post_id=36
    )
    post36_comment2=Comment(
        content="300 iPads can buy many grills",
        user_id=46,
        post_id=36
    )
    post36_comment3=Comment(
        content="Nobody thinks about the guy expecting 300 iPads but got a grill instead.",
        user_id=44,
        post_id=36
    )

    post37_comment1=Comment(
        content="Now if you can find one that illustrates sort bc I can’t fully understand that for the life of me",
        user_id=17,
        post_id=37
    )
    post37_comment2=Comment(
        content="That's awesome thanks for sharing.",
        user_id=27,
        post_id=37
    )

    post38_comment1=Comment(
        content="Yes it’s self adhesive and opens up and pops back together ",
        user_id=45,
        post_id=38
    )
    post38_comment2=Comment(
        content="Glad you could find a creative outlet.",
        user_id=31,
        post_id=38
    )
    post38_comment3=Comment(
        content="I work for Coca Cola in Atlanta and I am considered an \"essential employee\" and work was gonna be slow today so I took a vacation day.",
        user_id=45,
        post_id=38
    )
    post38_comment4=Comment(
        content="Sexy",
        user_id=29,
        post_id=38
    )
    post38_comment5=Comment(
        content="OP totally gettin' laid for this.",
        user_id=49,
        post_id=38
    )
    post38_comment6=Comment(
        content="""And then there's me:

<em>Stuffs all the cables behind cabinet where no one can see</em>""",
        user_id=2,
        post_id=38
    )

    post39_comment1=Comment(
        content="Also they sew bells into their clothes so parents can work around without have the need of keeping the eyes on them all the time",
        user_id=3,
        post_id=39
    )
    post39_comment2=Comment(
        content="Weebles wobble but they don’t fall down.",
        user_id=13,
        post_id=39
    )
    post39_comment3=Comment(
        content="That not a baby, that's a walking marshmallow.",
        user_id=23,
        post_id=39
    )

    post40_comment1=Comment(
        content="\"And not everyone understands what they say to me\" Truer words could not be spoken",
        user_id=15,
        post_id=40
    )
    post40_comment2=Comment(
        content="Please tell us you gave him a good review 🙂",
        user_id=19,
        post_id=40
    )
    post40_comment3=Comment(
        content="Oleksii is a certified homie in my book",
        user_id=18,
        post_id=40
    )
    post40_comment4=Comment(
        content="Seems like a nice dude, I hope my fellow Americans show him our good side",
        user_id=23,
        post_id=40
    )

    post41_comment1=Comment(
        content="""\"It would have been nice if you'd mentioned you were entertaining other offers 😠 😡 😤 \"

Also them

\"Sorry we hired someone else, we hired them 3 months ago and decided not to tell you even tho we told you we'd be in touch, get fucked\"""",
        user_id=18,
        post_id=41
    )
    post41_comment2=Comment(
        content="""I just interviewed with a fairly large bank. The first tech screen was 4 leetcode questions that had to be completed in 70 mins.

I don't practice leetcode but I've been in a number of companies and worn many hats. This bank wasn't making anything revolutionary and their questions were harder than the ones I got from Microsoft.""",
        user_id=28,
        post_id=41
    )

    post42_comment1=Comment(
        content="""I took CS50 in Fall 2017 with no prior coding experience. I’m not sure what all’s changed since then, but it was a nice intro into programming and I highly encourage anyone who is interested to check it out.

They spent a lot of time initially teaching the basics in C (I.e. lists, dicts, for loops, while, functions, pointers, recursion, stack/heap, etc.) and then gave other languages about a week or two so we could see the syntax and usage differences - I remember we looked at Python, HTML and CSS, SQL, and maybe JavaScript (but I can’t recall). Like another commenter mentioned, a lot of the homework projects were strange, seemingly useless tasks, but I think it was more about getting students familiar with aspects of programming. There was also a final project that you basically had free reign on (for example- I chose to make a game app using Swift).

I will say that CS50 is a nice introduction to the basics of programming (which does ultimately make it ‘easier’ to learn other languages), but you’ll also need to put in solo effort and keep learning and practicing afterwards to fully understand and be comfortable with whatever language.

I worked as a Computational Neuroscientist from 2018-2022, and now work as a Data Analyst. CS50 was a great stepping stone that pushed me towards these careers, but I definitely had to put in the hours to make my skills useful to employers.""",
        user_id=7,
        post_id=42
    )
    post42_comment2=Comment(
        content="This is awesome, thanks for sharing. I'm starting the free Data Analytics and Python programming courses now!",
        user_id=27,
        post_id=42
    )

    post43_comment1=Comment(
        content="Wearing the same dress twice",
        user_id=38,
        post_id=43
    )
    post43_comment2=Comment(
        content="Those new eyebrows. Don't know what they're called",
        user_id=29,
        post_id=43
    )
    post43_comment3=Comment(
        content="Seeing you without make up, when my girlfriend came round my house without her make up on for the first time I was so happy, like unbelievably happy, to me it meant that she was comfortable around me and that really meant the world to me",
        user_id=19,
        post_id=43
    )
    post43_comment4=Comment(
        content="""Whatever the newest beauty trend that women are supposedly supposed to look up to.

I've never once thought, \"Damn, she’s cute but her thighs are touching. Guess I'm not attracted to her anymore.\"""",
        user_id=9,
        post_id=43
    )

    post44_comment1=Comment(
        content="What I especially love about this letter is that Tolkien is like, \"thank god people are buying this thing,\" which I find super endearing",
        user_id=38,
        post_id=44
    )
    post44_comment2=Comment(
        content="But what is it that your dad had been doing ?!",
        user_id=11,
        post_id=44
    )
    post44_comment3=Comment(
        content="Fuck that signature is sick",
        user_id=3,
        post_id=44
    )

    post45_comment1=Comment(
        content="""I like to play with backdrop-filter: hue-rotate() in small increments when using a frosted glass effect. It can add a nice color effect coming through the "glass".

Also, Firefox for the love of God please add support.""",
        user_id=18,
        post_id=45
    )
    post45_comment2=Comment(
        content="Love a backdrop filter, but be aware that it's still not universal. https://caniuse.com/?search=backdrop-filter",
        user_id=29,
        post_id=45
    )

    post46_comment1=Comment(
        content="It was a bitch to live through but the end result is beautiful! One of my favorite places to hang out.",
        user_id=20,
        post_id=46
    )
    post46_comment2=Comment(
        content="Philly did this with I-95 back in 1978-79 as it parallels the Delaware waterfront. The problem is they didn’t build anything functional over it so the highway simply divided the waterfront from the rest of the city.",
        user_id=10,
        post_id=46
    )

    post47_comment1=Comment(
        content="\"I see you have tests, they passed, we’re good.\" ☑️",
        user_id=11,
        post_id=47
    )
    post47_comment2=Comment(
        content="Ask me to do 500 lines and I'll tell you to come back with many smaller PRs",
        user_id=33,
        post_id=47
    )
    post47_comment3=Comment(
        content="""Well, yeah.

If you hand me a massive code base I’m just going to test it to see if it works and if it does say \"looks good to me\"""",
        user_id=44,
        post_id=47
    )

    post48_comment1=Comment(
        content="""That's something about the argument I really don't understand. My literal dream in life since I was 10 ish was to have a kid of my own. I waited till I had a good partner, good paying job, and finances in order. It's still really, really hard to be a parent and I WANTED the kid.

So now you're going to tell me that someone in a bad situation or that isn't ready having a kid is a good thing? All that will do is put more strain on the system and make a kid that is full of trauma and issues. And recent news in the US shows what that creates...""",
        user_id=4,
        post_id=48
    )
    post48_comment2=Comment(
        content="""Girl: I want to adopt a baby. I have to admit, I'm a sixteen year old high school student with no income, and my 'partner' is an abusive uncle.

Florida: Are you fucking insane?! You're totally irresponsible! You're going to ruin the lives of everyone involved! Absolutely no way would we approve an adoption like that.

Girl: JK. I was raped, and I want an abortion.

Florida: It's a CHILD, not a CHOICE, slut.""",
        user_id=14,
        post_id=48
    )

    post49_comment1=Comment(
        content="""They are aimed at different audiences

I like the content in PCC, but ATBS is still the best thing to hand a frustrated desk jockey with limited time who wants to make their lives easier

It pays immediate practical dividends, which is the most important thing for keeping those sorts of people motivated and learning""",
        user_id=3,
        post_id=49
    )
    post49_comment2=Comment(
        content="""PCC is for programming/software engineering

ATBS is for automating things

Each has their own audience""",
        user_id=13,
        post_id=49
    )

    post50_comment1=Comment(
        content="Very cool. Would be cool to dockerize, just for funzies.",
        user_id=8,
        post_id=50
    )
    post50_comment2=Comment(
        content="""**OP**
Source: https://github.com/spashii/music-server

It's the first web app that I built on my own after learning flask. Open to any remarks! (stars too)""",
        user_id=2,
        post_id=50
    )
    post50_comment3=Comment(
        content="Really like your project directory setup, did you refer any tutorial where they followed such a style?",
        user_id=43,
        post_id=50
    )

    post51_comment1=Comment(
        content="Looks fantastic. I would vote for this redesign any day",
        user_id=16,
        post_id=51
    )
    post51_comment2=Comment(
        content="Looks really cool! You should submit it to the PSF :)",
        user_id=26,
        post_id=51
    )
    post51_comment3=Comment(
        content="I like flat designs more, but your design is cool!",
        user_id=36,
        post_id=51
    )
    post51_comment4=Comment(
        content="Changing the logo is really gonna mess up my tattoo choice",
        user_id=46,
        post_id=51
    )

    post52_comment1=Comment(
        content="""\"You have 60 minutes to write this test."

Hands in test in 59 minutes

"You have to understand, that's a last minute effort, so I'm going to deduct points for being too late.\"""",
        user_id=10,
        post_id=52
    )
    post52_comment2=Comment(
        content="Report it. You're paying too much for that bull.",
        user_id=1,
        post_id=52
    )
    post52_comment3=Comment(
        content="What is the point of a due date then? Go to the next in line of power. Don’t let it go",
        user_id=30,
        post_id=52
    )
    post52_comment4=Comment(
        content="This is completely unacceptable. You need to fight this.",
        user_id=40,
        post_id=52
    )

    post53_comment1=Comment(
        content="""I used to work on ATM’s back in the late 80’s, and there was one trick we knew of that was fixed pretty damn quick once the banks found out.

The customer puts their card in and asks for, say, $100. The machine spits out ten $10 notes and holds them in the dispenser. If they’re not taken within about 15 seconds, the machine pulls the notes back in to a hopper and cancels the transaction.

Because of the way the sensors worked, you had 15 seconds to carefully pull $80 from the middle of the stack, leaving the two outer notes in place. If it worked, you got $80 and the transaction was cancelled.

To clarify: you can’t do this any more, these were very early ATM’s and this “bug” doesn’t exist in modern machines.""",
        user_id=15,
        post_id=53
    )
    post53_comment2=Comment(
        content="Turned himself in to the bank before they had even caught on, they called the cops who then took so long to do anything the anxiety drove him to do a media tour confessing to everything that finally got him arrested. The judge and prosecutor had no idea what he'd actually done and after pleading guilty he ended up getting one year in jail with eighteen months community service.",
        user_id=25,
        post_id=53
    )
    post53_comment3=Comment(
        content="My sister had a similar story, she went abroad to study (south korea) and when she came back, the university had to transfer her security deposit back to her european account. They transfered the money. Then did it again. Then contacted my sister to know how they could send the money to her because their 2 first tries did not succeed. She just said not to worry about it. About a year later, that korean bank went bankrupt.",
        user_id=35,
        post_id=53
    )
    post53_comment4=Comment(
        content=""""Being able to make your account balance move up into the millions by the stroke of a key was a very addictive thing; I felt like a caveman discovering fire"

basically all you need to know""",
        user_id=45,
        post_id=53
    )
    post53_comment5=Comment(
        content="The article didn’t say anything about him pay it back, so I’m guessing he didn’t have to?",
        user_id=50,
        post_id=53
    )
    post53_comment6=Comment(
        content="Reminds me of a story: in the mid-80s, I missed a train back to London (to make flight back to USA) and had to spend the night in the Gare Saint-Lazare in Paris. I did happen to have exactly enough money in pocket to fly to London next morning, but not enough for the train fare to the airport. Only reason I ever made it back is… there was a public phone in the train station that gave you back twice as much money as you put in it, for any call you made. Otherwise, I'd probably still be there.",
        user_id=8,
        post_id=53
    )

    post54_comment1=Comment(
        content="Really really helpful...",
        user_id=6,
        post_id=54
    )
    post54_comment2=Comment(
        content="""That's nice ^^
thanks for creating such cool open source project collection

great work ;D""",
        user_id=16,
        post_id=54
    )
    post54_comment3=Comment(
        content="This is cool, thanks",
        user_id=21,
        post_id=54
    )

    post55_comment1=Comment(
        content="""My stepdad is very frugal but he loves coffee, especially cappuccinos. He recently retired and so won’t have the free fancy office coffee machines available to him anymore and was going to stick with Nescafé coffee at home.

My brother overheard him lamenting the loss of his fancy coffee to my mom, so we bought an expensive coffee machine for Father’s Day that will allow him to make his own cappuccinos at home. I’ve also set up a monthly gourmet coffee subscription for him so he can enjoy the variety/quality he would have had at the office too.

He has always insisted we return any gifts we try to buy him (which of course we never do) but this time, for the first time in 19 years, he was so happy he simply said, “Thank you, I love it.”

Still riding that high.""",
        user_id=9,
        post_id=55
    )
    post55_comment2=Comment(
        content="Got my pops a card and a ton of chocolate he likes. Then we went to harbor freight.",
        user_id=18,
        post_id=55
    )
    post55_comment3=Comment(
        content="""My kids are with me. That's all I care about. Wish they hadnt been assholes all weekend but it is what it is.

Got a text from their mom. Probably the nicest, most touching thing she has ever said to me.""",
        user_id=27,
        post_id=55
    )
    post55_comment4=Comment(
        content="I always take my dad out for dinner and get him something he'd like. This year he got a charcoal grill he wanted. (I'm a woman) I always make a big deal about birthdays, holidays and special occasions. I call my ex husband to wish him a happy father's day and give my kids money to pick something out for him. He sends me flowers on mothers day.",
        user_id=34,
        post_id=55
    )

    post56_comment1=Comment(
        content="""I remember working at Five Guys and a $100 went missing on one of the tills during my shift.

The store manager demanded we all equally paid out of pocket or our next check to cover the cost of that missing bill.

Well there was that giant poster thing of all the workers rights and I found one thing saying how that’s very illegal.

The store manager had one of those angry shocked reaction after that and didn’t make us pay… however he treated me like garbage the rest of the time I was there.""",
        user_id=6,
        post_id=56
    )
    post56_comment2=Comment(
        content="""From article, and it's for the USA:

"What is wage theft?

Wage theft is the failure to pay workers the full wages to which they are legally entitled. Wage theft can take many forms, including but not limited to:

Minimum wage violations: Paying workers less than the legal minimum wage

Overtime violations: Failing to pay nonexempt employees time-and-a-half for hours worked in excess of 40 hours per week

Off-the-clock violations: Asking employees to work off-the-clock before or after their shifts

Meal break violations: Denying workers their legal meal breaks

Pay stub and illegal deductions: Taking illegal deductions from wages or not distributing pay stubs

Tipped minimum wage violations: Confiscating tips from workers or failing to pay tipped workers the difference between their tips and the legal minimum wage

Employee misclassification violations: Misclassifying employees as independent contractors to pay a wage lower than the legal minimum

For more information about the different forms of wage theft, see Bernhardt et al. (2009) or Gordon et al. (2012).""",
        user_id=12,
        post_id=56
    )
    post56_comment3=Comment(
        content="This is very helpful info. Unfortunately, many minimum wage workers are in a perfect position to be exploited because of lack of education and other factors.",
        user_id=18,
        post_id=56
    )

    post57_comment1=Comment(
        content="""In a published article following the contest, Malcomson provided others with her 10 rules for beauty. Listed briefly, they are:

Rise early.
Eat a hearty breakfast.
Exercise.
No alcohol.
Smoking is detrimental.
Get outdoors.
Eat a light lunch.
Eat a satisfying dinner.
Early to bed.
Sleep""",
        user_id=14,
        post_id=57
    )
    post57_comment2=Comment(
        content="That hair should win a prize",
        user_id=24,
        post_id=57
    )
    post57_comment3=Comment(
        content="I was like \"what's up with her legs....ohhhh, those are stockings.\" Lol",
        user_id=34,
        post_id=57
    )
    post57_comment4=Comment(
        content="Those shoes though. I need a pair",
        user_id=44,
        post_id=57
    )
    post57_comment5=Comment(
        content="Ruth Malcolmson April 16th 1906-May 25th 1988. It's interesting looking at a picture of someone so young from the future, we can basically look up their entire life. We know everything that will happen in their future. The same will happen to us. Our pictures we take today will be some old photo someday and someone can just look us up and see our future. We're already living in the past for someone in our future.",
        user_id=49,
        post_id=57
    )

    post58_comment1=Comment(
        content="\"...under the rest\" man and I've been saying it wrong all these years",
        user_id=5,
        post_id=58
    )
    post58_comment2=Comment(
        content="I hate being under the rest... You'd best pay them.",
        user_id=10,
        post_id=58
    )
    post58_comment3=Comment(
        content="I love how its just the uk government. No specific part of it, but the entirety of the uk government.",
        user_id=15,
        post_id=58
    )
    post58_comment4=Comment(
        content="Seems they want to stack it up on top of you, so you'll end up under the rest. No fun",
        user_id=20,
        post_id=58
    )
    post58_comment5=Comment(
        content="\"Come and get me. I’m tired of working. I could use the break. 3 hots and a cot, for a few days, sounds pretty good. I’ll be waiting on the front stoop\".",
        user_id=30,
        post_id=58
    )
    post58_comment6=Comment(
        content="\"Jokes on you buddy, I work for UK law enforcement. I know your name and location, you will send me 1500 in subway gift cards or you will be the one under the rest. You have 5 minutes to comply.\"",
        user_id=35,
        post_id=58
    )

    post59_comment1=Comment(
        content="""Hi folks,

I always have trouble remembering how to set up the boilerplate for simple Flask APIs so I wrote up my notes over the years into a concise reference guide. Any feedback, comments, suggestions for improvement, and rants are always welcome.

It focuses entirely on Flask and doesn't go into many extensions or any specific functionality (e.g. auth). It also doesn't cover data modeling and database setup. I try to keep things as simple as possible and avoid too much "magic"; I find it helps me reading code I've written months or years back.

Anyway, here's hoping someone finds it useful! If you like the style of writing, do let me know if there are specific topics you would like to see covered :-)""",
        user_id=26,
        post_id=59
    )
    post59_comment2=Comment(
        content="""Really cool, Flask is so underrated, I found it really straightforward to create a simple app

You definitely need to make a guide to structure large Flask apps""",
        user_id=22,
        post_id=59
    )
    post59_comment3=Comment(
        content="Yeah ,the flask structure has always fucked me . Flask is flexible but the initial configuaration has a lot of options and always startles me to get started. Nice one but what about registering extensions and managing environments.",
        user_id=24,
        post_id=59
    )
    post59_comment4=Comment(
        content="This is very well done one of the most \"down to earth\" collections I’ve seen on flask. I’m going to keep this for a reference. Thank you for sharing this.",
        user_id=33,
        post_id=59
    )

    post60_comment1=Comment(
        content="""Great documentary on YouTube about a tribe that was contacted in the 80s for the first time. Although they had never been in contact with a modern society, they knew there was other people out side their group, knew about planes and vehicles (at least that they existed).

Previously they just didn't want to meet anyone new as they had met other groups in the past and it ended in fighting. For the most part the group still continued their way of life after making contact.""",
        user_id=34,
        post_id=60
    )
    post60_comment2=Comment(
        content="So if they're uncontacted, then what do they think of this flying machine taking their picture?",
        user_id=36,
        post_id=60
    )
    post60_comment3=Comment(
        content="""Source

https://www.survivalinternational.org/news/11503""",
        user_id=35,
        post_id=60
    )
    post60_comment4=Comment(
        content="I wonder if UFOs take pictures of us in this manner?",
        user_id=41,
        post_id=60
    )

    post61_comment1=Comment(
        content="""I love how this thread has caused all of us Gen X'rs start to have a break down 😂

Your Grammy was punk as shit, and I bet deep down, she still is.

Punk will never die""",
        user_id=48,
        post_id=61
    )
    post61_comment2=Comment(
        content="I just realized in the future we'll have a bunch of scene kids/emo's who will show their grandkids meticulously angled pictures consisting of 90% hair",
        user_id=44,
        post_id=61
    )
    post61_comment3=Comment(
        content="The sass drips from her. Love her style. Is she still like this?",
        user_id=41,
        post_id=61
    )

    post62_comment1=Comment(
        content="Nice Btw u forgot the worst of them all == and =",
        user_id=19,
        post_id=62
    )
    post62_comment2=Comment(
        content="<a href='https://rubberduckdebugging.com/' target='_blank'>Rubber Duck Debugging</a>",
        user_id=12,
        post_id=62
    )
    post62_comment3=Comment(
        content="Great sheet! If you don't mind me asking, what did you make it with?",
        user_id=5,
        post_id=62
    )

    post63_comment1=Comment(
        content="Honestly, the town should get together are run that entire department out of town. Could you imagine getting pulled over for speeding by one of these fuckheads in a week or so? Can you imagine seeing these cowards walking around town with their BS cop swagger and you know what cowards they really are?",
        user_id=1,
        post_id=63
    )
    post63_comment2=Comment(
        content="They should be named and shamed. Outed on every form of media. Also be charged with neglect of duty.",
        user_id=7,
        post_id=63
    )
    post63_comment3=Comment(
        content="So what exactly is a cops job?",
        user_id=15,
        post_id=63
    )

    post64_comment1=Comment(
        content="And I still got bullied for wearing them cause it was dead giveaway that your parents were broke. Elementary and middle schoolers are ruthless.",
        user_id=12,
        post_id=64
    )
    post64_comment2=Comment(
        content="I had a pair of those shoes. They weren't great, but they weren't terrible either.",
        user_id=17,
        post_id=64
    )
    post64_comment3=Comment(
        content="How much were the Reeboks?",
        user_id=27,
        post_id=64
    )
    post64_comment4=Comment(
        content="Forwent. I like that word. Form now on, I shall forgo saying \"ain't did\" and start saying \"forwent\".",
        user_id=50,
        post_id=64
    )

    post65_comment1=Comment(
        content="Love custom hooks. Writing a custom hook is almost like a mental exercise. Tricky but rewarding .",
        user_id=48,
        post_id=65
    )
    post65_comment2=Comment(
        content="**OP** Sorry if this is widely known about, I only just came across it. So far there's a bunch of super useful hooks I've already started using. Figured I'd let others know about it too.",
        user_id=38,
        post_id=65
    )
    post65_comment3=Comment(
        content="So many awesome useful hooks really, this should get some sort of React \"Nobel prize\"",
        user_id=28,
        post_id=65
    )

    post66_comment1=Comment(
        content="""Good thought. I would also recommend looking at free APIs and specifically those available for services you use, such as Spotify, Google, etc. Look at the endpoints and all the ways you can manipulate the services programmatically.

From an automation perspective, once you learn the basics of calling APIs, you can do so much.""",
        user_id=40,
        post_id=66
    )
    post66_comment2=Comment(
        content="Here’s another good idea but this is a bit of a process. Name.com or some website has a brand name and logo generator. I just pick something out at random and try to build off of it. I try think of what kind of company would this name and brand suit, what kind of products would these fictional companies put out and i get a lot of ideas from this.",
        user_id=31,
        post_id=66
    )
    post66_comment3=Comment(
        content="I recently realized I could start automating a lot of my work. I just want to mention that. If you have an office job you're probably working with a lot of emails and spreadsheets.",
        user_id=22,
        post_id=66
    )
    post66_comment4=Comment(
        content="So basically do a freshman's homework lol",
        user_id=13,
        post_id=66
    )

    post67_comment1=Comment(
        content="""I once got insecure about my Python knowledge (more of a SQL cat) and my boss said "you know Python". I said "no I know how to Google when something doesn't work". He said "see, you know Python".

Took me a while to realize it but he was right. If you know the basic rules of the game and you know the outcome you want, with enough determination you can Google your way through basically anything.

You'll end up with 40 tabs open, some of which are duplicates you have open from 2 or more distinct SO threads, but you can do it if you try!""",
        user_id=9,
        post_id=67
    )
    post67_comment2=Comment(
        content="One of my teachers wanted to teach us how to google properly. In the end, we taught her how to google properly.",
        user_id=29,
        post_id=67
    )
    post67_comment3=Comment(
        content="To be fair, there are way too many people that do not know how to google shit. I have seen people write shit like \"I need to buy a new screw for a cabinet I have where do I buy it?\" and then get mad when google doesn't magically understand what they mean.",
        user_id=39,
        post_id=67
    )

    post68_comment1=Comment(
        content="Oh no, not again.",
        user_id=47,
        post_id=68
    )
    post68_comment2=Comment(
        content="""[].reduce((acc, curr) => acc + curr)

Requires a nonempty array. So, it's not the most general formula.""",
        user_id=6,
        post_id=68
    )
    post68_comment3=Comment(
        content="That's a photograph. Can't copy code from it.",
        user_id=16,
        post_id=68
    )
    post68_comment4=Comment(
        content="missing forEach which is really commonly used",
        user_id=36,
        post_id=68
    )

    post69_comment1=Comment(
        content="Does she not have a small trash can by her bed?!!",
        user_id=8,
        post_id=69
    )
    post69_comment2=Comment(
        content="Are you dating a girl named Melanie? Hope she's doing alright. I still find those things in my house 10 years later",
        user_id=18,
        post_id=69
    )
    post69_comment3=Comment(
        content="People like this blow my mind. Like where do you think it’s gonna go? Clean that shit up.",
        user_id=48,
        post_id=69
    )

    post70_comment1=Comment(
        content="I drew a perfect circle in paint to compare. <a href='https://i.imgur.com/P0IfYsH.jpg' target='_blank'>Pretty close.</a>",
        user_id=1,
        post_id=70
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
    db.session.add(post19_comment1)
    db.session.add(post19_comment2)
    db.session.add(post19_comment3)
    db.session.add(post19_comment4)
    db.session.add(post19_comment5)
    db.session.add(post20_comment1)
    db.session.add(post20_comment2)
    db.session.add(post20_comment3)
    db.session.add(post20_comment4)
    db.session.add(post21_comment1)
    db.session.add(post21_comment2)
    db.session.add(post21_comment3)
    db.session.add(post22_comment1)
    db.session.add(post22_comment2)
    db.session.add(post22_comment3)
    db.session.add(post22_comment4)
    db.session.add(post22_comment5)
    db.session.add(post22_comment6)
    db.session.add(post23_comment1)
    db.session.add(post23_comment2)
    db.session.add(post24_comment1)
    db.session.add(post24_comment2)
    db.session.add(post24_comment3)
    db.session.add(post24_comment4)
    db.session.add(post25_comment1)
    db.session.add(post25_comment2)
    db.session.add(post25_comment3)
    db.session.add(post25_comment4)
    db.session.add(post25_comment5)
    db.session.add(post25_comment6)
    db.session.add(post26_comment1)
    db.session.add(post26_comment2)
    db.session.add(post27_comment1)
    db.session.add(post28_comment1)
    db.session.add(post28_comment2)
    db.session.add(post28_comment3)
    db.session.add(post28_comment4)
    db.session.add(post29_comment1)
    db.session.add(post29_comment2)
    db.session.add(post29_comment3)
    db.session.add(post30_comment1)
    db.session.add(post30_comment2)
    db.session.add(post30_comment3)
    db.session.add(post30_comment4)
    db.session.add(post31_comment1)
    db.session.add(post31_comment2)
    db.session.add(post31_comment3)
    db.session.add(post31_comment4)
    db.session.add(post32_comment1)
    db.session.add(post32_comment2)
    db.session.add(post32_comment3)
    db.session.add(post32_comment4)
    db.session.add(post32_comment5)
    db.session.add(post33_comment1)
    db.session.add(post33_comment2)
    db.session.add(post33_comment3)
    db.session.add(post33_comment4)
    db.session.add(post34_comment1)
    db.session.add(post34_comment2)
    db.session.add(post34_comment3)
    db.session.add(post34_comment4)
    db.session.add(post34_comment5)
    db.session.add(post35_comment1)
    db.session.add(post35_comment2)
    db.session.add(post35_comment3)
    db.session.add(post35_comment4)
    db.session.add(post36_comment1)
    db.session.add(post36_comment2)
    db.session.add(post36_comment3)
    db.session.add(post37_comment1)
    db.session.add(post37_comment2)
    db.session.add(post38_comment1)
    db.session.add(post38_comment2)
    db.session.add(post38_comment3)
    db.session.add(post38_comment4)
    db.session.add(post38_comment5)
    db.session.add(post38_comment6)
    db.session.add(post39_comment1)
    db.session.add(post39_comment2)
    db.session.add(post39_comment3)
    db.session.add(post40_comment1)
    db.session.add(post40_comment2)
    db.session.add(post40_comment3)
    db.session.add(post40_comment4)
    db.session.add(post41_comment1)
    db.session.add(post41_comment2)
    db.session.add(post42_comment1)
    db.session.add(post42_comment2)
    db.session.add(post43_comment1)
    db.session.add(post43_comment2)
    db.session.add(post43_comment3)
    db.session.add(post43_comment4)
    db.session.add(post44_comment1)
    db.session.add(post44_comment2)
    db.session.add(post44_comment3)
    db.session.add(post45_comment1)
    db.session.add(post45_comment2)
    db.session.add(post46_comment1)
    db.session.add(post46_comment2)
    db.session.add(post47_comment1)
    db.session.add(post47_comment2)
    db.session.add(post47_comment3)
    db.session.add(post48_comment1)
    db.session.add(post48_comment2)
    db.session.add(post49_comment1)
    db.session.add(post49_comment2)
    db.session.add(post50_comment1)
    db.session.add(post50_comment2)
    db.session.add(post50_comment3)
    db.session.add(post51_comment1)
    db.session.add(post51_comment2)
    db.session.add(post51_comment3)
    db.session.add(post51_comment4)
    db.session.add(post52_comment1)
    db.session.add(post52_comment2)
    db.session.add(post52_comment3)
    db.session.add(post52_comment4)
    db.session.add(post53_comment1)
    db.session.add(post53_comment2)
    db.session.add(post53_comment3)
    db.session.add(post53_comment4)
    db.session.add(post53_comment5)
    db.session.add(post53_comment6)
    db.session.add(post54_comment1)
    db.session.add(post54_comment2)
    db.session.add(post54_comment3)
    db.session.add(post55_comment1)
    db.session.add(post55_comment2)
    db.session.add(post55_comment3)
    db.session.add(post55_comment4)
    db.session.add(post56_comment1)
    db.session.add(post56_comment2)
    db.session.add(post56_comment3)
    db.session.add(post57_comment1)
    db.session.add(post57_comment2)
    db.session.add(post57_comment3)
    db.session.add(post57_comment4)
    db.session.add(post57_comment5)
    db.session.add(post58_comment1)
    db.session.add(post58_comment2)
    db.session.add(post58_comment3)
    db.session.add(post58_comment4)
    db.session.add(post58_comment5)
    db.session.add(post58_comment6)
    db.session.add(post59_comment1)
    db.session.add(post59_comment2)
    db.session.add(post59_comment3)
    db.session.add(post59_comment4)
    db.session.add(post60_comment1)
    db.session.add(post60_comment2)
    db.session.add(post60_comment3)
    db.session.add(post60_comment4)
    db.session.add(post61_comment1)
    db.session.add(post61_comment2)
    db.session.add(post61_comment3)
    db.session.add(post62_comment1)
    db.session.add(post62_comment2)
    db.session.add(post62_comment3)
    db.session.add(post63_comment1)
    db.session.add(post63_comment2)
    db.session.add(post63_comment3)
    db.session.add(post64_comment1)
    db.session.add(post64_comment2)
    db.session.add(post64_comment3)
    db.session.add(post64_comment4)
    db.session.add(post65_comment1)
    db.session.add(post65_comment2)
    db.session.add(post65_comment3)
    db.session.add(post66_comment1)
    db.session.add(post66_comment2)
    db.session.add(post66_comment3)
    db.session.add(post66_comment4)
    db.session.add(post67_comment1)
    db.session.add(post67_comment2)
    db.session.add(post67_comment3)
    db.session.add(post68_comment1)
    db.session.add(post68_comment2)
    db.session.add(post68_comment3)
    db.session.add(post68_comment4)
    db.session.add(post69_comment1)
    db.session.add(post69_comment2)
    db.session.add(post69_comment3)
    db.session.add(post70_comment1)


    db.session.commit()

def undo_comments():
    db.session.execute("DELETE FROM comments")
    db.session.commit()
