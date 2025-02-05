from app.models import db, CommentVote

def seed_commentvotes():
    db.session.add_all([

        # -------------------------------------------------------------------------
        # POST 1
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 1 - POST 1 COMMENT 1 || Votes: 8 (+10, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=3, comment_id=1, is_upvote=True),
        CommentVote(user_id=1, comment_id=1, is_upvote=True),
        CommentVote(user_id=2, comment_id=1, is_upvote=True),
        CommentVote(user_id=4, comment_id=1, is_upvote=True),
        CommentVote(user_id=7, comment_id=1, is_upvote=True),
        CommentVote(user_id=8, comment_id=1, is_upvote=True),
        CommentVote(user_id=9, comment_id=1, is_upvote=True),
        CommentVote(user_id=10, comment_id=1, is_upvote=True),
        CommentVote(user_id=11, comment_id=1, is_upvote=True),
        CommentVote(user_id=12, comment_id=1, is_upvote=True),
        CommentVote(user_id=5, comment_id=1, is_upvote=False),
        CommentVote(user_id=6, comment_id=1, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 2 - POST 1 COMMENT 2 || Votes: 5 (+5, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=4, comment_id=2, is_upvote=True),
        CommentVote(user_id=1, comment_id=2, is_upvote=True),
        CommentVote(user_id=2, comment_id=2, is_upvote=True),
        CommentVote(user_id=5, comment_id=2, is_upvote=True),
        CommentVote(user_id=6, comment_id=2, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 3 - POST 1 COMMENT 3 || Votes: -3 (+1, -4)
        # -------------------------------------------------------------------------
        CommentVote(user_id=5, comment_id=3, is_upvote=True),
        CommentVote(user_id=1, comment_id=3, is_upvote=False),
        CommentVote(user_id=2, comment_id=3, is_upvote=False),
        CommentVote(user_id=3, comment_id=3, is_upvote=False),
        CommentVote(user_id=6, comment_id=3, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 4 - POST 1 COMMENT 4 || Votes: 3 (+4, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=6, comment_id=4, is_upvote=True),
        CommentVote(user_id=8, comment_id=4, is_upvote=True),
        CommentVote(user_id=9, comment_id=4, is_upvote=True),
        CommentVote(user_id=10, comment_id=4, is_upvote=True),
        CommentVote(user_id=11, comment_id=4, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 5 - POST 1 COMMENT 5 || Votes: 5 (+5, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=4, comment_id=5, is_upvote=True),
        CommentVote(user_id=12, comment_id=5, is_upvote=True),
        CommentVote(user_id=13, comment_id=5, is_upvote=True),
        CommentVote(user_id=14, comment_id=5, is_upvote=True),
        CommentVote(user_id=15, comment_id=5, is_upvote=True),
        CommentVote(user_id=16, comment_id=5, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 6 - POST 1 COMMENT 6 || Votes: 4 (+4, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=7, comment_id=6, is_upvote=True),
        CommentVote(user_id=17, comment_id=6, is_upvote=True),
        CommentVote(user_id=18, comment_id=6, is_upvote=True),
        CommentVote(user_id=19, comment_id=6, is_upvote=True),
        CommentVote(user_id=20, comment_id=6, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 7 - POST 1 COMMENT 7 || Votes: 0 (+1, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=2, comment_id=7, is_upvote=True),
        CommentVote(user_id=21, comment_id=7, is_upvote=False),



        # -------------------------------------------------------------------------
        # POST 2
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 8 - POST 2 COMMENT 1 || Votes: 8 (+8, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=8, comment_id=8, is_upvote=True),
        CommentVote(user_id=22, comment_id=8, is_upvote=True),
        CommentVote(user_id=23, comment_id=8, is_upvote=True),
        CommentVote(user_id=24, comment_id=8, is_upvote=True),
        CommentVote(user_id=25, comment_id=8, is_upvote=True),
        CommentVote(user_id=26, comment_id=8, is_upvote=True),
        CommentVote(user_id=27, comment_id=8, is_upvote=True),
        CommentVote(user_id=28, comment_id=8, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 9 - POST 2 COMMENT 2 || Votes: 8 (+8, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=9, comment_id=9, is_upvote=True),
        CommentVote(user_id=29, comment_id=9, is_upvote=True),
        CommentVote(user_id=30, comment_id=9, is_upvote=True),
        CommentVote(user_id=31, comment_id=9, is_upvote=True),
        CommentVote(user_id=32, comment_id=9, is_upvote=True),
        CommentVote(user_id=33, comment_id=9, is_upvote=True),
        CommentVote(user_id=34, comment_id=9, is_upvote=True),
        CommentVote(user_id=35, comment_id=9, is_upvote=True),
        CommentVote(user_id=36, comment_id=9, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 10 - POST 2 COMMENT 3 || Votes: 5 (+7, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=10, comment_id=10, is_upvote=True),
        CommentVote(user_id=37, comment_id=10, is_upvote=True),
        CommentVote(user_id=38, comment_id=10, is_upvote=True),
        CommentVote(user_id=39, comment_id=10, is_upvote=True),
        CommentVote(user_id=11, comment_id=10, is_upvote=True),
        CommentVote(user_id=12, comment_id=10, is_upvote=True),
        CommentVote(user_id=13, comment_id=10, is_upvote=True),
        CommentVote(user_id=40, comment_id=10, is_upvote=False),
        CommentVote(user_id=41, comment_id=10, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 11 - POST 2 COMMENT 4 || Votes: 4 (+5, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=11, comment_id=11, is_upvote=True),
        CommentVote(user_id=42, comment_id=11, is_upvote=True),
        CommentVote(user_id=43, comment_id=11, is_upvote=True),
        CommentVote(user_id=44, comment_id=11, is_upvote=True),
        CommentVote(user_id=45, comment_id=11, is_upvote=True),
        CommentVote(user_id=46, comment_id=11, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 12 - POST 2 COMMENT 5 || Votes: 3 (+5, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=12, comment_id=12, is_upvote=True),
        CommentVote(user_id=47, comment_id=12, is_upvote=True),
        CommentVote(user_id=48, comment_id=12, is_upvote=True),
        CommentVote(user_id=49, comment_id=12, is_upvote=True),
        CommentVote(user_id=50, comment_id=12, is_upvote=True),
        CommentVote(user_id=1, comment_id=12, is_upvote=False),
        CommentVote(user_id=2, comment_id=12, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 13 - POST 2 COMMENT 6 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=13, comment_id=13, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 14 - POST 2 COMMENT 7 || Votes: 6 (+8, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=14, comment_id=14, is_upvote=True),
        CommentVote(user_id=3, comment_id=14, is_upvote=True),
        CommentVote(user_id=4, comment_id=14, is_upvote=True),
        CommentVote(user_id=5, comment_id=14, is_upvote=True),
        CommentVote(user_id=6, comment_id=14, is_upvote=True),
        CommentVote(user_id=7, comment_id=14, is_upvote=True),
        CommentVote(user_id=8, comment_id=14, is_upvote=True),
        CommentVote(user_id=9, comment_id=14, is_upvote=True),
        CommentVote(user_id=10, comment_id=14, is_upvote=False),
        CommentVote(user_id=11, comment_id=14, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 15 - POST 2 COMMENT 8 || Votes: 5 (+6, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=15, comment_id=15, is_upvote=True),
        CommentVote(user_id=12, comment_id=15, is_upvote=True),
        CommentVote(user_id=13, comment_id=15, is_upvote=True),
        CommentVote(user_id=14, comment_id=15, is_upvote=True),
        CommentVote(user_id=16, comment_id=15, is_upvote=True),
        CommentVote(user_id=17, comment_id=15, is_upvote=True),
        CommentVote(user_id=18, comment_id=15, is_upvote=False),



        # -------------------------------------------------------------------------
        # POST 3
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 16 - POST 3 COMMENT 1 || Votes: 9 (+9, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=16, comment_id=16, is_upvote=True),
        CommentVote(user_id=19, comment_id=16, is_upvote=True),
        CommentVote(user_id=20, comment_id=16, is_upvote=True),
        CommentVote(user_id=21, comment_id=16, is_upvote=True),
        CommentVote(user_id=22, comment_id=16, is_upvote=True),
        CommentVote(user_id=23, comment_id=16, is_upvote=True),
        CommentVote(user_id=24, comment_id=16, is_upvote=True),
        CommentVote(user_id=25, comment_id=16, is_upvote=True),
        CommentVote(user_id=26, comment_id=16, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 17 - POST 3 COMMENT 2 || Votes: 4 (+5, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=16, comment_id=17, is_upvote=True),
        CommentVote(user_id=17, comment_id=17, is_upvote=True),
        CommentVote(user_id=18, comment_id=17, is_upvote=True),
        CommentVote(user_id=19, comment_id=17, is_upvote=True),
        CommentVote(user_id=20, comment_id=17, is_upvote=True),
        CommentVote(user_id=21, comment_id=17, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 18 - POST 3 COMMENT 3 || Votes: 3 (+3, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=16, comment_id=18, is_upvote=True),
        CommentVote(user_id=22, comment_id=18, is_upvote=True),
        CommentVote(user_id=23, comment_id=18, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 19 - POST 3 COMMENT 4 || Votes: 8 (+11, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=18, comment_id=19, is_upvote=True),
        CommentVote(user_id=24, comment_id=19, is_upvote=True),
        CommentVote(user_id=25, comment_id=19, is_upvote=True),
        CommentVote(user_id=26, comment_id=19, is_upvote=True),
        CommentVote(user_id=27, comment_id=19, is_upvote=True),
        CommentVote(user_id=28, comment_id=19, is_upvote=True),
        CommentVote(user_id=29, comment_id=19, is_upvote=True),
        CommentVote(user_id=30, comment_id=19, is_upvote=True),
        CommentVote(user_id=31, comment_id=19, is_upvote=True),
        CommentVote(user_id=32, comment_id=19, is_upvote=True),
        CommentVote(user_id=33, comment_id=19, is_upvote=True),
        CommentVote(user_id=34, comment_id=19, is_upvote=False),
        CommentVote(user_id=35, comment_id=19, is_upvote=False),
        CommentVote(user_id=36, comment_id=19, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 20 - POST 3 COMMENT 5 || Votes: 2 (+2, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=4, comment_id=20, is_upvote=True),
        CommentVote(user_id=37, comment_id=20, is_upvote=True),



        # -------------------------------------------------------------------------
        # POST 4
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 21 - POST 4 COMMENT 1 || Votes: 11 (+15, -4)
        # -------------------------------------------------------------------------
        CommentVote(user_id=19, comment_id=21, is_upvote=True),
        CommentVote(user_id=38, comment_id=21, is_upvote=True),
        CommentVote(user_id=39, comment_id=21, is_upvote=True),
        CommentVote(user_id=40, comment_id=21, is_upvote=True),
        CommentVote(user_id=41, comment_id=21, is_upvote=True),
        CommentVote(user_id=42, comment_id=21, is_upvote=True),
        CommentVote(user_id=43, comment_id=21, is_upvote=True),
        CommentVote(user_id=44, comment_id=21, is_upvote=True),
        CommentVote(user_id=45, comment_id=21, is_upvote=True),
        CommentVote(user_id=46, comment_id=21, is_upvote=True),
        CommentVote(user_id=47, comment_id=21, is_upvote=True),
        CommentVote(user_id=48, comment_id=21, is_upvote=True),
        CommentVote(user_id=49, comment_id=21, is_upvote=True),
        CommentVote(user_id=50, comment_id=21, is_upvote=True),
        CommentVote(user_id=1, comment_id=21, is_upvote=True),
        CommentVote(user_id=2, comment_id=21, is_upvote=False),
        CommentVote(user_id=3, comment_id=21, is_upvote=False),
        CommentVote(user_id=4, comment_id=21, is_upvote=False),
        CommentVote(user_id=5, comment_id=21, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 22 - POST 4 COMMENT 2 || Votes: 8 (+10, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=20, comment_id=22, is_upvote=True),
        CommentVote(user_id=6, comment_id=22, is_upvote=True),
        CommentVote(user_id=7, comment_id=22, is_upvote=True),
        CommentVote(user_id=8, comment_id=22, is_upvote=True),
        CommentVote(user_id=9, comment_id=22, is_upvote=True),
        CommentVote(user_id=10, comment_id=22, is_upvote=True),
        CommentVote(user_id=11, comment_id=22, is_upvote=True),
        CommentVote(user_id=12, comment_id=22, is_upvote=True),
        CommentVote(user_id=13, comment_id=22, is_upvote=True),
        CommentVote(user_id=14, comment_id=22, is_upvote=True),
        CommentVote(user_id=15, comment_id=22, is_upvote=False),
        CommentVote(user_id=16, comment_id=22, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 23 - POST 4 COMMENT 3 || Votes: 5 (+8, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=19, comment_id=23, is_upvote=True),
        CommentVote(user_id=17, comment_id=23, is_upvote=True),
        CommentVote(user_id=18, comment_id=23, is_upvote=True),
        CommentVote(user_id=20, comment_id=23, is_upvote=True),
        CommentVote(user_id=21, comment_id=23, is_upvote=True),
        CommentVote(user_id=22, comment_id=23, is_upvote=True),
        CommentVote(user_id=23, comment_id=23, is_upvote=True),
        CommentVote(user_id=24, comment_id=23, is_upvote=True),
        CommentVote(user_id=25, comment_id=23, is_upvote=False),
        CommentVote(user_id=26, comment_id=23, is_upvote=False),
        CommentVote(user_id=27, comment_id=23, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 24 - POST 4 COMMENT 4 || Votes: 2 (+2, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=21, comment_id=24, is_upvote=True),
        CommentVote(user_id=28, comment_id=24, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 25 - POST 4 COMMENT 5 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=22, comment_id=25, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 26 - POST 4 COMMENT 6 || Votes: 3 (+4, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=23, comment_id=26, is_upvote=True),
        CommentVote(user_id=29, comment_id=26, is_upvote=True),
        CommentVote(user_id=30, comment_id=26, is_upvote=True),
        CommentVote(user_id=31, comment_id=26, is_upvote=True),
        CommentVote(user_id=32, comment_id=26, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 27 - POST 4 COMMENT 7 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=24, comment_id=27, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 28 - POST 4 COMMENT 8 || Votes: 1 (+2, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=25, comment_id=28, is_upvote=True),
        CommentVote(user_id=33, comment_id=28, is_upvote=True),
        CommentVote(user_id=34, comment_id=28, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 29 - POST 4 COMMENT 9 || Votes: -3 (2, -5)
        # -------------------------------------------------------------------------
        CommentVote(user_id=26, comment_id=29, is_upvote=True),
        CommentVote(user_id=35, comment_id=29, is_upvote=True),
        CommentVote(user_id=36, comment_id=29, is_upvote=False),
        CommentVote(user_id=37, comment_id=29, is_upvote=False),
        CommentVote(user_id=38, comment_id=29, is_upvote=False),
        CommentVote(user_id=39, comment_id=29, is_upvote=False),
        CommentVote(user_id=40, comment_id=29, is_upvote=False),



        # -------------------------------------------------------------------------
        # POST 5
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 30 - POST 5 COMMENT 1 || Votes: 14 (+20, -6)
        # -------------------------------------------------------------------------
        CommentVote(user_id=27, comment_id=30, is_upvote=True),
        CommentVote(user_id=41, comment_id=30, is_upvote=True),
        CommentVote(user_id=42, comment_id=30, is_upvote=True),
        CommentVote(user_id=43, comment_id=30, is_upvote=True),
        CommentVote(user_id=44, comment_id=30, is_upvote=True),
        CommentVote(user_id=45, comment_id=30, is_upvote=True),
        CommentVote(user_id=46, comment_id=30, is_upvote=True),
        CommentVote(user_id=47, comment_id=30, is_upvote=True),
        CommentVote(user_id=48, comment_id=30, is_upvote=True),
        CommentVote(user_id=49, comment_id=30, is_upvote=True),
        CommentVote(user_id=50, comment_id=30, is_upvote=True),
        CommentVote(user_id=1, comment_id=30, is_upvote=True),
        CommentVote(user_id=2, comment_id=30, is_upvote=True),
        CommentVote(user_id=3, comment_id=30, is_upvote=True),
        CommentVote(user_id=4, comment_id=30, is_upvote=True),
        CommentVote(user_id=5, comment_id=30, is_upvote=True),
        CommentVote(user_id=6, comment_id=30, is_upvote=True),
        CommentVote(user_id=7, comment_id=30, is_upvote=True),
        CommentVote(user_id=8, comment_id=30, is_upvote=True),
        CommentVote(user_id=9, comment_id=30, is_upvote=True),
        CommentVote(user_id=10, comment_id=30, is_upvote=False),
        CommentVote(user_id=11, comment_id=30, is_upvote=False),
        CommentVote(user_id=12, comment_id=30, is_upvote=False),
        CommentVote(user_id=13, comment_id=30, is_upvote=False),
        CommentVote(user_id=14, comment_id=30, is_upvote=False),
        CommentVote(user_id=15, comment_id=30, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 31 - POST 5 COMMENT 2 || Votes: 10 (+14, -4)
        # -------------------------------------------------------------------------
        CommentVote(user_id=28, comment_id=31, is_upvote=True),
        CommentVote(user_id=16, comment_id=31, is_upvote=True),
        CommentVote(user_id=17, comment_id=31, is_upvote=True),
        CommentVote(user_id=18, comment_id=31, is_upvote=True),
        CommentVote(user_id=19, comment_id=31, is_upvote=True),
        CommentVote(user_id=20, comment_id=31, is_upvote=True),
        CommentVote(user_id=21, comment_id=31, is_upvote=True),
        CommentVote(user_id=22, comment_id=31, is_upvote=True),
        CommentVote(user_id=23, comment_id=31, is_upvote=True),
        CommentVote(user_id=24, comment_id=31, is_upvote=True),
        CommentVote(user_id=25, comment_id=31, is_upvote=True),
        CommentVote(user_id=26, comment_id=31, is_upvote=True),
        CommentVote(user_id=27, comment_id=31, is_upvote=True),
        CommentVote(user_id=29, comment_id=31, is_upvote=True),
        CommentVote(user_id=30, comment_id=31, is_upvote=False),
        CommentVote(user_id=31, comment_id=31, is_upvote=False),
        CommentVote(user_id=32, comment_id=31, is_upvote=False),
        CommentVote(user_id=33, comment_id=31, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 32 - POST 5 COMMENT 2 || Votes: 10 (+14, -4)
        # -------------------------------------------------------------------------
    ])
    db.session.commit()

def undo_commentvotes():
    db.session.execute("DELETE FROM comment_votes")
    db.session.commit()
