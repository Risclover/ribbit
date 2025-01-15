import random
from app.models import db, Comment, Post
from datetime import datetime, timedelta

def generate_comment_timestamp(parent_timestamp, max_delay_hours=72):
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
    post2 = Post.query.get(2)

    comment8_createdat = generate_comment_timestamp(post2.created_at)
    comments_dict['8'] = Comment(
        content="Stepan looks like a cool cat. Happy Birthday to one swish feline",
        user_id=8,
        post_id=2,
        created_at=comment8_createdat,
        updated_at=comment8_createdat
    )
    db.session.add(comments_dict['8'])

    comment9_createdat=generate_comment_timestamp(post2.created_at)
    comments_dict['9'] = Comment(
        content="""Such a cute picture.

Stephan doesn't look impressed by the cake at all 🤣""",
        user_id=9,
        post_id=2,
        created_at=comment9_createdat,
        updated_at=comment9_createdat
    )
    db.session.add(comments_dict['9'])
    db.session.flush()  # Assigns an ID to comment '9'

    comment10_createdat=generate_comment_timestamp(comments_dict['9'].created_at)
    comments_dict['10'] = Comment(
        content="It looks like chocolate and sugar. Stephan is pissed because he definitely won't be allowed a slice betcause it's made of two things that are bad for cats.",
        user_id=10,
        post_id=2,
        parent_id=comments_dict['9'].id,  # Correct parent reference
        created_at=comment10_createdat,
        updated_at=comment10_createdat
    )
    db.session.add(comments_dict['10'])
    db.session.flush()

    comment11_createdat=generate_comment_timestamp(comments_dict['10'].created_at)
    comments_dict['11'] = Comment(
        content="Perfect birthday for a cat would be a \"cake\" which is literally just an open can of tuna or sardines, a cardboard box to play in, and random bread ties spread around the floor. Maybe even a few bonus decoy valuables for them to push off of the shelves.",
        user_id=11,
        post_id=2,
        parent_id=comments_dict['10'].id,  # Correct parent reference
        created_at=comment11_createdat,
        updated_at=comment11_createdat
    )
    db.session.add(comments_dict['11'])
    db.session.flush()  # Assigns an ID to comment '11'

    comment12_createdat=generate_comment_timestamp(comments_dict['11'].created_at)
    comments_dict['12'] = Comment(
        content="This guy cats.",
        user_id=12,
        post_id=2,
        parent_id=comments_dict['11'].id,  # Correct parent reference
        created_at=comment12_createdat,
        updated_at=comment12_createdat
    )
    db.session.add(comments_dict['12'])

    comment13_createdat=generate_comment_timestamp(comments_dict['11'].created_at)
    comments_dict['13'] = Comment(
        content="Some after-dinner catnip.",
        user_id=13,
        post_id=2,
        parent_id=comments_dict['11'].id,  # Correct parent reference
        created_at=comment13_createdat,
        updated_at=comment13_createdat
    )
    db.session.add(comments_dict['13'])

    comment14_createdat=generate_comment_timestamp(post2.created_at)
    comments_dict['14'] = Comment(
        content="\"16 already? I'm getting to old for this\"",
        user_id=14,
        post_id=2,
        created_at=comment14_createdat,
        updated_at=comment14_createdat
    )
    db.session.add(comments_dict['14'])

    comment15_createdat=generate_comment_timestamp(post2.created_at)
    comments_dict['15'] = Comment(
        content="That cat needs a gold chain with the way he's sitting",
        user_id=15,
        post_id=2,
        created_at=comment15_createdat,
        updated_at=comment15_createdat
    )
    db.session.add(comments_dict['15'])

    # ----------------------- POST 3 -----------------------#
    post3 = Post.query.get(3)

    comment16_createdat=generate_comment_timestamp(post3.created_at)
    comments_dict['16'] = Comment(
        content="Me pretending to be in a music video to a sad song",
        user_id=16,
        post_id=3,
        created_at=comment16_createdat,
        updated_at=comment16_createdat
    )
    db.session.add(comments_dict['16'])
    db.session.flush()

    comment17_createdat=generate_comment_timestamp(comments_dict['16'].created_at)
    comments_dict['17'] = Comment(
        content="For some reason when I saw this picture I had Dido's song Thank You play in my head.",
        user_id=17,
        post_id=3,
        parent_id=comments_dict['16'].id,  # Correct parent reference
        created_at=comment17_createdat,
        updated_at=comment17_createdat
    )
    db.session.add(comments_dict['17'])
    db.session.flush()  # Assigns an ID to comment '17'

    comment18_createdat=generate_comment_timestamp(comments_dict['17'].created_at)
    comments_dict['18'] = Comment(
        content="Honestly it fits.",
        user_id=16,
        post_id=3,
        parent_id=comments_dict['17'].id,  # Correct parent reference
        created_at=comment18_createdat,
        updated_at=comment18_createdat
    )
    db.session.add(comments_dict['18'])

    comment19_createdat=generate_comment_timestamp(post3.created_at)
    comments_dict['19'] = Comment(
        content="This made my day.",
        user_id=18,
        post_id=3,
        created_at=comment19_createdat,
        updated_at=comment19_createdat
    )
    db.session.add(comments_dict['19'])
    db.session.flush()

    comment20_createdat=generate_comment_timestamp(comments_dict['19'].created_at)
    comments_dict['20'] = Comment(
        content="Glad it brought a smile to your face! I think it's competing with all of us in the art of deep thinking",
        user_id=4,
        post_id=3,
        parent_id=comments_dict['19'].id,
        created_at=comment20_createdat,
        updated_at=comment20_createdat
    )
    db.session.add(comments_dict['20'])

    # ----------------------- POST 4 -----------------------#
    post4 = Post.query.get(4)

    comment21_createdat=generate_comment_timestamp(post4.created_at)
    comments_dict['21'] = Comment(
        content="That'll get you <em>maybe</em> to round two, but without a parent or sibling who died of cancer before they got a chance to see you perform on stage, you have 0 chance of making the finals.",
        user_id=19,
        post_id=4,
        created_at=comment21_createdat,
        updated_at=comment21_createdat
    )
    db.session.add(comments_dict['21'])
    db.session.flush()  # Assigns an ID to comment '21'

    comment22_createdat=generate_comment_timestamp(comments_dict['21'].created_at)
    comments_dict['22'] = Comment(
        content="Ao are you saying I can win if I make some sacrifices?",
        user_id=20,
        post_id=4,
        parent_id=comments_dict['21'].id,  # Correct parent reference
        created_at=comment22_createdat,
        updated_at=comment22_createdat
    )
    db.session.add(comments_dict['22'])
    db.session.flush()

    comment23_createdat=generate_comment_timestamp(comments_dict['22'].created_at)
    comments_dict['23'] = Comment(
        content="<em>The hardest choices require the strongest wills.</em>",
        user_id=19,
        post_id=4,
        parent_id=comments_dict['22'].id,  # Correct parent reference
        created_at=comment23_createdat,
        updated_at=comment23_createdat
    )
    db.session.add(comments_dict['23'])

    comment24_createdat=generate_comment_timestamp(post4.created_at)
    comments_dict['24'] = Comment(
        content="She’s not just a mom, she’s a PR mastermind—AGT’s next season opener!",
        user_id=21,
        post_id=4,
        created_at=comment24_createdat,
        updated_at=comment24_createdat
    )
    db.session.add(comments_dict['24'])

    comment25_createdat=generate_comment_timestamp(post4.created_at)
    comments_dict['25'] = Comment(
        content="Perfect match - you: comedy, her: drama",
        user_id=22,
        post_id=4,
        created_at=comment25_createdat,
        updated_at=comment25_createdat
    )
    db.session.add(comments_dict['25'])

    comment26_createdat=generate_comment_timestamp(post4.created_at)
    comments_dict['26'] = Comment(
        content="""I don't know if AGT has these, but if the American version is anything like Britain's Got Talent, the surest way to get to the finals is to be in a choir of disabled children and sing either "A Million Dreams" or "This Is Me" from The Greatest Showman.

No matter how objectively shitty they sound, that's an immediate golden buzzer from a teary-eyed judge during the audition round.""",
        user_id=23,
        post_id=4,
        created_at=comment26_createdat,
        updated_at=comment26_createdat
    )
    db.session.add(comments_dict['26'])
    db.session.flush()  # Assigns an ID to comment '26'

    comment27_createdat=generate_comment_timestamp(comments_dict['26'].created_at)
    comments_dict['27'] = Comment(
        content="Seeing the final round is always so surreal to me because im like what happened to the sick contortionist i was rooting for?",
        user_id=24,
        post_id=4,
        parent_id=comments_dict['26'].id,  # Correct parent reference
        created_at=comment27_createdat,
        updated_at=comment27_createdat
    )
    db.session.add(comments_dict['27'])

    comment28_createdat=generate_comment_timestamp(comments_dict['26'].created_at)
    comments_dict['28'] = Comment(
        content="RuPaul's Drag Race has a similar problem, with production pushing contestants to share sob stories they might not want on TV. Contestants joke about strategically sharing trauma to get production to keep them around, and Alexis Mateo is revered by the fandom for straight up inventing a KIA/MIA boyfriend for a 4th of July episode.",
        user_id=25,
        post_id=4,
        parent_id=comments_dict['26'].id,  # Correct parent reference
        created_at=comment28_createdat,
        updated_at=comment28_createdat
    )
    db.session.add(comments_dict['28'])

    comment29_createdat=generate_comment_timestamp(post4.created_at)
    comments_dict['29'] = Comment(
        content="Cute, but I really really dislike that everything has to be a sob story. Just swing from those monkey bars or sing/ dance your heart out, that's what I want to see",
        user_id=26,
        post_id=4,
        created_at=comment29_createdat,
        updated_at=comment29_createdat
    )
    db.session.add(comments_dict['29'])

    # ----------------------- POST 5 -----------------------#
    post5 = Post.query.get(5)

    comment30_createdat=generate_comment_timestamp(post5.created_at)
    comments_dict['30'] = Comment(
        content="My grandpa was daydoo. He’d come home from work and see me every day, immediately saying \"hey dude!\" I would try, but the best I could do was \"daydoo!\"",
        user_id=27,
        post_id=5,
        created_at=comment30_createdat,
        updated_at=comment30_createdat
    )
    db.session.add(comments_dict['30'])
    db.session.flush()  # Assigns an ID to comment '30'

    comment31_createdat=generate_comment_timestamp(comments_dict['30'].created_at)
    comments_dict['31'] = Comment(
        content="""I really hope you were like 43 years old when this happened.

You had no speech impediments, you just wanted to fuck with him.""",
        user_id=28,
        post_id=5,
        parent_id=comments_dict['30'].id,  # Correct parent reference
        created_at=comment31_createdat,
        updated_at=comment31_createdat
    )
    db.session.add(comments_dict['31'])
    db.session.flush()  # Assigns an ID to comment '31'

    comment32_createdat=generate_comment_timestamp(comments_dict['31'].created_at)
    comments_dict['32'] = Comment(
        content="Hahaha that would have been hilarious, but sadly I was like 2-3 years old",
        user_id=27,
        post_id=5,
        parent_id=comments_dict['31'].id,  # Correct parent reference
        created_at=comment32_createdat,
        updated_at=comment32_createdat
    )
    db.session.add(comments_dict['32'])

    comment33_createdat=generate_comment_timestamp(comments_dict['31'].created_at)
    comments_dict['33'] = Comment(
        content="This is so cute",
        user_id=29,
        post_id=5,
        parent_id=comments_dict['31'].id,  # Correct parent reference
        created_at=comment33_createdat,
        updated_at=comment33_createdat
    )
    db.session.add(comments_dict['33'])

    comment34_createdat=generate_comment_timestamp(comments_dict['30'].created_at)
    comments_dict['34'] = Comment(
        content="My toddler calls me \"Dadoo\" sometimes and I wondered why, but I say \"hey dude!\" to him all the time so this all makes sense now lmao",
        user_id=30,
        post_id=5,
        parent_id=comments_dict['30'].id,  # Correct parent reference
        created_at=comment34_createdat,
        updated_at=comment34_createdat
    )
    db.session.add(comments_dict['34'])

    comment35_createdat=generate_comment_timestamp(post5.created_at)
    comments_dict['35'] = Comment(
        content="""Pretty much what happened to my mum with our first child.

She wanted to be Grandma, he couldn't say Grandma, so now's she's Bana.

Eldest is now 6 and we have another kid who's 3 with whom she is also Bana.

Sorry mum!""",
        user_id=31,
        post_id=5,
        created_at=comment35_createdat,
        updated_at=comment35_createdat
    )
    db.session.add(comments_dict['35'])
    db.session.flush()  # Assigns an ID to comment '35'

    comment36_createdat=generate_comment_timestamp(comments_dict['35'].created_at)
    comments_dict['36'] = Comment(
        content="I'm buba and I love it. I have none of those letters in my name.",
        user_id=32,
        post_id=5,
        parent_id=comments_dict['35'].id,  # Correct parent reference
        created_at=comment36_createdat,
        updated_at=comment36_createdat
    )
    db.session.add(comments_dict['36'])
    db.session.flush()

    comment37_createdat=generate_comment_timestamp(comments_dict['36'].created_at)
    comments_dict['37'] = Comment(
        content="My grandpa was named Maurice. He got called Dippy",
        user_id=33,
        post_id=5,
        parent_id=comments_dict['36'].id,  # Correct parent reference
        created_at=comment37_createdat,
        updated_at=comment37_createdat
    )
    db.session.add(comments_dict['37'])

    # ----------------------- POST 6 -----------------------#
    post6 = Post.query.get(6)

    comment38_createdat=generate_comment_timestamp(post6.created_at)
    comments_dict['38'] = Comment(
        content="Well. Where was it?!?",
        user_id=34,
        post_id=6,
        created_at=comment38_createdat,
        updated_at=comment38_createdat
    )
    db.session.add(comments_dict['38'])
    db.session.flush()

    comment39_createdat=generate_comment_timestamp(comments_dict['38'].created_at)
    comments_dict['39'] = Comment(
        content="Right!?!? Cliffhanger!!!",
        user_id=35,
        post_id=6,
        parent_id=comments_dict['38'].id,  # Correct parent reference
        created_at=comment39_createdat,
        updated_at=comment39_createdat
    )
    db.session.add(comments_dict['39'])
    db.session.flush()  # Assigns an ID to comment '39'

    comment40_createdat=generate_comment_timestamp(comments_dict['39'].created_at)
    comments_dict['40'] = Comment(
        content="LOST",
        user_id=36,
        post_id=6,
        parent_id=comments_dict['39'].id,  # Correct parent reference
        created_at=comment40_createdat,
        updated_at=comment40_createdat
    )
    db.session.add(comments_dict['40'])

    comment41_createdat=generate_comment_timestamp(comments_dict['39'].created_at)
    comments_dict['41'] = Comment(
        content="Not behind her bed",
        user_id=37,
        post_id=6,
        parent_id=comments_dict['39'].id,  # Correct parent reference
        created_at=comment41_createdat,
        updated_at=comment41_createdat
    )
    db.session.add(comments_dict['41'])
    db.session.flush()

    comment42_createdat=generate_comment_timestamp(comments_dict['41'].created_at)
    comments_dict['42'] = Comment(
        content="I can almost guarantee it is not there.",
        user_id=38,
        post_id=6,
        parent_id=comments_dict['41'].id,  # Correct parent reference
        created_at=comment42_createdat,
        updated_at=comment42_createdat
    )
    db.session.add(comments_dict['42'])

    comment43_createdat=generate_comment_timestamp(post6.created_at)
    comments_dict['43'] = Comment(
        content="4 year old me was specifically told not to tell my Father we got him a hammer for Christmas. As he was opening his gift I blurted out, \"It's not a hammer.\"",
        user_id=39,
        post_id=6,
        created_at=comment43_createdat,
        updated_at=comment43_createdat
    )
    db.session.add(comments_dict['43'])

    comment44_createdat=generate_comment_timestamp(post6.created_at)
    comments_dict['44'] = Comment(
        content="Holy shit! A post that's actually oddly specific. Well, it's actually suspiciously specific, but hey, you guys got close.",
        user_id=40,
        post_id=6,
        created_at=comment44_createdat,
        updated_at=comment44_createdat
    )
    db.session.add(comments_dict['44'])

    # ----------------------- POST 7 -----------------------#
    post7 = Post.query.get(7)

    comment45_createdat=generate_comment_timestamp(post7.created_at)
    comments_dict['45'] = Comment(
        content="What chance of success do they have? I'm all for it, should've been done a long while ago.",
        user_id=41,
        post_id=7,
        created_at=comment45_createdat,
        updated_at=comment45_createdat
    )
    db.session.add(comments_dict['45'])
    db.session.flush()

    comment46_createdat=generate_comment_timestamp(comments_dict['45'].created_at)
    comments_dict['46'] = Comment(
        content="It's a valid argument, but it's up against a giant pile of money. Money has been winning lately.",
        user_id=42,
        post_id=7,
        parent_id=comments_dict['45'].id,  # Correct parent reference
        created_at=comment46_createdat,
        updated_at=comment46_createdat
    )
    db.session.add(comments_dict['46'])

    comment47_createdat=generate_comment_timestamp(post7.created_at)
    comments_dict['47'] = Comment(
        content="Just rename it KotlinScript.",
        user_id=43,
        post_id=7,
        created_at=comment47_createdat,
        updated_at=comment47_createdat
    )
    db.session.add(comments_dict['47'])
    db.session.flush()

    comment48_createdat=generate_comment_timestamp(comments_dict['47'].created_at)
    comments_dict['48'] = Comment(
        content="Jetbrains would like a word.",
        user_id=44,
        post_id=7,
        parent_id=comments_dict['47'].id,  # Correct parent reference
        created_at=comment48_createdat,
        updated_at=comment48_createdat
    )
    db.session.add(comments_dict['48'])

    comment49_createdat=generate_comment_timestamp(post7.created_at)
    comments_dict['49'] = Comment(
        content="Let's get MySQL back too. Adobe can keep Acrobat, but websites need to stop saying to download it to view pdfs.",
        user_id=45,
        post_id=7,
        created_at=comment49_createdat,
        updated_at=comment49_createdat
    )
    db.session.add(comments_dict['49'])

    comment50_createdat=generate_comment_timestamp(post7.created_at)
    comments_dict['50'] = Comment(
        content="This sounds an awul lot like poking the bear. Hopefully the slumbering beast doesn't wake and decide that all JS runtimes need to pay licensing costs back to the owners of the trademark. Or worse, users of the runtime.",
        user_id=46,
        post_id=7,
        created_at=comment50_createdat,
        updated_at=comment50_createdat
    )
    db.session.add(comments_dict['50'])

    # ----------------------- POST 8 -----------------------#
    post8 = Post.query.get(8)

    comment51_createdat=generate_comment_timestamp(post8.created_at)
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
        post_id=8,
        created_at=comment51_createdat,
        updated_at=comment51_createdat
    )
    db.session.add(comments_dict['51'])

    comment52_createdat=generate_comment_timestamp(post8.created_at)
    comments_dict['52'] = Comment(
        content="They probably don't know it (and I guess it's not strictly JavaScript), but they're really confused about CORS.",
        user_id=48,
        post_id=8,
        created_at=comment52_createdat,
        updated_at=comment52_createdat
    )
    db.session.add(comments_dict['52'])
    db.session.flush()

    comment53_createdat=generate_comment_timestamp(comments_dict['52'].created_at)
    comments_dict['53'] = Comment(
        content="CORS isn't a JavaScript concept, but an HTTP one",
        user_id=9,
        post_id=8,
        parent_id=comments_dict['52'].id,
        created_at=comment53_createdat,
        updated_at=comment53_createdat
    )
    db.session.add(comments_dict['53'])

    comment54_createdat=generate_comment_timestamp(post8.created_at)
    comments_dict['54'] = Comment(
        content="Structuring a project",
        user_id=49,
        post_id=8,
        created_at=comment54_createdat,
        updated_at=comment54_createdat
    )
    db.session.add(comments_dict['54'])

    comment55_createdat=generate_comment_timestamp(post8.created_at)
    comments_dict['55'] = Comment(
        content="Any videos to learn it?",
        user_id=50,
        post_id=8,
        created_at=comment55_createdat,
        updated_at=comment55_createdat
    )
    db.session.add(comments_dict['55'])
    db.session.flush()  # Assigns an ID to comment '55'

    comment56_createdat=generate_comment_timestamp(comments_dict['55'].created_at)
    comments_dict['56'] = Comment(
        content="Not yet, I might adapt it to video form as well",
        user_id=9,
        post_id=8,
        parent_id=comments_dict['55'].id,
        created_at=comment56_createdat,
        updated_at=comment56_createdat
    )
    db.session.add(comments_dict['56'])

    # ----------------------- POST 9 -----------------------#
    post9 = Post.query.get(9)

    comment57_createdat=generate_comment_timestamp(post9.created_at)
    comments_dict['57'] = Comment(
        content="""This is cool. Migrated my own website. No noticeable changes.

The only thing now blocking Remix (RRv7) from getting RSC is React v19 release.

Would be crazy if it dropped before the holiday season.""",
        user_id=1,
        post_id=9,
        created_at=comment57_createdat,
        updated_at=comment57_createdat
    )
    db.session.add(comments_dict['57'])
    db.session.flush()

    comment58_createdat=generate_comment_timestamp(comments_dict['57'].created_at)
    comments_dict['58'] = Comment(
        content="""I'm reading the migration docs and it doesn't seem like there's anything which affects my project - pretty nice for a major version bump I guess.

Was it that easy for you?""",
        user_id=2,
        post_id=9,
        parent_id=comments_dict['57'].id,
        created_at=comment58_createdat,
        updated_at=comment58_createdat
    )
    db.session.add(comments_dict['58'])
    db.session.flush()  # Assigns an ID to comment '58'

    comment59_createdat=generate_comment_timestamp(comments_dict['58'].created_at)
    comments_dict['59'] = Comment(
        content="Literally didn't change anything in the codebase.",
        user_id=1,
        post_id=9,
        parent_id=comments_dict['58'].id,
        created_at=comment59_createdat,
        updated_at=comment59_createdat
    )
    db.session.add(comments_dict['59'])

    comment60_createdat=generate_comment_timestamp(comments_dict['58'].created_at)
    comments_dict['60'] = Comment(
        content="The moment Remix gets RSC I’m gonna have to strongly consider switching us over from Next. I’m not on the anti-vercel bandwagon, I just don’t have high hopes in Next being basically the sole remaining Webpack-based framework",
        user_id=3,
        post_id=9,
        parent_id=comments_dict['58'].id,
        created_at=comment60_createdat,
        updated_at=comment60_createdat
    )
    db.session.add(comments_dict['60'])

    comment61_createdat=generate_comment_timestamp(post9.created_at)
    comments_dict['61'] = Comment(
        content="""Congratulations to the Vite team on another awesome release! The environment API is a game-changer for framework authors. It will make it much easier to implement runtime dependent features like RSCs.

Vite is so powerful yet so easy to use. There's a reason that the entire ecosystem (except Next.js lol) has gravitated towards it to the point that it's basically the industry standard. Vue is great, but I think Vite will be Evan You's lasting legacy.""",
        user_id=4,
        post_id=9,
        created_at=comment61_createdat,
        updated_at=comment61_createdat
    )
    db.session.add(comments_dict['61'])
    db.session.flush()

    comment62_createdat=generate_comment_timestamp(comments_dict['61'].created_at)
    comments_dict['62'] = Comment(
        content="Industry standard? What industry are you talking about my bro? The industry of fairy land?",
        user_id=5,
        post_id=9,
        parent_id=comments_dict['61'].id,
        created_at=comment62_createdat,
        updated_at=comment62_createdat
    )
    db.session.add(comments_dict['62'])

    # ----------------------- POST 10 -----------------------#
    post10 = Post.query.get(10)

    comment63_createdat=generate_comment_timestamp(post10.created_at)
    comments_dict['63'] = Comment(
        content="""Perfect fluffy round paws.

*fixed it for you""",
        user_id=6,
        post_id=10,
        created_at=comment63_createdat,
        updated_at=comment63_createdat
    )
    db.session.add(comments_dict['63'])
    db.session.flush()

    comment64_createdat=generate_comment_timestamp(comments_dict['63'].created_at)
    comments_dict['64'] = Comment(
        content="Purrfect fluffy round paws. *fixed it for you",
        user_id=7,
        post_id=10,
        parent_id=comments_dict['63'].id,
        created_at=comment64_createdat,
        updated_at=comment64_createdat
    )
    db.session.add(comments_dict['64'])
    db.session.flush()

    comment65_createdat=generate_comment_timestamp(comments_dict['64'].created_at)
    comments_dict['65'] = Comment(
        content="I call em Proper Paws. Idk if I fixed it or not, but I contributed :P",
        user_id=8,
        post_id=10,
        parent_id=comments_dict['64'].id,
        created_at=comment65_createdat,
        updated_at=comment65_createdat
    )
    db.session.add(comments_dict['65'])
    db.session.flush()  # Assigns an ID to comment '65'

    comment66_createdat=generate_comment_timestamp(post10.created_at)
    comments_dict['66'] = Comment(
        content="Like cotton balls",
        user_id=9,
        post_id=10,
        created_at=comment66_createdat,
        updated_at=comment66_createdat
    )
    db.session.add(comments_dict['66'])
    db.session.flush()

    comment67_createdat=generate_comment_timestamp(comments_dict['66'].created_at)
    comments_dict['67'] = Comment(
        content="But with retractable needles.",
        user_id=10,
        post_id=10,
        parent_id=comments_dict['66'].id,
        created_at=comment67_createdat,
        updated_at=comment67_createdat
    )
    db.session.add(comments_dict['67'])

    comment68_createdat=generate_comment_timestamp(post10.created_at)
    comments_dict['68'] = Comment(
        content="Oh my god…. i am mesmerized 🤩🫶",
        user_id=12,
        post_id=10,
        created_at=comment68_createdat,
        updated_at=comment68_createdat
    )
    db.session.add(comments_dict['68'])

    # ----------------------- POST 11 -----------------------#
    post11 = Post.query.get(11)

    comment69_createdat=generate_comment_timestamp(post11.created_at)
    comments_dict['69'] = Comment(
        content="what cat?",
        user_id=13,
        post_id=11,
        created_at=comment69_createdat,
        updated_at=comment69_createdat
    )
    db.session.add(comments_dict['69'])
    db.session.flush()

    comment70_createdat=generate_comment_timestamp(comments_dict['69'].created_at)
    comments_dict['70'] = Comment(
        content="Doesn't look like anything to me",
        user_id=14,
        post_id=11,
        parent_id=comments_dict['69'].id,
        created_at=comment70_createdat,
        updated_at=comment70_createdat
    )
    db.session.add(comments_dict['70'])

    comment71_createdat=generate_comment_timestamp(post11.created_at)
    comments_dict['71'] = Comment(
        content="After a ton of editing, yes.",
        user_id=15,
        post_id=11,
        created_at=comment71_createdat,
        updated_at=comment71_createdat
    )
    db.session.add(comments_dict['71'])
    db.session.flush()

    comment72_createdat=generate_comment_timestamp(comments_dict['71'].created_at)
    comments_dict['72'] = Comment(
        content="I might blend into the wood if you color shift and saturate me this much.",
        user_id=16,
        post_id=11,
        parent_id=comments_dict['71'].id,
        created_at=comment72_createdat,
        updated_at=comment72_createdat
    )
    db.session.add(comments_dict['72'])

    comment73_createdat=generate_comment_timestamp(comments_dict['71'].created_at)
    comments_dict['73'] = Comment(
        content="In the original image, the cat is a brown tabby.",
        user_id=17,
        post_id=11,
        parent_id=comments_dict['71'].id,
        created_at=comment73_createdat,
        updated_at=comment73_createdat
    )
    db.session.add(comments_dict['73'])

    comment74_createdat=generate_comment_timestamp(post11.created_at)
    comments_dict['74'] = Comment(
        content="This is ca(t)mouflage.",
        user_id=18,
        post_id=11,
        created_at=comment74_createdat,
        updated_at=comment74_createdat
    )
    db.session.add(comments_dict['74'])

    # ----------------------- POST 12 -----------------------#
    post12 = Post.query.get(12)

    comment75_createdat=generate_comment_timestamp(post12.created_at)
    comments_dict['75'] = Comment(
        content="I like how the feet shake off the sand before getting back into the shoes",
        user_id=19,
        post_id=12,
        created_at=comment75_createdat,
        updated_at=comment75_createdat
    )
    db.session.add(comments_dict['75'])
    db.session.flush()

    comment76_createdat=generate_comment_timestamp(comments_dict['75'].created_at)
    comments_dict['76'] = Comment(
        content="I couldn't comprehend doing that. You are not getting all the sand off. I hate to admit I was kinda triggered by clay feet shaking off nonexistent sand and putting on clay shoes. lol I just avoid sand at all costs",
        user_id=20,
        post_id=12,
        parent_id=comments_dict['75'].id,
        created_at=comment76_createdat,
        updated_at=comment76_createdat
    )
    db.session.add(comments_dict['76'])

    comment77_createdat=generate_comment_timestamp(post12.created_at)
    comments_dict['77'] = Comment(
        content="Honestly, I would compare this to Avatar",
        user_id=21,
        post_id=12,
        created_at=comment77_createdat,
        updated_at=comment77_createdat
    )
    db.session.add(comments_dict['77'])

    comment78_createdat=generate_comment_timestamp(post12.created_at)
    comments_dict['78'] = Comment(
        content="8 kg of clay, but how much time did you use?",
        user_id=22,
        post_id=12,
        created_at=comment78_createdat,
        updated_at=comment78_createdat
    )
    db.session.add(comments_dict['78'])
    db.session.flush()

    comment79_createdat=generate_comment_timestamp(comments_dict['78'].created_at)
    comments_dict['79'] = Comment(
        content="We need someone to do the math on the time spent to progress ratio of Ben Wyatt's claymation and then apply it here.",
        user_id=23,
        post_id=12,
        parent_id=comments_dict['78'].id,
        created_at=comment79_createdat,
        updated_at=comment79_createdat
    )
    db.session.add(comments_dict['79'])
    db.session.flush()

    comment80_createdat=generate_comment_timestamp(comments_dict['79'].created_at)
    comments_dict['80'] = Comment(
        content="STAND IN THE PLACE WHERE YOU L-",
        user_id=24,
        post_id=12,
        parent_id=comments_dict['79'].id,
        created_at=comment80_createdat,
        updated_at=comment80_createdat
    )
    db.session.add(comments_dict['80'])
    db.session.flush()

    comment81_createdat=generate_comment_timestamp(comments_dict['80'].created_at)
    comments_dict['81'] = Comment(
        content="Oh my god...... That's the whole thing....",
        user_id=25,
        post_id=12,
        parent_id=comments_dict['80'].id,
        created_at=comment81_createdat,
        updated_at=comment81_createdat
    )
    db.session.add(comments_dict['81'])

    # ----------------------- POST 13 -----------------------#
    post13 = Post.query.get(13)

    comment82_createdat=generate_comment_timestamp(post13.created_at)
    comments_dict['82'] = Comment(
        content="Omgggg she’s so tiny 🥹🥹",
        user_id=26,
        post_id=13,
        created_at=comment82_createdat,
        updated_at=comment82_createdat
    )
    db.session.add(comments_dict['82'])
    db.session.flush()

    comment83_createdat=generate_comment_timestamp(comments_dict['82'].created_at)
    comments_dict['83'] = Comment(
        content="That's because she's under the compressor.",
        user_id=27,
        post_id=13,
        parent_id=comments_dict['82'].id,
        created_at=comment83_createdat,
        updated_at=comment83_createdat
    )
    db.session.add(comments_dict['83'])

    comment84_createdat=generate_comment_timestamp(post13.created_at)
    comments_dict['84'] = Comment(
        content="OMG. You did not exaggerate, OP. 🥹❤️",
        user_id=28,
        post_id=13,
        created_at=comment84_createdat,
        updated_at=comment84_createdat
    )
    db.session.add(comments_dict['84'])
    db.session.flush()

    comment85_createdat=generate_comment_timestamp(comments_dict['84'].created_at)
    comments_dict['85'] = Comment(
        content="My boyfriend sent this to me from his woodshop downstairs and I truly almost fell over when I saw her lol. Had to share.",
        user_id=12,
        post_id=13,
        parent_id=comments_dict['84'].id,
        created_at=comment85_createdat,
        updated_at=comment85_createdat
    )
    db.session.add(comments_dict['85'])

    comment86_createdat=generate_comment_timestamp(post13.created_at)
    comments_dict['86'] = Comment(
        content="The embodiment of 🥺",
        user_id=29,
        post_id=13,
        created_at=comment86_createdat,
        updated_at=comment86_createdat
    )
    db.session.add(comments_dict['86'])
    db.session.flush()

    comment87_createdat=generate_comment_timestamp(comments_dict['86'].created_at)
    comments_dict['87'] = Comment(
        content="💯",
        user_id=12,
        post_id=13,
        parent_id=comments_dict['86'].id,
        created_at=comment87_createdat,
        updated_at=comment87_createdat
    )
    db.session.add(comments_dict['87'])

    # ----------------------- POST 14 -----------------------#
    post14 = Post.query.get(14)

    comment88_createdat=generate_comment_timestamp(post14.created_at)
    comments_dict['88'] = Comment(
        content="Keeping it?? 🥹",
        user_id=30,
        post_id=14,
        created_at=comment88_createdat,
        updated_at=comment88_createdat
    )
    db.session.add(comments_dict['88'])
    db.session.flush()

    comment89_createdat=generate_comment_timestamp(comments_dict['88'].created_at)
    comments_dict['89'] = Comment(
        content="No but she was adopted :)",
        user_id=13,
        post_id=14,
        parent_id=comments_dict['88'].id,
        created_at=comment89_createdat,
        updated_at=comment89_createdat
    )
    db.session.add(comments_dict['89'])

    comment90_createdat=generate_comment_timestamp(post14.created_at)
    comments_dict['90'] = Comment(
        content="What a cute little kitty 🐈",
        user_id=31,
        post_id=14,
        created_at=comment90_createdat,
        updated_at=comment90_createdat
    )
    db.session.add(comments_dict['90'])

    comment91_createdat=generate_comment_timestamp(post14.created_at)
    comments_dict['91'] = Comment(
        content="You were the lucky one to be blessed with this smile! Kitten looks so calm and protected!!",
        user_id=32,
        post_id=14,
        created_at=comment91_createdat,
        updated_at=comment91_createdat
    )
    db.session.add(comments_dict['91'])

    # ----------------------- POST 15 -----------------------#
    post15 = Post.query.get(15)

    comment92_createdat=generate_comment_timestamp(post15.created_at)
    comments_dict['92'] = Comment(
        content="Whiskey doesn’t age — it matures.",
        user_id=33,
        post_id=15,
        created_at=comment92_createdat,
        updated_at=comment92_createdat
    )
    db.session.add(comments_dict['92'])
    db.session.flush()

    comment93_createdat=generate_comment_timestamp(comments_dict['92'].created_at)
    comments_dict['93'] = Comment(
        content="Phenomenal comment.No notes.",
        user_id=34,
        post_id=15,
        parent_id=comments_dict['92'].id,
        created_at=comment93_createdat,
        updated_at=comment93_createdat
    )
    db.session.add(comments_dict['93'])

    comment94_createdat=generate_comment_timestamp(post15.created_at)
    comments_dict['94'] = Comment(
        content="The fluff of a kitten. The dead eyed rage of a senior.",
        user_id=35,
        post_id=15,
        created_at=comment94_createdat,
        updated_at=comment94_createdat
    )
    db.session.add(comments_dict['94'])
    db.session.flush()

    comment95_createdat=generate_comment_timestamp(comments_dict['94'].created_at)
    comments_dict['95'] = Comment(
        content="😂 so true.",
        user_id=36,
        post_id=15,
        parent_id=comments_dict['94'].id,
        created_at=comment95_createdat,
        updated_at=comment95_createdat
    )
    db.session.add(comments_dict['95'])

    comment96_createdat=generate_comment_timestamp(comments_dict['94'].created_at)
    comments_dict['96'] = Comment(
        content="The posture of an owl.",
        user_id=37,
        post_id=15,
        parent_id=comments_dict['94'].id,
        created_at=comment96_createdat,
        updated_at=comment96_createdat
    )
    db.session.add(comments_dict['96'])

    # ----------------------- POST 16 -----------------------#
    post16 = Post.query.get(16)

    comment97_createdat=generate_comment_timestamp(post16.created_at)
    comments_dict['97'] = Comment(
        content="Gotta be in Hawaii lol",
        user_id=38,
        post_id=16,
        created_at=comment97_createdat,
        updated_at=comment97_createdat
    )
    db.session.add(comments_dict['97'])

    comment98_createdat=generate_comment_timestamp(post16.created_at)
    comments_dict['98'] = Comment(
        content="It’s police only. If you’re not police you can proceed",
        user_id=39,
        post_id=16,
        created_at=comment98_createdat,
        updated_at=comment98_createdat
    )
    db.session.add(comments_dict['98'])

    comment99_createdat=generate_comment_timestamp(post16.created_at)
    comments_dict['99'] = Comment(
        content="If the stop sign is blue, you should probably slow down. Congrats on the fast shutter speed to get the picture though.",
        user_id=40,
        post_id=16,
        created_at=comment99_createdat,
        updated_at=comment99_createdat
    )
    db.session.add(comments_dict['99'])

    # ----------------------- POST 17 -----------------------#
    post17 = Post.query.get(17)

    comment100_createdat=generate_comment_timestamp(post17.created_at)
    comments_dict['100'] = Comment(
        content="\"Due to none of your fucking business we are closing Tuesdays.\"",
        user_id=41,
        post_id=17,
        created_at=comment100_createdat,
        updated_at=comment100_createdat
    )
    db.session.add(comments_dict['100'])

    comment101_createdat=generate_comment_timestamp(post17.created_at)
    comments_dict['101'] = Comment(
        content="Usually Tuesday is the slowest day off the week for restaurant. In US, a lot of Chinese take out places are closed on Tuesday for this reason",
        user_id=42,
        post_id=17,
        created_at=comment101_createdat,
        updated_at=comment101_createdat
    )
    db.session.add(comments_dict['101'])
    db.session.flush()

    comment102_createdat=generate_comment_timestamp(comments_dict['101'].created_at)
    comments_dict['102'] = Comment(
        content="Yup. My favorite Chinese place in town is closed Tuesdays and so is my favorite Ramen place",
        user_id=43,
        post_id=17,
        parent_id=comments_dict['101'].id,
        created_at=comment102_createdat,
        updated_at=comment102_createdat
    )
    db.session.add(comments_dict['102'])
    db.session.flush()

    comment103_createdat=generate_comment_timestamp(comments_dict['102'].created_at)
    comments_dict['103'] = Comment(
        content="Are they both the same Closed Tuesdays, or do you have two restaurants that share a name in your town?",
        user_id=44,
        post_id=17,
        parent_id=comments_dict['102'].id,
        created_at=comment103_createdat,
        updated_at=comment103_createdat
    )
    db.session.add(comments_dict['103'])
    db.session.flush()

    comment104_createdat=generate_comment_timestamp(comments_dict['103'].created_at)
    comments_dict['104'] = Comment(
        content="Must be franchised because Closed Tuesdays opened a restaurant in my town. They're frequently Closed Fridays due to staffing.",
        user_id=45,
        post_id=17,
        parent_id=comments_dict['103'].id,
        created_at=comment104_createdat,
        updated_at=comment104_createdat
    )
    db.session.add(comments_dict['104'])

    comment105_createdat=generate_comment_timestamp(post17.created_at)
    comments_dict['105'] = Comment(
        content="A small tobacco store i Sweden had a note a couple years back that said \"closed because of robbery\". They guy working there went to rob a bank.",
        user_id=46,
        post_id=17,
        created_at=comment105_createdat,
        updated_at=comment105_createdat
    )
    db.session.add(comments_dict['105'])
    db.session.flush()

    comment106_createdat=generate_comment_timestamp(comments_dict['105'].created_at)
    comments_dict['106'] = Comment(
        content="Brilliant.",
        user_id=47,
        post_id=17,
        parent_id=comments_dict['105'].id,
        created_at=comment106_createdat,
        updated_at=comment106_createdat
    )
    db.session.add(comments_dict['106'])

    # ----------------------- POST 18 -----------------------#
    # No comments

    # ----------------------- POST 19 -----------------------#
    post19 = Post.query.get(19)

    comment107_createdat=generate_comment_timestamp(post19.created_at)
    comments_dict['107'] = Comment(
        content="I witnessed enough engineers with ego problems.",
        user_id=48,
        post_id=19,
        created_at=comment107_createdat,
        updated_at=comment107_createdat
    )
    db.session.add(comments_dict['107'])
    db.session.flush()

    comment108_createdat=generate_comment_timestamp(comments_dict['107'].created_at)
    comments_dict['108'] = Comment(
        content="It is honestly not talked about enough in this industry. Since the CompSci boom it has been pretty bad.",
        user_id=49,
        post_id=19,
        parent_id=comments_dict['107'].id,
        created_at=comment108_createdat,
        updated_at=comment108_createdat
    )
    db.session.add(comments_dict['108'])

    comment109_createdat=generate_comment_timestamp(post19.created_at)
    comments_dict['109'] = Comment(
        content="Every team I’ve been on was severely understaffed lol. We’re always thrilled to have someone else help us get through the decades-old backlog",
        user_id=50,
        post_id=19,
        created_at=comment109_createdat,
        updated_at=comment109_createdat
    )
    db.session.add(comments_dict['109'])

    comment110_createdat=generate_comment_timestamp(post19.created_at)
    comments_dict['110'] = Comment(
        content="Engineers can wildly vary on their non-negotiable opinions though. Linux/Mac/Windows... Vim/VSCode/Jetbrains...",
        user_id=1,
        post_id=19,
        created_at=comment110_createdat,
        updated_at=comment110_createdat
    )
    db.session.add(comments_dict['110'])

    # ----------------------- POST 20 ----------------------- #
    # No comments

    # ----------------------- POST 21 ----------------------- #
    post21 = Post.query.get(21)

    comment111_createdat=generate_comment_timestamp(post21.created_at)
    comments_dict['111'] = Comment(
        content="That's what I told a colleague who was griping about how her older code is spaghetti: \"Be glad you think it's spaghetti. If you didn't, that would mean you haven't learned a thing in the last year.\"",
        user_id=2,
        post_id=21,
        created_at=comment111_createdat,
        updated_at=comment111_createdat
    )
    db.session.add(comments_dict['111'])
    db.session.flush()

    comment112_createdat=generate_comment_timestamp(comments_dict['111'].created_at)
    comments_dict['112'] = Comment(
        content="What if I thought it was spaghetti when I wrote it? 😅",
        user_id=3,
        post_id=21,
        parent_id=comments_dict['111'].id,
        created_at=comment112_createdat,
        updated_at=comment112_createdat
    )
    db.session.add(comments_dict['112'])
    db.session.flush()

    comment113_createdat=generate_comment_timestamp(comments_dict['112'].created_at)
    comments_dict['113'] = Comment(
        content="You were right then, and you're right now!",
        user_id=5,
        post_id=21,
        parent_id=comments_dict['112'].id,
        created_at=comment113_createdat,
        updated_at=comment113_createdat
    )
    db.session.add(comments_dict['113'])

    comment114_createdat=generate_comment_timestamp(post21.created_at)
    comments_dict['114'] = Comment(
        content="All code sucks some just sucks a little more",
        user_id=6,
        post_id=21,
        created_at=comment114_createdat,
        updated_at=comment114_createdat
    )
    db.session.add(comments_dict['114'])
    db.session.flush()

    comment115_createdat=generate_comment_timestamp(comments_dict['114'].created_at)
    comments_dict['115'] = Comment(
        content="So said Aristotle, so said you.",
        user_id=7,
        post_id=21,
        parent_id=comments_dict['114'].id,
        created_at=comment115_createdat,
        updated_at=comment115_createdat
    )
    db.session.add(comments_dict['115'])

    comment116_createdat=generate_comment_timestamp(comments_dict['114'].created_at)
    comments_dict['116'] = Comment(
        content="Until you \"fixed\" it and all tests fail and it turns you knew exactly what you were doing and thought a comment isn't necessary because it's obvious why it is the way it is.",
        user_id=8,
        post_id=21,
        parent_id=comments_dict['114'].id,
        created_at=comment116_createdat,
        updated_at=comment116_createdat
    )
    db.session.add(comments_dict['116'])

    comment117_createdat=generate_comment_timestamp(post21.created_at)
    comments_dict['117'] = Comment(
        content="who wrote this code?? Oh me lemme js put a try catch around that",
        user_id=9,
        post_id=21,
        created_at=comment117_createdat,
        updated_at=comment117_createdat
    )
    db.session.add(comments_dict['117'])

    comment118_createdat=generate_comment_timestamp(post21.created_at)
    comments_dict['118'] = Comment(
        content="""Hmm...

I also remember seeing a meme a bit like this but it went:

1 - Who wrote this terrible code?

2 - Blame - YOU

3 - Oh...

4 - This code isn't too bad.

lol""",
        user_id=10,
        post_id=21,
        created_at=comment118_createdat,
        updated_at=comment118_createdat
    )
    db.session.add(comments_dict['118'])

    comment119_createdat=generate_comment_timestamp(post21.created_at)
    comments_dict['119'] = Comment(
        content="Then you rewrite just to realize why it was written the way it was.. then comes the realization \"I am actually getting worst!\"",
        user_id=11,
        post_id=21,
        created_at=comment119_createdat,
        updated_at=comment119_createdat
    )
    db.session.add(comments_dict['119'])

    # ----------------------- POST 22 ----------------------- #
    post22 = Post.query.get(22)

    comment120_createdat=generate_comment_timestamp(post22.created_at)
    comments_dict['120'] = Comment(
        content="Thanks! And do check out Archive.org for more movies, vids, albums, books and more - all for free",
        user_id=12,
        post_id=22,
        created_at=comment120_createdat,
        updated_at=comment120_createdat
    )
    db.session.add(comments_dict['120'])

    comment121_createdat=generate_comment_timestamp(post22.craeted_at)
    comments_dict['121'] = Comment(
        content = "This is what Reddit should be about. Cool stuff from weird corners of the internet. Hell yeah.",
        user_id=13,
        post_id=22,
        created_at=comment121_createdat,
        updated_at=comment110_createdat
    )
    db.session.add(comments_dict['121'])
    db.session.flush()

    comment122_createdat=generate_comment_timestamp(comments_dict['121'].created_at)
    comments_dict['122'] = Comment(
        content = "If you're subbed to the right places, that's exactly what it is!",
        user_id=14,
        post_id=22,
        parent_id=121,
        created_at=comment122_createdat,
        updated_at=comment122_createdat
    )
    db.session.add(comments_dict['122'])

    comment123_createdat=generate_comment_timestamp(comments_dict['121'].created_at)
    comments_dict['123'] = Comment(
        content = "I agree. Posts like this remind me why Ribbit is the only social media I use",
        user_id=15,
        post_id=22,
        parent_id=121,
        created_at=comment123_createdat,
        updated_at=comment123_createdat
    )
    db.session.add(comments_dict['123'])

    # ----------------------- POST 23 ----------------------- #
    post23 = Post.query.get(23)

    comment124_createdat=generate_comment_timestamp(post23.created_at)
    comments_dict['124'] = Comment(
        content="Going to use your post to plug Navy Federal. The credit union has a completely hassle-free shutdown assistance program for government employees enrolled in direct deposit with them. All you have to do is register for the program and they will spot your paycheck at the normal amount and at the normal time.",
        user_id=16,
        post_id=23,
        created_at=comment124_createdat,
        updated_at=comment124_createdat
    )
    db.session.add(comments_dict['124'])
    db.session.flush()

    comment125_createdat=generate_comment_timestamp(comments_dict['124'].created_at)
    comments_dict['125'] = Comment(
        content="Can confirm, was in the navy during a shutdown, signed up for Navy Federal in boot camp and still got paid",
        user_id=17,
        post_id=23,
        parent_id=124,
        created_at=comment125_createdat,
        updated_at=comment125_createdat
    )
    db.session.add(comments_dict['125'])

    comment126_createdat=generate_comment_timestamp(comments_dict['124'].created_at)
    comments_dict['126'] = Comment(
        content="When they covered our checks during the 2011 near shutdown(?), they earned my deposits for life. At the time, they were the only bank that did so. I believe a few other military affiliated banks did so afterwards. But they rock. Also, generally pretty competitive rates on many things.",
        user_id=18,
        post_id=23,
        parent_id=124,
        created_at=comment126_createdat,
        updated_at=comment126_createdat
    )
    db.session.add(comments_dict['126'])
    db.session.flush()

    comment127_createdat=generate_comment_timestamp(comments_dict['126'].created_at)
    comments_dict['127'] = Comment(
        content="They paid us like nothing happened.",
        user_id=19,
        post_id=23,
        parent_id=126,
        created_at=comment127_createdat,
        updated_at=comment127_createdat
    )
    db.session.add(comments_dict['127'])

    comment128_createdat=generate_comment_timestamp(post23)
    comments_dict['128'] = Comment(
        content="""As a veteran that was active duty during a government shutdown, this is absolutely not correct.

See how long any military branch lasts when their people are not being taken care of.

Stop with the click bait.""",
        user_id=20,
        post_id=23,
        created_at=comment128_createdat,
        updated_at=comment128_createdat
    )
    db.session.add(comments_dict['128'])

    # ----------------------- POST 25 ----------------------- #
    post25 = Post.query.get(25)

    db.session.commit()

def undo_comments():
    db.session.execute("DELETE FROM comments")
    db.session.commit()
