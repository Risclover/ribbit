import random
from app.models import db, Comment, Post, User
from datetime import datetime, timedelta

def generate_comment_timestamp(author_created_at, parent_timestamp, max_delay_hours=72):
    """
    Generate a random datetime for a comment that satisfies:
      - After the author’s account creation time,
      - After the parent's creation time (the parent might be a post or a comment),
      - Within max_delay_hours hours from the parent’s timestamp,
      - Not in the future (no later than now).
    """
    now = datetime.now()

    # The earliest valid time must be after both:
    #   - the author's account creation time,
    #   - the parent's creation time.
    earliest = max(author_created_at, parent_timestamp) + timedelta(seconds=1)

    # The latest allowed time should be:
    #   - no later than parent_timestamp + max_delay_hours,
    #   - no later than right now (to avoid future dates).
    latest = min(parent_timestamp + timedelta(hours=max_delay_hours), now)

    # If there's no valid range, just return the earliest or handle accordingly
    if latest < earliest:
        return earliest

    # Randomly choose a time between 'earliest' and 'latest'
    delta_seconds = int((latest - earliest).total_seconds())
    random_offset = random.randint(0, delta_seconds)

    return earliest + timedelta(seconds=random_offset)


def seed_comments():
    # Dictionary to hold comments by a temporary key for easy reference
    comments_dict = {}

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)
    user8 = User.query.get(8)
    user9 = User.query.get(9)
    user10 = User.query.get(10)
    user11 = User.query.get(11)
    user12 = User.query.get(12)
    user13 = User.query.get(13)
    user14 = User.query.get(14)
    user15 = User.query.get(15)
    user16 = User.query.get(16)
    user17 = User.query.get(17)
    user18 = User.query.get(18)
    user19 = User.query.get(19)
    user20 = User.query.get(20)
    user21 = User.query.get(21)
    user22 = User.query.get(22)
    user23 = User.query.get(23)
    user24 = User.query.get(24)
    user25 = User.query.get(25)
    user26 = User.query.get(26)
    user27 = User.query.get(27)
    user28 = User.query.get(28)
    user29 = User.query.get(29)
    user30 = User.query.get(30)
    user31 = User.query.get(31)
    user32 = User.query.get(32)
    user33 = User.query.get(33)
    user34 = User.query.get(34)
    user35 = User.query.get(35)
    user36 = User.query.get(36)
    user37 = User.query.get(37)
    user38 = User.query.get(38)
    user39 = User.query.get(39)
    user40 = User.query.get(40)
    user41 = User.query.get(41)
    user42 = User.query.get(42)
    user43 = User.query.get(43)
    user44 = User.query.get(44)
    user45 = User.query.get(45)
    user46 = User.query.get(46)
    user47 = User.query.get(47)
    user48 = User.query.get(48)
    user49 = User.query.get(49)
    user50 = User.query.get(50)

    # -------------------------------------------------------------------------
    # POST 1
    # -------------------------------------------------------------------------
    post1 = Post.query.get(1)
    comment1_createdat = generate_comment_timestamp(user3.created_at, post1.created_at)
    comments_dict['1'] = Comment(
        content="She’s sitting there so patiently for you 🥰🥰",
        user_id=3,
        post_id=1,
        created_at=comment1_createdat,
        updated_at=comment1_createdat
    )
    db.session.add(comments_dict['1'])
    db.session.flush()  # Assigns an ID to comment '1'

    comment2_createdat = generate_comment_timestamp(user4.created_at, comments_dict['1'].created_at)
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

    comment3_createdat = generate_comment_timestamp(user5.created_at, comments_dict['2'].created_at)
    comments_dict['3'] = Comment(
        content="i'm scrolling this damn thread looking for solution (even though i dont own a cat) and y'all fawning over the cute cat",
        user_id=5,
        post_id=1,
        parent_id=comments_dict['2'].id,  # Correct parent reference
        created_at=comment3_createdat,
        updated_at=comment3_createdat
    )
    db.session.add(comments_dict['3'])

    comment4_createdat=generate_comment_timestamp(user6.created_at, post1.created_at)
    comments_dict['4'] = Comment(
        content="this is what i thought animal testing for cosmetic products was when i was a kid",
        user_id=6,
        post_id=1,
        created_at=comment4_createdat,
        updated_at=comment4_createdat
    )
    db.session.add(comments_dict['4'])

    comment5_createdat = generate_comment_timestamp(user4.created_at, post1.created_at)
    comments_dict['5'] = Comment(
        content="The merchandise for the BBC Top Gear series has(had?) a label in them that said \"we tested these clothes on animals. They didn't fit.\"",
        user_id=4,
        post_id=1,
        created_at=comment5_createdat,
        updated_at=comment5_createdat
    )
    db.session.add(comments_dict['5'])

    comment6_createdat = generate_comment_timestamp(user7.created_at, post1.created_at)
    comments_dict['6'] = Comment(
        content="Try white lipstick",
        user_id=7,
        post_id=1,
        created_at=comment6_createdat,
        updated_at=comment6_createdat
    )
    db.session.add(comments_dict['6'])
    db.session.flush()  # Assigns an ID to comment '6'

    comment7_createdat = generate_comment_timestamp(user2.created_at, comments_dict['6'].created_at)
    comments_dict['7'] = Comment(
        content="Lmao might cover",
        user_id=2,
        post_id=1,
        parent_id=comments_dict['6'].id,  # Correct parent reference
        created_at=comment7_createdat,
        updated_at=comment7_createdat
    )
    db.session.add(comments_dict['7'])

    # -------------------------------------------------------------------------
    # POST 2
    # -------------------------------------------------------------------------
    post2 = Post.query.get(2)

    comment8_createdat = generate_comment_timestamp(user8.created_at, post2.created_at)
    comments_dict['8'] = Comment(
        content="Stepan looks like a cool cat. Happy Birthday to one swish feline",
        user_id=8,
        post_id=2,
        created_at=comment8_createdat,
        updated_at=comment8_createdat
    )
    db.session.add(comments_dict['8'])

    comment9_createdat=generate_comment_timestamp(user9.created_at, post2.created_at)
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

    comment10_createdat=generate_comment_timestamp(user10.created_at, comments_dict['9'].created_at)
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

    comment11_createdat=generate_comment_timestamp(user11.created_at, comments_dict['10'].created_at)
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

    comment12_createdat=generate_comment_timestamp(user12.created_at, comments_dict['11'].created_at)
    comments_dict['12'] = Comment(
        content="This guy cats.",
        user_id=12,
        post_id=2,
        parent_id=comments_dict['11'].id,  # Correct parent reference
        created_at=comment12_createdat,
        updated_at=comment12_createdat
    )
    db.session.add(comments_dict['12'])

    comment13_createdat=generate_comment_timestamp(user13.created_at, comments_dict['11'].created_at)
    comments_dict['13'] = Comment(
        content="Some after-dinner catnip.",
        user_id=13,
        post_id=2,
        parent_id=comments_dict['11'].id,  # Correct parent reference
        created_at=comment13_createdat,
        updated_at=comment13_createdat
    )
    db.session.add(comments_dict['13'])

    comment14_createdat=generate_comment_timestamp(user14.created_at, post2.created_at)
    comments_dict['14'] = Comment(
        content="\"16 already? I'm getting to old for this\"",
        user_id=14,
        post_id=2,
        created_at=comment14_createdat,
        updated_at=comment14_createdat
    )
    db.session.add(comments_dict['14'])

    comment15_createdat=generate_comment_timestamp(user15.created_at, post2.created_at)
    comments_dict['15'] = Comment(
        content="That cat needs a gold chain with the way he's sitting",
        user_id=15,
        post_id=2,
        created_at=comment15_createdat,
        updated_at=comment15_createdat
    )
    db.session.add(comments_dict['15'])

    # -------------------------------------------------------------------------
    # POST 3
    # -------------------------------------------------------------------------
    post3 = Post.query.get(3)

    comment16_createdat=generate_comment_timestamp(user16.created_at, post3.created_at)
    comments_dict['16'] = Comment(
        content="Me pretending to be in a music video to a sad song",
        user_id=16,
        post_id=3,
        created_at=comment16_createdat,
        updated_at=comment16_createdat
    )
    db.session.add(comments_dict['16'])
    db.session.flush()

    comment17_createdat=generate_comment_timestamp(user17.created_at, comments_dict['16'].created_at)
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

    comment18_createdat=generate_comment_timestamp(user16.created_at, comments_dict['17'].created_at)
    comments_dict['18'] = Comment(
        content="Honestly it fits.",
        user_id=16,
        post_id=3,
        parent_id=comments_dict['17'].id,  # Correct parent reference
        created_at=comment18_createdat,
        updated_at=comment18_createdat
    )
    db.session.add(comments_dict['18'])

    comment19_createdat=generate_comment_timestamp(user18.created_at, post3.created_at)
    comments_dict['19'] = Comment(
        content="This made my day.",
        user_id=18,
        post_id=3,
        created_at=comment19_createdat,
        updated_at=comment19_createdat
    )
    db.session.add(comments_dict['19'])
    db.session.flush()

    comment20_createdat=generate_comment_timestamp(user4.created_at, comments_dict['19'].created_at)
    comments_dict['20'] = Comment(
        content="Glad it brought a smile to your face! I think it's competing with all of us in the art of deep thinking",
        user_id=4,
        post_id=3,
        parent_id=comments_dict['19'].id,
        created_at=comment20_createdat,
        updated_at=comment20_createdat
    )
    db.session.add(comments_dict['20'])

    # -------------------------------------------------------------------------
    # POST 4
    # -------------------------------------------------------------------------
    post4 = Post.query.get(4)

    comment21_createdat=generate_comment_timestamp(user19.created_at, post4.created_at)
    comments_dict['21'] = Comment(
        content="That'll get you <em>maybe</em> to round two, but without a parent or sibling who died of cancer before they got a chance to see you perform on stage, you have 0 chance of making the finals.",
        user_id=19,
        post_id=4,
        created_at=comment21_createdat,
        updated_at=comment21_createdat
    )
    db.session.add(comments_dict['21'])
    db.session.flush()  # Assigns an ID to comment '21'

    comment22_createdat=generate_comment_timestamp(user20.created_at, comments_dict['21'].created_at)
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

    comment23_createdat=generate_comment_timestamp(user19.created_at, comments_dict['22'].created_at)
    comments_dict['23'] = Comment(
        content="<em>The hardest choices require the strongest wills.</em>",
        user_id=19,
        post_id=4,
        parent_id=comments_dict['22'].id,  # Correct parent reference
        created_at=comment23_createdat,
        updated_at=comment23_createdat
    )
    db.session.add(comments_dict['23'])

    comment24_createdat=generate_comment_timestamp(user21.created_at, post4.created_at)
    comments_dict['24'] = Comment(
        content="She’s not just a mom, she’s a PR mastermind—AGT’s next season opener!",
        user_id=21,
        post_id=4,
        created_at=comment24_createdat,
        updated_at=comment24_createdat
    )
    db.session.add(comments_dict['24'])

    comment25_createdat=generate_comment_timestamp(user22.created_at, post4.created_at)
    comments_dict['25'] = Comment(
        content="Perfect match - you: comedy, her: drama",
        user_id=22,
        post_id=4,
        created_at=comment25_createdat,
        updated_at=comment25_createdat
    )
    db.session.add(comments_dict['25'])

    comment26_createdat=generate_comment_timestamp(user23.created_at, post4.created_at)
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

    comment27_createdat=generate_comment_timestamp(user24.created_at, comments_dict['26'].created_at)
    comments_dict['27'] = Comment(
        content="Seeing the final round is always so surreal to me because im like what happened to the sick contortionist i was rooting for?",
        user_id=24,
        post_id=4,
        parent_id=comments_dict['26'].id,  # Correct parent reference
        created_at=comment27_createdat,
        updated_at=comment27_createdat
    )
    db.session.add(comments_dict['27'])

    comment28_createdat=generate_comment_timestamp(user25.created_at, comments_dict['26'].created_at)
    comments_dict['28'] = Comment(
        content="RuPaul's Drag Race has a similar problem, with production pushing contestants to share sob stories they might not want on TV. Contestants joke about strategically sharing trauma to get production to keep them around, and Alexis Mateo is revered by the fandom for straight up inventing a KIA/MIA boyfriend for a 4th of July episode.",
        user_id=25,
        post_id=4,
        parent_id=comments_dict['26'].id,  # Correct parent reference
        created_at=comment28_createdat,
        updated_at=comment28_createdat
    )
    db.session.add(comments_dict['28'])

    comment29_createdat=generate_comment_timestamp(user26.created_at, post4.created_at)
    comments_dict['29'] = Comment(
        content="Cute, but I really really dislike that everything has to be a sob story. Just swing from those monkey bars or sing/ dance your heart out, that's what I want to see",
        user_id=26,
        post_id=4,
        created_at=comment29_createdat,
        updated_at=comment29_createdat
    )
    db.session.add(comments_dict['29'])

    # -------------------------------------------------------------------------
    # POST 5
    # -------------------------------------------------------------------------
    post5 = Post.query.get(5)

    comment30_createdat=generate_comment_timestamp(user2.created_at, post5.created_at)
    comments_dict['30'] = Comment(
        content="My grandpa was daydoo. He’d come home from work and see me every day, immediately saying \"hey dude!\" I would try, but the best I could do was \"daydoo!\"",
        user_id=27,
        post_id=5,
        created_at=comment30_createdat,
        updated_at=comment30_createdat
    )
    db.session.add(comments_dict['30'])
    db.session.flush()  # Assigns an ID to comment '30'

    comment31_createdat=generate_comment_timestamp(user2.created_at, comments_dict['30'].created_at)
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

    comment32_createdat=generate_comment_timestamp(user2.created_at, comments_dict['31'].created_at)
    comments_dict['32'] = Comment(
        content="Hahaha that would have been hilarious, but sadly I was like 2-3 years old",
        user_id=27,
        post_id=5,
        parent_id=comments_dict['31'].id,  # Correct parent reference
        created_at=comment32_createdat,
        updated_at=comment32_createdat
    )
    db.session.add(comments_dict['32'])

    comment33_createdat=generate_comment_timestamp(user2.created_at, comments_dict['31'].created_at)
    comments_dict['33'] = Comment(
        content="This is so cute",
        user_id=29,
        post_id=5,
        parent_id=comments_dict['31'].id,  # Correct parent reference
        created_at=comment33_createdat,
        updated_at=comment33_createdat
    )
    db.session.add(comments_dict['33'])

    comment34_createdat=generate_comment_timestamp(user2.created_at, comments_dict['30'].created_at)
    comments_dict['34'] = Comment(
        content="My toddler calls me \"Dadoo\" sometimes and I wondered why, but I say \"hey dude!\" to him all the time so this all makes sense now lmao",
        user_id=30,
        post_id=5,
        parent_id=comments_dict['30'].id,  # Correct parent reference
        created_at=comment34_createdat,
        updated_at=comment34_createdat
    )
    db.session.add(comments_dict['34'])

    comment35_createdat=generate_comment_timestamp(user2.created_at, post5.created_at)
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

    comment36_createdat=generate_comment_timestamp(user2.created_at, comments_dict['35'].created_at)
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

    comment37_createdat=generate_comment_timestamp(user2.created_at, comments_dict['36'].created_at)
    comments_dict['37'] = Comment(
        content="My grandpa was named Maurice. He got called Dippy",
        user_id=33,
        post_id=5,
        parent_id=comments_dict['36'].id,  # Correct parent reference
        created_at=comment37_createdat,
        updated_at=comment37_createdat
    )
    db.session.add(comments_dict['37'])

    # -------------------------------------------------------------------------
    # POST 6
    # -------------------------------------------------------------------------
    post6 = Post.query.get(6)

    comment38_createdat=generate_comment_timestamp(user2.created_at, post6.created_at)
    comments_dict['38'] = Comment(
        content="Well. Where was it?!?",
        user_id=34,
        post_id=6,
        created_at=comment38_createdat,
        updated_at=comment38_createdat
    )
    db.session.add(comments_dict['38'])
    db.session.flush()

    comment39_createdat=generate_comment_timestamp(user2.created_at, comments_dict['38'].created_at)
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

    comment40_createdat=generate_comment_timestamp(user2.created_at, comments_dict['39'].created_at)
    comments_dict['40'] = Comment(
        content="LOST",
        user_id=36,
        post_id=6,
        parent_id=comments_dict['39'].id,  # Correct parent reference
        created_at=comment40_createdat,
        updated_at=comment40_createdat
    )
    db.session.add(comments_dict['40'])

    comment41_createdat=generate_comment_timestamp(user2.created_at, comments_dict['39'].created_at)
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

    comment42_createdat=generate_comment_timestamp(user2.created_at, comments_dict['41'].created_at)
    comments_dict['42'] = Comment(
        content="I can almost guarantee it is not there.",
        user_id=38,
        post_id=6,
        parent_id=comments_dict['41'].id,  # Correct parent reference
        created_at=comment42_createdat,
        updated_at=comment42_createdat
    )
    db.session.add(comments_dict['42'])

    comment43_createdat=generate_comment_timestamp(user2.created_at, post6.created_at)
    comments_dict['43'] = Comment(
        content="4 year old me was specifically told not to tell my Father we got him a hammer for Christmas. As he was opening his gift I blurted out, \"It's not a hammer.\"",
        user_id=39,
        post_id=6,
        created_at=comment43_createdat,
        updated_at=comment43_createdat
    )
    db.session.add(comments_dict['43'])

    comment44_createdat=generate_comment_timestamp(user2.created_at, post6.created_at)
    comments_dict['44'] = Comment(
        content="Holy shit! A post that's actually oddly specific. Well, it's actually suspiciously specific, but hey, you guys got close.",
        user_id=40,
        post_id=6,
        created_at=comment44_createdat,
        updated_at=comment44_createdat
    )
    db.session.add(comments_dict['44'])

    # -------------------------------------------------------------------------
    # POST 7
    # -------------------------------------------------------------------------
    post7 = Post.query.get(7)

    comment45_createdat=generate_comment_timestamp(user2.created_at, post7.created_at)
    comments_dict['45'] = Comment(
        content="What chance of success do they have? I'm all for it, should've been done a long while ago.",
        user_id=41,
        post_id=7,
        created_at=comment45_createdat,
        updated_at=comment45_createdat
    )
    db.session.add(comments_dict['45'])
    db.session.flush()

    comment46_createdat=generate_comment_timestamp(user2.created_at, comments_dict['45'].created_at)
    comments_dict['46'] = Comment(
        content="It's a valid argument, but it's up against a giant pile of money. Money has been winning lately.",
        user_id=42,
        post_id=7,
        parent_id=comments_dict['45'].id,  # Correct parent reference
        created_at=comment46_createdat,
        updated_at=comment46_createdat
    )
    db.session.add(comments_dict['46'])

    comment47_createdat=generate_comment_timestamp(user2.created_at, post7.created_at)
    comments_dict['47'] = Comment(
        content="Just rename it KotlinScript.",
        user_id=43,
        post_id=7,
        created_at=comment47_createdat,
        updated_at=comment47_createdat
    )
    db.session.add(comments_dict['47'])
    db.session.flush()

    comment48_createdat=generate_comment_timestamp(user2.created_at, comments_dict['47'].created_at)
    comments_dict['48'] = Comment(
        content="Jetbrains would like a word.",
        user_id=44,
        post_id=7,
        parent_id=comments_dict['47'].id,  # Correct parent reference
        created_at=comment48_createdat,
        updated_at=comment48_createdat
    )
    db.session.add(comments_dict['48'])

    comment49_createdat=generate_comment_timestamp(user2.created_at, post7.created_at)
    comments_dict['49'] = Comment(
        content="Let's get MySQL back too. Adobe can keep Acrobat, but websites need to stop saying to download it to view pdfs.",
        user_id=45,
        post_id=7,
        created_at=comment49_createdat,
        updated_at=comment49_createdat
    )
    db.session.add(comments_dict['49'])

    comment50_createdat=generate_comment_timestamp(user2.created_at, post7.created_at)
    comments_dict['50'] = Comment(
        content="This sounds an awul lot like poking the bear. Hopefully the slumbering beast doesn't wake and decide that all JS runtimes need to pay licensing costs back to the owners of the trademark. Or worse, users of the runtime.",
        user_id=46,
        post_id=7,
        created_at=comment50_createdat,
        updated_at=comment50_createdat
    )
    db.session.add(comments_dict['50'])

    # -------------------------------------------------------------------------
    # POST 8
    # -------------------------------------------------------------------------
    post8 = Post.query.get(8)

    comment51_createdat=generate_comment_timestamp(user2.created_at, post8.created_at)
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

    comment52_createdat=generate_comment_timestamp(user2.created_at, post8.created_at)
    comments_dict['52'] = Comment(
        content="They probably don't know it (and I guess it's not strictly JavaScript), but they're really confused about CORS.",
        user_id=48,
        post_id=8,
        created_at=comment52_createdat,
        updated_at=comment52_createdat
    )
    db.session.add(comments_dict['52'])
    db.session.flush()

    comment53_createdat=generate_comment_timestamp(user2.created_at, comments_dict['52'].created_at)
    comments_dict['53'] = Comment(
        content="CORS isn't a JavaScript concept, but an HTTP one",
        user_id=9,
        post_id=8,
        parent_id=comments_dict['52'].id,
        created_at=comment53_createdat,
        updated_at=comment53_createdat
    )
    db.session.add(comments_dict['53'])

    comment54_createdat=generate_comment_timestamp(user2.created_at, post8.created_at)
    comments_dict['54'] = Comment(
        content="Structuring a project",
        user_id=49,
        post_id=8,
        created_at=comment54_createdat,
        updated_at=comment54_createdat
    )
    db.session.add(comments_dict['54'])

    comment55_createdat=generate_comment_timestamp(user2.created_at, post8.created_at)
    comments_dict['55'] = Comment(
        content="Any videos to learn it?",
        user_id=50,
        post_id=8,
        created_at=comment55_createdat,
        updated_at=comment55_createdat
    )
    db.session.add(comments_dict['55'])
    db.session.flush()  # Assigns an ID to comment '55'

    comment56_createdat=generate_comment_timestamp(user2.created_at, comments_dict['55'].created_at)
    comments_dict['56'] = Comment(
        content="Not yet, I might adapt it to video form as well",
        user_id=9,
        post_id=8,
        parent_id=comments_dict['55'].id,
        created_at=comment56_createdat,
        updated_at=comment56_createdat
    )
    db.session.add(comments_dict['56'])

    # -------------------------------------------------------------------------
    # POST 9
    # -------------------------------------------------------------------------
    post9 = Post.query.get(9)

    comment57_createdat=generate_comment_timestamp(user2.created_at, post9.created_at)
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

    comment58_createdat=generate_comment_timestamp(user2.created_at, comments_dict['57'].created_at)
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

    comment59_createdat=generate_comment_timestamp(user2.created_at, comments_dict['58'].created_at)
    comments_dict['59'] = Comment(
        content="Literally didn't change anything in the codebase.",
        user_id=1,
        post_id=9,
        parent_id=comments_dict['58'].id,
        created_at=comment59_createdat,
        updated_at=comment59_createdat
    )
    db.session.add(comments_dict['59'])

    comment60_createdat=generate_comment_timestamp(user2.created_at, comments_dict['58'].created_at)
    comments_dict['60'] = Comment(
        content="The moment Remix gets RSC I’m gonna have to strongly consider switching us over from Next. I’m not on the anti-vercel bandwagon, I just don’t have high hopes in Next being basically the sole remaining Webpack-based framework",
        user_id=3,
        post_id=9,
        parent_id=comments_dict['58'].id,
        created_at=comment60_createdat,
        updated_at=comment60_createdat
    )
    db.session.add(comments_dict['60'])

    comment61_createdat=generate_comment_timestamp(user2.created_at, post9.created_at)
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

    comment62_createdat=generate_comment_timestamp(user2.created_at, comments_dict['61'].created_at)
    comments_dict['62'] = Comment(
        content="Industry standard? What industry are you talking about my bro? The industry of fairy land?",
        user_id=5,
        post_id=9,
        parent_id=comments_dict['61'].id,
        created_at=comment62_createdat,
        updated_at=comment62_createdat
    )
    db.session.add(comments_dict['62'])

    # -------------------------------------------------------------------------
    # POST 10
    # -------------------------------------------------------------------------
    post10 = Post.query.get(10)

    comment63_createdat=generate_comment_timestamp(user2.created_at, post10.created_at)
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

    comment64_createdat=generate_comment_timestamp(user2.created_at, comments_dict['63'].created_at)
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

    comment65_createdat=generate_comment_timestamp(user2.created_at, comments_dict['64'].created_at)
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

    comment66_createdat=generate_comment_timestamp(user2.created_at, post10.created_at)
    comments_dict['66'] = Comment(
        content="Like cotton balls",
        user_id=9,
        post_id=10,
        created_at=comment66_createdat,
        updated_at=comment66_createdat
    )
    db.session.add(comments_dict['66'])
    db.session.flush()

    comment67_createdat=generate_comment_timestamp(user2.created_at, comments_dict['66'].created_at)
    comments_dict['67'] = Comment(
        content="But with retractable needles.",
        user_id=10,
        post_id=10,
        parent_id=comments_dict['66'].id,
        created_at=comment67_createdat,
        updated_at=comment67_createdat
    )
    db.session.add(comments_dict['67'])

    comment68_createdat=generate_comment_timestamp(user2.created_at, post10.created_at)
    comments_dict['68'] = Comment(
        content="Oh my god…. i am mesmerized 🤩🫶",
        user_id=12,
        post_id=10,
        created_at=comment68_createdat,
        updated_at=comment68_createdat
    )
    db.session.add(comments_dict['68'])

    # -------------------------------------------------------------------------
    # POST 11
    # -------------------------------------------------------------------------
    post11 = Post.query.get(11)

    comment69_createdat=generate_comment_timestamp(user2.created_at, post11.created_at)
    comments_dict['69'] = Comment(
        content="what cat?",
        user_id=13,
        post_id=11,
        created_at=comment69_createdat,
        updated_at=comment69_createdat
    )
    db.session.add(comments_dict['69'])
    db.session.flush()

    comment70_createdat=generate_comment_timestamp(user2.created_at, comments_dict['69'].created_at)
    comments_dict['70'] = Comment(
        content="Doesn't look like anything to me",
        user_id=14,
        post_id=11,
        parent_id=comments_dict['69'].id,
        created_at=comment70_createdat,
        updated_at=comment70_createdat
    )
    db.session.add(comments_dict['70'])

    comment71_createdat=generate_comment_timestamp(user2.created_at, post11.created_at)
    comments_dict['71'] = Comment(
        content="After a ton of editing, yes.",
        user_id=15,
        post_id=11,
        created_at=comment71_createdat,
        updated_at=comment71_createdat
    )
    db.session.add(comments_dict['71'])
    db.session.flush()

    comment72_createdat=generate_comment_timestamp(user2.created_at, comments_dict['71'].created_at)
    comments_dict['72'] = Comment(
        content="I might blend into the wood if you color shift and saturate me this much.",
        user_id=16,
        post_id=11,
        parent_id=comments_dict['71'].id,
        created_at=comment72_createdat,
        updated_at=comment72_createdat
    )
    db.session.add(comments_dict['72'])

    comment73_createdat=generate_comment_timestamp(user2.created_at, comments_dict['71'].created_at)
    comments_dict['73'] = Comment(
        content="In the original image, the cat is a brown tabby.",
        user_id=17,
        post_id=11,
        parent_id=comments_dict['71'].id,
        created_at=comment73_createdat,
        updated_at=comment73_createdat
    )
    db.session.add(comments_dict['73'])

    comment74_createdat=generate_comment_timestamp(user2.created_at, post11.created_at)
    comments_dict['74'] = Comment(
        content="This is ca(t)mouflage.",
        user_id=18,
        post_id=11,
        created_at=comment74_createdat,
        updated_at=comment74_createdat
    )
    db.session.add(comments_dict['74'])

    # -------------------------------------------------------------------------
    # POST 12
    # -------------------------------------------------------------------------
    post12 = Post.query.get(12)

    comment75_createdat=generate_comment_timestamp(user2.created_at, post12.created_at)
    comments_dict['75'] = Comment(
        content="I like how the feet shake off the sand before getting back into the shoes",
        user_id=19,
        post_id=12,
        created_at=comment75_createdat,
        updated_at=comment75_createdat
    )
    db.session.add(comments_dict['75'])
    db.session.flush()

    comment76_createdat=generate_comment_timestamp(user2.created_at, comments_dict['75'].created_at)
    comments_dict['76'] = Comment(
        content="I couldn't comprehend doing that. You are not getting all the sand off. I hate to admit I was kinda triggered by clay feet shaking off nonexistent sand and putting on clay shoes. lol I just avoid sand at all costs",
        user_id=20,
        post_id=12,
        parent_id=comments_dict['75'].id,
        created_at=comment76_createdat,
        updated_at=comment76_createdat
    )
    db.session.add(comments_dict['76'])

    comment77_createdat=generate_comment_timestamp(user2.created_at, post12.created_at)
    comments_dict['77'] = Comment(
        content="Honestly, I would compare this to Avatar",
        user_id=21,
        post_id=12,
        created_at=comment77_createdat,
        updated_at=comment77_createdat
    )
    db.session.add(comments_dict['77'])

    comment78_createdat=generate_comment_timestamp(user2.created_at, post12.created_at)
    comments_dict['78'] = Comment(
        content="8 kg of clay, but how much time did you use?",
        user_id=22,
        post_id=12,
        created_at=comment78_createdat,
        updated_at=comment78_createdat
    )
    db.session.add(comments_dict['78'])
    db.session.flush()

    comment79_createdat=generate_comment_timestamp(user2.created_at, comments_dict['78'].created_at)
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

    comment80_createdat=generate_comment_timestamp(user2.created_at, comments_dict['79'].created_at)
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

    comment81_createdat=generate_comment_timestamp(user2.created_at, comments_dict['80'].created_at)
    comments_dict['81'] = Comment(
        content="Oh my god...... That's the whole thing....",
        user_id=25,
        post_id=12,
        parent_id=comments_dict['80'].id,
        created_at=comment81_createdat,
        updated_at=comment81_createdat
    )
    db.session.add(comments_dict['81'])

    # -------------------------------------------------------------------------
    # POST 13
    # -------------------------------------------------------------------------
    post13 = Post.query.get(13)

    comment82_createdat=generate_comment_timestamp(user2.created_at, post13.created_at)
    comments_dict['82'] = Comment(
        content="Omgggg she’s so tiny 🥹🥹",
        user_id=26,
        post_id=13,
        created_at=comment82_createdat,
        updated_at=comment82_createdat
    )
    db.session.add(comments_dict['82'])
    db.session.flush()

    comment83_createdat=generate_comment_timestamp(user2.created_at, comments_dict['82'].created_at)
    comments_dict['83'] = Comment(
        content="That's because she's under the compressor.",
        user_id=27,
        post_id=13,
        parent_id=comments_dict['82'].id,
        created_at=comment83_createdat,
        updated_at=comment83_createdat
    )
    db.session.add(comments_dict['83'])

    comment84_createdat=generate_comment_timestamp(user2.created_at, post13.created_at)
    comments_dict['84'] = Comment(
        content="OMG. You did not exaggerate, OP. 🥹❤️",
        user_id=28,
        post_id=13,
        created_at=comment84_createdat,
        updated_at=comment84_createdat
    )
    db.session.add(comments_dict['84'])
    db.session.flush()

    comment85_createdat=generate_comment_timestamp(user2.created_at, comments_dict['84'].created_at)
    comments_dict['85'] = Comment(
        content="My boyfriend sent this to me from his woodshop downstairs and I truly almost fell over when I saw her lol. Had to share.",
        user_id=12,
        post_id=13,
        parent_id=comments_dict['84'].id,
        created_at=comment85_createdat,
        updated_at=comment85_createdat
    )
    db.session.add(comments_dict['85'])

    comment86_createdat=generate_comment_timestamp(user2.created_at, post13.created_at)
    comments_dict['86'] = Comment(
        content="The embodiment of 🥺",
        user_id=29,
        post_id=13,
        created_at=comment86_createdat,
        updated_at=comment86_createdat
    )
    db.session.add(comments_dict['86'])
    db.session.flush()

    comment87_createdat=generate_comment_timestamp(user2.created_at, comments_dict['86'].created_at)
    comments_dict['87'] = Comment(
        content="💯",
        user_id=12,
        post_id=13,
        parent_id=comments_dict['86'].id,
        created_at=comment87_createdat,
        updated_at=comment87_createdat
    )
    db.session.add(comments_dict['87'])

    # -------------------------------------------------------------------------
    # POST 14
    # -------------------------------------------------------------------------
    post14 = Post.query.get(14)

    comment88_createdat=generate_comment_timestamp(user2.created_at, post14.created_at)
    comments_dict['88'] = Comment(
        content="Keeping it?? 🥹",
        user_id=30,
        post_id=14,
        created_at=comment88_createdat,
        updated_at=comment88_createdat
    )
    db.session.add(comments_dict['88'])
    db.session.flush()

    comment89_createdat=generate_comment_timestamp(user2.created_at, comments_dict['88'].created_at)
    comments_dict['89'] = Comment(
        content="No but she was adopted :)",
        user_id=13,
        post_id=14,
        parent_id=comments_dict['88'].id,
        created_at=comment89_createdat,
        updated_at=comment89_createdat
    )
    db.session.add(comments_dict['89'])

    comment90_createdat=generate_comment_timestamp(user2.created_at, post14.created_at)
    comments_dict['90'] = Comment(
        content="What a cute little kitty 🐈",
        user_id=31,
        post_id=14,
        created_at=comment90_createdat,
        updated_at=comment90_createdat
    )
    db.session.add(comments_dict['90'])

    comment91_createdat=generate_comment_timestamp(user2.created_at, post14.created_at)
    comments_dict['91'] = Comment(
        content="You were the lucky one to be blessed with this smile! Kitten looks so calm and protected!!",
        user_id=32,
        post_id=14,
        created_at=comment91_createdat,
        updated_at=comment91_createdat
    )
    db.session.add(comments_dict['91'])

    # -------------------------------------------------------------------------
    # POST 16
    # -------------------------------------------------------------------------
    post15 = Post.query.get(15)

    comment92_createdat=generate_comment_timestamp(user2.created_at, post15.created_at)
    comments_dict['92'] = Comment(
        content="Whiskey doesn’t age — it matures.",
        user_id=33,
        post_id=15,
        created_at=comment92_createdat,
        updated_at=comment92_createdat
    )
    db.session.add(comments_dict['92'])
    db.session.flush()

    comment93_createdat=generate_comment_timestamp(user2.created_at, comments_dict['92'].created_at)
    comments_dict['93'] = Comment(
        content="Phenomenal comment.No notes.",
        user_id=34,
        post_id=15,
        parent_id=comments_dict['92'].id,
        created_at=comment93_createdat,
        updated_at=comment93_createdat
    )
    db.session.add(comments_dict['93'])

    comment94_createdat=generate_comment_timestamp(user2.created_at, post15.created_at)
    comments_dict['94'] = Comment(
        content="The fluff of a kitten. The dead eyed rage of a senior.",
        user_id=35,
        post_id=15,
        created_at=comment94_createdat,
        updated_at=comment94_createdat
    )
    db.session.add(comments_dict['94'])
    db.session.flush()

    comment95_createdat=generate_comment_timestamp(user2.created_at, comments_dict['94'].created_at)
    comments_dict['95'] = Comment(
        content="😂 so true.",
        user_id=36,
        post_id=15,
        parent_id=comments_dict['94'].id,
        created_at=comment95_createdat,
        updated_at=comment95_createdat
    )
    db.session.add(comments_dict['95'])

    comment96_createdat=generate_comment_timestamp(user2.created_at, comments_dict['94'].created_at)
    comments_dict['96'] = Comment(
        content="The posture of an owl.",
        user_id=37,
        post_id=15,
        parent_id=comments_dict['94'].id,
        created_at=comment96_createdat,
        updated_at=comment96_createdat
    )
    db.session.add(comments_dict['96'])

    # -------------------------------------------------------------------------
    # POST 16
    # -------------------------------------------------------------------------
    post16 = Post.query.get(16)

    comment97_createdat=generate_comment_timestamp(user2.created_at, post16.created_at)
    comments_dict['97'] = Comment(
        content="Gotta be in Hawaii lol",
        user_id=38,
        post_id=16,
        created_at=comment97_createdat,
        updated_at=comment97_createdat
    )
    db.session.add(comments_dict['97'])

    comment98_createdat=generate_comment_timestamp(user2.created_at, post16.created_at)
    comments_dict['98'] = Comment(
        content="It’s police only. If you’re not police you can proceed",
        user_id=39,
        post_id=16,
        created_at=comment98_createdat,
        updated_at=comment98_createdat
    )
    db.session.add(comments_dict['98'])

    comment99_createdat=generate_comment_timestamp(user2.created_at, post16.created_at)
    comments_dict['99'] = Comment(
        content="If the stop sign is blue, you should probably slow down. Congrats on the fast shutter speed to get the picture though.",
        user_id=40,
        post_id=16,
        created_at=comment99_createdat,
        updated_at=comment99_createdat
    )
    db.session.add(comments_dict['99'])

    # -------------------------------------------------------------------------
    # POST 17
    # -------------------------------------------------------------------------
    post17 = Post.query.get(17)

    comment100_createdat=generate_comment_timestamp(user2.created_at, post17.created_at)
    comments_dict['100'] = Comment(
        content="\"Due to none of your fucking business we are closing Tuesdays.\"",
        user_id=41,
        post_id=17,
        created_at=comment100_createdat,
        updated_at=comment100_createdat
    )
    db.session.add(comments_dict['100'])

    comment101_createdat=generate_comment_timestamp(user2.created_at, post17.created_at)
    comments_dict['101'] = Comment(
        content="Usually Tuesday is the slowest day off the week for restaurant. In US, a lot of Chinese take out places are closed on Tuesday for this reason",
        user_id=42,
        post_id=17,
        created_at=comment101_createdat,
        updated_at=comment101_createdat
    )
    db.session.add(comments_dict['101'])
    db.session.flush()

    comment102_createdat=generate_comment_timestamp(user2.created_at, comments_dict['101'].created_at)
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

    comment103_createdat=generate_comment_timestamp(user2.created_at, comments_dict['102'].created_at)
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

    comment104_createdat=generate_comment_timestamp(user2.created_at, comments_dict['103'].created_at)
    comments_dict['104'] = Comment(
        content="Must be franchised because Closed Tuesdays opened a restaurant in my town. They're frequently Closed Fridays due to staffing.",
        user_id=45,
        post_id=17,
        parent_id=comments_dict['103'].id,
        created_at=comment104_createdat,
        updated_at=comment104_createdat
    )
    db.session.add(comments_dict['104'])

    comment105_createdat=generate_comment_timestamp(user2.created_at, post17.created_at)
    comments_dict['105'] = Comment(
        content="A small tobacco store i Sweden had a note a couple years back that said \"closed because of robbery\". They guy working there went to rob a bank.",
        user_id=46,
        post_id=17,
        created_at=comment105_createdat,
        updated_at=comment105_createdat
    )
    db.session.add(comments_dict['105'])
    db.session.flush()

    comment106_createdat=generate_comment_timestamp(user2.created_at, comments_dict['105'].created_at)
    comments_dict['106'] = Comment(
        content="Brilliant.",
        user_id=47,
        post_id=17,
        parent_id=comments_dict['105'].id,
        created_at=comment106_createdat,
        updated_at=comment106_createdat
    )
    db.session.add(comments_dict['106'])

    # -------------------------------------------------------------------------
    # POST 18
    # -------------------------------------------------------------------------
    # No comments

    # -------------------------------------------------------------------------
    # POST 19
    # -------------------------------------------------------------------------
    post19 = Post.query.get(19)

    comment107_createdat=generate_comment_timestamp(user2.created_at, post19.created_at)
    comments_dict['107'] = Comment(
        content="I witnessed enough engineers with ego problems.",
        user_id=48,
        post_id=19,
        created_at=comment107_createdat,
        updated_at=comment107_createdat
    )
    db.session.add(comments_dict['107'])
    db.session.flush()

    comment108_createdat=generate_comment_timestamp(user2.created_at, comments_dict['107'].created_at)
    comments_dict['108'] = Comment(
        content="It is honestly not talked about enough in this industry. Since the CompSci boom it has been pretty bad.",
        user_id=49,
        post_id=19,
        parent_id=comments_dict['107'].id,
        created_at=comment108_createdat,
        updated_at=comment108_createdat
    )
    db.session.add(comments_dict['108'])

    comment109_createdat=generate_comment_timestamp(user2.created_at, post19.created_at)
    comments_dict['109'] = Comment(
        content="Every team I’ve been on was severely understaffed lol. We’re always thrilled to have someone else help us get through the decades-old backlog",
        user_id=50,
        post_id=19,
        created_at=comment109_createdat,
        updated_at=comment109_createdat
    )
    db.session.add(comments_dict['109'])

    comment110_createdat=generate_comment_timestamp(user2.created_at, post19.created_at)
    comments_dict['110'] = Comment(
        content="Engineers can wildly vary on their non-negotiable opinions though. Linux/Mac/Windows... Vim/VSCode/Jetbrains...",
        user_id=1,
        post_id=19,
        created_at=comment110_createdat,
        updated_at=comment110_createdat
    )
    db.session.add(comments_dict['110'])

    # -------------------------------------------------------------------------
    # POST 20
    # -------------------------------------------------------------------------
    # No comments

    # -------------------------------------------------------------------------
    # POST 21
    # -------------------------------------------------------------------------
    post21 = Post.query.get(21)

    comment111_createdat=generate_comment_timestamp(user2.created_at, post21.created_at)
    comments_dict['111'] = Comment(
        content="That's what I told a colleague who was griping about how her older code is spaghetti: \"Be glad you think it's spaghetti. If you didn't, that would mean you haven't learned a thing in the last year.\"",
        user_id=2,
        post_id=21,
        created_at=comment111_createdat,
        updated_at=comment111_createdat
    )
    db.session.add(comments_dict['111'])
    db.session.flush()

    comment112_createdat=generate_comment_timestamp(user2.created_at, comments_dict['111'].created_at)
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

    comment113_createdat=generate_comment_timestamp(user2.created_at, comments_dict['112'].created_at)
    comments_dict['113'] = Comment(
        content="You were right then, and you're right now!",
        user_id=5,
        post_id=21,
        parent_id=comments_dict['112'].id,
        created_at=comment113_createdat,
        updated_at=comment113_createdat
    )
    db.session.add(comments_dict['113'])

    comment114_createdat=generate_comment_timestamp(user2.created_at, post21.created_at)
    comments_dict['114'] = Comment(
        content="All code sucks some just sucks a little more",
        user_id=6,
        post_id=21,
        created_at=comment114_createdat,
        updated_at=comment114_createdat
    )
    db.session.add(comments_dict['114'])
    db.session.flush()

    comment115_createdat=generate_comment_timestamp(user2.created_at, comments_dict['114'].created_at)
    comments_dict['115'] = Comment(
        content="So said Aristotle, so said you.",
        user_id=7,
        post_id=21,
        parent_id=comments_dict['114'].id,
        created_at=comment115_createdat,
        updated_at=comment115_createdat
    )
    db.session.add(comments_dict['115'])

    comment116_createdat=generate_comment_timestamp(user2.created_at, comments_dict['114'].created_at)
    comments_dict['116'] = Comment(
        content="Until you \"fixed\" it and all tests fail and it turns you knew exactly what you were doing and thought a comment isn't necessary because it's obvious why it is the way it is.",
        user_id=8,
        post_id=21,
        parent_id=comments_dict['114'].id,
        created_at=comment116_createdat,
        updated_at=comment116_createdat
    )
    db.session.add(comments_dict['116'])

    comment117_createdat=generate_comment_timestamp(user2.created_at, post21.created_at)
    comments_dict['117'] = Comment(
        content="who wrote this code?? Oh me lemme js put a try catch around that",
        user_id=9,
        post_id=21,
        created_at=comment117_createdat,
        updated_at=comment117_createdat
    )
    db.session.add(comments_dict['117'])

    comment118_createdat=generate_comment_timestamp(user2.created_at, post21.created_at)
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

    comment119_createdat=generate_comment_timestamp(user2.created_at, post21.created_at)
    comments_dict['119'] = Comment(
        content="Then you rewrite just to realize why it was written the way it was.. then comes the realization \"I am actually getting worst!\"",
        user_id=11,
        post_id=21,
        created_at=comment119_createdat,
        updated_at=comment119_createdat
    )
    db.session.add(comments_dict['119'])

    # -------------------------------------------------------------------------
    # POST 22
    # -------------------------------------------------------------------------
    post22 = Post.query.get(22)

    comment120_createdat=generate_comment_timestamp(user2.created_at, post22.created_at)
    comments_dict['120'] = Comment(
        content="Thanks! And do check out Archive.org for more movies, vids, albums, books and more - all for free",
        user_id=12,
        post_id=22,
        created_at=comment120_createdat,
        updated_at=comment120_createdat
    )
    db.session.add(comments_dict['120'])

    comment121_createdat=generate_comment_timestamp(user2.created_at, post22.created_at)
    comments_dict['121'] = Comment(
        content = "This is what Reddit should be about. Cool stuff from weird corners of the internet. Hell yeah.",
        user_id=13,
        post_id=22,
        created_at=comment121_createdat,
        updated_at=comment110_createdat
    )
    db.session.add(comments_dict['121'])
    db.session.flush()

    comment122_createdat=generate_comment_timestamp(user2.created_at, comments_dict['121'].created_at)
    comments_dict['122'] = Comment(
        content = "If you're subbed to the right places, that's exactly what it is!",
        user_id=14,
        post_id=22,
        parent_id=121,
        created_at=comment122_createdat,
        updated_at=comment122_createdat
    )
    db.session.add(comments_dict['122'])

    comment123_createdat=generate_comment_timestamp(user2.created_at, comments_dict['121'].created_at)
    comments_dict['123'] = Comment(
        content = "I agree. Posts like this remind me why Ribbit is the only social media I use",
        user_id=15,
        post_id=22,
        parent_id=121,
        created_at=comment123_createdat,
        updated_at=comment123_createdat
    )
    db.session.add(comments_dict['123'])

    # -------------------------------------------------------------------------
    # POST 23
    # -------------------------------------------------------------------------
    post23 = Post.query.get(23)

    comment124_createdat=generate_comment_timestamp(user2.created_at, post23.created_at)
    comments_dict['124'] = Comment(
        content="Going to use your post to plug Navy Federal. The credit union has a completely hassle-free shutdown assistance program for government employees enrolled in direct deposit with them. All you have to do is register for the program and they will spot your paycheck at the normal amount and at the normal time.",
        user_id=16,
        post_id=23,
        created_at=comment124_createdat,
        updated_at=comment124_createdat
    )
    db.session.add(comments_dict['124'])
    db.session.flush()

    comment125_createdat=generate_comment_timestamp(user2.created_at, comments_dict['124'].created_at)
    comments_dict['125'] = Comment(
        content="Can confirm, was in the navy during a shutdown, signed up for Navy Federal in boot camp and still got paid",
        user_id=17,
        post_id=23,
        parent_id=124,
        created_at=comment125_createdat,
        updated_at=comment125_createdat
    )
    db.session.add(comments_dict['125'])

    comment126_createdat=generate_comment_timestamp(user2.created_at, comments_dict['124'].created_at)
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

    comment127_createdat=generate_comment_timestamp(user2.created_at, comments_dict['126'].created_at)
    comments_dict['127'] = Comment(
        content="They paid us like nothing happened.",
        user_id=19,
        post_id=23,
        parent_id=126,
        created_at=comment127_createdat,
        updated_at=comment127_createdat
    )
    db.session.add(comments_dict['127'])

    comment128_createdat=generate_comment_timestamp(user2.created_at, post23.created_at)
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

    # -------------------------------------------------------------------------
    # POST 25
    # -------------------------------------------------------------------------
    post25 = Post.query.get(25)

    comment129_createdat=generate_comment_timestamp(user2.created_at, post25.created_at)
    comments_dict['129'] = Comment(
        content="I manage a high price bed store. I do 80k-90k a year depending on how sales go.",
        user_id=21,
        post_id=25,
        created_at=comment129_createdat,
        updated_at=comment129_createdat
    )
    db.session.add(comments_dict['129'])
    db.session.flush()

    comment130_createdat=generate_comment_timestamp(user2.created_at, comments_dict['129'].created_at)
    comments_dict['130'] = Comment(
        content="How do you sleep at night?",
        user_id=22,
        post_id=25,
        parent_id=129,
        created_at=comment130_createdat,
        updated_at=comment130_createdat
    )
    db.session.add(comments_dict['130'])
    db.session.flush()

    comment131_createdat=generate_comment_timestamp(user2.created_at, comments_dict['130'].created_at)
    comments_dict['131'] = Comment(
        content="In a big bed with his wife.",
        user_id=23,
        post_id=25,
        parent_id=130,
        created_at=comment131_createdat,
        updated_at=comment131_createdat
    )
    db.session.add(comments_dict['131'])

    comment132_createdat=generate_comment_timestamp(user2.created_at, post25.created_at)
    comments_dict['132'] = Comment(
        content="Started sucking a lot of dick for coke, and then sold the coke.",
        user_id=24,
        post_id=25,
        created_at=comment132_createdat,
        updated_at=comment132_createdat
    )
    db.session.add(comments_dict['132'])

    comment133_createdat=generate_comment_timestamp(user2.created_at, post25.created_at)
    comments_dict['133'] = Comment(
        content="Raise your standards, 85-100k is borderline poverty nowadays.",
        user_id=25,
        post_id=25,
        created_at=comment133_createdat,
        updated_at=comment133_createdat
    )
    db.session.add(comments_dict['133'])


    # -------------------------------------------------------------------------
    # POST 26
    # -------------------------------------------------------------------------
    post26 = Post.query.get(26)

    comment134_createdat=generate_comment_timestamp(user2.created_at, post26.created_at)
    comments_dict['134'] = Comment(
        content="You'll have to risk hurting her feelings to bring it up.",
        user_id=26,
        post_id=26,
        created_at=comment134_createdat,
        updated_at=comment134_createdat
    )
    db.session.add(comments_dict['134'])
    db.session.flush()

    comment135_createdat=generate_comment_timestamp(user2.created_at, comments_dict['134'].created_at)
    comments_dict['135'] = Comment(
        content="Agreed. But one way to might be to say you’re interested in starting a new routine and could she join in to help motivate you and because it will be fun, etc. If she used to care about being in shape she hasn’t lost the muscle memory (no pun intended) and stuff like work, kids, etc., really requires you to set aside time.",
        user_id=27,
        post_id=26,
        parent_id=134,
        created_at=comment135_createdat,
        updated_at=comment135_createdat
    )
    db.session.add(comments_dict['135'])
    db.session.flush()

    comment136_createdat=generate_comment_timestamp(user2.created_at, comments_dict['135'].created_at)
    comments_dict['136'] = Comment(
        content="Where's the pun? 🤔",
        user_id=28,
        post_id=26,
        parent_id=135,
        created_at=comment136_createdat,
        updated_at=comment136_createdat
    )
    db.session.add(comments_dict['136'])

    comment137_createdat=generate_comment_timestamp(user2.created_at, post26.created_at)
    comments_dict['137'] = Comment(
        content="To be honest, it sounds like she’s suffering from depression and it might be her workplace. You’ve listed many of the symptoms of depression. Maybe have that discussion first. If you tell her you’re worried about how’s she’s “letting herself go” no matter how gently, you’ll just be piling on. I promise you she’s ALSO not okay with the weight gain and not enjoying things she used to love.",
        user_id=29,
        post_id=26,
        created_at=comment137_createdat,
        updated_at=comment137_createdat
    )
    db.session.add(comments_dict['137'])
    db.session.flush()

    comment138_createdat=generate_comment_timestamp(user2.created_at, comments_dict['137'].created_at)
    comments_dict['138'] = Comment(
        content="Usually that is the case for most obese people. There is usually some psychological factor driving the weight gain. If it is not addressed, you will probably just be running in circles with them.",
        user_id=30,
        post_id=26,
        parent_id=137,
        created_at=comment138_createdat,
        updated_at=comment138_createdat
    )
    db.session.add(comments_dict['138'])

    comment139_createdat=generate_comment_timestamp(user2.created_at, comments_dict['137'].created_at)
    comments_dict['139'] = Comment(
        content="""This should be the top post! She sounds like her mental health isn't good right now, and she is probably acutely aware of how her appearance and health has changed. At this point tell her thatshe is out of shape, no matter how gently, is just going to add to her burden.

OP, please discuss her mental health and help her get therapy and / or medication BEFORE you talk about her appearance or fitness.""",
        user_id=31,
        post_id=26,
        parent_id=137,
        created_at=comment139_createdat,
        updated_at=comment139_createdat
    )
    db.session.add(comments_dict['139'])

    comment140_createdat=generate_comment_timestamp(user2.created_at, post26.created_at)
    comments_dict['140'] = Comment(
        content="Hire a tuba player to follow her around.",
        user_id=32,
        post_id=26,
        created_at=comment140_createdat,
        updated_at=comment140_createdat
    )
    db.session.add(comments_dict['140'])

    comment141_createdat=generate_comment_timestamp(user2.created_at, post26.created_at)
    comments_dict['141'] = Comment(
        content="I think the phrase \"letting yourself go\" is super judgmental and negative. We assume people just stop caring about taking care of themselves but honestly she's probably noticing it just as much as you are and is struggling. You said that she says she's tired or that it's due to her work? Well then that's your answer. When our mental health suffers, so does our physical health. If you're going to talk to her about it, make it about changes you can both make. Change YOUR eating habits and ask that she join you. Start going to the gym/exercising more yourself and invite her along. Make it fun and connective",
        user_id=33,
        post_id=26,
        created_at=comment141_createdat,
        updated_at=comment141_createdat
    )
    db.session.add(comments_dict['141'])
    db.session.flush()

    comment142_createdat=generate_comment_timestamp(user2.created_at, comments_dict['141'].created_at)
    comments_dict['142'] = Comment(
        content="Would you prefer “getting fat?“ There’s been a noticeable change in her appearance. “Letting yourself go“ is about as diplomatic as you can get.",
        user_id=34,
        post_id=26,
        parent_id=141,
        created_at=comment142_createdat,
        updated_at=comment142_createdat
    )
    db.session.add(comments_dict['142'])
    db.session.flush()

    comment143_createdat=generate_comment_timestamp(user2.created_at, comments_dict['142'].created_at)
    comments_dict['143'] = Comment(
        content="""Every woman understands that when a man says she's \"letting herself go,\" it means he thinks she's getting fat and has a problem with it. So, in a way, yes, actually. If what you really mean is \"You're getting fat and I don't like it,\" just say it, because that's what's coming across either way

The real problem with saying \"letting yourself go\" (or \"you're getting fat\") is that it's making her physical appearance the problem when her physical appearance is more likely just a symptom of her mental health. Approach it as a mental health problem and be compassionate and supportive, you'll have more success than implying she just needs to try harder to get back in shape""",
        user_id=35,
        post_id=26,
        parent_id=142,
        created_at=comment143_createdat,
        updated_at=comment143_createdat
    )
    db.session.add(comments_dict['143'])


    # -------------------------------------------------------------------------
    # POST 27
    # -------------------------------------------------------------------------
    post27 = Post.query.get(27)

    comment144_createdat=generate_comment_timestamp(user2.created_at, post27.created_at)
    comments_dict['144'] = Comment(
        content="""We're real warm during the winter.

And we die sooner.

The silver lining is inside the coffin.""",
        user_id=36,
        post_id=27,
        created_at=comment144_createdat,
        updated_at=comment144_createdat
    )
    db.session.add(comments_dict['144'])
    db.session.flush()

    comment145_createdat=generate_comment_timestamp(user2.created_at, comments_dict['144'].created_at)
    comments_dict['145'] = Comment(
        content="""Straight ballin if you can afford a casket lined in silver.

Die like a proper pauper at least: with dignity and mountains of debts 🫠""",
        user_id=37,
        post_id=27,
        parent_id=144,
        created_at=comment145_createdat,
        updated_at=comment145_createdat
    )
    db.session.add(comments_dict['145'])
    db.session.flush()

    comment146_createdat=generate_comment_timestamp(user2.created_at, comments_dict['145'].created_at)
    comments_dict['146'] = Comment(
        content="If I ever get a terminal illness, I'm gonna get exceptionally drunk and high and be launched into an active volcano, lol.",
        user_id=38,
        post_id=27,
        parent_id=145,
        created_at=comment146_createdat,
        updated_at=comment146_createdat
    )
    db.session.add(comments_dict['146'])

    comment147_createdat=generate_comment_timestamp(user2.created_at, comments_dict['145'].created_at)
    comments_dict['147'] = Comment(
        content="Straight baller if you can afford a casket",
        user_id=39,
        post_id=27,
        parent_id=145,
        created_at=comment147_createdat,
        updated_at=comment147_createdat
    )
    db.session.add(comments_dict['147'])

    comment148_createdat=generate_comment_timestamp(user2.created_at, comments_dict['144'].created_at)
    comments_dict['148'] = Comment(
        content="The sweet sweet release of death.",
        user_id=40,
        post_id=27,
        parent_id=144,
        created_at=comment148_createdat,
        updated_at=comment148_createdat
    )
    db.session.add(comments_dict['148'])

    comment149_createdat=generate_comment_timestamp(user2.created_at, comments_dict['144'].created_at)
    comments_dict['149'] = Comment(
        content="Dont forget the life insurance policy for the wife after you kick the bucket.",
        user_id=41,
        post_id=27,
        parent_id=144,
        created_at=comment149_createdat,
        updated_at=comment149_createdat
    )
    db.session.add(comments_dict['149'])

    comment150_createdat=generate_comment_timestamp(user2.created_at, post27.created_at)
    comments_dict['150'] = Comment(
        content="Some heavier guys who walk regularly develop huge calves.",
        user_id=42,
        post_id=27,
        created_at=comment150_createdat,
        updated_at=comment150_createdat
    )
    db.session.add(comments_dict['150'])

    comment151_createdat=generate_comment_timestamp(user2.created_at, post27.created_at)
    comments_dict['151'] = Comment(
        content="Bigger boobs and ass",
        user_id=43,
        post_id=27,
        created_at=comment151_createdat,
        updated_at=comment151_createdat
    )
    db.session.add(comments_dict['151'])


    # -------------------------------------------------------------------------
    # POST 28
    # -------------------------------------------------------------------------
    post28 = Post.query.get(28)

    comment152_createdat=generate_comment_timestamp(user2.created_at, post28.created_at)
    comments_dict['152'] = Comment(
        content="Your Nick evolved into Nicholas. He must have used some stone.",
        user_id=44,
        post_id=28,
        created_at=comment152_createdat,
        updated_at=comment152_createdat
    )
    db.session.add(comments_dict['152'])
    db.session.flush()

    comment153_createdat=generate_comment_timestamp(user2.created_at, comments_dict['152'].created_at)
    comments_dict['153'] = Comment(
        content="McStone.",
        user_id=45,
        post_id=28,
        parent_id=152,
        created_at=comment153_createdat,
        updated_at=comment153_createdat
    )
    db.session.add(comments_dict['153'])
    db.session.flush()

    comment154_createdat=generate_comment_timestamp(user2.created_at, comments_dict['153'].created_at)
    comments_dict['154'] = Comment(
        content="sounds like an edible",
        user_id=46,
        post_id=28,
        parent_id=153,
        created_at=comment154_createdat,
        updated_at=comment154_createdat
    )
    db.session.add(comments_dict['154'])
    db.session.flush()

    comment155_createdat=generate_comment_timestamp(user2.created_at, comments_dict['154'].created_at)
    comments_dict['155'] = Comment(
        content="McStone<strong>d</strong>",
        user_id=47,
        post_id=28,
        parent_id=154,
        created_at=comment155_createdat,
        updated_at=comment155_createdat
    )
    db.session.add(comments_dict['155'])

    comment156_createdat=generate_comment_timestamp(user2.created_at, post28.created_at)
    comments_dict['156'] = Comment(
        content="The hell is a Market People Lead",
        user_id=48,
        post_id=28,
        created_at=comment156_createdat,
        updated_at=comment156_createdat
    )
    db.session.add(comments_dict['156'])

    comment157_createdat=generate_comment_timestamp(user2.created_at, post28.created_at)
    comments_dict['157'] = Comment(
        content="Assistant TO the regional manager",
        user_id=49,
        post_id=28,
        created_at=comment157_createdat,
        updated_at=comment157_createdat
    )
    db.session.add(comments_dict['157'])

    comment158_createdat=generate_comment_timestamp(user2.created_at, post28.created_at)
    comments_dict['158'] = Comment(
        content="Climb that ladder Nick! Got to be part of the machine to fix those ice-cream machines !",
        user_id=50,
        post_id=28,
        created_at=comment158_createdat,
        updated_at=comment158_createdat
    )
    db.session.add(comments_dict['158'])

    # -------------------------------------------------------------------------
    # POST 29
    # -------------------------------------------------------------------------
    post29 = Post.query.get(29)

    comment159_createdat=generate_comment_timestamp(user2.created_at, post29.created_at)
    comments_dict['159'] = Comment(
        content="I'm <em>NOT</em> fat! I'm <strong>fluffy</strong>!",
        user_id=2,
        post_id=29,
        created_at=comment159_createdat,
        updated_at=comment159_createdat
    )
    db.session.add(comments_dict['159'])
    db.session.flush()

    comment160_createdat=generate_comment_timestamp(user2.created_at, comments_dict['159'].created_at)
    comments_dict['160'] = Comment(
        content="It's... So... FLUFFY!!!",
        user_id=3,
        post_id=29,
        parent_id=159,
        created_at=comment160_createdat,
        updated_at=comment160_createdat
    )
    db.session.add(comments_dict['160'])

    comment161_createdat=generate_comment_timestamp(user2.created_at, post29.created_at)
    comments_dict['161'] = Comment(
        content="I look the same when I stand with my back to the sun.",
        user_id=4,
        post_id=29,
        created_at=comment161_createdat,
        updated_at=comment161_createdat
    )
    db.session.add(comments_dict['161'])
    db.session.flush()

    comment162_createdat=generate_comment_timestamp(user2.created_at, comments_dict['161'].created_at)
    comments_dict['162'] = Comment(
        content="How close to the sun are you standing?",
        user_id=5,
        post_id=29,
        parent_id=161,
        created_at=comment162_createdat,
        updated_at=comment162_createdat
    )
    db.session.add(comments_dict['162'])

    comment163_createdat=generate_comment_timestamp(user2.created_at, post29.created_at)
    comments_dict['163'] = Comment(
        content="\"its was just bad lighting 😰\"",
        user_id=6,
        post_id=29,
        created_at=comment163_createdat,
        updated_at=comment163_createdat
    )
    db.session.add(comments_dict['163'])

    comment164_createdat=generate_comment_timestamp(user2.created_at, post29.created_at)
    comments_dict['164'] = Comment(
        content="Is it a cat or a rabbit?",
        user_id=7,
        post_id=29,
        created_at=comment164_createdat,
        updated_at=comment164_createdat
    )
    db.session.add(comments_dict['164'])
    db.session.flush()

    comment165_createdat=generate_comment_timestamp(user2.created_at, comments_dict['164'].created_at)
    comments_dict['165'] = Comment(
        content="a dog lil",
        user_id=12,
        post_id=29,
        parent_id=164,
        created_at=comment165_createdat,
        updated_at=comment165_createdat
    )
    db.session.add(comments_dict['165'])
    db.session.flush()

    comment166_createdat=generate_comment_timestamp(user2.created_at, comments_dict['165'].created_at)
    comments_dict['166'] = Comment(
        content="😯",
        user_id=9,
        post_id=29,
        parent_id=165,
        created_at=comment166_createdat,
        updated_at=comment166_createdat
    )
    db.session.add(comments_dict['166'])

    comment167_createdat=generate_comment_timestamp(user2.created_at, post29.created_at)
    comments_dict['167'] = Comment(
        content="Frodog.",
        user_id=10,
        post_id=29,
        created_at=comment167_createdat,
        updated_at=comment167_createdat
    )
    db.session.add(comments_dict['167'])
    db.session.flush()

    comment168_createdat=generate_comment_timestamp(user2.created_at, comments_dict['167'].created_at)
    comments_dict['168'] = Comment(
        content="yeahhh that's more like it",
        user_id=12,
        post_id=29,
        parent_id=167,
        created_at=comment168_createdat,
        updated_at=comment168_createdat
    )
    db.session.add(comments_dict['168'])

    # -------------------------------------------------------------------------
    # POST 30
    # -------------------------------------------------------------------------
    post30 = Post.query.get(30)

    comment169_createdat=generate_comment_timestamp(user2.created_at, post30.created_at)
    comments_dict['169'] = Comment(
        content="You can unlock it with icloud if he didn't remove it",
        user_id=11,
        post_id=30,
        created_at=comment169_createdat,
        updated_at=comment169_createdat
    )
    db.session.add(comments_dict['169'])

    comment170_createdat=generate_comment_timestamp(user2.created_at, post30.created_at)
    comments_dict['170'] = Comment(
        content="I always thought this was a stupid feature, even before I had a kid. Who the hell thought that was reasonable",
        user_id=12,
        post_id=30,
        created_at=comment170_createdat,
        updated_at=comment170_createdat
    )
    db.session.add(comments_dict['170'])

    comment171_createdat=generate_comment_timestamp(user2.created_at, post30.created_at)
    comments_dict['171'] = Comment(
        content="It’s very cool to call your phone disabled, man.",
        user_id=14,
        post_id=30,
        created_at=comment171_createdat,
        updated_at=comment171_createdat
    )
    db.session.add(comments_dict['171'])

    comment172_createdat=generate_comment_timestamp(user2.created_at, post30.created_at)
    comments_dict['172'] = Comment(
        content="I had this happen last week. Kinda sucks.",
        user_id=15,
        post_id=30,
        created_at=comment172_createdat,
        updated_at=comment172_createdat
    )
    db.session.add(comments_dict['172'])


    # -------------------------------------------------------------------------
    # POST 31
    # -------------------------------------------------------------------------
    post31 = Post.query.get(31)

    comment173_createdat=generate_comment_timestamp(user2.created_at, post31.created_at)
    comments_dict['173'] = Comment(
        content="I wouldn't put my name under such a message honestly (the \"About dev\" button). I am sure there are better ways to sort this out.",
        user_id=16,
        post_id=31,
        created_at=comment173_createdat,
        updated_at=comment173_createdat
    )
    db.session.add(comments_dict['173'])
    db.session.flush()

    comment174_createdat=generate_comment_timestamp(user2.created_at, comments_dict['173'].created_at)
    comments_dict['174'] = Comment(
        content="Besides this I'm pretty sure I heard others insist the client can sue the developer for adding \"stuff\" not stipulated in the contract, cause this doesn't seem like a thing it would just appear in official papers. Not saying the client is in the right for not paying but still",
        user_id=17,
        post_id=31,
        parent_id=173,
        created_at=comment174_createdat,
        updated_at=comment174_createdat
    )
    db.session.add(comments_dict['174'])

    comment175_createdat=generate_comment_timestamp(user2.created_at, post31.created_at)
    comments_dict['175'] = Comment(
        content="I'm not sure what hurts more: the fact that 'until' was written with 2 L's, or the fact that 'until' doesn't even fit in this sentence.",
        user_id=18,
        post_id=31,
        created_at=comment175_createdat,
        updated_at=comment175_createdat
    )
    db.session.add(comments_dict['175'])

    comment176_createdat=generate_comment_timestamp(user2.created_at, post31.created_at)
    comments_dict['176'] = Comment(
        content="It's a fake website and poorly done.",
        user_id=19,
        post_id=31,
        created_at=comment176_createdat,
        updated_at=comment176_createdat
    )
    db.session.add(comments_dict['176'])

    # -------------------------------------------------------------------------
    # POST 32
    # -------------------------------------------------------------------------
    post32 = Post.query.get(32)

    comment177_createdat=generate_comment_timestamp(user2.created_at, post32.created_at)
    comments_dict['177'] = Comment(
        content="""1. Get out of non-profits.

2. Don’t work for family.

3. Switch jobs to get a raise.""",
        user_id=20,
        post_id=32,
        created_at=comment177_createdat,
        updated_at=comment177_createdat
    )
    db.session.add(comments_dict['177'])
    db.session.flush()

    comment178_createdat=generate_comment_timestamp(user2.created_at, comments_dict['177'].created_at)
    comments_dict['178'] = Comment(
        content="""Yeah fair, working for family is always a risk.

At the time, it was worth it to me if for nothing else than the experience.""",
        user_id=15,
        post_id=32,
        parent_id=177,
        created_at=comment178_createdat,
        updated_at=comment178_createdat
    )
    db.session.add(comments_dict['178'])
    db.session.flush()

    comment179_createdat=generate_comment_timestamp(user2.created_at, comments_dict['178'].created_at)
    comments_dict['179'] = Comment(
        content="You've done your time now. 18 months is plenty. You need to upgrade.",
        user_id=21,
        post_id=32,
        parent_id=178,
        created_at=comment179_createdat,
        updated_at=comment179_createdat
    )
    db.session.add(comments_dict['179'])

    comment180_createdat=generate_comment_timestamp(user2.created_at, post32.created_at)
    comments_dict['180'] = Comment(
        content="""Non-profit... for you.

The answer is always the same, if you're unhappy with your salary and get a "no" when you ask for more, it is time to see what the market is willing to pay. Devs at my company are making U$150-$200k and they got a small bonus this year too. Everybody fully remote. Your boss is either full of shit or you're not a very good dev or both.""",
        user_id=22,
        post_id=32,
        created_at=comment180_createdat,
        updated_at=comment180_createdat
    )
    db.session.add(comments_dict['180'])

    comment181_createdat=generate_comment_timestamp(user2.created_at, post32.created_at)
    comments_dict['181'] = Comment(
        content="No matter what job you have,never ever believe when someone's telling you that you have reached the ceiling or you already get paid enough. For every crappy company with no money there's one that has more money than sense and is willing to pay top dollar. Whether your skills can get you there is a different thing,but that's a separate subject.",
        user_id=23,
        post_id=32,
        created_at=comment181_createdat,
        updated_at=comment181_createdat
    )
    db.session.add(comments_dict['181'])


    # -------------------------------------------------------------------------
    # POST 33
    # -------------------------------------------------------------------------
    post33 = Post.query.get(33)

    comment182_createdat=generate_comment_timestamp(user2.created_at, post33.created_at)
    comments_dict['182'] = Comment(
        content="Thats funny. I actually use chatgpt for this all the time",
        user_id=24,
        post_id=33,
        created_at=comment182_createdat,
        updated_at=comment182_createdat
    )
    db.session.add(comments_dict['182'])

    comment183_createdat=generate_comment_timestamp(user2.created_at, post33.created_at)
    comments_dict['183'] = Comment(
        content="This is basically a wrapper around a single prompt, right? Its kinda crazy single prompts are products.",
        user_id=25,
        post_id=33,
        created_at=comment183_createdat,
        updated_at=comment183_createdat
    )
    db.session.add(comments_dict['183'])

    comment184_createdat=generate_comment_timestamp(user2.created_at, post33.created_at)
    comments_dict['184'] = Comment(
        content="it's a sad thing that this tool will be useful",
        user_id=26,
        post_id=33,
        created_at=comment184_createdat,
        updated_at=comment184_createdat
    )
    db.session.add(comments_dict['184'])

    comment185_createdat=generate_comment_timestamp(user2.created_at, post33.created_at)
    comments_dict['185'] = Comment(
        content="""I would consider stripping final output of "I hope this email finds you well".

Or for satirical means, just add more gpt standard phrases""",
        user_id=27,
        post_id=33,
        created_at=comment185_createdat,
        updated_at=comment185_createdat
    )
    db.session.add(comments_dict['185'])
    db.session.flush()

    comment186_createdat=generate_comment_timestamp(user2.created_at, comments_dict['185'].created_at)
    comments_dict['186'] = Comment(
        content="\"As a professional...\"",
        user_id=28,
        post_id=33,
        parent_id=185,
        created_at=comment186_createdat,
        updated_at=comment186_createdat
    )
    db.session.add(comments_dict['186'])


    # -------------------------------------------------------------------------
    # POST 34
    # -------------------------------------------------------------------------
    post34 = Post.query.get(34)

    comment187_createdat=generate_comment_timestamp(user2.created_at, post34.created_at)
    comments_dict['187'] = Comment(
        content="I fought with my insurance company over bills they denied from my cancer treatments. I was sick, lethargic, unenergized and other wise fighting for life. The last thing anyone in that position should be worried about is whether or not your insurance company is going cover costs. The worst part about the whole ordeal was that it was being denied due to a date being improperly applied to paperwork. They wanted to make me eat the cost of tens of thousands of dollars due to a clerical error that was obviously a typo. What’s worse is that while I’m literally fighting for life, I have to fight with multiple people on the phone for weeks before someone took pity on me and let me know what happened and how they would fix it. Bless that person. Her name was Sarah. She fixed. Our system is broken and controlled by greedy people.",
        user_id=29,
        post_id=34,
        created_at=comment187_createdat,
        updated_at=comment187_createdat
    )
    db.session.add(comments_dict['187'])
    db.session.flush()

    comment188_createdat=generate_comment_timestamp(user2.created_at, comments_dict['187'].created_at)
    comments_dict['188'] = Comment(
        content="You pay them thousands and never claim. The one time you actually claim, they decline. Now, I’m not saying what he did is right…..",
        user_id=30,
        post_id=34,
        parent_id=187,
        created_at=comment188_createdat,
        updated_at=comment188_createdat
    )
    db.session.add(comments_dict['188'])
    db.session.flush()

    comment189_createdat=generate_comment_timestamp(user2.created_at, comments_dict['188'].created_at)
    comments_dict['189'] = Comment(
        content="I will. It was.",
        user_id=31,
        post_id=34,
        parent_id=188,
        created_at=comment189_createdat,
        updated_at=comment189_createdat
    )
    db.session.add(comments_dict['189'])
    db.session.flush()

    comment190_createdat=generate_comment_timestamp(user2.created_at, comments_dict['189'].created_at)
    comments_dict['190'] = Comment(
        content="It's kind of beautiful that basically everyone thinks this guy's death is justified. If/when they catch the guy, I hope the jury is educated on jury nullification",
        user_id=32,
        post_id=34,
        parent_id=189,
        created_at=comment190_createdat,
        updated_at=comment190_createdat
    )
    db.session.add(comments_dict['190'])

    comment191_createdat=generate_comment_timestamp(user2.created_at, post34.created_at)
    comments_dict['191'] = Comment(
        content="I take zofran due to my horrible nausea and gastro issues… it’s such a life saver without it I probably would have ended it all being ill all the time. I hope this child gets the medicine they need because I legit will share my zofran stash with them 😭",
        user_id=33,
        post_id=34,
        created_at=comment191_createdat,
        updated_at=comment191_createdat
    )
    db.session.add(comments_dict['191'])


    # -------------------------------------------------------------------------
    # POST 35
    # -------------------------------------------------------------------------
    post35 = Post.query.get(35)

    comment192_createdat=generate_comment_timestamp(user2.created_at, post35.created_at)
    comments_dict['192'] = Comment(
        content="Legit hope she's ok. Things like this often don't end up well for Iranian women.",
        user_id=34,
        post_id=35,
        created_at=comment192_createdat,
        updated_at=comment192_createdat
    )
    db.session.add(comments_dict['192'])
    db.session.flush()


    comment193_createdat=generate_comment_timestamp(user2.created_at, comments_dict['192'].created_at)
    comments_dict['193'] = Comment(
        content="Even things not like this don't end up well for them",
        user_id=36,
        post_id=35,
        parent_id=192,
        created_at=comment193_createdat,
        updated_at=comment193_createdat
    )
    db.session.add(comments_dict['193'])
    db.session.flush()

    comment194_createdat=generate_comment_timestamp(user2.created_at, comments_dict['193'].created_at)
    comments_dict['194'] = Comment(
        content="They spend their lives walking a thin line covered in eggshells.",
        user_id=37,
        post_id=35,
        parent_id=193,
        created_at=comment194_createdat,
        updated_at=comment194_createdat
    )
    db.session.add(comments_dict['194'])

    comment195_createdat=generate_comment_timestamp(user2.created_at, comments_dict['192'].created_at)
    comments_dict['195'] = Comment(
        content="Lately, most things don’t end up well for them.",
        user_id=38,
        post_id=35,
        parent_id=192,
        created_at=comment195_createdat,
        updated_at=comment195_createdat
    )
    db.session.add(comments_dict['195'])

    comment196_createdat=generate_comment_timestamp(user2.created_at, post35.created_at)
    comments_dict['196'] = Comment(
        content="Damn, that's bold af but extremely risky. Iran recently passed a law saying women who don't wear a hijab can be sentenced to death",
        user_id=39,
        post_id=35,
        created_at=comment196_createdat,
        updated_at=comment196_createdat
    )
    db.session.add(comments_dict['196'])
    db.session.flush()

    comment197_createdat=generate_comment_timestamp(user2.created_at, comments_dict['196'].created_at)
    comments_dict['197'] = Comment(
        content="Wait…… what???? Death????",
        user_id=40,
        post_id=35,
        parent_id=196,
        created_at=comment197_createdat,
        updated_at=comment197_createdat
    )
    db.session.add(comments_dict['197'])
    db.session.flush()

    comment198_createdat=generate_comment_timestamp(user2.created_at, comments_dict['197'].created_at)
    comments_dict['198'] = Comment(
        content="Sadly yes. They were already in danger of being tortured to death in custody like Mahsa Amini. This just makes it legal",
        user_id=39,
        post_id=35,
        parent_id=197,
        created_at=comment198_createdat,
        updated_at=comment198_createdat
    )
    db.session.add(comments_dict['198'])

    # -------------------------------------------------------------------------
    # POST 36
    # -------------------------------------------------------------------------
    post36 = Post.query.get(36)

    comment199_createdat = generate_comment_timestamp(user2.created_at, post36.created_at)
    comments_dict['199'] = Comment(
        content="Every time I see this photo posted it loses more and more color, it’s not this gray irl. Lots of densely packed buildings yes, but lots of trees and parks littered throughout the metro area",
        user_id=41,
        post_id=36,
        created_at=comment199_createdat,
        updated_at=comment199_createdat
    )
    db.session.add(comments_dict['199'])

    comment200_createdat = generate_comment_timestamp(user42.created_at, post36.created_at)
    comments_dict['200'] = Comment(
        content="Tokyo's 1990 census showed a population density of almost 28,000 people/km²...",
        user_id=42,
        post_id=36,
        created_at=comment200_createdat,
        updated_at=comment200_createdat
    )
    db.session.add(comments_dict['200'])

    comment201_createdat=generate_comment_timestamp(user43.created_at, post36.created_at)
    comments_dict['201'] = Comment(
        content="If Japan ever falls into economic ruin, Tokyo's going to be one enormous dystopian nightmarescape.",
        user_id=43,
        post_id=36,
        created_at=comment201_createdat,
        updated_at=comment201_createdat
    )
    db.session.add(comments_dict['201'])
    db.session.flush()

    comment202_createdat=generate_comment_timestamp(user44.created_at, comments_dict['201'].created_at)
    comments_dict['202'] = Comment(
        content="reminds me of many 80s and 90s futuristic animes",
        user_id=44,
        post_id=36,
        parent_id=201,
        created_at=comment202_createdat,
        updated_at=comment202_createdat
    )
    db.session.add(comments_dict['202'])

    comment203_createdat=generate_comment_timestamp(user45.created_at, post36.created_at)
    comments_dict['203'] = Comment(
        content="How long does it take to travel from one side to the other?!",
        user_id=45,
        post_id=36,
        created_at=comment203_createdat,
        updated_at=comment203_createdat
    )
    db.session.add(comments_dict['203'])
    db.session.flush()

    comment204_createdat=generate_comment_timestamp(user46.created_at, comments_dict['202'].created_at)
    comments_dict['204'] = Comment(
        content="""I asked the same question so I went to google maps and picked two random points - one near that river at the front and one near the edge, out towards Mt Fuji. It took 1 hour to drive. Then I moved it around at random on either end - always about 1 hour to drive your own car about 60-odd kilometres. Through some of the densest city in the world. That's insanely good traffic management.

Auckland -you got some assplainin to do.""",
        user_id=46,
        post_id=36,
        parent_id=203,
        created_at=comment204_createdat,
        updated_at=comment204_createdat
    )
    db.session.add(comments_dict['204'])


    # -------------------------------------------------------------------------
    # POST 37
    # -------------------------------------------------------------------------
    post37 = Post.query.get(37)

    comment205_createdat=generate_comment_timestamp(user47.created_at, post37.created_at)
    comments_dict['205'] = Comment(
        content="So the anti-Rock.",
        user_id=47,
        post_id=37,
        created_at=comment205_createdat,
        updated_at=comment205_createdat
    )
    db.session.add(comments_dict['205'])
    db.session.flush()

    comment206_createdat=generate_comment_timestamp(user48.created_at, comments_dict['205'].created_at)
    comments_dict['206'] = Comment(
        content="Danny \"The Paper\" Trejo",
        user_id=48,
        post_id=37,
        parent_id=205,
        created_at=comment206_createdat,
        updated_at=comment206_createdat
    )
    db.session.add(comments_dict['206'])
    db.session.flush()

    comment207_createdat=generate_comment_timestamp(user49.created_at, comments_dict['206'].created_at)
    comments_dict['207'] = Comment(
        content = "El Papel",
        user_id=49,
        post_id=37,
        parent_id=206,
        created_at=comment207_createdat,
        updated_at=comment207_createdat
    )
    db.session.add(comments_dict['207'])
    db.session.flush()

    comment208_createdat=generate_comment_timestamp(user50.created_at, comments_dict['207'].created_at)
    comments_dict['208'] = Comment(
        content = """Paper machette

Arts and Crafts Trejo""",
        user_id=50,
        post_id=37,
        parent_id=207,
        created_at=comment208_createdat,
        updated_at=comment208_createdat
    )
    db.session.add(comments_dict['208'])

    comment209_createdat=generate_comment_timestamp(user30.created_at, comments_dict['208'].created_at)
    comments_dict['209'] = Comment(
        content="Pretty much yes, and the irony is a clause like Danny trejos makes in my opinion a much more loveable guy than a no lose clause.",
        user_id=30,
        post_id=37,
        parent_id=205,
        created_at=comment209_createdat,
        updated_at=comment209_createdat
    )
    db.session.add(comments_dict['209'])

    comment210_createdat=generate_comment_timestamp(user2.created_at, post37.created_at)
    comments_dict['210'] = Comment(
        content="Tortuga!",
        user_id=2,
        post_id=37,
        created_at=comment210_createdat,
        updated_at=comment210_createdat
    )
    db.session.add(comments_dict['210'])
    db.session.flush()

    comment211_createdat=generate_comment_timestamp(user3.created_at, comments_dict['210'].created_at)
    comments_dict['211'] = Comment(
        content="HOLA DEA",
        user_id=3,
        post_id=37,
        parent_id=210,
        created_at=comment211_createdat,
        updated_at=comment211_createdat
    )
    db.session.add(comments_dict['211'])

    comment212_createdat=generate_comment_timestamp(user4.created_at, comments_dict['210'].created_at)
    comments_dict['212'] = Comment(
        content="I take my time but I <em>always</em> win.",
        user_id=4,
        post_id=37,
        parent_id=210,
        created_at=comment212_createdat,
        updated_at=comment212_createdat
    )
    db.session.add(comments_dict['212'])

    comment213_createdat=generate_comment_timestamp(user5.created_at, post37.created_at)
    comments_dict['213'] = Comment(
        content="Danny Trejo is the real deal, man. I was watching a bio video about him. The guy is just the nicest mean-looking dude you’ll ever meet. And he means it, too, the way he wants young people to see him. I’d love to meet him.",
        user_id=5,
        post_id=37,
        created_at=comment213_createdat,
        updated_at=comment213_createdat
    )
    db.session.add(comments_dict['213'])

    comment214_createdat=generate_comment_timestamp(user6.created_at, post37.created_at)
    comments_dict['214'] = Comment(
        content="True story: back in 2002 when Danny Trejo was super famous for being in Spy Kids 2, my wife and I veered off the road during a thunderstorm and popped our tire on the curb. Out of nowhere, a stranger pulled up and insisted on changing our tire in the rain while we stayed warm and dry in the car.",
        user_id=6,
        post_id=37,
        created_at=comment214_createdat,
        updated_at=comment214_createdat
    )
    db.session.add(comments_dict['214'])
    db.session.flush()

    comment215_createdat=generate_comment_timestamp(user7.created_at, comments_dict['214'].created_at)
    comments_dict['215'] = Comment(
        content="Was...was it Danny Trejo?",
        user_id=7,
        post_id=37,
        parent_id=214,
        created_at=comment215_createdat,
        updated_at=comment215_createdat
    )
    db.session.add(comments_dict['215'])
    db.session.flush()

    comment216_createdat=generate_comment_timestamp(user8.created_at, comments_dict['215'].created_at)
    comments_dict['216'] = Comment(
        content="Nah but still a good story",
        user_id=8,
        post_id=37,
        parent_id=215,
        created_at=comment216_createdat,
        updated_at=comment216_createdat
    )
    db.session.add(comments_dict['216'])

    comment217_createdat=generate_comment_timestamp(user6.created_at, comments_dict['215'].created_at)
    comments_dict['217'] = Comment(
        content="We never got the chance to find out. He was wearing a hooded rain jacket that obscured his face, and he left with nothing more than a friendly wave goodbye.",
        user_id=6,
        post_id=37,
        parent_id=215,
        created_at=comment217_createdat,
        updated_at=comment217_createdat
    )
    db.session.add(comments_dict['217'])
    db.session.flush()

    comment218_createdat=generate_comment_timestamp(user9.created_at, comments_dict['217'].created_at)
    comments_dict['218'] = Comment(
        content="This is so fucking funny",
        user_id=9,
        post_id=37,
        parent_id=217,
        created_at=comment218_createdat,
        updated_at=comment218_createdat
    )
    db.session.add(comments_dict['218'])


    # -------------------------------------------------------------------------
    # POST 38
    # -------------------------------------------------------------------------
    post38 = Post.query.get(38)

    comment219_createdat=generate_comment_timestamp(user10.created_at, post38.created_at)
    comments_dict['219'] = Comment(
        content="A part of Melbourne changed its name to Carnegie in the hopes of getting a free library. They didn't.",
        user_id=10,
        post_id=38,
        created_at=comment219_createdat,
        updated_at=comment219_createdat
    )
    db.session.add(comments_dict['219'])
    db.session.flush()

    comment220_createdat=generate_comment_timestamp(user11.created_at, comments_dict['219'].created_at)
    comments_dict['220'] = Comment(
        content="Do they have their own library now? Lol",
        user_id=11,
        post_id=38,
        parent_id=219,
        created_at=comment220_createdat,
        updated_at=comment220_createdat
    )
    db.session.add(comments_dict['220'])

    comment221_createdat=generate_comment_timestamp(user12.created_at, post38.created_at)
    comments_dict['221'] = Comment(
        content="Uh? He was also trying to scrub his name of the shame and tarnish it became associated with after the North Bend fishing and sporting club dam broke and killed thousands of people in the Conemaugh valley PA. It was after this that he started donating and putting his name on everything. He had been a member and major benefactor of the club and his man Frick had ordered the top of the dam lowered so he could drive his horse carriage across. They should have gone to prison for negligent homicide.",
        user_id=12,
        post_id=38,
        created_at=comment221_createdat,
        updated_at=comment221_createdat
    )
    db.session.add(comments_dict['221'])

    comment222_createdat=generate_comment_timestamp(user13.created_at, post38.created_at)
    comments_dict['222'] = Comment(
        content="He did it mostly to distract people from all the miners and steelworkers he had killed when they attempted to go on strike.",
        user_id=13,
        post_id=38,
        created_at=comment222_createdat,
        updated_at=comment222_createdat
    )
    db.session.add(comments_dict['222'])
    db.session.flush()

    comment223_createdat=generate_comment_timestamp(user14.created_at, comments_dict['222'].created_at)
    comments_dict['223'] = Comment(
        content="at least he pretended to be a good person, nowadays they don’t even try",
        user_id=14,
        post_id=38,
        parent_id=222,
        created_at=comment223_createdat,
        updated_at=comment223_createdat
    )
    db.session.add(comments_dict['223'])
    db.session.flush()

    comment224_createdat=generate_comment_timestamp(user15.created_at, comments_dict['223'].created_at)
    comments_dict['224'] = Comment(
        content="Some of them try. And, some of us poors believe it.<br /><br />Not me.",
        user_id=15,
        post_id=38,
        parent_id=223,
        created_at=comment224_createdat,
        updated_at=comment224_createdat
    )
    db.session.add(comments_dict['224'])

    comment225_createdat=generate_comment_timestamp(user16.created_at, post38.created_at)
    comments_dict['225'] = Comment(
        content="Can we please not try to turn Andrew Carnegie into a folk hero? Read his actual biography (just click the link) and you can see he made his early money due to insider trading from helping his corrupt bosses. He also horrifically mistreated workers to an extent that would make Bezos green with envy.",
        user_id=16,
        post_id=38,
        created_at=comment225_createdat,
        updated_at=comment225_createdat
    )
    db.session.add(comments_dict['225'])

    comment226_createdat=generate_comment_timestamp(user17.created_at, post38.created_at)
    comments_dict['226'] = Comment(
        content="Back when humans were still humans and not enslaved by greed",
        user_id=17,
        post_id=38,
        created_at=comment226_createdat,
        updated_at=comment226_createdat
    )
    db.session.add(comments_dict['226'])
    db.session.flush()

    comment227_createdat=generate_comment_timestamp(user18.created_at, comments_dict['226'].created_at)
    comments_dict['227'] = Comment(
        content="He reaped the benefits of mass exploitation and used the money to kill dissenting workers. Do you think greed was invented in the 60's?",
        user_id=18,
        post_id=38,
        parent_id=226,
        created_at=comment227_createdat,
        updated_at=comment227_createdat
    )
    db.session.add(comments_dict['227'])

    # -------------------------------------------------------------------------
    # POST 39
    # -------------------------------------------------------------------------
    post39 = Post.query.get(39)

    comment228_createdat=generate_comment_timestamp(user22.created_at, post39.created_at)
    comments_dict['228'] = Comment(
        content="Isabelle Romee was definitely the unsung hero in Joan's story and I don't think she would have become a saint if hadn't been for her mother's efforts.",
        user_id=22,
        post_id=39,
        created_at=comment228_createdat,
        updated_at=comment228_createdat
    )
    db.session.add(comments_dict['228'])
    db.session.flush()

    comment229_createdat=generate_comment_timestamp(user19.created_at, comments_dict['228'].created_at)
    comments_dict['229'] = Comment(
        content="The same can be said of many historical figures. Nobody would know Hamiltons name were it not for his sister.",
        user_id=19,
        post_id=39,
        parent_id=228,
        created_at=comment229_createdat,
        updated_at=comment229_createdat
    )
    db.session.add(comments_dict['229'])
    db.session.flush()

    comment230_createdat=generate_comment_timestamp(user20.created_at, comments_dict['229'].created_at)
    comments_dict['230'] = Comment(
        content="I sure hope you mean wife.",
        user_id=20,
        post_id=39,
        parent_id=229,
        created_at=comment230_createdat,
        updated_at=comment230_createdat
    )
    db.session.add(comments_dict['230'])
    db.session.flush()

    comment231_createdat=generate_comment_timestamp(user21.created_at, comments_dict['230'].created_at)
    comments_dict['231'] = Comment(
        content="Sweet Home Hamilabama",
        user_id=21,
        post_id=39,
        parent_id=230,
        created_at=comment231_createdat,
        updated_at=comment231_createdat
    )
    db.session.add(comments_dict['231'])

    comment232_createdat=generate_comment_timestamp(user23.created_at, post39.created_at)
    comments_dict['232'] = Comment(
        content="It was a political murder.",
        user_id=23,
        post_id=39,
        created_at=comment232_createdat,
        updated_at=comment232_createdat
    )
    db.session.add(comments_dict['232'])
    db.session.flush()

    comment233_createdat=generate_comment_timestamp(user24.created_at, comments_dict['232'].created_at)
    comments_dict['233'] = Comment(
        content="Actual murder too",
        user_id=24,
        post_id=39,
        parent_id=232,
        created_at=comment233_createdat,
        updated_at=comment233_createdat
    )
    db.session.add(comments_dict['233'])
    db.session.flush()

    comment234_createdat=generate_comment_timestamp(user25.created_at, comments_dict['233'].created_at)
    comments_dict['234'] = Comment(
        content="Political murder is actual murder",
        user_id=25,
        post_id=39,
        parent_id=233,
        created_at=comment234_createdat,
        updated_at=comment234_createdat
    )
    db.session.add(comments_dict['234'])
    db.session.flush()

    comment235_createdat=generate_comment_timestamp(user26.created_at, comments_dict['234'].created_at)
    comments_dict['235'] = Comment(
        content="What about political suicide",
        user_id=26,
        post_id=39,
        parent_id=234,
        created_at=comment235_createdat,
        updated_at=comment235_createdat
    )
    db.session.add(comments_dict['235'])
    db.session.flush()

    comment236_createdat=generate_comment_timestamp(user27.created_at, comments_dict['235'].created_at)
    comments_dict['236'] = Comment(
        content="Usually figurative, with notable exceptions like Budd Dywer.",
        user_id=27,
        post_id=39,
        parent_id=235,
        created_at=comment236_createdat,
        updated_at=comment236_createdat
    )
    db.session.add(comments_dict['236'])

    comment237_createdat=generate_comment_timestamp(user28.created_at, comments_dict['232'].created_at)
    comments_dict['237'] = Comment(
        content="Believe it or not, but murder is in and of itself actual murder.",
        user_id=28,
        post_id=39,
        parent_id=232,
        created_at=comment237_createdat,
        updated_at=comment237_createdat
    )
    db.session.add(comments_dict['237'])

    comment238_createdat=generate_comment_timestamp(user29.created_at, post39.created_at)
    comments_dict['238'] = Comment(
        content="The thing about the history of the heirarchy of Christianity is that any time someone actually acts out in accordance with what their holy figure actually said, they very quickly condemn them.",
        user_id=29,
        post_id=39,
        created_at=comment238_createdat,
        updated_at=comment238_createdat
    )
    db.session.add(comments_dict['238'])
    db.session.flush()

    comment239_createdat=generate_comment_timestamp(user30.created_at, comments_dict['238'].created_at)
    comments_dict['239'] = Comment(
        content="She was killed because she was a French political figure in custody of the English. Religion had very little bearing in her death",
        user_id=30,
        post_id=39,
        parent_id=238,
        created_at=comment239_createdat,
        updated_at=comment239_createdat
    )
    db.session.add(comments_dict['239'])

    comment240_createdat=generate_comment_timestamp(user31.created_at, post39.created_at)
    comments_dict['240'] = Comment(
        content="TIL",
        user_id=31,
        post_id=39,
        created_at=comment240_createdat,
        updated_at=comment240_createdat
    )
    db.session.add(comments_dict['240'])

    # -------------------------------------------------------------------------
    # POST 40
    # -------------------------------------------------------------------------
    post40 = Post.query.get(40)

    comment241_createdat=generate_comment_timestamp(user32.created_at, post40.created_at)
    comments_dict['241'] = Comment(
        content="And then they kissed each other on the cheek, prayed together and the boyfriend went home.",
        user_id=32,
        post_id=40,
        created_at=comment241_createdat,
        updated_at=comment241_createdat
    )
    db.session.add(comments_dict['241'])
    db.session.flush()

    comment242_createdat=generate_comment_timestamp(user33.created_at, comments_dict['241'].created_at)
    comments_dict['242'] = Comment(
        content=".. with blue balls.",
        user_id=33,
        post_id=40,
        parent_id=241,
        created_at=comment242_createdat,
        updated_at=comment242_createdat
    )
    db.session.add(comments_dict['242'])
    db.session.flush()

    comment243_createdat=generate_comment_timestamp(user32.created_at, comments_dict['242'].created_at)
    comments_dict['243'] = Comment(
        content="The bluest of all balls were toted back home that evening.",
        user_id=32,
        post_id=40,
        parent_id=242,
        created_at=comment243_createdat,
        updated_at=comment243_createdat
    )
    db.session.add(comments_dict['243'])

    comment244_createdat=generate_comment_timestamp(user34.created_at, comments_dict['241'].created_at)
    comments_dict['244'] = Comment(
        content="I mean, she did say that he ended up marrying a nice Christian girl instead of her, so... it's a possibility.",
        user_id=34,
        post_id=40,
        parent_id=241,
        created_at=comment244_createdat,
        updated_at=comment244_createdat
    )
    db.session.add(comments_dict['244'])

    comment245_createdat=generate_comment_timestamp(user35.created_at, post40.created_at)
    comments_dict['245'] = Comment(
        content="Ah, to be young again",
        user_id=35,
        post_id=40,
        created_at=comment245_createdat,
        updated_at=comment245_createdat
    )
    db.session.add(comments_dict['245'])

    comment246_createdat=generate_comment_timestamp(user36.created_at, post40.created_at)
    comments_dict['246'] = Comment(
        content="Um, Sally Fields?",
        user_id=36,
        post_id=40,
        created_at=comment246_createdat,
        updated_at=comment246_createdat
    )
    db.session.add(comments_dict['246'])

    comment247_createdat=generate_comment_timestamp(user37.created_at, post40.created_at)
    comments_dict['247'] = Comment(
        content="And that's how I met your mother",
        user_id=37,
        post_id=40,
        created_at=comment247_createdat,
        updated_at=comment247_createdat
    )
    db.session.add(comments_dict['247'])

    # -------------------------------------------------------------------------
    # POST 41
    # -------------------------------------------------------------------------
    post41 = Post.query.get(41)

    comment248_createdat=generate_comment_timestamp(user24.created_at, post41.created_at)
    comments_dict['248'] = Comment(
        content="After telling my dad 600 people have liked this post, he responded by telling me about his domino's box hes just made out of wood, so he doesn't give a shit",
        user_id=24,
        post_id=41,
        created_at=comment248_createdat,
        updated_at=comment248_createdat
    )
    db.session.add(comments_dict['248'])

    comment249_createdat=generate_comment_timestamp(user24.created_at, post41.created_at)
    comments_dict['249'] = Comment(
        content="Some extra info, he travelled India for 3 months when he was 26, he didn't eat for the first 3 days and the first meal he had gave him amoebic dysentery and he ended up losing losing so much weight on the trip that my nan cried when he arrived home. He also almost drowned and was saved by a very rich man who let him stay and drink whiskey all evening in his mansion.",
        user_id=24,
        post_id=41,
        created_at=comment249_createdat,
        updated_at=comment249_createdat
    )
    db.session.add(comments_dict['249'])
    db.session.flush()

    comment250_createdat=generate_comment_timestamp(user38.created_at, comments_dict['249'].created_at)
    comments_dict['250'] = Comment(
        content="That kind of satchel is called a ‘Jhola’ in India. Nowadays it is seen often carried by intellectual sort of people 👍",
        user_id=38,
        post_id=41,
        parent_id=249,
        created_at=comment250_createdat,
        updated_at=comment250_createdat
    )
    db.session.add(comments_dict['250'])
    db.session.flush()

    comment251_createdat=generate_comment_timestamp(user24.created_at, comments_dict['250'].created_at)
    comments_dict['251'] = Comment(
        content="Oh nice thank you mate!",
        user_id=24,
        post_id=41,
        parent_id=250,
        created_at=comment251_createdat,
        updated_at=comment251_createdat
    )
    db.session.add(comments_dict['251'])

    comment252_createdat=generate_comment_timestamp(user39.created_at, post41.created_at)
    comments_dict['252'] = Comment(
        content="For every old man you see on the street, there was a way cooler version back in the day.",
        user_id=39,
        post_id=41,
        created_at=comment252_createdat,
        updated_at=comment252_createdat
    )
    db.session.add(comments_dict['252'])

    comment253_createdat=generate_comment_timestamp(user40.created_at, post41.created_at)
    comments_dict['253'] = Comment(
        content="Dad was a handsome bloke",
        user_id=40,
        post_id=41,
        created_at=comment253_createdat,
        updated_at=comment253_createdat
    )
    db.session.add(comments_dict['253'])
    db.session.flush()

    comment254_createdat=generate_comment_timestamp(user41.created_at, comments_dict['253'].created_at)
    comments_dict['254'] = Comment(
        content="i second this, the dad's a smokeshow",
        user_id=41,
        post_id=41,
        parent_id=253,
        created_at=comment254_createdat,
        updated_at=comment254_createdat
    )
    db.session.add(comments_dict['254'])
    db.session.flush()

    comment255_createdat=generate_comment_timestamp(user42.created_at, comments_dict['254'].created_at)
    comments_dict['255'] = Comment(
        content="He's cute and my type.",
        user_id=42,
        post_id=41,
        parent_id=254,
        created_at=comment255_createdat,
        updated_at=comment255_createdat
    )
    db.session.add(comments_dict['255'])
    db.session.flush()

    comment256_createdat=generate_comment_timestamp(user43.created_at, comments_dict['255'].created_at)
    comments_dict['256'] = Comment(
        content="Still is",
        user_id=43,
        post_id=41,
        parent_id=255,
        created_at=comment256_createdat,
        updated_at=comment256_createdat
    )
    db.session.add(comments_dict['256'])

    # -------------------------------------------------------------------------
    # POST 42
    # -------------------------------------------------------------------------
    post42 = Post.query.get(42)

    comment257_createdat=generate_comment_timestamp(user44.created_at, post42.created_at)
    comments_dict['257'] = Comment(
        content="My Grandad was in the war too, He was British living in Chicago before the war, came back and fought with the Expeditionary Force and the 8th Army when it was formed. Very proud Grandson",
        user_id=44,
        post_id=42,
        created_at=comment257_createdat,
        updated_at=comment257_createdat
    )
    db.session.add(comments_dict['257'])
    db.session.flush()

    comment258_createdat=generate_comment_timestamp(user45.created_at, comments_dict['257'].created_at)
    comments_dict['258'] = Comment(
        content="My grandfather enlisted as soon as he heard that men with wives and children were being drafted. He had a job that was considered vital to the war effort which made him exempt from the draft but, as a single childless person at the time, he decided it was better him than someone with a family to support. I'm a very proud granddaughter.",
        user_id=45,
        post_id=42,
        parent_id=257,
        created_at=comment258_createdat,
        updated_at=comment258_createdat
    )
    db.session.add(comments_dict['258'])
    db.session.flush()

    comment259_createdat=generate_comment_timestamp(user46.created_at, comments_dict['258'].created_at)
    comments_dict['259'] = Comment(
        content="That takes some guts. Volunteering for probable death and assured horror just to make sure a family might not have to send their father, husband and primary breadwinner at the time off to the same fate. This internet stranger is also proud of your grandfather.",
        user_id=46,
        post_id=42,
        parent_id=258,
        created_at=comment259_createdat,
        updated_at=comment259_createdat
    )
    db.session.add(comments_dict['259'])

    comment260_createdat=generate_comment_timestamp(user47.created_at, post42.created_at)
    comments_dict['260'] = Comment(
        content="I still have the french resistance membership card of my grandma",
        user_id=47,
        post_id=42,
        created_at=comment260_createdat,
        updated_at=comment260_createdat
    )
    db.session.add(comments_dict['260'])

    comment261_createdat=generate_comment_timestamp(user48.created_at, post42.created_at)
    comments_dict['261'] = Comment(
        content="How much do you know about his role in the war? Pilots in the 9th Air Force provided air support for the Normandy invasions, among other really meaningful activities in 1944.",
        user_id=48,
        post_id=42,
        created_at=comment261_createdat,
        updated_at=comment261_createdat
    )
    db.session.add(comments_dict['261'])
    db.session.flush()

    comment262_createdat=generate_comment_timestamp(user25.created_at, comments_dict['261'].created_at)
    comments_dict['262'] = Comment(
        content="He was a bomber pilot. I don’t know a lot of specifics, he died when I was pretty young.",
        user_id=25,
        post_id=42,
        parent_id=261,
        created_at=comment262_createdat,
        updated_at=comment262_createdat
    )
    db.session.add(comments_dict['262'])
    db.session.flush()

    comment263_createdat=generate_comment_timestamp(user48.created_at, comments_dict['262'].created_at)
    comments_dict['263'] = Comment(
        content="That sucks dude, I’m sorry. You might want to ask some of your older relatives if they remember. As much as was written about the Greatest Generation, there’s a litany of individual stories from WW2 that are being lost to Father Time every day.",
        user_id=48,
        post_id=42,
        parent_id=262,
        created_at=comment263_createdat,
        updated_at=comment263_createdat
    )
    db.session.add(comments_dict['263'])

    comment264_createdat=generate_comment_timestamp(user49.created_at, comments_dict['262'].created_at)
    comments_dict['264'] = Comment(
        content="I love the fact that he was smoking in this photo, in more ways than one!",
        user_id=49,
        post_id=42,
        parent_id=263,
        created_at=comment264_createdat,
        updated_at=comment264_createdat
    )
    db.session.add(comments_dict['264'])

    comment265_createdat=generate_comment_timestamp(user50.created_at, post42.created_at)
    comments_dict['265'] = Comment(
        content="Watching the news yesterday it seems the Nazis won after all.",
        user_id=50,
        post_id=42,
        created_at=comment265_createdat,
        updated_at=comment265_createdat
    )
    db.session.add(comments_dict['265'])
    db.session.flush()

    comment266_createdat=generate_comment_timestamp(user25.created_at, comments_dict['265'].created_at)
    comments_dict['266'] = Comment(
        content="They didn’t win yet, but they’re not exactly losing either.",
        user_id=25,
        post_id=42,
        parent_id=265,
        created_at=comment266_createdat,
        updated_at=comment266_createdat
    )
    db.session.add(comments_dict['266'])

    # -------------------------------------------------------------------------
    # POST 43
    # -------------------------------------------------------------------------
    post43 = Post.query.get(43)

    comment267_createdat=generate_comment_timestamp(user30.created_at, post43.created_at)
    comments_dict['267'] = Comment(
        content="Back in the day, I did that to a Fax spammer. Made a few all black copies and continuously faxed back to them for 3 days. Problem solved.",
        user_id=30,
        post_id=43,
        created_at=comment267_createdat,
        updated_at=comment267_createdat
    )
    db.session.add(comments_dict['267'])
    db.session.flush()

    comment268_createdat=generate_comment_timestamp(user2.created_at, comments_dict['267'].created_at)
    comments_dict['268'] = Comment(
        content="I did this once with texts to a spam caller but I ended up blacklisted by Apple for spamming 🫠",
        user_id=2,
        post_id=43,
        parent_id=267,
        created_at=comment268_createdat,
        updated_at=comment268_createdat
    )
    db.session.add(comments_dict['268'])
    db.session.flush()

    comment269_createdat=generate_comment_timestamp(user3.created_at, comments_dict['268'].created_at)
    comments_dict['269'] = Comment(
        content="Your mistake was not spoofing your number.",
        user_id=3,
        post_id=43,
        parent_id=268,
        created_at=comment269_createdat,
        updated_at=comment269_createdat
    )
    db.session.add(comments_dict['269'])

    comment270_createdat=generate_comment_timestamp(user4.created_at, post43.created_at)
    comments_dict['270'] = Comment(
        content="I never realized there were so many fun things to do with fax machines.",
        user_id=4,
        post_id=43,
        created_at=comment270_createdat,
        updated_at=comment270_createdat
    )
    db.session.add(comments_dict['270'])
    db.session.flush()

    comment271_createdat=generate_comment_timestamp(user5.created_at, comments_dict['270'].created_at)
    comments_dict['271'] = Comment(
        content="Before there were computers to hack, there were phones to hack. Fax machines were just a fun in between stage",
        user_id=5,
        post_id=43,
        parent_id=270,
        created_at=comment271_createdat,
        updated_at=comment271_createdat
    )
    db.session.add(comments_dict['271'])

    comment272_createdat=generate_comment_timestamp(user26.created_at, post43.created_at)
    comments_dict['272'] = Comment(
        content="Pardon my dust. This is at a carpentry studio and my office is next to the dust factory which is our CNC room.",
        user_id=26,
        post_id=43,
        created_at=comment272_createdat,
        updated_at=comment272_createdat
    )
    db.session.add(comments_dict['272'])
    db.session.flush()

    comment273_createdat=generate_comment_timestamp(user6.created_at, comments_dict['272'].created_at)
    comments_dict['273'] = Comment(
        content="oh dude your coworkers are 100% messing with you. your grandparents might remember blackfaxing, where you send a black image to print.",
        user_id=6,
        post_id=43,
        parent_id=272,
        created_at=comment273_createdat,
        updated_at=comment273_createdat
    )
    db.session.add(comments_dict['273'])

    # -------------------------------------------------------------------------
    # POST 44
    # -------------------------------------------------------------------------
    post44 = Post.query.get(44)

    comment274_createdat=generate_comment_timestamp(user7.created_at, post44.created_at)
    comments_dict['274'] = Comment(
        content="If it’s adults only it’s adults only, I would be more than mildly infuriated.",
        user_id=7,
        post_id=44,
        created_at=comment274_createdat,
        updated_at=comment274_createdat
    )
    db.session.add(comments_dict['274'])
    db.session.flush()

    comment275_createdat=generate_comment_timestamp(user8.created_at, comments_dict['274'].created_at)
    comments_dict['275'] = Comment(
        content="I WAS PISSED when my mom told people it was okay to bring kids to my very well understood adults only wedding. It was on the invite, no kids, but instead like 5 showed up and I had to ask they leave making me the bad guy.",
        user_id=8,
        post_id=44,
        parent_id=274,
        created_at=comment275_createdat,
        updated_at=comment275_createdat
    )
    db.session.add(comments_dict['275'])

    comment276_createdat=generate_comment_timestamp(user9.created_at, post44.created_at)
    comments_dict['276'] = Comment(
        content="She looks amused, not angry.",
        user_id=9,
        post_id=44,
        created_at=comment276_createdat,
        updated_at=comment276_createdat
    )
    db.session.add(comments_dict['276'])

    comment277_createdat=generate_comment_timestamp(user10.created_at, post44.created_at)
    comments_dict['277'] = Comment(
        content="Everyone sucks here",
        user_id=10,
        post_id=44,
        created_at=comment277_createdat,
        updated_at=comment277_createdat
    )
    db.session.add(comments_dict['277'])

    comment278_createdat=generate_comment_timestamp(user11.created_at, post44.created_at)
    comments_dict['278'] = Comment(
        content="She looks more than mildly infuriated.",
        user_id=11,
        post_id=44,
        created_at=comment278_createdat,
        updated_at=comment278_createdat
    )
    db.session.add(comments_dict['278'])
    db.session.flush()

    comment279_createdat=generate_comment_timestamp(user12.created_at, comments_dict['278'].created_at)
    comments_dict['279'] = Comment(
        content="Death stare. That person will be held in contempt.",
        user_id=12,
        post_id=44,
        parent_id=278,
        created_at=comment279_createdat,
        updated_at=comment279_createdat
    )
    db.session.add(comments_dict['279'])

    comment280_createdat=generate_comment_timestamp(user13.created_at, post44.created_at)
    comments_dict['280'] = Comment(
        content="I went to an adult only resort in the DR and the people next to us had a screaming new born, all night that baby screamed and all night I wanted to blow my head off.",
        user_id=13,
        post_id=44,
        created_at=comment280_createdat,
        updated_at=comment280_createdat
    )
    db.session.add(comments_dict['280'])
    db.session.flush()

    comment281_createdat=generate_comment_timestamp(user14.created_at, comments_dict['280'].created_at)
    comments_dict['281'] = Comment(
        content="Did you ask for your money back? That's inexcusable.",
        user_id=14,
        post_id=44,
        parent_id=280,
        created_at=comment281_createdat,
        updated_at=comment281_createdat
    )
    db.session.add(comments_dict['281'])
    db.session.flush()

    comment282_createdat=generate_comment_timestamp(user13.created_at, comments_dict['281'].created_at)
    comments_dict['282'] = Comment(
        content="They gave me a discount was all they would do.",
        user_id=13,
        post_id=44,
        parent_id=281,
        created_at=comment282_createdat,
        updated_at=comment282_createdat
    )
    db.session.add(comments_dict['282'])

    comment283_createdat=generate_comment_timestamp(user15.created_at, post44.created_at)
    comments_dict['283'] = Comment(
        content="Why did nobody make them leave? So incredibly inconsiderate.",
        user_id=15,
        post_id=44,
        created_at=comment283_createdat,
        updated_at=comment283_createdat
    )
    db.session.add(comments_dict['283'])

    # -------------------------------------------------------------------------
    # POST 45
    # -------------------------------------------------------------------------
    post45 = Post.query.get(45)

    comment284_createdat=generate_comment_timestamp(user16.created_at, post45.created_at)
    comments_dict['284'] = Comment(
        content="How do you think the cat feels?",
        user_id=16,
        post_id=45,
        created_at=comment284_createdat,
        updated_at=comment284_createdat
    )
    db.session.add(comments_dict['284'])
    db.session.flush()

    comment285_createdat=generate_comment_timestamp(user17.created_at, comments_dict['284'].created_at)
    comments_dict['285'] = Comment(
        content="The cat's probably the one who did it.",
        user_id=17,
        post_id=45,
        parent_id=284,
        created_at=comment285_createdat,
        updated_at=comment285_createdat
    )
    db.session.add(comments_dict['285'])
    db.session.flush()

    comment286_createdat=generate_comment_timestamp(user18.created_at, comments_dict['285'].created_at)
    comments_dict['286'] = Comment(
        content="And he feels off aout it",
        user_id=18,
        post_id=45,
        parent_id=285,
        created_at=comment286_createdat,
        updated_at=comment286_createdat
    )
    db.session.add(comments_dict['286'])

    comment287_createdat=generate_comment_timestamp(user19.created_at, comments_dict['285'].created_at)
    comments_dict['287'] = Comment(
        content="This is how we know the world is not flat. Cats would have knocked everything off by now.",
        user_id=19,
        post_id=45,
        parent_id=285,
        created_at=comment287_createdat,
        updated_at=comment287_createdat
    )
    db.session.add(comments_dict['287'])

    comment288_createdat=generate_comment_timestamp(user20.created_at, comments_dict['285'].created_at)
    comments_dict['288'] = Comment(
        content="Yes, but because it’s a cat, he didn’t do it, and if he did, it was your fault anyway.",
        user_id=20,
        post_id=45,
        parent_id=285,
        created_at=comment288_createdat,
        updated_at=comment288_createdat
    )
    db.session.add(comments_dict['288'])

    comment289_createdat=generate_comment_timestamp(user21.created_at, post45.created_at)
    comments_dict['289'] = Comment(
        content="Don’t worry, the toothbrush was already covered in cat shit particles. And human shit particles too.",
        user_id=21,
        post_id=45,
        created_at=comment289_createdat,
        updated_at=comment289_createdat
    )
    db.session.add(comments_dict['289'])
    db.session.flush()

    comment290_createdat=generate_comment_timestamp(user22.created_at, comments_dict['289'].created_at)
    comments_dict['290'] = Comment(
        content="There are such things in this world as particles. Particles so small that you cannot possibly detect it with your naked eyes. I will put it for you, that there are particles of human shit lingering in the fibres of your underpants.",
        user_id=22,
        post_id=45,
        parent_id=289,
        created_at=comment290_createdat,
        updated_at=comment290_createdat
    )
    db.session.add(comments_dict['290'])
    db.session.flush()

    comment291_createdat=generate_comment_timestamp(user23.created_at, comments_dict['290'].created_at)
    comments_dict['291'] = Comment(
        content="Theres particles of shit in every breath you take.",
        user_id=23,
        post_id=45,
        parent_id=290,
        created_at=comment291_createdat,
        updated_at=comment291_createdat
    )
    db.session.add(comments_dict['291'])

    comment292_createdat=generate_comment_timestamp(user24.created_at, post45.created_at)
    comments_dict['292'] = Comment(
        content="This is the most foul place for a litter box what the actual fuck.",
        user_id=24,
        post_id=45,
        created_at=comment292_createdat,
        updated_at=comment292_createdat
    )
    db.session.add(comments_dict['292'])
    db.session.flush()

    comment293_createdat=generate_comment_timestamp(user25.created_at, comments_dict['292'].created_at)
    comments_dict['293'] = Comment(
        content="Where else does it go.",
        user_id=25,
        post_id=45,
        parent_id=292,
        created_at=comment293_createdat,
        updated_at=comment293_createdat
    )
    db.session.add(comments_dict['293'])
    db.session.flush()

    comment294_createdat=generate_comment_timestamp(user26.created_at, comments_dict['293'].created_at)
    comments_dict['294'] = Comment(
        content="Not right up against your shower curtain where it’s kept humid? Can’t imagine the smell. Just taking a hot shower with a cat turd steaming 2 inches away. Most people I meet who have cats keep the litter box in the laundry room or some other adjacent room. I have never seen it right next to a shower before, are all of you this nasty???",
        user_id=26,
        post_id=45,
        parent_id=293,
        created_at=comment294_createdat,
        updated_at=comment294_createdat
    )
    db.session.add(comments_dict['294'])

    # -------------------------------------------------------------------------
    # POST 46
    # -------------------------------------------------------------------------
    post46 = Post.query.get(46)

    comment295_createdat=generate_comment_timestamp(user27.created_at, post46.created_at)
    comments_dict['295'] = Comment(
        content="I will tell you. But first you have to admit that react is library not a framework.",
        user_id=27,
        post_id=46,
        created_at=comment295_createdat,
        updated_at=comment295_createdat
    )
    db.session.add(comments_dict['295'])

    comment296_createdat=generate_comment_timestamp(user28.created_at, post46.created_at)
    comments_dict['296'] = Comment(
        content="Why don’t you read the documentation?",
        user_id=28,
        post_id=46,
        created_at=comment296_createdat,
        updated_at=comment296_createdat
    )
    db.session.add(comments_dict['296'])
    db.session.flush()

    comment297_createdat=generate_comment_timestamp(user30.created_at, comments_dict['296'].created_at)
    comments_dict['297'] = Comment(
        content="Very helpful /s",
        user_id=30,
        post_id=46,
        parent_id=296,
        created_at=comment297_createdat,
        updated_at=comment297_createdat
    )
    db.session.add(comments_dict['297'])

    comment298_createdat=generate_comment_timestamp(user31.created_at, post46.created_at)
    comments_dict['298'] = Comment(
        content="React is not framework.",
        user_id=31,
        post_id=46,
        created_at=comment298_createdat,
        updated_at=comment298_createdat
    )
    db.session.add(comments_dict['298'])

    comment299_createdat=generate_comment_timestamp(user32.created_at, post46.created_at)
    comments_dict['299'] = Comment(
        content="The main role of frameworks like React is creating jobs.",
        user_id=32,
        post_id=46,
        created_at=comment299_createdat,
        updated_at=comment299_createdat
    )
    db.session.add(comments_dict['299'])
    db.session.flush()

    comment300_createdat=generate_comment_timestamp(user33.created_at, comments_dict['299'].created_at)
    comments_dict['300'] = Comment(
        content="I don't think the downvoters see the implied /s here.",
        user_id=33,
        post_id=46,
        parent_id=299,
        created_at=comment300_createdat,
        updated_at=comment300_createdat
    )
    db.session.add(comments_dict['300'])

    comment301_createdat=generate_comment_timestamp(user34.created_at, post46.created_at)
    comments_dict['301'] = Comment(
        content="it goes brr",
        user_id=34,
        post_id=46,
        created_at=comment301_createdat,
        updated_at=comment301_createdat
    )
    db.session.add(comments_dict['301'])

    # -------------------------------------------------------------------------
    # POST 47
    # -------------------------------------------------------------------------
    post47 = Post.query.get(47)

    comment302_createdat=generate_comment_timestamp(user35.created_at, post47.created_at)
    comments_dict['302'] = Comment(
        content="Hey, congrats man! Having an understanding of vanilla html/css/JS is great, and the pain you went through allows you to really appreciate the framework. Now you know why they exist. Lots of people just use them blindly without diving too much into the behind the scenes stuff.",
        user_id=35,
        post_id=47,
        created_at=comment302_createdat,
        updated_at=comment302_createdat
    )
    db.session.add(comments_dict['302'])
    db.session.flush()

    comment303_createdat=generate_comment_timestamp(user30.created_at, comments_dict['302'].created_at)
    comments_dict['303'] = Comment(
        content="Thank you and I'm glad that I did take the time to learn html/css pretty in-depth. It sucked but I went to music school so I understand the benefit of really grinding the fundamentals. I will definitely be back with some of my projects when I have them!",
        user_id=30,
        post_id=47,
        parent_id=302,
        created_at=comment303_createdat,
        updated_at=comment303_createdat
    )
    db.session.add(comments_dict['303'])

    comment304_createdat=generate_comment_timestamp(user36.created_at, post47.created_at)
    comments_dict['304'] = Comment(
        content="Keep it up! React is a ton of fun and there so much you can do with it!",
        user_id=36,
        post_id=47,
        created_at=comment304_createdat,
        updated_at=comment304_createdat
    )
    db.session.add(comments_dict['304'])

    comment305_createdat=generate_comment_timestamp(user37.created_at, post47.created_at)
    comments_dict['305'] = Comment(
        content="Vanilla html/css/js knowledge goes a long way with using any framework so it’s great you have that foundation. Keep in mind that, as with all frameworks, react code ultimately renders as plain html in the user’s browser, so don’t be afraid to fall back on that knowledge if you ever need to do something the framework doesn’t \"allow\"",
        user_id=37,
        post_id=47,
        created_at=comment305_createdat,
        updated_at=comment305_createdat
    )
    db.session.add(comments_dict['305'])

    comment306_createdat=generate_comment_timestamp(user38.created_at, post47.created_at)
    comments_dict['306'] = Comment(
        content="I'm curious what makes React fun for you",
        user_id=38,
        post_id=47,
        created_at=comment306_createdat,
        updated_at=comment306_createdat
    )
    db.session.add(comments_dict['306'])
    db.session.flush()

    comment307_createdat=generate_comment_timestamp(user39.created_at, comments_dict['306'].created_at)
    comments_dict['307'] = Comment(
        content="Not OP - Making a site where something changes immediately as youre typing is a godsend with react. Before it was invented trying to do that in vanilla or jQuery is pain. React feels like anything is possible.",
        user_id=39,
        post_id=47,
        parent_id=306,
        created_at=comment307_createdat,
        updated_at=comment307_createdat
    )
    db.session.add(comments_dict['307'])



    # -------------------------------------------------------------------------
    # POST 48
    # -------------------------------------------------------------------------
    post48 = Post.query.get(48)

    comment308_createdat=generate_comment_timestamp(user40.created_at, post48.created_at)
    comments_dict['308'] = Comment(
        content="Yep. Important stuff because companies can get sued for not meeting wcag requirements. Plus engineers have career advantages if they know what they're doing with it. Many do not.",
        user_id=40,
        post_id=48,
        created_at=comment308_createdat,
        updated_at=comment308_createdat
    )
    db.session.add(comments_dict['308'])
    db.session.flush()

    comment309_createdat=generate_comment_timestamp(user31.created_at, comments_dict['308'].created_at)
    comments_dict['309'] = Comment(
        content="This probably differs from country to country - I've never heard about WCAG requirements being required in The Netherlands for the companies I worked at. But when this is relevant, just the basic accessibility I wrote about in this article probably isn't enough and I'd look into more details. This goal of this article is just to get more people invested in accessibility, even when there are no (outside) requirements for it.",
        user_id=31,
        post_id=48,
        parent_id=308,
        created_at=comment309_createdat,
        updated_at=comment309_createdat
    )
    db.session.add(comments_dict['309'])
    db.session.flush()

    comment310_createdat=generate_comment_timestamp(user40.created_at, comments_dict['309'].created_at)
    comments_dict['310'] = Comment(
        content="It does vary by country, yes. The US used to be strict on it but they changed a policy in the government that may allow companies to skip the requirements. I think the UK is fairly strict on it but I'm not sure. Canada is becoming a lot more strict to the point that the government will fine a company. But yeah, in general dev and ux should be doing this.",
        user_id=40,
        post_id=48,
        parent_id=309,
        created_at=comment310_createdat,
        updated_at=comment310_createdat
    )
    db.session.add(comments_dict['310'])

    comment311_createdat=generate_comment_timestamp(user41.created_at, comments_dict['309'].created_at)
    comments_dict['311'] = Comment(
        content="Also Dutchie here. Expect this to change, the European Accessibility Act (EAA) will be active for Dutch law from June 28 2025 onwards.",
        user_id=41,
        post_id=48,
        parent_id=309,
        created_at=comment311_createdat,
        updated_at=comment311_createdat
    )
    db.session.add(comments_dict['311'])
    db.session.flush()

    comment312_createdat=generate_comment_timestamp(user31.created_at, comments_dict['311'].created_at)
    comments_dict['312'] = Comment(
        content="Good to know, thanks! I'll be looking into that and will probably work on a follow-up article.",
        user_id=31,
        post_id=48,
        parent_id=311,
        created_at=comment312_createdat,
        updated_at=comment312_createdat
    )
    db.session.add(comments_dict['312'])


    # -------------------------------------------------------------------------
    # POST 49
    # -------------------------------------------------------------------------
    post49 = Post.query.get(49)

    comment313_createdat=generate_comment_timestamp(user42.created_at, post49.created_at)
    comments_dict['313'] = Comment(
        content="welcome aboard 😎",
        user_id=42,
        post_id=49,
        created_at=comment313_createdat,
        updated_at=comment313_createdat
    )
    db.session.add(comments_dict['313'])

    comment314_createdat=generate_comment_timestamp(user43.created_at, post49.created_at)
    comments_dict['314'] = Comment(
        content="It's an amazing framework. If for some reason you need full async, there is quart (flask but async)",
        user_id=43,
        post_id=49,
        created_at=comment314_createdat,
        updated_at=comment314_createdat
    )
    db.session.add(comments_dict['314'])
    db.session.flush()

    comment315_createdat=generate_comment_timestamp(user44.created_at, comments_dict['314'].created_at)
    comments_dict['315'] = Comment(
        content="Ran into some bugs pretty early on with quart",
        user_id=44,
        post_id=49,
        parent_id=314,
        created_at=comment315_createdat,
        updated_at=comment315_createdat
    )
    db.session.add(comments_dict['315'])

    # -------------------------------------------------------------------------
    # POST 50
    # -------------------------------------------------------------------------
    post50 = Post.query.get(50)

    comment316_createdat=generate_comment_timestamp(user45.created_at, post50.created_at)
    comments_dict['316'] = Comment(
        content="cool stuff!",
        user_id=45,
        post_id=50,
        created_at=comment316_createdat,
        updated_at=comment316_createdat
    )
    db.session.add(comments_dict['316'])
    db.session.flush()

    comment317_createdat=generate_comment_timestamp(user33.created_at, comments_dict['316'].created_at)
    comments_dict['317'] = Comment(
        content="Thankyou!!",
        user_id=33,
        post_id=50,
        parent_id=316,
        created_at=comment317_createdat,
        updated_at=comment317_createdat
    )
    db.session.add(comments_dict['317'])

    comment318_createdat=generate_comment_timestamp(user46.created_at, post50.created_at)
    comments_dict['318'] = Comment(
        content="well done!",
        user_id=46,
        post_id=50,
        created_at=comment318_createdat,
        updated_at=comment318_createdat
    )
    db.session.add(comments_dict['318'])
    db.session.flush()

    comment319_createdat=generate_comment_timestamp(user33.created_at, comments_dict['318'].created_at)
    comments_dict['319'] = Comment(
        content="Thanks! First attempt at a fully furnished full stack site.",
        user_id=33,
        post_id=50,
        parent_id=318,
        created_at=comment319_createdat,
        updated_at=comment319_createdat
    )
    db.session.add(comments_dict['319'])

    comment320_createdat=generate_comment_timestamp(user47.created_at, post50.created_at)
    comments_dict['320'] = Comment(
        content="How’d you handle mongo? Any libraries?",
        user_id=47,
        post_id=50,
        created_at=comment320_createdat,
        updated_at=comment320_createdat
    )
    db.session.add(comments_dict['320'])
    db.session.flush()

    comment321_createdat=generate_comment_timestamp(user33.created_at, comments_dict['320'].created_at)
    comments_dict['321'] = Comment(
        content="I used PyMongo.",
        user_id=33,
        post_id=50,
        parent_id=320,
        created_at=comment321_createdat,
        updated_at=comment321_createdat
    )
    db.session.add(comments_dict['321'])
    db.session.flush()

    comment322_createdat=generate_comment_timestamp(user48.created_at, comments_dict['321'].created_at)
    comments_dict['322'] = Comment(
        content="Is there a reason why you went with nosql instead of sql?",
        user_id=48,
        post_id=50,
        parent_id=321,
        created_at=comment322_createdat,
        updated_at=comment322_createdat
    )
    db.session.add(comments_dict['322'])
    db.session.flush()

    comment323_createdat=generate_comment_timestamp(user33.created_at, comments_dict['321'].created_at)
    comments_dict['323'] = Comment(
        content="Yes, because for me SQL migration scripts are a headache to implement both in prod and test and i mess them up (did it a few times in test in an older project) so I didn't want to take that risk again, and Mongodb turned out to be more performant. Basically no compromise in performance so why not that.",
        user_id=33,
        post_id=50,
        parent_id=322,
        created_at=comment323_createdat,
        updated_at=comment323_createdat
    )
    db.session.add(comments_dict['323'])

    comment324_createdat=generate_comment_timestamp(user49.created_at, post50.created_at)
    comments_dict['324'] = Comment(
        content="This is really cool. So much useful English only stuff is behind APIs so this is a good pattern. I love the look too",
        user_id=49,
        post_id=50,
        created_at=comment324_createdat,
        updated_at=comment324_createdat
    )
    db.session.add(comments_dict['324'])

    # -------------------------------------------------------------------------
    # POST 51
    # -------------------------------------------------------------------------
    post51 = Post.query.get(51)

    comment325_createdat=generate_comment_timestamp(user50.created_at, post51.created_at)
    comments_dict['325'] = Comment(
        content="Digital ocean app platform is great in terms of simplifying the infrastructure bit. I think they even have written guides on deploying flask.",
        user_id=50,
        post_id=51,
        created_at=comment325_createdat,
        updated_at=comment325_createdat
    )
    db.session.add(comments_dict['325'])
    db.session.flush()

    comment326_createdat=generate_comment_timestamp(user30.created_at, comments_dict['325'].created_at)
    comments_dict['326'] = Comment(
        content="Agreed. You can have a basic public facing linux instance up in minutes for like $5 a month. That would allow for flask to host a site with minimal performance and no HA/DR but you can build from there. I use them for lab work when things like Qiskit won’t run well on my Mac (without diverting from the lab manual too far).",
        user_id=30,
        post_id=51,
        parent_id=325,
        created_at=comment326_createdat,
        updated_at=comment326_createdat
    )
    db.session.add(comments_dict['326'])

    comment327_createdat=generate_comment_timestamp(user2.created_at, post51.created_at)
    comments_dict['327'] = Comment(
        content="Pythonanywhere is my go to",
        user_id=2,
        post_id=51,
        created_at=comment327_createdat,
        updated_at=comment327_createdat
    )
    db.session.add(comments_dict['327'])

    comment328_createdat=generate_comment_timestamp(user3.created_at, post51.created_at)
    comments_dict['328'] = Comment(
        content="Now would be the time to post steps which you did to deploy the app and errors you got.",
        user_id=3,
        post_id=51,
        created_at=comment328_createdat,
        updated_at=comment328_createdat
    )
    db.session.add(comments_dict['328'])

    comment329_createdat=generate_comment_timestamp(user4.created_at, post51.created_at)
    comments_dict['329'] = Comment(
        content="Try Google Cloud Run. Open a developer account and follow the example tutorial. You will install a utility locally called gcloud, to deploy your app. I found it a bit easier than AWS and Heroku I had used previously. GL!",
        user_id=4,
        post_id=51,
        created_at=comment329_createdat,
        updated_at=comment329_createdat
    )
    db.session.add(comments_dict['329'])

    comment330_createdat=generate_comment_timestamp(user5.created_at, comments_dict['329'].created_at)
    comments_dict['330'] = Comment(
        content="GCP has a free tier",
        user_id=5,
        post_id=51,
        parent_id=329,
        created_at=comment330_createdat,
        updated_at=comment330_createdat
    )
    db.session.add(comments_dict['330'])

    comment331_createdat=generate_comment_timestamp(user4.created_at, comments_dict['330'].created_at)
    comments_dict['331'] = Comment(
        content="Yep, I'm paying 2-3 bucks a month for my project. I think it's either bc I do so many deployments for testing, incurring excess compute resources, or because I'm over a cap with free tier of Firebase, where I'm storing some config and user data. OP's flashcard app would be totally free I'm sure.",
        user_id=4,
        post_id=51,
        parent_id=330,
        created_at=comment331_createdat,
        updated_at=comment331_createdat
    )
    db.session.add(comments_dict['331'])



    # -------------------------------------------------------------------------
    # POST 52
    # -------------------------------------------------------------------------
    post52 = Post.query.get(52)

    comment332_createdat=generate_comment_timestamp(user5.created_at, post52.created_at)
    comments_dict['332'] = Comment(
        content="You should re-write this post in rust!",
        user_id=5,
        post_id=52,
        created_at=comment332_createdat,
        updated_at=comment332_createdat
    )
    db.session.add(comments_dict['332'])
    db.session.flush()

    comment333_createdat=generate_comment_timestamp(user6.created_at, comments_dict['332'].created_at)
    comments_dict['333'] = Comment(
        content="I've rewritten my life in rust",
        user_id=6,
        post_id=52,
        parent_id=332,
        created_at=comment333_createdat,
        updated_at=comment333_createdat
    )
    db.session.add(comments_dict['333'])
    db.session.flush()

    comment334_createdat=generate_comment_timestamp(user7.created_at, comments_dict['333'].created_at)
    comments_dict['334'] = Comment(
        content="Not enough. Rewrite the universe in Rust.",
        user_id=7,
        post_id=52,
        parent_id=333,
        created_at=comment334_createdat,
        updated_at=comment334_createdat
    )
    db.session.add(comments_dict['334'])

    comment335_createdat=generate_comment_timestamp(user8.created_at, comments_dict['333'].created_at)
    comments_dict['335'] = Comment(
        content="I’ve rewritten so much of my life in rust that my friends are now calling me corrosion.",
        user_id=8,
        post_id=52,
        parent_id=333,
        created_at=comment335_createdat,
        updated_at=comment335_createdat
    )
    db.session.add(comments_dict['335'])

    comment336_createdat=generate_comment_timestamp(user9.created_at, comments_dict['332'].created_at)
    comments_dict['336'] = Comment(
        content="I still don’t C how that would help.",
        user_id=9,
        post_id=52,
        parent_id=332,
        created_at=comment336_createdat,
        updated_at=comment336_createdat
    )
    db.session.add(comments_dict['336'])

    comment337_createdat=generate_comment_timestamp(user10.created_at, post52.created_at)
    comments_dict['337'] = Comment(
        content="I guess the proof is in the pudding. uv and ruff are rust under the hood and they work really well and much more quickly than poetry or flake8. Nowadays people expect that rust-based tooling is going to be very fast while offering at least parity with equivalent python-based tools.",
        user_id=10,
        post_id=52,
        created_at=comment337_createdat,
        updated_at=comment337_createdat
    )
    db.session.add(comments_dict['337'])
    db.session.flush()

    comment338_createdat=generate_comment_timestamp(user11.created_at, comments_dict['337'].created_at)
    comments_dict['338'] = Comment(
        content="Does it matter though? I find it utterly absurd that the Python community wants to adopt Rust based tooling, dominated by a single company.",
        user_id=11,
        post_id=52,
        parent_id=337,
        created_at=comment338_createdat,
        updated_at=comment338_createdat
    )
    db.session.add(comments_dict['338'])

    comment339_createdat=generate_comment_timestamp(user12.created_at, comments_dict['337'].created_at)
    comments_dict['339'] = Comment(
        content="You do realize that the vast majority of compilers end up with faster code than the same app written in Python? There is no proof here with respect to the value of Rust.",
        user_id=12,
        post_id=52,
        parent_id=337,
        created_at=comment339_createdat,
        updated_at=comment339_createdat
    )
    db.session.add(comments_dict['339'])

    comment340_createdat=generate_comment_timestamp(user13.created_at, post52.created_at)
    comments_dict['340'] = Comment(
        content="Rust is the first language that is actually so good that it can challenge C for a lot of use cases and has comparable speed. Just as C earlier replaced assembly as the main language for writing performance sensitive code Rust is now replacing C. It is easier to write correct programs in C than in assembly and it is easier to write correct programs in Rust than in C. It does not mean that assembly or C no longer has any use cases but gradually Rust will become the default language for writing performance sensitive code.",
        user_id=13,
        post_id=52,
        created_at=comment340_createdat,
        updated_at=comment300_createdat
    )
    db.session.add(comments_dict['340'])

    # -------------------------------------------------------------------------
    # POST 53
    # -------------------------------------------------------------------------
    post53 = Post.query.get(53)

    comment341_createdat=generate_comment_timestamp(user14.created_at, post53.created_at)
    comments_dict['341'] = Comment(
        content="Make your own tools. Do you have a reliable way to measure pixel distances on screen? What about a color sampler? Do you do something every time you log in to your machine? If that’s all beneath you, just start building the thing you really want to make, and appreciate all the roadblocks and rabbit holes that come with it.",
        user_id=14,
        post_id=53,
        created_at=comment341_createdat,
        updated_at=comment341_createdat
    )
    db.session.add(comments_dict['341'])
    db.session.flush()

    comment342_createdat=generate_comment_timestamp(user36.created_at, comments_dict['341'].created_at)
    comments_dict['342'] = Comment(
        content="I will give these a go! Thank you!",
        user_id=36,
        post_id=53,
        parent_id=341,
        created_at=comment342_createdat,
        updated_at=comment342_createdat
    )
    db.session.add(comments_dict['342'])

    comment343_createdat=generate_comment_timestamp(user15.created_at, post53.created_at)
    comments_dict['343'] = Comment(
        content="Do the python morsel exercises. You get one every week on Monday, and the solution on Wednesday. There are 3 or 4 level of difficulties. This is what allowed me to progress quickly to more advanced python.",
        user_id=15,
        post_id=53,
        created_at=comment343_createdat,
        updated_at=comment343_createdat
    )
    db.session.add(comments_dict['343'])
    db.session.flush()

    comment344_createdat=generate_comment_timestamp(user36.created_at, comments_dict['343'].created_at)
    comments_dict['344'] = Comment(
        content="THANK YOUUUUUUUUUUUUUU!",
        user_id=36,
        post_id=53,
        parent_id=343,
        created_at=comment344_createdat,
        updated_at=comment344_createdat
    )
    db.session.add(comments_dict['344'])

    comment345_createdat=generate_comment_timestamp(user16.created_at, post53.created_at)
    comments_dict['345'] = Comment(
        content="You don’t \"move\" to complex coding… you simply start solving more complex problems or build bigger solutions. \"To code\" is not the goal, the goal is to talk to the machine and ask it to do things for you…",
        user_id=16,
        post_id=53,
        created_at=comment345_createdat,
        updated_at=comment345_createdat
    )
    db.session.add(comments_dict['345'])

    comment346_createdat=generate_comment_timestamp(user17.created_at, post53.created_at)
    comments_dict['346'] = Comment(
        content="Use Python to make your life easier or more fun! I have created a program to analyze the FIT data file from my bike computer to extract key facts I want to know about the ride, including the battery levels of the computer and my electronic shifting system and update databases and a spreadsheet, to remind me of upcoming financial transactions when providers don't supply the notices, creating custom reports and spreadsheets from my financial software (GnuCash), update spreadsheets when my EV is fully charged, update spreadsheets from CSVs, create a consolidated spreadsheet from multiple CSVs, find articles in my woodworking database of magazine contents, show me the oldest books I haven't read yet in my library database of books, among others.",
        user_id=17,
        post_id=53,
        created_at=comment346_createdat,
        updated_at=comment346_createdat
    )
    db.session.add(comments_dict['346'])
    db.session.flush()

    comment347_createdat=generate_comment_timestamp(user36.created_at, comments_dict['346'].created_at)
    comments_dict['347'] = Comment(
        content="That’s amazing, i’ll try these out, thanks!!",
        user_id=36,
        post_id=53,
        parent_id=346,
        created_at=comment347_createdat,
        updated_at=comment347_createdat
    )
    db.session.add(comments_dict['347'])


    # -------------------------------------------------------------------------
    # POST 54
    # -------------------------------------------------------------------------
    post54 = Post.query.get(54)

    comment348_createdat=generate_comment_timestamp(user18.created_at, post54.created_at)
    comments_dict['348'] = Comment(
        content="uv is a game changer for package management, cannot recommend it enough.",
        user_id=18,
        post_id=54,
        created_at=comment348_createdat,
        updated_at=comment348_createdat
    )
    db.session.add(comments_dict['348'])
    db.session.flush()

    comment349_createdat=generate_comment_timestamp(user19.created_at, comments_dict['348'].created_at)
    comments_dict['349'] = Comment(
        content="Seconded. Add ruff (made by the good people who created uv) for linting and black for opinionated formatting.",
        user_id=19,
        post_id=54,
        parent_id=348,
        created_at=comment349_createdat,
        updated_at=comment349_createdat
    )
    db.session.add(comments_dict['349'])

    comment350_createdat=generate_comment_timestamp(user20.created_at, comments_dict['348'].created_at)
    comments_dict['350'] = Comment(
        content="We had to stop using uv because it kept resolving to really old versions for some libraries and the order of the libraries in the requirements.txt file matters.",
        user_id=20,
        post_id=54,
        parent_id=348,
        created_at=comment350_createdat,
        updated_at=comment350_createdat
    )
    db.session.add(comments_dict['350'])

    comment351_createdat=generate_comment_timestamp(user21.created_at, post54.created_at)
    comments_dict['351'] = Comment(
        content="Good to know the ins and outs of the Standard Library",
        user_id=21,
        post_id=54,
        created_at=comment351_createdat,
        updated_at=comment351_createdat
    )
    db.session.add(comments_dict['351'])
    db.session.flush()

    comment352_createdat=generate_comment_timestamp(user22.created_at, comments_dict['351'].created_at)
    comments_dict['352'] = Comment(
        content="Using pathlib from the standard library instead of os for working with paths.",
        user_id=22,
        post_id=54,
        parent_id=351,
        created_at=comment352_createdat,
        updated_at=comment352_createdat
    )
    db.session.add(comments_dict['352'])

    comment353_createdat=generate_comment_timestamp(user23.created_at, post54.created_at)
    comments_dict['353'] = Comment(
        content="tqdm. Underated package",
        user_id=23,
        post_id=54,
        created_at=comment353_createdat,
        updated_at=comment353_createdat
    )
    db.session.add(comments_dict['353'])
    db.session.flush()

    comment354_createdat=generate_comment_timestamp(user24.created_at, comments_dict['353'].created_at)
    comments_dict['354'] = Comment(
        content="The best. I've found it incredibly user-friendly and has great functionality.",
        user_id=24,
        post_id=54,
        parent_id=353,
        created_at=comment354_createdat,
        updated_at=comment354_createdat
    )
    db.session.add(comments_dict['354'])

    # -------------------------------------------------------------------------
    # POST 55
    # -------------------------------------------------------------------------
    post55 = Post.query.get(55)

    comment355_createdat=generate_comment_timestamp(user25.created_at, post55.created_at)
    comments_dict['355'] = Comment(
        content="I'm glad i stumbled on this, cause this is me right now, literally starting code from the underground bomb shelter.. and trying to get a full grasp of how everything works and how to even get started on creating something.",
        user_id=25,
        post_id=55,
        created_at=comment355_createdat,
        updated_at=comment355_createdat
    )
    db.session.add(comments_dict['355'])
    db.session.flush()

    comment356_createdat=generate_comment_timestamp(user38.created_at, comments_dict['355'].created_at)
    comments_dict['356'] = Comment(
        content="I’m wishing you a wonderful and safe journey! Stick with whatever works for you.",
        user_id=38,
        post_id=55,
        parent_id=355,
        created_at=comment356_createdat,
        updated_at=comment356_createdat
    )
    db.session.add(comments_dict['356'])

    comment357_createdat=generate_comment_timestamp(user26.created_at, post55.created_at)
    comments_dict['357'] = Comment(
        content="I’m learning python just now (started in October) and I’ve read from so many people to limit the use of Copilot/Chat GBT. I’ve followed that and I genuinely believe it’s helped me understand my code better, especially when reviewing my code.",
        user_id=26,
        post_id=55,
        created_at=comment357_createdat,
        updated_at=comment357_createdat
    )
    db.session.add(comments_dict['357'])
    db.session.flush()

    comment358_createdat=generate_comment_timestamp(user27.created_at, comments_dict['357'].created_at)
    comments_dict['358'] = Comment(
        content="IMO the way to use ChatGPT as a learning tool is to write some code that does something, and that works, then tell ChatGPT to refactor it, then test the result and make sure it still works, then study the result hard until you understand everything that was changed. It's kind of like pair programming with a fairly experienced programmer who is a bit drug-addled. When he's not high you can learn a lot of useful technique from him, when he's high you learn a lot about debugging and what not to do.",
        user_id=27,
        post_id=55,
        parent_id=357,
        created_at=comment358_createdat,
        updated_at=comment358_createdat
    )
    db.session.add(comments_dict['358'])

    comment359_createdat=generate_comment_timestamp(user28.created_at, post55.created_at)
    comments_dict['359'] = Comment(
        content="Very accurate. And the best way to learn, once you know the basics, is to start a coding project and *follow through with it*; then teach yourself whatever syntax/modules/technologies you need to make it work. This teaches you far, far, far better than watching tutorials.",
        user_id=28,
        post_id=55,
        created_at=comment359_createdat,
        updated_at=comment359_createdat
    )
    db.session.add(comments_dict['359'])

    # -------------------------------------------------------------------------
    # POST 56
    # -------------------------------------------------------------------------
    post56 = Post.query.get(56)

    comment360_createdat=generate_comment_timestamp(user29.created_at, post56.created_at)
    comments_dict['360'] = Comment(
        content="Do you have a minute to talk about our lord and savior flask?",
        user_id=29,
        post_id=56,
        created_at=comment360_createdat,
        updated_at=comment360_createdat
    )
    db.session.add(comments_dict['360'])
    db.session.flush()

    comment361_createdat=generate_comment_timestamp(user30.created_at, comments_dict['360'].created_at)
    comments_dict['361'] = Comment(
        content="Using a web front end is the best, no need for the user to install anything and it just works.",
        user_id=30,
        post_id=56,
        parent_id=360,
        created_at=comment361_createdat,
        updated_at=comment361_createdat
    )
    db.session.add(comments_dict['361'])
    db.session.flush()

    comment362_createdat=generate_comment_timestamp(user31.created_at, comments_dict['361'].created_at)
    comments_dict['362'] = Comment(
        content="Flask + HTMX just feels good",
        user_id=31,
        post_id=56,
        parent_id=361,
        created_at=comment362_createdat,
        updated_at=comment362_createdat
    )
    db.session.add(comments_dict['362'])

    comment363_createdat=generate_comment_timestamp(user39.created_at, comments_dict['361'].created_at)
    comments_dict['363'] = Comment(
        content="So funny, I actually have used flask but never for a GUI, I made a flask app on an EC2 instance as the backend for one of my projects. Just used a simple script to make API calls though nothing crazy. I didn't even realize you could use it to make a GUI",
        user_id=39,
        post_id=56,
        parent_id=361,
        created_at=comment363_createdat,
        updated_at=comment363_createdat
    )
    db.session.add(comments_dict['363'])
    db.session.flush()

    comment364_createdat=generate_comment_timestamp(user32.created_at, comments_dict['363'].created_at)
    comments_dict['364'] = Comment(
        content="You're actually using HTML and possibly css, but it's amazingly easy with flask. You can learn what you need in a weekend.",
        user_id=32,
        post_id=56,
        parent_id=363,
        created_at=comment364_createdat,
        updated_at=comment364_createdat
    )
    db.session.add(comments_dict['364'])

    comment365_createdat=generate_comment_timestamp(user33.created_at, post56.created_at)
    comments_dict['365'] = Comment(
        content="Most people make web based apps now days so you might have a better experience trying to develop in something like Django or Python's Electron implementation.",
        user_id=33,
        post_id=56,
        created_at=comment365_createdat,
        updated_at=comment365_createdat
    )
    db.session.add(comments_dict['365'])
    db.session.flush()

    comment366_createdat=generate_comment_timestamp(user39.created_at, comments_dict['365'].created_at)
    comments_dict['366'] = Comment(
        content="Definitely the next thing I'm going to try. I want to find some other options for a GUI app that isn't web based but maybe Python just isn't the language for that?",
        user_id=39,
        post_id=56,
        parent_id=365,
        created_at=comment366_createdat,
        updated_at=comment366_createdat
    )
    db.session.add(comments_dict['366'])

    # -------------------------------------------------------------------------
    # POST 57
    # -------------------------------------------------------------------------
    post57 = Post.query.get(57)

    comment367_createdat=generate_comment_timestamp(user34.created_at, post57.created_at)
    comments_dict['367'] = Comment(
        content="https://www.reddit.com/r/learnpython/wiki/faq#wiki_why_does_my_loop_seem_to_be_skipping_items_in_a_list.3F",
        user_id=34,
        post_id=57,
        created_at=comment367_createdat,
        updated_at=comment367_createdat
    )
    db.session.add(comments_dict['367'])
    db.session.flush()

    comment368_createdat=generate_comment_timestamp(user35.created_at, comments_dict['367'].created_at)
    comments_dict['368'] = Comment(
        content="Yep, except for a long time I didn't notice my loop was skipping items due to how I wrote the code, I thought the problem was with my logic of incrementing some values or broken for loop (I was working with integers only).",
        user_id=35,
        post_id=57,
        parent_id=367,
        created_at=comment368_createdat,
        updated_at=comment368_createdat
    )
    db.session.add(comments_dict['368'])

    comment369_createdat=generate_comment_timestamp(user36.created_at, post57.created_at)
    comments_dict['369'] = Comment(
        content="This is one of the things I re-learned the hard way multiple times :)",
        user_id=36,
        post_id=57,
        created_at=comment369_createdat,
        updated_at=comment369_createdat
    )
    db.session.add(comments_dict['369'])

    comment370_createdat=generate_comment_timestamp(user37.created_at, post57.created_at)
    comments_dict['370'] = Comment(
        content="This is true in SO many languages too. I got bitten by it pretty bad in C++ once.",
        user_id=37,
        post_id=57,
        created_at=comment370_createdat,
        updated_at=comment370_createdat
    )
    db.session.add(comments_dict['370'])
    db.session.flush()

    comment371_createdat=generate_comment_timestamp(user38.created_at, comments_dict['370'].created_at)
    comments_dict['371'] = Comment(
        content="Similar to the Mutating Table error you get in Oracle stored procs.",
        user_id=38,
        post_id=57,
        parent_id=370,
        created_at=comment371_createdat,
        updated_at=comment371_createdat
    )
    db.session.add(comments_dict['371'])

    # -------------------------------------------------------------------------
    # POST 58
    # -------------------------------------------------------------------------
    post58 = Post.query.get(58)

    comment372_createdat=generate_comment_timestamp(user39.created_at, post58.created_at)
    comments_dict['372'] = Comment(
        content="You missed the point of that song. If a man cheated on HER. She a republican. She only cares when bad shit happens to her.",
        user_id=39,
        post_id=58,
        created_at=comment372_createdat,
        updated_at=comment372_createdat
    )
    db.session.add(comments_dict['372'])
    db.session.flush()

    comment373_createdat=generate_comment_timestamp(user40.created_at, comments_dict['372'].created_at)
    comments_dict['373'] = Comment(
        content="Not only that, but since he cheated on her, the felony vandalism is justified since laws only apply to others.",
        user_id=40,
        post_id=58,
        parent_id=372,
        created_at=comment373_createdat,
        updated_at=comment373_createdat
    )
    db.session.add(comments_dict['373'])

    comment374_createdat=generate_comment_timestamp(user42.created_at, comments_dict['372'].created_at)
    comments_dict['374'] = Comment(
        content="And the other half of course... Every country star is performing for their base. 0% of them have even the first moment of relating to 99% of their own music. They aren't poor, they aren't farmers, if any of them even own a pick up it's never been used for work. Hypocrisy is where they live, this is not a surprise.",
        user_id=42,
        post_id=58,
        parent_id=373,
        created_at=comment374_createdat,
        updated_at=comment374_createdat
    )
    db.session.add(comments_dict['374'])

    comment375_createdat=generate_comment_timestamp(user43.created_at, post58.created_at)
    comments_dict['375'] = Comment(
        content="Moral to the story...\"Anything for money.\" - GOP",
        user_id=43,
        post_id=58,
        created_at=comment375_createdat,
        updated_at=comment375_createdat
    )
    db.session.add(comments_dict['375'])
    db.session.flush()

    comment376_createdat=generate_comment_timestamp(user44.created_at, comments_dict['375'].created_at)
    comments_dict['376'] = Comment(
        content="\"Where is our money? We still haven’t been paid for this…\" - GOP a year later",
        user_id=44,
        post_id=58,
        parent_id=375,
        created_at=comment376_createdat,
        updated_at=comment376_createdat
    )
    db.session.add(comments_dict['376'])

    comment377_createdat=generate_comment_timestamp(user45.created_at, post58.created_at)
    comments_dict['377'] = Comment(
        content="He didn't cheat on HER, so it doesn't matter. Especially when she sees the paycheck dangling in front of her. That's the new code of ethics.",
        user_id=45,
        post_id=58,
        created_at=comment377_createdat,
        updated_at=comment377_createdat
    )
    db.session.add(comments_dict['377'])
    db.session.flush()

    comment378_createdat=generate_comment_timestamp(user46.created_at, comments_dict['377'].created_at)
    comments_dict['378'] = Comment(
        content="Yeah. Because Trump has a perfect history of paying all his bills and debtors",
        user_id=46,
        post_id=58,
        parent_id=377,
        created_at=comment378_createdat,
        updated_at=comment378_createdat
    )
    db.session.add(comments_dict['378'])

    # -------------------------------------------------------------------------
    # POST 59
    # -------------------------------------------------------------------------
    post59 = Post.query.get(59)

    comment379_createdat=generate_comment_timestamp(user47.created_at, post59.created_at)
    comments_dict['379'] = Comment(
        content="Trump Egg Flu has a nice ring to it.",
        user_id=47,
        post_id=59,
        created_at=comment379_createdat,
        updated_at=comment379_createdat
    )
    db.session.add(comments_dict['379'])

    comment380_createdat=generate_comment_timestamp(user48.created_at, post48.created_at)
    comments_dict['380'] = Comment(
        content="He might be fat and racist, but at least he's selfish and dumb.",
        user_id=48,
        post_id=59,
        created_at=comment380_createdat,
        updated_at=comment380_createdat
    )
    db.session.add(comments_dict['380'])
    db.session.flush()

    comment381_createdat=generate_comment_timestamp(user49.created_at, comments_dict['380'].created_at)
    comments_dict['381'] = Comment(
        content="That's the thing, you know his ass will have the best doctors, have the best medical care and people actively helping him avoid issues.... He's not just selfish, he's vindictive with full knowledge of what covid and now bird flu can do, but would prefer people suffer as there is money to be made in bullshit \"cures\" and shoving conspiracy theories down our throats.",
        user_id=49,
        post_id=59,
        parent_id=380,
        created_at=comment381_createdat,
        updated_at=comment381_createdat
    )
    db.session.add(comments_dict['381'])
    db.session.flush()

    comment382_createdat=generate_comment_timestamp(user50.created_at, comments_dict['381'].created_at)
    comments_dict['382'] = Comment(
        content="I Wish he ends up like Stalin, collapsing and his people being too afraid to help him",
        user_id=50,
        post_id=59,
        parent_id=381,
        created_at=comment382_createdat,
        updated_at=comment382_createdat
    )
    db.session.add(comments_dict['382'])
    db.session.flush()

    comment383_createdat=generate_comment_timestamp(user2.created_at, comments_dict['382'].created_at)
    comments_dict['383'] = Comment(
        content="Who needs 'too afraid' when you’ve got 'unwilling'?",
        user_id=2,
        post_id=59,
        parent_id=382,
        created_at=comment383_createdat,
        updated_at=comment383_createdat
    )
    db.session.add(comments_dict['383'])

    comment384_createdat=generate_comment_timestamp(user3.created_at, post59.created_at)
    comments_dict['384'] = Comment(
        content="He learned nothing from covid.",
        user_id=3,
        post_id=59,
        created_at=comment384_createdat,
        updated_at=comment384_createdat
    )
    db.session.add(comments_dict['384'])
    db.session.flush()

    comment385_createdat=generate_comment_timestamp(user4.created_at, comments_dict['384'].created_at)
    comments_dict['385'] = Comment(
        content="He learned that denying there was a pandemic made him more popular than admitting.",
        user_id=4,
        post_id=59,
        parent_id=384,
        created_at=comment385_createdat,
        updated_at=comment385_createdat
    )
    db.session.add(comments_dict['385'])

    comment386_createdat=generate_comment_timestamp(user5.created_at, post59.created_at)
    comments_dict['386'] = Comment(
        content="More misinformation that is easily disproven. Then the Dems wonder why they lost the election so badly.",
        user_id=5,
        post_id=59,
        created_at=comment386_createdat,
        updated_at=comment386_createdat
    )
    db.session.add(comments_dict['386'])

    comment387_createdat=generate_comment_timestamp(user6.created_at, post59.created_at)
    comments_dict['387'] = Comment(
        content="Testing is still in place. The communications are paused. Everyone breathe… it’s like day 6. 😆",
        user_id=6,
        post_id=59,
        created_at=comment387_createdat,
        updated_at=comment387_createdat
    )
    db.session.add(comments_dict['387'])



    # -------------------------------------------------------------------------
    # POST 60
    # -------------------------------------------------------------------------
    post60 = Post.query.get(60)

    comment388_createdat=generate_comment_timestamp(user7.created_at, post60.created_at)
    comments_dict['388'] = Comment(
        content="Yes! Please keep this going, lmao. I want every country to lay claim to it now. Just because they can.",
        user_id=7,
        post_id=60,
        created_at=comment388_createdat,
        updated_at=comment388_createdat
    )
    db.session.add(comments_dict['388'])
    db.session.flush()

    comment389_createdat=generate_comment_timestamp(user8.created_at, comments_dict['388'].created_at)
    comments_dict['389'] = Comment(
        content="We Canadians should name it Gulf of Cuba - because we vacation there a lot, they're nice people and it'd fuck with people's minds.",
        user_id=8,
        post_id=60,
        parent_id=388,
        created_at=comment389_createdat,
        updated_at=comment389_createdat
    )
    db.session.add(comments_dict['389'])

    comment390_createdat=generate_comment_timestamp(user9.created_at, post60.created_at)
    comments_dict['390'] = Comment(
        content="I hereby declare the Gulf of Mexico/Gulf of America/Gulf of Denmark be renamed to GulfyMcGulface in honor of BoatyMcBoatface who is an actual boat and has a more direct relationship with bodies of water than the rest of us.",
        user_id=9,
        post_id=60,
        created_at=comment390_createdat,
        updated_at=comment390_createdat
    )
    db.session.add(comments_dict['390'])
    db.session.flush()

    comment391_createdat=generate_comment_timestamp(user10.created_at, comments_dict['390'].created_at)
    comments_dict['391'] = Comment(
        content="Isn't it a submarine?",
        user_id=10,
        post_id=60,
        parent_id=390,
        created_at=comment391_createdat,
        updated_at=comment391_createdat
    )
    db.session.add(comments_dict['391'])
    db.session.flush()

    comment392_createdat=generate_comment_timestamp(user9.created_at, comments_dict['391'].created_at)
    comments_dict['392'] = Comment(
        content="Correct! My bad. My point still stands, if anything it's even more relevant now.",
        user_id=9,
        post_id=60,
        parent_id=391,
        created_at=comment392_createdat,
        updated_at=comment392_createdat
    )
    db.session.add(comments_dict['392'])

    comment393_createdat=generate_comment_timestamp(user11.created_at, post60.created_at)
    comments_dict['393'] = Comment(
        content="I still think renaming it the gulf of C U M , for Cuba, United states & Mexico, is the best idea",
        user_id=11,
        post_id=60,
        created_at=comment393_createdat,
        updated_at=comment393_createdat
    )
    db.session.add(comments_dict['393'])

    comment394_createdat=generate_comment_timestamp(user12.created_at, post60.created_at)
    comments_dict['394'] = Comment(
        content="Gulf of America makes sense since it’s attached to the American continent",
        user_id=12,
        post_id=60,
        created_at=comment394_createdat,
        updated_at=comment394_createdat
    )
    db.session.add(comments_dict['394'])
    db.session.flush()

    comment395_createdat=generate_comment_timestamp(user13.created_at, comments_dict['394'].created_at)
    comments_dict['395'] = Comment(
        content="Gulf of Mexico made since since it a gulf surrounded mostly by the county of Mexico",
        user_id=13,
        post_id=60,
        parent_id=394,
        created_at=comment395_createdat,
        updated_at=comment395_createdat
    )
    db.session.add(comments_dict['395'])

    # -------------------------------------------------------------------------
    # POST 61
    # -------------------------------------------------------------------------
    post61 = Post.query.get(61)

    comment396_createdat=generate_comment_timestamp(user14.created_at, post61.created_at)
    comments_dict['396'] = Comment(
        content="Congrats! Learning JS is like learning anything else worthwhile: it requires a lot of practice and consistency. The more you stick with it, the easier it becomes. And the more you practice, the faster you learn.",
        user_id=14,
        post_id=61,
        created_at=comment396_createdat,
        updated_at=comment396_createdat
    )
    db.session.add(comments_dict['396'])

    comment397_createdat=generate_comment_timestamp(user15.created_at, post61.created_at)
    comments_dict['397'] = Comment(
        content="Thank you for sharing and congratulations! This is so encouraging",
        user_id=15,
        post_id=61,
        created_at=comment397_createdat,
        updated_at=comment397_createdat
    )
    db.session.add(comments_dict['397'])

    comment398_createdat=generate_comment_timestamp(user16.created_at, post61.created_at)
    comments_dict['398'] = Comment(
        content="Thank you encouraging! I’m currently learning JavaScript course on Udemy. I already have learned basics of HTML and CSS. I’m trying to study every day for at least an hour and this is my 96th day haha wanna become a self-taught dev",
        user_id=16,
        post_id=61,
        created_at=comment398_createdat,
        updated_at=comment398_createdat
    )
    db.session.add(comments_dict['398'])

    # -------------------------------------------------------------------------
    # POST 62
    # -------------------------------------------------------------------------
    post62 = Post.query.get(62)

    comment399_createdat=generate_comment_timestamp(user17.created_at, post62.created_at)
    comments_dict['399'] = Comment(
        content="Zuckerberg is really bad at predicting the future, he spent hundreds of billions of dollars betting on the Metaverse and lost it all. AI will radically transform the tech industry but there will still be plenty of engineering jobs and plenty of value in understanding how programming works.",
        user_id=17,
        post_id=62,
        created_at=comment399_createdat,
        updated_at=comment399_createdat
    )
    db.session.add(comments_dict['399'])
    db.session.flush()

    comment400_createdat=generate_comment_timestamp(user18.created_at, comments_dict['399'].created_at)
    comments_dict['400'] = Comment(
        content="The meta verse is slowly happening. Slowly. I doubt he's given up on that. AI, metaverse, crypto, will all come together eventually. Just a matter of time.",
        user_id=18,
        post_id=62,
        parent_id=399,
        created_at=comment400_createdat,
        updated_at=comment400_createdat
    )
    db.session.add(comments_dict['400'])
    db.session.flush()

    comment401_createdat=generate_comment_timestamp(user19.created_at, comments_dict['400'].created_at)
    comments_dict['401'] = Comment(
        content="Ah, yes. All buzzwords will someday combine into the MegaBuzzword, as prophecy has foretold.",
        user_id=19,
        post_id=62,
        parent_id=400,
        created_at=comment401_createdat,
        updated_at=comment401_createdat
    )
    db.session.add(comments_dict['401'])

    comment402_createdat=generate_comment_timestamp(user20.created_at, post62.created_at)
    comments_dict['402'] = Comment(
        content="Those people say those things to pump their investments or company stocks, so that clueless investors dump money into those companies",
        user_id=20,
        post_id=62,
        created_at=comment402_createdat,
        updated_at=comment402_createdat
    )
    db.session.add(comments_dict['402'])

    comment403_createdat=generate_comment_timestamp(user21.created_at, post62.created_at)
    comments_dict['403'] = Comment(
        content="Cranes didn't replace human construction of buildings, either.",
        user_id=21,
        post_id=62,
        created_at=comment403_createdat,
        updated_at=comment403_createdat
    )
    db.session.add(comments_dict['403'])
    db.session.flush()

    comment404_createdat=generate_comment_timestamp(user22.created_at, comments_dict['403'].created_at)
    comments_dict['404'] = Comment(
        content="But storks still deliver human babies! Checkmate aviests!",
        user_id=22,
        post_id=62,
        parent_id=403,
        created_at=comment404_createdat,
        updated_at=comment404_createdat
    )
    db.session.add(comments_dict['404'])

    comment405_createdat=generate_comment_timestamp(user22.created_at, post62.created_at)
    comments_dict['405'] = Comment(
        content="Who is going to program the AI?",
        user_id=23,
        post_id=62,
        created_at=comment405_createdat,
        updated_at=comment405_createdat
    )
    db.session.add(comments_dict['405'])

    # -------------------------------------------------------------------------
    # POST 63
    # -------------------------------------------------------------------------
    post63 = Post.query.get(63)

    comment406_createdat=generate_comment_timestamp(user23.created_at, post63.created_at)
    comments_dict['406'] = Comment(
        content="It's used in everything, desktop apps, mobile apps, video games things like the huds in battlefield , gta5 uses it. VS code is made with javascript too.",
        user_id=23,
        post_id=63,
        created_at=comment406_createdat,
        updated_at=comment406_createdat
    )
    db.session.add(comments_dict['406'])
    db.session.flush()

    comment407_createdat=generate_comment_timestamp(user46.created_at, comments_dict['406'].created_at)
    comments_dict['407'] = Comment(
        content="Omg thank you!",
        user_id=46,
        post_id=63,
        parent_id=406,
        created_at=comment407_createdat,
        updated_at=comment407_createdat
    )
    db.session.add(comments_dict['407'])

    comment408_createdat=generate_comment_timestamp(user25.created_at, comments_dict['406'].created_at)
    comments_dict['408'] = Comment(
        content='Where does GTA5 use JS?',
        user_id=25,
        post_id=63,
        parent_id=406,
        created_at=comment408_createdat,
        updated_at=comment408_createdat
    )
    db.session.add(comments_dict['408'])
    db.session.flush()

    comment409_createdat=generate_comment_timestamp(user24.created_at, comments_dict['408'].created_at)
    comments_dict['409'] = Comment(
        content="I don't remember, I think the weapon wheel.",
        user_id=24,
        post_id=63,
        parent_id=408,
        created_at=comment409_createdat,
        updated_at=comment409_createdat
    )
    db.session.add(comments_dict['409'])

    comment410_createdat=generate_comment_timestamp(user26.created_at, post63.created_at)
    comments_dict['410'] = Comment(
        content="For how long have u used JS? Been following Odin Project on and off, but interested to know what made you fall in love with it.",
        user_id=26,
        post_id=63,
        created_at=comment410_createdat,
        updated_at=comment400_createdat
    )
    db.session.add(comments_dict['410'])
    db.session.flush()

    comment411_createdat=generate_comment_timestamp(user46.created_at, comments_dict['410'].created_at)
    comments_dict['411'] = Comment(
        content="I almost finished foundations and currently doing a course on Udemy by Jonas Schmedtmann",
        user_id=46,
        post_id=63,
        parent_id=410,
        created_at=comment411_createdat,
        updated_at=comment411_createdat
    )
    db.session.add(comments_dict['411'])
    db.session.flush()

    comment412_createdat=generate_comment_timestamp(user27.created_at, comments_dict['411'].created_at)
    comments_dict['412'] = Comment(
        content="How much course you finished?",
        user_id=27,
        post_id=63,
        parent_id=411,
        created_at=comment412_createdat,
        updated_at=comment412_createdat
    )
    db.session.add(comments_dict['412'])
    db.session.flush()

    comment413_createdat=generate_comment_timestamp(user46.created_at, comments_dict['412'].created_at)
    comments_dict['413'] = Comment(
        content="Around 80 percent of",
        user_id=46,
        post_id=63,
        parent_id=412,
        created_at=comment413_createdat,
        updated_at=comment413_createdat
    )
    db.session.add(comments_dict['413'])

    comment414_createdat=generate_comment_timestamp(user29.created_at, post63.created_at)
    comments_dict['414'] = Comment(
        content="Fuck no.. I've used JS / nodeJS to build all sorts of shit. Some of which had nothing to do with eb dev at all.",
        user_id=29,
        post_id=63,
        created_at=comment414_createdat,
        updated_at=comment414_createdat
    )
    db.session.add(comments_dict['414'])

    # -------------------------------------------------------------------------
    # POST 64
    # -------------------------------------------------------------------------
    post64 = Post.query.get(64)

    comment415_createdat=generate_comment_timestamp(user30.created_at, post64.created_at)
    comments_dict['415'] = Comment(
        content="My husband did this while entertaining our baby… he had to work from home for a couple of days 🤣",
        user_id=30,
        post_id=64,
        created_at=comment415_createdat,
        updated_at=comment415_createdat
    )
    db.session.add(comments_dict['415'])
    db.session.flush()

    comment416_createdat=generate_comment_timestamp(user31.created_at, comments_dict['415'].created_at)
    comments_dict['416'] = Comment(
        content="Happened to my choreographer on tour. He had to come teach us the next day and couldn’t hide it. Apparently the staff had some drinks, and found a nerf basketball set. My choreographer was the hoop.",
        user_id=31,
        post_id=64,
        parent_id=415,
        created_at=comment416_createdat,
        updated_at=comment416_createdat
    )
    db.session.add(comments_dict['416'])
    db.session.flush()

    comment417_createdat=generate_comment_timestamp(user47.created_at, comments_dict['416'].created_at)
    comments_dict['417'] = Comment(
        content="Nice! I love this story!",
        user_id=47,
        post_id=64,
        parent_id=416,
        created_at=comment417_createdat,
        updated_at=comment417_createdat
    )
    db.session.add(comments_dict['417'])

    comment418_createdat=generate_comment_timestamp(user32.created_at, post64.created_at)
    comments_dict['418'] = Comment(
        content="\"I'm doing cupping for my migraines. It totally works and you should try it too!\" 😂",
        user_id=32,
        post_id=64,
        created_at=comment418_createdat,
        updated_at=comment418_createdat
    )
    db.session.add(comments_dict['418'])
    db.session.flush()

    comment419_createdat=generate_comment_timestamp(user33.created_at, comments_dict['418'].created_at)
    comments_dict['419'] = Comment(
        content="I just took a cupping class. When we learned the facial cupping sequence, my partner accidentally gave me a cupping- induced red mark across my cheekbones. I looked like I wore blush for a couple of days!",
        user_id=33,
        post_id=64,
        parent_id=418,
        created_at=comment419_createdat,
        updated_at=comment419_createdat
    )
    db.session.add(comments_dict['419'])

    comment420_createdat=generate_comment_timestamp(user34.created_at, comments_dict['418'].created_at)
    comments_dict['420'] = Comment(
        content="I laughed 🤣",
        user_id=34,
        post_id=64,
        parent_id=418,
        created_at=comment420_createdat,
        updated_at=comment420_createdat
    )
    db.session.add(comments_dict['420'])

    comment421_createdat=generate_comment_timestamp(user35.created_at, post64.created_at)
    comments_dict['421'] = Comment(
        content="When it was 2008, I was 29 years old and still drinking a lot. I'm sober now. But anyway, it was Christmastime and I had received a shower radio as a gift. It came with three suction cups. I got bored watching TV while drinking and I kept sticking and unsticking one of the suction cups to my head (I'm shaved to the skin). The next morning I had ten or fifteen perfect circles. I had to go in to work. I blamed it on my little neice.",
        user_id=35,
        post_id=64,
        created_at=comment421_createdat,
        updated_at=comment421_createdat
    )
    db.session.add(comments_dict['421'])
    db.session.flush()

    comment422_createdat=generate_comment_timestamp(user47.created_at, comments_dict['421'].created_at)
    comments_dict['422'] = Comment(
        content="I'm going to have my kid read this once he emerges from his room again :)",
        user_id=47,
        post_id=64,
        parent_id=421,
        created_at=comment422_createdat,
        updated_at=comment422_createdat
    )
    db.session.add(comments_dict['422'])

    comment423_createdat=generate_comment_timestamp(user36.created_at, comments_dict['421'].created_at)
    comments_dict['423'] = Comment(
        content="😆😆😆",
        user_id=36,
        post_id=64,
        parent_id=421,
        created_at=comment423_createdat,
        updated_at=comment423_createdat
    )
    db.session.add(comments_dict['423'])

    # -------------------------------------------------------------------------
    # POST 65
    # -------------------------------------------------------------------------
    post65 = Post.query.get(65)

    comment424_createdat=generate_comment_timestamp(user37.created_at, post65.created_at)
    comments_dict['424'] = Comment(
        content="I have my home clothes and what I call my real world clothes",
        user_id=37,
        post_id=65,
        created_at=comment424_createdat,
        updated_at=comment424_createdat
    )
    db.session.add(comments_dict['424'])
    db.session.flush()

    comment425_createdat=generate_comment_timestamp(user38.created_at, comments_dict['424'].created_at)
    comments_dict['425'] = Comment(
        content="I call them day pajamas vs outfits. I mostly get to wear day pajamas so when I get to wear an outfit, I’m pretty excited.",
        user_id=38,
        post_id=65,
        parent_id=424,
        created_at=comment425_createdat,
        updated_at=comment425_createdat
    )
    db.session.add(comments_dict['425'])
    db.session.flush()

    comment426_createdat=generate_comment_timestamp(user37.created_at, comments_dict['425'].created_at)
    comments_dict['426'] = Comment(
        content="My dogs know I’m leaving the house when they see me putting on my real world clothes lol. They go to their beds or go lay down with my son when he’s home. It’s the only time they willingly leave my side lol.",
        user_id=37,
        post_id=65,
        parent_id=425,
        created_at=comment426_createdat,
        updated_at=comment426_createdat
    )
    db.session.add(comments_dict['426'])

    comment427_createdat=generate_comment_timestamp(user39.created_at, post65.created_at)
    comments_dict['427'] = Comment(
        content='A tshirt with a stain is a new pajama top (well in my house anyway).',
        user_id=39,
        post_id=65,
        created_at=comment427_createdat,
        updated_at=comment427_createdat
    )
    db.session.add(comments_dict['427'])
    db.session.flush()

    comment428_createdat=generate_comment_timestamp(user40.created_at, comments_dict['427'].created_at)
    comments_dict['428'] = Comment(
        content="This. Home clothes are multi-purpose for us (chilling and sleeping), and they're usually just comfortable Outside clothes that have been demoted for some reason or another. Never been big on buying stuff specifically to wear to bed.",
        user_id=40,
        post_id=65,
        parent_id=427,
        created_at=comment428_createdat,
        updated_at=comment428_createdat
    )
    db.session.add(comments_dict['428'])

    comment429_createdat=generate_comment_timestamp(user41.created_at, comments_dict['427'].created_at)
    comments_dict['429'] = Comment(
        content="Absolutely. And pyjamas are for wearing about the house when nobody's coming. (If you put a large, beautiful scarf on, pyjamas are also for wearing for online meetings).",
        user_id=41,
        post_id=65,
        parent_id=427,
        created_at=comment429_createdat,
        updated_at=comment429_createdat
    )
    db.session.add(comments_dict['429'])

    comment430_createdat=generate_comment_timestamp(user42.created_at, post65.created_at)
    comments_dict['430'] = Comment(
        content="We refer to them as \"comfy clothes\", but we definitely change out of work clothes the second we get home. Can’t get into our PJs too early because we’re definitely going to have to walk the dog at least once maybe twice.",
        user_id=42,
        post_id=65,
        created_at=comment430_createdat,
        updated_at=comment430_createdat
    )
    db.session.add(comments_dict['430'])

    comment431_createdat=generate_comment_timestamp(user43.created_at, post65.created_at)
    comments_dict['431'] = Comment(
        content="Please don't ever say homeless chic again ffs",
        user_id=43,
        post_id=65,
        created_at=comment431_createdat,
        updated_at=comment431_createdat
    )
    db.session.add(comments_dict['431'])

    comment432_createdat=generate_comment_timestamp(user44.created_at, post65.created_at)
    comments_dict['432'] = Comment(
        content="You are pretty much the only ones. Making you very close to being mutants. There’s nothing that can be done about it. Obviously your father started all of this in your family is trapped as a result. You could leave unless of course you’re too young in which case I think that’s a bad idea. Humor the old man and do what he says. When you’re old enough, you can get out and dress and whatever clothing you like. But as long as you’re under his roof, you’re under his rules. Deal with it.",
        user_id=44,
        post_id=65,
        created_at=comment432_createdat,
        updated_at=comment432_createdat
    )
    db.session.add(comments_dict['432'])

    # -------------------------------------------------------------------------
    # POST 66
    # -------------------------------------------------------------------------
    post66 = Post.query.get(66)

    comment433_createdat=generate_comment_timestamp(user45.created_at, post66.created_at)
    comments_dict['433'] = Comment(
        content="I used it for about a year. I enjoyed it quite a bit once I fine tuned my preferences, got a lot of creative ideas and found sub groups I really enjoyed. But I eventually quit because it was just TOO good at attracting my attention. Plus, I’d find myself all worked up about TikTok dramas that had no real impact on my own life. It was just too damn addictive. Deleted everything 3 years ago and I don’t miss it.",
        user_id=45,
        post_id=66,
        created_at=comment433_createdat,
        updated_at=comment433_createdat
    )
    db.session.add(comments_dict['433'])
    db.session.flush()

    comment434_createdat=generate_comment_timestamp(user46.created_at, comments_dict['433'].created_at)
    comments_dict['434'] = Comment(
        content="My story is similar. Pandemic got me hooked and then my husband pointed out that I have a problem so I realized he was right. I have noticed through commentary of others that TikTok has become mostly an app that is designed to sell shit now. Im not at all interested. Im addicted to ribbit now lol",
        user_id=46,
        post_id=66,
        parent_id=433,
        created_at=comment434_createdat,
        updated_at=comment434_createdat
    )
    db.session.add(comments_dict['434'])

    comment435_createdat=generate_comment_timestamp(user47.created_at, post66.created_at)
    comments_dict['435'] = Comment(
        content="After learning about the intense amount of creepy data FB collects, and that TikTok does the same amount of shady collecting, I never found it remotely appealing to want to sign up for more of that.",
        user_id=47,
        post_id=66,
        created_at=comment435_createdat,
        updated_at=comment435_createdat
    )
    db.session.add(comments_dict['435'])
    db.session.flush()

    comment436_createdat=generate_comment_timestamp(user48.created_at, comments_dict['435'].created_at)
    comments_dict['436'] = Comment(
        content="The only social media I have is ribbit and that is it .",
        user_id=48,
        post_id=66,
        parent_id=435,
        created_at=comment436_createdat,
        updated_at=comment436_createdat
    )
    db.session.add(comments_dict['436'])
    db.session.flush()

    comment437_createdat=generate_comment_timestamp(user49.created_at, comments_dict['436'].created_at)
    comments_dict['437'] = Comment(
        content="Yup same. After 2020, I just got into so many stupid fights with people on FB. I deleted it and do not miss it.",
        user_id=49,
        post_id=66,
        parent_id=436,
        created_at=comment437_createdat,
        updated_at=comment437_createdat
    )
    db.session.add(comments_dict['437'])

    comment438_createdat=generate_comment_timestamp(user50.created_at, comments_dict['436'].created_at)
    comments_dict['438'] = Comment(
        content="Yeah me too, because Ribbit is 'reading' and I mostly follow things I am interested in. Not endless streams of videos of people looking at the camera and pointing in the air where text appears explaining how neurodivergent they are. I get is, you are special, so is everybody else. Now let me read something about ancient civilizations or woodworking.",
        user_id=50,
        post_id=66,
        parent_id=436,
        created_at=comment438_createdat,
        updated_at=comment438_createdat
    )
    db.session.add(comments_dict['438'])

    comment439_createdat=generate_comment_timestamp(user30.created_at, comments_dict['435'].created_at)
    comments_dict['439'] = Comment(
        content="That’s been my issue as well. Never once downloaded or felt like I was missing out. It’s a data collecting/selling and propaganda company more than a lighthearted, silly dancing with your friends or grandma app. People can’t see that or don’t care.",
        user_id=30,
        post_id=66,
        parent_id=435,
        created_at=comment439_createdat,
        updated_at=comment439_createdat
    )
    db.session.add(comments_dict['439'])

    comment440_createdat=generate_comment_timestamp(user2.created_at, post66.created_at)
    comments_dict['440'] = Comment(
        content="Managed to avoid it completely",
        user_id=2,
        post_id=66,
        created_at=comment440_createdat,
        updated_at=comment440_createdat
    )
    db.session.add(comments_dict['440'])



    db.session.commit()

def undo_comments():
    db.session.execute("DELETE FROM comments")
    db.session.commit()
