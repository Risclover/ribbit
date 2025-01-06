from app.models import db, CommentVote

def seed_commentvotes():
    db.session.add_all([
        #----------------------- POST 1 COMMENT 1 || Votes: 2 (4, -2) -----------------------#
        CommentVote(user_id=3, comment_id=1, is_upvote=True),
        CommentVote(user_id=1, comment_id=1, is_upvote=True),
        CommentVote(user_id=2, comment_id=1, is_upvote=True),
        CommentVote(user_id=4, comment_id=1, is_upvote=True),
        CommentVote(user_id=5, comment_id=1, is_upvote=False),
        CommentVote(user_id=6, comment_id=1, is_upvote=False),
        #----------------------- POST 1 COMMENT 2 || Votes: 5 (5, 0) -----------------------#
        CommentVote(user_id=4, comment_id=2, is_upvote=True),
        CommentVote(user_id=1, comment_id=2, is_upvote=True),
        CommentVote(user_id=2, comment_id=2, is_upvote=True),
        CommentVote(user_id=5, comment_id=2, is_upvote=True),
        CommentVote(user_id=6, comment_id=2, is_upvote=True),
        #----------------------- POST 1 COMMENT 3 || Votes: -3 (1, 4) -----------------------#
        CommentVote(user_id=5, comment_id=3, is_upvote=True),
        CommentVote(user_id=1, comment_id=3, is_upvote=False),
        CommentVote(user_id=2, comment_id=3, is_upvote=False),
        CommentVote(user_id=3, comment_id=3, is_upvote=False),
        CommentVote(user_id=6, comment_id=3, is_upvote=False),
        #----------------------- POST 1 COMMENT 4 || Votes: 3 (4, 1) -----------------------#
        CommentVote(user_id=7, comment_id=4, is_upvote=True),
        CommentVote(user_id=8, comment_id=4, is_upvote=True),
        CommentVote(user_id=9, comment_id=4, is_upvote=True),
        CommentVote(user_id=10, comment_id=4, is_upvote=True),
        CommentVote(user_id=11, comment_id=4, is_upvote=False),
        #----------------------- POST 1 COMMENT 5 || Votes: 5 (5, 0) -----------------------#
        CommentVote(user_id=4, comment_id=5, is_upvote=True),
        CommentVote(user_id=12, comment_id=5, is_upvote=True),
        CommentVote(user_id=13, comment_id=5, is_upvote=True),
        CommentVote(user_id=14, comment_id=5, is_upvote=True),
        CommentVote(user_id=15, comment_id=5, is_upvote=True),
        CommentVote(user_id=16, comment_id=5, is_upvote=True),
        #----------------------- POST 1 COMMENT 6 || Votes: 4 (4, 0) -----------------------#
        CommentVote(user_id=5, comment_id=6, is_upvote=True),
        CommentVote(user_id=17, comment_id=6, is_upvote=True),
        CommentVote(user_id=18, comment_id=6, is_upvote=True),
        CommentVote(user_id=19, comment_id=6, is_upvote=True),
        CommentVote(user_id=20, comment_id=6, is_upvote=True),
        #----------------------- POST 1 COMMENT 7 || Votes: 0 (1, 1) -----------------------#
        CommentVote(user_id=2, comment_id=7, is_upvote=True),
        CommentVote(user_id=21, comment_id=7, is_upvote=False),



        #----------------------- POST 2 COMMENT 1 || Votes: 8 (8, 0) -----------------------#
        CommentVote(user_id=8, comment_id=8, is_upvote=True),
        CommentVote(user_id=22, comment_id=8, is_upvote=True),
        CommentVote(user_id=23, comment_id=8, is_upvote=True),
        CommentVote(user_id=24, comment_id=8, is_upvote=True),
        CommentVote(user_id=25, comment_id=8, is_upvote=True),
        CommentVote(user_id=26, comment_id=8, is_upvote=True),
        CommentVote(user_id=27, comment_id=8, is_upvote=True),
        CommentVote(user_id=28, comment_id=8, is_upvote=True),
        #----------------------- POST 2 COMMENT 2 || Votes: 8 (8, 0) -----------------------#
        CommentVote(user_id=9, comment_id=9, is_upvote=True),
        CommentVote(user_id=29, comment_id=9, is_upvote=True),
        CommentVote(user_id=30, comment_id=9, is_upvote=True),
        CommentVote(user_id=31, comment_id=9, is_upvote=True),
        CommentVote(user_id=32, comment_id=9, is_upvote=True),
        CommentVote(user_id=33, comment_id=9, is_upvote=True),
        CommentVote(user_id=34, comment_id=9, is_upvote=True),
        CommentVote(user_id=35, comment_id=9, is_upvote=True),
        CommentVote(user_id=36, comment_id=9, is_upvote=True),
    ])
    db.session.commit()

def undo_commentvotes():
    db.session.execute("DELETE FROM comment_votes")
    db.session.commit()
