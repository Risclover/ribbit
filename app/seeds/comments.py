import random
from app.models import db, Comment, Post
from datetime import datetime, timedelta

def generate_comment_timestamp(parent_timestamp, max_delay_hours=24):
    """
    Generate a random datetime after the parent_timestamp, within a specified delay.

    :param parent_timestamp: The datetime of the parent post or comment.
    :param max_delay_hours: Maximum number of hours after the parent_timestamp.
    :return: A datetime object representing the comment's created_at.
    """
    now = datetime.now()

    # The comment should be after the parent timestamp but not in the future
    earliest = parent_timestamp + timedelta(seconds=1)  # Ensure it's after
    latest = min(parent_timestamp + timedelta(hours=max_delay_hours), now)

    # If the latest possible time is before the earliest, set to earliest
    if latest < earliest:
        return earliest

    # Calculate the delta between earliest and latest
    delta = latest - earliest
    random_seconds = random.randint(0, int(delta.total_seconds()))

    return earliest + timedelta(seconds=random_seconds)


def seed_comments():
    # Dictionary to hold comments by a temporary key for easy reference
    comments_dict = {}

    # ----------------------- POST 1 -----------------------#
    post1 = Post.query.get(1)
    comment1_createdat = generate_comment_timestamp(post1.created_at)
    comments_dict['1'] = Comment(
        content="She’s sitting there so patiently for you 🥰🥰",
        user_id=3,
        post_id=1,
        created_at=comment1_createdat,
        updated_at=comment1_createdat
    )
    db.session.add(comments_dict['1'])
    db.session.flush()  # Assigns an ID to comment '1'

    comment2_createdat = generate_comment_timestamp(comments_dict['1'].created_at)
    comments_dict['2'] = Comment(
        content="She wants another!",
        user_id=4,
        post_id=1,
        parent_id=comments_dict['1'].id,  # Correct parent reference
        created_at=comment2_createdat,
        updated_at=comment2_createdat
    )
    db.session.add(comments_dict['2'])
    db.session.flush()  # Assigns an ID to comment '2'

    comment3_createdat = generate_comment_timestamp(comments_dict['2'].created_at)
    comments_dict['3'] = Comment(
        content="i'm scrolling this damn thread looking for solution (even though i dont own a cat) and y'all fawning over the cute cat",
        user_id=5,
        post_id=1,
        parent_id=comments_dict['2'].id,  # Correct parent reference
        created_at=comment3_createdat,
        updated_at=comment3_createdat
    )
    db.session.add(comments_dict['3'])

    comment4_createdat=generate_comment_timestamp(post1.created_at)
    comments_dict['4'] = Comment(
        content="this is what i thought animal testing for cosmetic products was when i was a kid",
        user_id=6,
        post_id=1,
        created_at=comment4_createdat,
        updated_at=comment4_createdat
    )
    db.session.add(comments_dict['4'])

    comment5_createdat = generate_comment_timestamp(post1.created_at)
    comments_dict['5'] = Comment(
        content="The merchandise for the BBC Top Gear series has(had?) a label in them that said \"we tested these clothes on animals. They didn't fit.\"",
        user_id=4,
        post_id=1,
        created_at=comment5_createdat,
        updated_at=comment5_createdat
    )
    db.session.add(comments_dict['5'])

    comment6_createdat = generate_comment_timestamp(post1.created_at)
    comments_dict['6'] = Comment(
        content="Try white lipstick",
        user_id=7,
        post_id=1,
        created_at=comment6_createdat,
        updated_at=comment6_createdat
    )
    db.session.add(comments_dict['6'])
    db.session.flush()  # Assigns an ID to comment '6'

    comment7_createdat = generate_comment_timestamp(comments_dict['6'].created_at)
    comments_dict['7'] = Comment(
        content="Lmao might cover",
        user_id=2,
        post_id=1,
        parent_id=comments_dict['6'].id,  # Correct parent reference
        created_at=comment7_createdat,
        updated_at=comment7_createdat
    )
    db.session.add(comments_dict['7'])

    # ----------------------- POST 2 -----------------------#
    comments_dict['8'] = Comment(
        content="Stepan looks like a cool cat. Happy Birthday to one swish feline",
        user_id=8,
        post_id=2
    )
    db.session.add(comments_dict['8'])

    comments_dict['9'] = Comment(
        content="""Such a cute picture.

Stephan doesn't look impressed by the cake at all 🤣""",
        user_id=9,
        post_id=2
    )
    db.session.add(comments_dict['9'])
    db.session.flush()  # Assigns an ID to comment '9'

    comments_dict['10'] = Comment(
        content="It looks like chocolate and sugar. Stephan is pissed because he definitely won't be allowed a slice betcause it's made of two things that are bad for cats.",
        user_id=10,
        post_id=2,
        parent_id=comments_dict['9'].id  # Correct parent reference
    )
    db.session.add(comments_dict['10'])
    db.session.flush()

    comments_dict['11'] = Comment(
        content="Perfect birthday for a cat would be a \"cake\" which is literally just an open can of tuna or sardines, a cardboard box to play in, and random bread ties spread around the floor. Maybe even a few bonus decoy valuables for them to push off of the shelves.",
        user_id=11,
        post_id=2,
        parent_id=comments_dict['10'].id  # Correct parent reference
    )
    db.session.add(comments_dict['11'])
    db.session.flush()  # Assigns an ID to comment '11'

    comments_dict['12'] = Comment(
        content="This guy cats.",
        user_id=12,
        post_id=2,
        parent_id=comments_dict['11'].id  # Correct parent reference
    )
    db.session.add(comments_dict['12'])

    comments_dict['13'] = Comment(
        content="Some after-dinner catnip.",
        user_id=13,
        post_id=2,
        parent_id=comments_dict['11'].id  # Correct parent reference
    )
    db.session.add(comments_dict['13'])

    comments_dict['14'] = Comment(
        content="\"16 already? I'm getting to old for this\"",
        user_id=14,
        post_id=2
    )
    db.session.add(comments_dict['14'])

    comments_dict['15'] = Comment(
        content="That cat needs a gold chain with the way he's sitting",
        user_id=15,
        post_id=2
    )
    db.session.add(comments_dict['15'])

    # ----------------------- POST 3 -----------------------#
    comments_dict['16'] = Comment(
        content="Me pretending to be in a music video to a sad song",
        user_id=16,
        post_id=3
    )
    db.session.add(comments_dict['16'])
    db.session.flush()

    comments_dict['17'] = Comment(
        content="For some reason when I saw this picture I had Dido's song Thank You play in my head.",
        user_id=17,
        post_id=3,
        parent_id=comments_dict['16'].id  # Correct parent reference
    )
    db.session.add(comments_dict['17'])
    db.session.flush()  # Assigns an ID to comment '17'

    comments_dict['18'] = Comment(
        content="Honestly it fits.",
        user_id=16,
        post_id=3,
        parent_id=comments_dict['17'].id  # Correct parent reference
    )
    db.session.add(comments_dict['18'])

    comments_dict['19'] = Comment(
        content="This made my day.",
        user_id=18,
        post_id=3
    )
    db.session.add(comments_dict['19'])
    db.session.flush()

    comments_dict['20'] = Comment(
        content="Glad it brought a smile to your face! I think it's competing with all of us in the art of deep thinking",
        user_id=4,
        post_id=3,
        parent_id=comments_dict['19'].id
    )
    db.session.add(comments_dict['20'])

    # ----------------------- POST 4 -----------------------#
    comments_dict['21'] = Comment(
        content="That'll get you <em>maybe</em> to round two, but without a parent or sibling who died of cancer before they got a chance to see you perform on stage, you have 0 chance of making the finals.",
        user_id=19,
        post_id=4
    )
    db.session.add(comments_dict['21'])
    db.session.flush()  # Assigns an ID to comment '21'

    comments_dict['22'] = Comment(
        content="Ao are you saying I can win if I make some sacrifices?",
        user_id=20,
        post_id=4,
        parent_id=comments_dict['21'].id  # Correct parent reference
    )
    db.session.add(comments_dict['22'])
    db.session.flush()

    comments_dict['23'] = Comment(
        content="<em>The hardest choices require the strongest wills.</em>",
        user_id=19,
        post_id=4,
        parent_id=comments_dict['22'].id  # Correct parent reference
    )
    db.session.add(comments_dict['23'])

    comments_dict['24'] = Comment(
        content="She’s not just a mom, she’s a PR mastermind—AGT’s next season opener!",
        user_id=21,
        post_id=4
    )
    db.session.add(comments_dict['24'])

    comments_dict['25'] = Comment(
        content="Perfect match - you: comedy, her: drama",
        user_id=22,
        post_id=4
    )
    db.session.add(comments_dict['25'])

    comments_dict['26'] = Comment(
        content="""I don't know if AGT has these, but if the American version is anything like Britain's Got Talent, the surest way to get to the finals is to be in a choir of disabled children and sing either "A Million Dreams" or "This Is Me" from The Greatest Showman.

No matter how objectively shitty they sound, that's an immediate golden buzzer from a teary-eyed judge during the audition round.""",
        user_id=23,
        post_id=4
    )
    db.session.add(comments_dict['26'])
    db.session.flush()  # Assigns an ID to comment '26'

    comments_dict['27'] = Comment(
        content="Seeing the final round is always so surreal to me because im like what happened to the sick contortionist i was rooting for?",
        user_id=24,
        post_id=4,
        parent_id=comments_dict['26'].id  # Correct parent reference
    )
    db.session.add(comments_dict['27'])

    comments_dict['28'] = Comment(
        content="RuPaul's Drag Race has a similar problem, with production pushing contestants to share sob stories they might not want on TV. Contestants joke about strategically sharing trauma to get production to keep them around, and Alexis Mateo is revered by the fandom for straight up inventing a KIA/MIA boyfriend for a 4th of July episode.",
        user_id=25,
        post_id=4,
        parent_id=comments_dict['26'].id  # Correct parent reference
    )
    db.session.add(comments_dict['28'])

    comments_dict['29'] = Comment(
        content="Cute, but I really really dislike that everything has to be a sob story. Just swing from those monkey bars or sing/ dance your heart out, that's what I want to see",
        user_id=26,
        post_id=4
    )
    db.session.add(comments_dict['29'])

    # ----------------------- POST 5 -----------------------#
    comments_dict['30'] = Comment(
        content="My grandpa was daydoo. He’d come home from work and see me every day, immediately saying \"hey dude!\" I would try, but the best I could do was \"daydoo!\"",
        user_id=27,
        post_id=5
    )
    db.session.add(comments_dict['30'])
    db.session.flush()  # Assigns an ID to comment '30'

    comments_dict['31'] = Comment(
        content="""I really hope you were like 43 years old when this happened.

You had no speech impediments, you just wanted to fuck with him.""",
        user_id=28,
        post_id=5,
        parent_id=comments_dict['30'].id  # Correct parent reference
    )
    db.session.add(comments_dict['31'])
    db.session.flush()  # Assigns an ID to comment '31'

    comments_dict['32'] = Comment(
        content="Hahaha that would have been hilarious, but sadly I was like 2-3 years old",
        user_id=27,
        post_id=5,
        parent_id=comments_dict['31'].id  # Correct parent reference
    )
    db.session.add(comments_dict['32'])

    comments_dict['33'] = Comment(
        content="This is so cute",
        user_id=29,
        post_id=5,
        parent_id=comments_dict['31'].id  # Correct parent reference
    )
    db.session.add(comments_dict['33'])

    comments_dict['34'] = Comment(
        content="My toddler calls me \"Dadoo\" sometimes and I wondered why, but I say \"hey dude!\" to him all the time so this all makes sense now lmao",
        user_id=30,
        post_id=5,
        parent_id=comments_dict['30'].id  # Correct parent reference
    )
    db.session.add(comments_dict['34'])

    comments_dict['35'] = Comment(
        content="""Pretty much what happened to my mum with our first child.

She wanted to be Grandma, he couldn't say Grandma, so now's she's Bana.

Eldest is now 6 and we have another kid who's 3 with whom she is also Bana.

Sorry mum!""",
        user_id=31,
        post_id=5
    )
    db.session.add(comments_dict['35'])
    db.session.flush()  # Assigns an ID to comment '35'

    comments_dict['36'] = Comment(
        content="I'm buba and I love it. I have none of those letters in my name.",
        user_id=32,
        post_id=5,
        parent_id=comments_dict['35'].id  # Correct parent reference
    )
    db.session.add(comments_dict['36'])
    db.session.flush()

    comments_dict['37'] = Comment(
        content="My grandpa was named Maurice. He got called Dippy",
        user_id=33,
        post_id=5,
        parent_id=comments_dict['36'].id  # Correct parent reference
    )
    db.session.add(comments_dict['37'])

    # ----------------------- POST 6 -----------------------#
    comments_dict['38'] = Comment(
        content="Well. Where was it?!?",
        user_id=34,
        post_id=1
    )
    db.session.add(comments_dict['38'])
    db.session.flush()

    comments_dict['39'] = Comment(
        content="Right!?!? Cliffhanger!!!",
        user_id=35,
        post_id=1,
        parent_id=comments_dict['38'].id  # Correct parent reference
    )
    db.session.add(comments_dict['39'])
    db.session.flush()  # Assigns an ID to comment '39'

    comments_dict['40'] = Comment(
        content="LOST",
        user_id=36,
        post_id=1,
        parent_id=comments_dict['39'].id  # Correct parent reference
    )
    db.session.add(comments_dict['40'])

    comments_dict['41'] = Comment(
        content="Not behind her bed",
        user_id=37,
        post_id=1,
        parent_id=comments_dict['39'].id  # Correct parent reference
    )
    db.session.add(comments_dict['41'])
    db.session.flush()

    comments_dict['42'] = Comment(
        content="I can almost guarantee it is not there.",
        user_id=38,
        post_id=1,
        parent_id=comments_dict['41'].id  # Correct parent reference
    )
    db.session.add(comments_dict['42'])

    comments_dict['43'] = Comment(
        content="4 year old me was specifically told not to tell my Father we got him a hammer for Christmas. As he was opening his gift I blurted out, \"It's not a hammer.\"",
        user_id=39,
        post_id=1
    )
    db.session.add(comments_dict['43'])

    comments_dict['44'] = Comment(
        content="Holy shit! A post that's actually oddly specific. Well, it's actually suspiciously specific, but hey, you guys got close.",
        user_id=40,
        post_id=1
    )
    db.session.add(comments_dict['44'])

    # ----------------------- POST 7 -----------------------#
    comments_dict['45'] = Comment(
        content="What chance of success do they have? I'm all for it, should've been done a long while ago.",
        user_id=41,
        post_id=7
    )
    db.session.add(comments_dict['45'])
    db.session.flush()

    comments_dict['46'] = Comment(
        content="It's a valid argument, but it's up against a giant pile of money. Money has been winning lately.",
        user_id=42,
        post_id=7,
        parent_id=comments_dict['45'].id  # Correct parent reference
    )
    db.session.add(comments_dict['46'])

    comments_dict['47'] = Comment(
        content="Just rename it KotlinScript.",
        user_id=43,
        post_id=7
    )
    db.session.add(comments_dict['47'])
    db.session.flush()

    comments_dict['48'] = Comment(
        content="Jetbrains would like a word.",
        user_id=44,
        post_id=7,
        parent_id=comments_dict['47'].id  # Correct parent reference
    )
    db.session.add(comments_dict['48'])

    comments_dict['49'] = Comment(
        content="Let's get MySQL back too. Adobe can keep Acrobat, but websites need to stop saying to download it to view pdfs.",
        user_id=45,
        post_id=7
    )
    db.session.add(comments_dict['49'])

    comments_dict['50'] = Comment(
        content="This sounds an awul lot like poking the bear. Hopefully the slumbering beast doesn't wake and decide that all JS runtimes need to pay licensing costs back to the owners of the trademark. Or worse, users of the runtime.",
        user_id=46,
        post_id=7
    )
    db.session.add(comments_dict['50'])

    # ----------------------- POST 8 -----------------------#
    comments_dict['51'] = Comment(
        content="""Beginners don't know what they don't know :)

I have mentored folks for about a decade. The common concepts beginners struggle with are:

Passing by value vs passing by reference.

What a reference is. How references are accessed in JavaScript. Garbage collection.

Mutability vs immutability

The event loop and asynchronous operations

Prototypal inheritance

Basic client/server architecture

Basic HTTP and network concepts

Headers

More broadly, beginners hyper focus on syntax, libraries and frameworks because "they want to get a job" and massively underinvest in DS&A, which immediately filters them out from the jobs they are seeking. Even in frontend, you need a good grasp on how to use data structures in JS to solve common problems (traversing a DOM tree, building a cache, general data munging).""",
        user_id=47,
        post_id=8
    )
    db.session.add(comments_dict['51'])

    comments_dict['52'] = Comment(
        content="They probably don't know it (and I guess it's not strictly JavaScript), but they're really confused about CORS.",
        user_id=48,
        post_id=8
    )
    db.session.add(comments_dict['52'])
    db.session.flush()

    comments_dict['53'] = Comment(
        content="CORS isn't a JavaScript concept, but an HTTP one",
        user_id=9,
        post_id=8,
        parent_id=comments_dict['52'].id  # Correct parent reference
    )
    db.session.add(comments_dict['53'])

    comments_dict['54'] = Comment(
        content="Structuring a project",
        user_id=49,
        post_id=8
    )
    db.session.add(comments_dict['54'])

    comments_dict['55'] = Comment(
        content="Any videos to learn it?",
        user_id=50,
        post_id=8
    )
    db.session.add(comments_dict['55'])
    db.session.flush()  # Assigns an ID to comment '55'

    comments_dict['56'] = Comment(
        content="Not yet, I might adapt it to video form as well",
        user_id=9,
        post_id=8,
        parent_id=comments_dict['55'].id  # Correct parent reference
    )
    db.session.add(comments_dict['56'])

    # ----------------------- POST 9 -----------------------#
    comments_dict['57'] = Comment(
        content="""This is cool. Migrated my own website. No noticeable changes.

The only thing now blocking Remix (RRv7) from getting RSC is React v19 release.

Would be crazy if it dropped before the holiday season.""",
        user_id=1,
        post_id=9
    )
    db.session.add(comments_dict['57'])
    db.session.flush()

    comments_dict['58'] = Comment(
        content="""I'm reading the migration docs and it doesn't seem like there's anything which affects my project - pretty nice for a major version bump I guess.

Was it that easy for you?""",
        user_id=2,
        post_id=9,
        parent_id=comments_dict['57'].id  # Correct parent reference
    )
    db.session.add(comments_dict['58'])
    db.session.flush()  # Assigns an ID to comment '58'

    comments_dict['59'] = Comment(
        content="Literally didn't change anything in the codebase.",
        user_id=1,
        post_id=9,
        parent_id=comments_dict['58'].id  # Correct parent reference
    )
    db.session.add(comments_dict['59'])

    comments_dict['60'] = Comment(
        content="The moment Remix gets RSC I’m gonna have to strongly consider switching us over from Next. I’m not on the anti-vercel bandwagon, I just don’t have high hopes in Next being basically the sole remaining Webpack-based framework",
        user_id=3,
        post_id=9,
        parent_id=comments_dict['58'].id  # Correct parent reference
    )
    db.session.add(comments_dict['60'])

    comments_dict['61'] = Comment(
        content="""Congratulations to the Vite team on another awesome release! The environment API is a game-changer for framework authors. It will make it much easier to implement runtime dependent features like RSCs.

Vite is so powerful yet so easy to use. There's a reason that the entire ecosystem (except Next.js lol) has gravitated towards it to the point that it's basically the industry standard. Vue is great, but I think Vite will be Evan You's lasting legacy.""",
        user_id=4,
        post_id=9
    )
    db.session.add(comments_dict['61'])
    db.session.flush()

    comments_dict['62'] = Comment(
        content="Industry standard? What industry are you talking about my bro? The industry of fairy land?",
        user_id=5,
        post_id=9,
        parent_id=comments_dict['61'].id  # Correct parent reference
    )
    db.session.add(comments_dict['62'])

    # ----------------------- POST 10 -----------------------#
    comments_dict['63'] = Comment(
        content="""Perfect fluffy round paws.

*fixed it for you""",
        user_id=6,
        post_id=10
    )
    db.session.add(comments_dict['63'])
    db.session.flush()

    comments_dict['64'] = Comment(
        content="Purrfect fluffy round paws. *fixed it for you",
        user_id=7,
        post_id=10,
        parent_id=comments_dict['63'].id  # Correct parent reference
    )
    db.session.add(comments_dict['64'])
    db.session.flush()

    comments_dict['65'] = Comment(
        content="I call em Proper Paws. Idk if I fixed it or not, but I contributed :P",
        user_id=8,
        post_id=10,
        parent_id=comments_dict['64'].id  # Correct parent reference
    )
    db.session.add(comments_dict['65'])
    db.session.flush()  # Assigns an ID to comment '65'

    comments_dict['66'] = Comment(
        content="Like cotton balls",
        user_id=9,
        post_id=10
    )
    db.session.add(comments_dict['66'])
    db.session.flush()

    comments_dict['67'] = Comment(
        content="But with retractable needles.",
        user_id=10,
        post_id=10,
        parent_id=comments_dict['66'].id  # Correct parent reference
    )
    db.session.add(comments_dict['67'])

    comments_dict['68'] = Comment(
        content="Oh my god…. i am mesmerized 🤩🫶",
        user_id=12,
        post_id=10
    )
    db.session.add(comments_dict['68'])

    # ----------------------- POST 11 -----------------------#
    comments_dict['69'] = Comment(
        content="what cat?",
        user_id=13,
        post_id=11
    )
    db.session.add(comments_dict['69'])
    db.session.flush()

    comments_dict['70'] = Comment(
        content="Doesn't look like anything to me",
        user_id=14,
        post_id=11,
        parent_id=comments_dict['69'].id
    )
    db.session.add(comments_dict['70'])

    comments_dict['71'] = Comment(
        content="After a ton of editing, yes.",
        user_id=15,
        post_id=11
    )
    db.session.add(comments_dict['71'])
    db.session.flush()

    comments_dict['72'] = Comment(
        content="I might blend into the wood if you color shift and saturate me this much.",
        user_id=16,
        post_id=11,
        parent_id=comments_dict['71'].id
    )
    db.session.add(comments_dict['72'])

    comments_dict['73'] = Comment(
        content="In the original image, the cat is a brown tabby.",
        user_id=17,
        post_id=11,
        parent_id=comments_dict['71'].id
    )
    db.session.add(comments_dict['73'])

    comments_dict['74'] = Comment(
        content="This is ca(t)mouflage.",
        user_id=18,
        post_id=11
    )
    db.session.add(comments_dict['74'])

    # ----------------------- POST 12 -----------------------#
    comments_dict['75'] = Comment(
        content="I like how the feet shake off the sand before getting back into the shoes",
        user_id=19,
        post_id=12
    )
    db.session.add(comments_dict['75'])
    db.session.flush()

    comments_dict['76'] = Comment(
        content="I couldn't comprehend doing that. You are not getting all the sand off. I hate to admit I was kinda triggered by clay feet shaking off nonexistent sand and putting on clay shoes. lol I just avoid sand at all costs",
        user_id=20,
        post_id=12,
        parent_id=comments_dict['75'].id
    )
    db.session.add(comments_dict['76'])

    comments_dict['77'] = Comment(
        content="Honestly, I would compare this to Avatar",
        user_id=21,
        post_id=12
    )
    db.session.add(comments_dict['77'])

    comments_dict['78'] = Comment(
        content="8 kg of clay, but how much time did you use?",
        user_id=22,
        post_id=12
    )
    db.session.add(comments_dict['78'])
    db.session.flush()

    comments_dict['79'] = Comment(
        content="We need someone to do the math on the time spent to progress ratio of Ben Wyatt's claymation and then apply it here.",
        user_id=23,
        post_id=12,
        parent_id=comments_dict['78'].id
    )
    db.session.add(comments_dict['79'])
    db.session.flush()

    comments_dict['80'] = Comment(
        content="STAND IN THE PLACE WHERE YOU L-",
        user_id=24,
        post_id=12,
        parent_id=comments_dict['79'].id
    )
    db.session.add(comments_dict['80'])
    db.session.flush()

    comments_dict['81'] = Comment(
        content="Oh my god...... That's the whole thing....",
        user_id=25,
        post_id=12,
        parent_id=comments_dict['80'].id
    )
    db.session.add(comments_dict['81'])

    # ----------------------- POST 13 -----------------------#
    comments_dict['82'] = Comment(
        content="Omgggg she’s so tiny 🥹🥹",
        user_id=26,
        post_id=13
    )
    db.session.add(comments_dict['82'])
    db.session.flush()

    comments_dict['83'] = Comment(
        content="That's because she's under the compressor.",
        user_id=27,
        post_id=13,
        parent_id=comments_dict['82'].id
    )
    db.session.add(comments_dict['83'])

    comments_dict['84'] = Comment(
        content="OMG. You did not exaggerate, OP. 🥹❤️",
        user_id=28,
        post_id=13
    )
    db.session.add(comments_dict['84'])
    db.session.flush()

    comments_dict['85'] = Comment(
        content="My boyfriend sent this to me from his woodshop downstairs and I truly almost fell over when I saw her lol. Had to share.",
        user_id=12,
        post_id=13,
        parent_id=comments_dict['84'].id
    )
    db.session.add(comments_dict['85'])

    comments_dict['86'] = Comment(
        content="The embodiment of 🥺",
        user_id=29,
        post_id=13
    )
    db.session.add(comments_dict['86'])
    db.session.flush()

    comments_dict['87'] = Comment(
        content="💯",
        user_id=12,
        post_id=13,
        parent_id=comments_dict['86'].id
    )
    db.session.add(comments_dict['87'])

    # ----------------------- POST 14 -----------------------#
    comments_dict['88'] = Comment(
        content="Keeping it?? 🥹",
        user_id=30,
        post_id=14
    )
    db.session.add(comments_dict['88'])
    db.session.flush()

    comments_dict['89'] = Comment(
        content="No but she was adopted :)",
        user_id=13,
        post_id=14,
        parent_id=comments_dict['88'].id
    )
    db.session.add(comments_dict['89'])

    comments_dict['90'] = Comment(
        content="What a cute little kitty 🐈",
        user_id=31,
        post_id=14
    )
    db.session.add(comments_dict['90'])

    comments_dict['91'] = Comment(
        content="You were the lucky one to be blessed with this smile! Kitten looks so calm and protected!!",
        user_id=32,
        post_id=14
    )
    db.session.add(comments_dict['91'])

    # ----------------------- POST 15 -----------------------#
    comments_dict['92'] = Comment(
        content="Whiskey doesn’t age — it matures.",
        user_id=33,
        post_id=15
    )
    db.session.add(comments_dict['92'])
    db.session.flush()

    comments_dict['93'] = Comment(
        content="Phenomenal comment.No notes.",
        user_id=34,
        post_id=15,
        parent_id=comments_dict['92'].id
    )
    db.session.add(comments_dict['93'])

    comments_dict['94'] = Comment(
        content="The fluff of a kitten. The dead eyed rage of a senior.",
        user_id=35,
        post_id=15
    )
    db.session.add(comments_dict['94'])
    db.session.flush()

    comments_dict['95'] = Comment(
        content="😂 so true.",
        user_id=36,
        post_id=15,
        parent_id=comments_dict['94'].id
    )
    db.session.add(comments_dict['95'])

    comments_dict['96'] = Comment(
        content="The posture of an owl.",
        user_id=37,
        post_id=15,
        parent_id=comments_dict['94'].id
    )
    db.session.add(comments_dict['96'])

    # ----------------------- POST 16 -----------------------#
    comments_dict['97'] = Comment(
        content="Gotta be in Hawaii lol",
        user_id=38,
        post_id=16
    )
    db.session.add(comments_dict['97'])

    comments_dict['98'] = Comment(
        content="It’s police only. If you’re not police you can proceed",
        user_id=39,
        post_id=16
    )
    db.session.add(comments_dict['98'])

    comments_dict['99'] = Comment(
        content="If the stop sign is blue, you should probably slow down. Congrats on the fast shutter speed to get the picture though.",
        user_id=40,
        post_id=16
    )
    db.session.add(comments_dict['99'])

    # ----------------------- POST 17 -----------------------#
    comments_dict['100'] = Comment(
        content="\"Due to none of your fucking business we are closing Tuesdays.\"",
        user_id=41,
        post_id=17
    )
    db.session.add(comments_dict['100'])

    comments_dict['101'] = Comment(
        content="Usually Tuesday is the slowest day off the week for restaurant. In US, a lot of Chinese take out places are closed on Tuesday for this reason",
        user_id=42,
        post_id=17
    )
    db.session.add(comments_dict['101'])
    db.session.flush()

    comments_dict['102'] = Comment(
        content="Yup. My favorite Chinese place in town is closed Tuesdays and so is my favorite Ramen place",
        user_id=43,
        post_id=17,
        parent_id=comments_dict['101'].id
    )
    db.session.add(comments_dict['102'])
    db.session.flush()

    comments_dict['103'] = Comment(
        content="Are they both the same Closed Tuesdays, or do you have two restaurants that share a name in your town?",
        user_id=44,
        post_id=17,
        parent_id=comments_dict['102'].id
    )
    db.session.add(comments_dict['103'])
    db.session.flush()

    comments_dict['104'] = Comment(
        content="Must be franchised because Closed Tuesdays opened a restaurant in my town. They're frequently Closed Fridays due to staffing.",
        user_id=45,
        post_id=17,
        parent_id=comments_dict['103'].id
    )
    db.session.add(comments_dict['104'])

    comments_dict['105'] = Comment(
        content="A small tobacco store i Sweden had a note a couple years back that said \"closed because of robbery\". They guy working there went to rob a bank.",
        user_id=46,
        post_id=17
    )
    db.session.add(comments_dict['105'])
    db.session.flush()

    comments_dict['106'] = Comment(
        content="Brilliant.",
        user_id=47,
        post_id=17,
        parent_id=comments_dict['105'].id
    )
    db.session.add(comments_dict['106'])

    # ----------------------- POST 18 -----------------------#
    # No comments

    # ----------------------- POST 19 -----------------------#
    comments_dict['107'] = Comment(
        content="I witnessed enough engineers with ego problems.",
        user_id=48,
        post_id=19
    )
    db.session.add(comments_dict['107'])
    db.session.flush()

    comments_dict['108'] = Comment(
        content="It is honestly not talked about enough in this industry. Since the CompSci boom it has been pretty bad.",
        user_id=49,
        post_id=19,
        parent_id=comments_dict['107'].id
    )
    db.session.add(comments_dict['108'])

    comments_dict['109'] = Comment(
        content="Every team I’ve been on was severely understaffed lol. We’re always thrilled to have someone else help us get through the decades-old backlog",
        user_id=50,
        post_id=19
    )
    db.session.add(comments_dict['109'])

    comments_dict['110'] = Comment(
        content="Engineers can wildly vary on their non-negotiable opinions though. Linux/Mac/Windows... Vim/VSCode/Jetbrains...",
        user_id=1,
        post_id=19
    )
    db.session.add(comments_dict['110'])

    # ----------------------- POST 20 -----------------------#



    db.session.commit()

def undo_comments():
    db.session.execute("DELETE FROM comments")
    db.session.commit()
