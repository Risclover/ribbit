from app.models import db, Comment

def seed_comments():
    comment_1 = Comment(
        content="Good for her. I wish all it took to make me happy was to sleep on a leaf. She's a cutie",
        user_id=2,
        post_id=1
    )
    comment_2 = Comment(
        content="Haha true. It's the little things.",
        user_id=13,
        post_id=1,
        parent_id=1
    )
    comment_3 = Comment(
        content="I've never seen a pug cat before",
        user_id=3,
        post_id=1
    )
    comment_4 = Comment(
        content="My exact thought! She's adorable ❤️",
        user_id=4,
        post_id=1,
        parent_id=3
    )
    comment_5 = Comment(
        content = "Thats a weird thing to say she has breathing problems",
        user_id=5,
        post_id=1,
        parent_id=4
    )
    comment_6 = Comment(
        content = "She breathes just fine as long as someone wipes her boogers a few times a day!",
        user_id=13,
        post_id=1,
        parent_id=5
    )
    comment_7 = Comment(
        content = "Dwarfism, maybe?",
        user_id=6,
        post_id=1,
        parent_id=3
    )
    comment_8 = Comment(
        content = "Pancake is just a regular little kitty. She was injured as a baby so her skull/jaw are a bit misshapen.",
        user_id=13,
        post_id=1,
        parent_id=7
    )
    comment_9 = Comment(
        content = "She reminded me of Lil Bub!",
        user_id=7,
        post_id=1,
        parent_id=8
    )
    comment_10 = Comment(
        content = "Is her tongue always out?",
        user_id=8,
        post_id=1,
    )
    comment_11 = Comment(
        content = "Look at that cute naughty face!",
        user_id=9,
        post_id=1
    )

    comment_12 = Comment(

    )
