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
        # COMMENT 32 - POST 5 COMMENT 3 || Votes: 6 (+7, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=27, comment_id=32, is_upvote=True),
        CommentVote(user_id=34, comment_id=32, is_upvote=True),
        CommentVote(user_id=35, comment_id=32, is_upvote=True),
        CommentVote(user_id=36, comment_id=32, is_upvote=True),
        CommentVote(user_id=37, comment_id=32, is_upvote=True),
        CommentVote(user_id=38, comment_id=32, is_upvote=True),
        CommentVote(user_id=39, comment_id=32, is_upvote=True),
        CommentVote(user_id=40, comment_id=32, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 33 - POST 5 COMMENT 4 || Votes: 4 (+4, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=29, comment_id=33, is_upvote=True),
        CommentVote(user_id=41, comment_id=33, is_upvote=True),
        CommentVote(user_id=42, comment_id=33, is_upvote=True),
        CommentVote(user_id=43, comment_id=33, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 34 - POST 5 COMMENT 5 || Votes: 2 (+3, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=30, comment_id=34, is_upvote=True),
        CommentVote(user_id=44, comment_id=34, is_upvote=True),
        CommentVote(user_id=45, comment_id=34, is_upvote=True),
        CommentVote(user_id=46, comment_id=34, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 35 - POST 5 COMMENT 6 || Votes: 10 (+15, -5)
        # -------------------------------------------------------------------------
        CommentVote(user_id=31, comment_id=35, is_upvote=True),
        CommentVote(user_id=47, comment_id=35, is_upvote=True),
        CommentVote(user_id=48, comment_id=35, is_upvote=True),
        CommentVote(user_id=49, comment_id=35, is_upvote=True),
        CommentVote(user_id=50, comment_id=35, is_upvote=True),
        CommentVote(user_id=1, comment_id=35, is_upvote=True),
        CommentVote(user_id=2, comment_id=35, is_upvote=True),
        CommentVote(user_id=3, comment_id=35, is_upvote=True),
        CommentVote(user_id=4, comment_id=35, is_upvote=True),
        CommentVote(user_id=5, comment_id=35, is_upvote=True),
        CommentVote(user_id=6, comment_id=35, is_upvote=True),
        CommentVote(user_id=7, comment_id=35, is_upvote=True),
        CommentVote(user_id=8, comment_id=35, is_upvote=True),
        CommentVote(user_id=9, comment_id=35, is_upvote=True),
        CommentVote(user_id=10, comment_id=35, is_upvote=True),
        CommentVote(user_id=11, comment_id=35, is_upvote=False),
        CommentVote(user_id=12, comment_id=35, is_upvote=False),
        CommentVote(user_id=13, comment_id=35, is_upvote=False),
        CommentVote(user_id=14, comment_id=35, is_upvote=False),
        CommentVote(user_id=15, comment_id=35, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 36 - POST 5 COMMENT 7 || Votes: 5 (+8, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=32, comment_id=36, is_upvote=True),
        CommentVote(user_id=16, comment_id=36, is_upvote=True),
        CommentVote(user_id=17, comment_id=36, is_upvote=True),
        CommentVote(user_id=18, comment_id=36, is_upvote=True),
        CommentVote(user_id=19, comment_id=36, is_upvote=True),
        CommentVote(user_id=20, comment_id=36, is_upvote=True),
        CommentVote(user_id=21, comment_id=36, is_upvote=True),
        CommentVote(user_id=22, comment_id=36, is_upvote=True),
        CommentVote(user_id=23, comment_id=36, is_upvote=False),
        CommentVote(user_id=24, comment_id=36, is_upvote=False),
        CommentVote(user_id=25, comment_id=36, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 37 - POST 5 COMMENT 8 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=33, comment_id=37, is_upvote=True),



        # -------------------------------------------------------------------------
        # POST 6
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 38 - POST 6 COMMENT 1 || Votes: 14 (+18, -4)
        # -------------------------------------------------------------------------
        CommentVote(user_id=34, comment_id=38, is_upvote=True),
        CommentVote(user_id=26, comment_id=38, is_upvote=True),
        CommentVote(user_id=27, comment_id=38, is_upvote=True),
        CommentVote(user_id=28, comment_id=38, is_upvote=True),
        CommentVote(user_id=29, comment_id=38, is_upvote=True),
        CommentVote(user_id=30, comment_id=38, is_upvote=True),
        CommentVote(user_id=31, comment_id=38, is_upvote=True),
        CommentVote(user_id=32, comment_id=38, is_upvote=True),
        CommentVote(user_id=33, comment_id=38, is_upvote=True),
        CommentVote(user_id=35, comment_id=38, is_upvote=True),
        CommentVote(user_id=36, comment_id=38, is_upvote=True),
        CommentVote(user_id=37, comment_id=38, is_upvote=True),
        CommentVote(user_id=38, comment_id=38, is_upvote=True),
        CommentVote(user_id=39, comment_id=38, is_upvote=True),
        CommentVote(user_id=40, comment_id=38, is_upvote=True),
        CommentVote(user_id=41, comment_id=38, is_upvote=True),
        CommentVote(user_id=42, comment_id=38, is_upvote=True),
        CommentVote(user_id=43, comment_id=38, is_upvote=True),
        CommentVote(user_id=44, comment_id=38, is_upvote=False),
        CommentVote(user_id=45, comment_id=38, is_upvote=False),
        CommentVote(user_id=46, comment_id=38, is_upvote=False),
        CommentVote(user_id=47, comment_id=38, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 39 - POST 6 COMMENT 2 || Votes: 9 (+12, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=35, comment_id=39, is_upvote=True),
        CommentVote(user_id=48, comment_id=39, is_upvote=True),
        CommentVote(user_id=49, comment_id=39, is_upvote=True),
        CommentVote(user_id=50, comment_id=39, is_upvote=True),
        CommentVote(user_id=1, comment_id=39, is_upvote=True),
        CommentVote(user_id=2, comment_id=39, is_upvote=True),
        CommentVote(user_id=3, comment_id=39, is_upvote=True),
        CommentVote(user_id=4, comment_id=39, is_upvote=True),
        CommentVote(user_id=5, comment_id=39, is_upvote=True),
        CommentVote(user_id=6, comment_id=39, is_upvote=True),
        CommentVote(user_id=7, comment_id=39, is_upvote=True),
        CommentVote(user_id=8, comment_id=39, is_upvote=True),
        CommentVote(user_id=9, comment_id=39, is_upvote=False),
        CommentVote(user_id=10, comment_id=39, is_upvote=False),
        CommentVote(user_id=11, comment_id=39, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 40 - POST 6 COMMENT 3 || Votes: 6 (+8, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=36, comment_id=40, is_upvote=True),
        CommentVote(user_id=12, comment_id=40, is_upvote=True),
        CommentVote(user_id=13, comment_id=40, is_upvote=True),
        CommentVote(user_id=14, comment_id=40, is_upvote=True),
        CommentVote(user_id=15, comment_id=40, is_upvote=True),
        CommentVote(user_id=16, comment_id=40, is_upvote=True),
        CommentVote(user_id=17, comment_id=40, is_upvote=True),
        CommentVote(user_id=18, comment_id=40, is_upvote=True),
        CommentVote(user_id=19, comment_id=40, is_upvote=False),
        CommentVote(user_id=20, comment_id=40, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 41 - POST 6 COMMENT 4 || Votes: 4 (+4, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=37, comment_id=41, is_upvote=True),
        CommentVote(user_id=21, comment_id=41, is_upvote=True),
        CommentVote(user_id=22, comment_id=41, is_upvote=True),
        CommentVote(user_id=23, comment_id=41, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 42 - POST 6 COMMENT 5 || Votes: 1 (+2, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=38, comment_id=42, is_upvote=True),
        CommentVote(user_id=24, comment_id=42, is_upvote=True),
        CommentVote(user_id=25, comment_id=42, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 43 - POST 6 COMMENT 6 || Votes: 8 (+14, -6)
        # -------------------------------------------------------------------------
        CommentVote(user_id=39, comment_id=43, is_upvote=True),
        CommentVote(user_id=26, comment_id=43, is_upvote=True),
        CommentVote(user_id=27, comment_id=43, is_upvote=True),
        CommentVote(user_id=28, comment_id=43, is_upvote=True),
        CommentVote(user_id=29, comment_id=43, is_upvote=True),
        CommentVote(user_id=30, comment_id=43, is_upvote=True),
        CommentVote(user_id=31, comment_id=43, is_upvote=True),
        CommentVote(user_id=32, comment_id=43, is_upvote=True),
        CommentVote(user_id=33, comment_id=43, is_upvote=True),
        CommentVote(user_id=34, comment_id=43, is_upvote=True),
        CommentVote(user_id=35, comment_id=43, is_upvote=True),
        CommentVote(user_id=36, comment_id=43, is_upvote=True),
        CommentVote(user_id=37, comment_id=43, is_upvote=True),
        CommentVote(user_id=38, comment_id=43, is_upvote=True),
        CommentVote(user_id=40, comment_id=43, is_upvote=False),
        CommentVote(user_id=41, comment_id=43, is_upvote=False),
        CommentVote(user_id=42, comment_id=43, is_upvote=False),
        CommentVote(user_id=43, comment_id=43, is_upvote=False),
        CommentVote(user_id=44, comment_id=43, is_upvote=False),
        CommentVote(user_id=45, comment_id=43, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 44 - POST 6 COMMENT 7 || Votes: -1 (1, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=40, comment_id=44, is_upvote=True),
        CommentVote(user_id=46, comment_id=44, is_upvote=False),
        CommentVote(user_id=47, comment_id=44, is_upvote=False),



        # -------------------------------------------------------------------------
        # POST 7
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 45 - POST 7 COMMENT 1 || Votes: 12 (+12, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=41, comment_id=45, is_upvote=True),
        CommentVote(user_id=48, comment_id=45, is_upvote=True),
        CommentVote(user_id=49, comment_id=45, is_upvote=True),
        CommentVote(user_id=50, comment_id=45, is_upvote=True),
        CommentVote(user_id=1, comment_id=45, is_upvote=True),
        CommentVote(user_id=2, comment_id=45, is_upvote=True),
        CommentVote(user_id=3, comment_id=45, is_upvote=True),
        CommentVote(user_id=4, comment_id=45, is_upvote=True),
        CommentVote(user_id=5, comment_id=45, is_upvote=True),
        CommentVote(user_id=6, comment_id=45, is_upvote=True),
        CommentVote(user_id=7, comment_id=45, is_upvote=True),
        CommentVote(user_id=8, comment_id=45, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 46 - POST 7 COMMENT 2 || Votes: 3 (+3, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=42, comment_id=46, is_upvote=True),
        CommentVote(user_id=9, comment_id=46, is_upvote=True),
        CommentVote(user_id=10, comment_id=46, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 47 - POST 7 COMMENT 3 || Votes: 4 (+6, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=43, comment_id=47, is_upvote=True),
        CommentVote(user_id=11, comment_id=47, is_upvote=True),
        CommentVote(user_id=12, comment_id=47, is_upvote=True),
        CommentVote(user_id=13, comment_id=47, is_upvote=True),
        CommentVote(user_id=14, comment_id=47, is_upvote=True),
        CommentVote(user_id=15, comment_id=47, is_upvote=True),
        CommentVote(user_id=16, comment_id=47, is_upvote=False),
        CommentVote(user_id=17, comment_id=47, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 48 - POST 7 COMMENT 4 || Votes: 4 (+4, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=44, comment_id=48, is_upvote=True),
        CommentVote(user_id=18, comment_id=48, is_upvote=True),
        CommentVote(user_id=19, comment_id=48, is_upvote=True),
        CommentVote(user_id=20, comment_id=48, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 49 - POST 7 COMMENT 5 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=45, comment_id=49, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 50 - POST 7 COMMENT 6 || Votes: 0 (+1, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=46, comment_id=50, is_upvote=True),
        CommentVote(user_id=45, comment_id=50, is_upvote=False),



        # -------------------------------------------------------------------------
        # POST 8
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 51 - POST 8 COMMENT 1 || Votes: 20 (+25, -5)
        # -------------------------------------------------------------------------
        CommentVote(user_id=47, comment_id=51, is_upvote=True),
        CommentVote(user_id=21, comment_id=51, is_upvote=True),
        CommentVote(user_id=22, comment_id=51, is_upvote=True),
        CommentVote(user_id=23, comment_id=51, is_upvote=True),
        CommentVote(user_id=24, comment_id=51, is_upvote=True),
        CommentVote(user_id=25, comment_id=51, is_upvote=True),
        CommentVote(user_id=26, comment_id=51, is_upvote=True),
        CommentVote(user_id=27, comment_id=51, is_upvote=True),
        CommentVote(user_id=28, comment_id=51, is_upvote=True),
        CommentVote(user_id=29, comment_id=51, is_upvote=True),
        CommentVote(user_id=30, comment_id=51, is_upvote=True),
        CommentVote(user_id=31, comment_id=51, is_upvote=True),
        CommentVote(user_id=32, comment_id=51, is_upvote=True),
        CommentVote(user_id=33, comment_id=51, is_upvote=True),
        CommentVote(user_id=34, comment_id=51, is_upvote=True),
        CommentVote(user_id=35, comment_id=51, is_upvote=True),
        CommentVote(user_id=36, comment_id=51, is_upvote=True),
        CommentVote(user_id=37, comment_id=51, is_upvote=True),
        CommentVote(user_id=38, comment_id=51, is_upvote=True),
        CommentVote(user_id=39, comment_id=51, is_upvote=True),
        CommentVote(user_id=40, comment_id=51, is_upvote=True),
        CommentVote(user_id=41, comment_id=51, is_upvote=True),
        CommentVote(user_id=42, comment_id=51, is_upvote=True),
        CommentVote(user_id=43, comment_id=51, is_upvote=True),
        CommentVote(user_id=44, comment_id=51, is_upvote=True),
        CommentVote(user_id=45, comment_id=51, is_upvote=False),
        CommentVote(user_id=46, comment_id=51, is_upvote=False),
        CommentVote(user_id=48, comment_id=51, is_upvote=False),
        CommentVote(user_id=49, comment_id=51, is_upvote=False),
        CommentVote(user_id=50, comment_id=51, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 52 - POST 8 COMMENT 2 || Votes: 16 (+19, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=48, comment_id=52, is_upvote=True),
        CommentVote(user_id=1, comment_id=52, is_upvote=True),
        CommentVote(user_id=2, comment_id=52, is_upvote=True),
        CommentVote(user_id=3, comment_id=52, is_upvote=True),
        CommentVote(user_id=4, comment_id=52, is_upvote=True),
        CommentVote(user_id=5, comment_id=52, is_upvote=True),
        CommentVote(user_id=6, comment_id=52, is_upvote=True),
        CommentVote(user_id=7, comment_id=52, is_upvote=True),
        CommentVote(user_id=8, comment_id=52, is_upvote=True),
        CommentVote(user_id=9, comment_id=52, is_upvote=True),
        CommentVote(user_id=10, comment_id=52, is_upvote=True),
        CommentVote(user_id=11, comment_id=52, is_upvote=True),
        CommentVote(user_id=12, comment_id=52, is_upvote=True),
        CommentVote(user_id=13, comment_id=52, is_upvote=True),
        CommentVote(user_id=14, comment_id=52, is_upvote=True),
        CommentVote(user_id=15, comment_id=52, is_upvote=True),
        CommentVote(user_id=16, comment_id=52, is_upvote=True),
        CommentVote(user_id=17, comment_id=52, is_upvote=True),
        CommentVote(user_id=18, comment_id=52, is_upvote=True),
        CommentVote(user_id=19, comment_id=52, is_upvote=False),
        CommentVote(user_id=20, comment_id=52, is_upvote=False),
        CommentVote(user_id=21, comment_id=52, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 53 - POST 8 COMMENT 3 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=9, comment_id=53, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 54 - POST 8 COMMENT 4 || Votes: 14 (+14, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=49, comment_id=54, is_upvote=True),
        CommentVote(user_id=22, comment_id=54, is_upvote=True),
        CommentVote(user_id=23, comment_id=54, is_upvote=True),
        CommentVote(user_id=24, comment_id=54, is_upvote=True),
        CommentVote(user_id=25, comment_id=54, is_upvote=True),
        CommentVote(user_id=26, comment_id=54, is_upvote=True),
        CommentVote(user_id=27, comment_id=54, is_upvote=True),
        CommentVote(user_id=28, comment_id=54, is_upvote=True),
        CommentVote(user_id=29, comment_id=54, is_upvote=True),
        CommentVote(user_id=30, comment_id=54, is_upvote=True),
        CommentVote(user_id=31, comment_id=54, is_upvote=True),
        CommentVote(user_id=32, comment_id=54, is_upvote=True),
        CommentVote(user_id=33, comment_id=54, is_upvote=True),
        CommentVote(user_id=34, comment_id=54, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 55 - POST 8 COMMENT 5 || Votes: 5 (+6, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=50, comment_id=55, is_upvote=True),
        CommentVote(user_id=35, comment_id=55, is_upvote=True),
        CommentVote(user_id=36, comment_id=55, is_upvote=True),
        CommentVote(user_id=37, comment_id=55, is_upvote=True),
        CommentVote(user_id=38, comment_id=55, is_upvote=True),
        CommentVote(user_id=39, comment_id=55, is_upvote=True),
        CommentVote(user_id=40, comment_id=55, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 56 - POST 8 COMMENT 6 || Votes: 2 (+2, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=1, comment_id=56, is_upvote=True),
        CommentVote(user_id=41, comment_id=56, is_upvote=True),



        # -------------------------------------------------------------------------
        # POST 9
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 57 - POST 9 COMMENT 1 || Votes: 11 (+14, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=1, comment_id=57, is_upvote=True),
        CommentVote(user_id=42, comment_id=57, is_upvote=True),
        CommentVote(user_id=43, comment_id=57, is_upvote=True),
        CommentVote(user_id=44, comment_id=57, is_upvote=True),
        CommentVote(user_id=45, comment_id=57, is_upvote=True),
        CommentVote(user_id=46, comment_id=57, is_upvote=True),
        CommentVote(user_id=47, comment_id=57, is_upvote=True),
        CommentVote(user_id=48, comment_id=57, is_upvote=True),
        CommentVote(user_id=49, comment_id=57, is_upvote=True),
        CommentVote(user_id=50, comment_id=57, is_upvote=True),
        CommentVote(user_id=2, comment_id=57, is_upvote=True),
        CommentVote(user_id=3, comment_id=57, is_upvote=True),
        CommentVote(user_id=4, comment_id=57, is_upvote=True),
        CommentVote(user_id=5, comment_id=57, is_upvote=True),
        CommentVote(user_id=6, comment_id=57, is_upvote=False),
        CommentVote(user_id=7, comment_id=57, is_upvote=False),
        CommentVote(user_id=8, comment_id=57, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 58 - POST 9 COMMENT 2 || Votes: 4 (+4, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=2, comment_id=58, is_upvote=True),
        CommentVote(user_id=9, comment_id=58, is_upvote=True),
        CommentVote(user_id=10, comment_id=58, is_upvote=True),
        CommentVote(user_id=11, comment_id=58, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 59 - POST 9 COMMENT 3 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=1, comment_id=59, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 60 - POST 9 COMMENT 4 || Votes: 1 (+1, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=3, comment_id=60, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 61 - POST 9 COMMENT 5 || Votes: 4 (+4, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=4, comment_id=61, is_upvote=True),
        CommentVote(user_id=12, comment_id=61, is_upvote=True),
        CommentVote(user_id=13, comment_id=61, is_upvote=True),
        CommentVote(user_id=14, comment_id=61, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 62 - POST 9 COMMENT 6 || Votes: -2 (+1, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=5, comment_id=62, is_upvote=True),
        CommentVote(user_id=15, comment_id=62, is_upvote=False),
        CommentVote(user_id=16, comment_id=62, is_upvote=False),


        # -------------------------------------------------------------------------
        # POST 10
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 63 - POST 10 COMMENT 1 || Votes: 15 (+20, -5)
        # -------------------------------------------------------------------------
        CommentVote(user_id=6, comment_id=63, is_upvote=True),
        CommentVote(user_id=17, comment_id=63, is_upvote=True),
        CommentVote(user_id=18, comment_id=63, is_upvote=True),
        CommentVote(user_id=19, comment_id=63, is_upvote=True),
        CommentVote(user_id=20, comment_id=63, is_upvote=True),
        CommentVote(user_id=21, comment_id=63, is_upvote=True),
        CommentVote(user_id=22, comment_id=63, is_upvote=True),
        CommentVote(user_id=23, comment_id=63, is_upvote=True),
        CommentVote(user_id=24, comment_id=63, is_upvote=True),
        CommentVote(user_id=25, comment_id=63, is_upvote=True),
        CommentVote(user_id=26, comment_id=63, is_upvote=True),
        CommentVote(user_id=27, comment_id=63, is_upvote=True),
        CommentVote(user_id=28, comment_id=63, is_upvote=True),
        CommentVote(user_id=29, comment_id=63, is_upvote=True),
        CommentVote(user_id=30, comment_id=63, is_upvote=True),
        CommentVote(user_id=31, comment_id=63, is_upvote=False),
        CommentVote(user_id=32, comment_id=63, is_upvote=False),
        CommentVote(user_id=33, comment_id=63, is_upvote=False),
        CommentVote(user_id=34, comment_id=63, is_upvote=False),
        CommentVote(user_id=35, comment_id=63, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 64 - POST 10 COMMENT 2 || Votes: 10 (+13, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=7, comment_id=64, is_upvote=True),
        CommentVote(user_id=36, comment_id=64, is_upvote=True),
        CommentVote(user_id=37, comment_id=64, is_upvote=True),
        CommentVote(user_id=38, comment_id=64, is_upvote=True),
        CommentVote(user_id=39, comment_id=64, is_upvote=True),
        CommentVote(user_id=40, comment_id=64, is_upvote=True),
        CommentVote(user_id=41, comment_id=64, is_upvote=True),
        CommentVote(user_id=42, comment_id=64, is_upvote=True),
        CommentVote(user_id=43, comment_id=64, is_upvote=True),
        CommentVote(user_id=44, comment_id=64, is_upvote=True),
        CommentVote(user_id=45, comment_id=64, is_upvote=True),
        CommentVote(user_id=46, comment_id=64, is_upvote=True),
        CommentVote(user_id=47, comment_id=64, is_upvote=True),
        CommentVote(user_id=48, comment_id=64, is_upvote=False),
        CommentVote(user_id=49, comment_id=64, is_upvote=False),
        CommentVote(user_id=50, comment_id=64, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 65 - POST 10 COMMENT 3 || Votes: 3 (+3, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=8, comment_id=65, is_upvote=True),
        CommentVote(user_id=1, comment_id=65, is_upvote=True),
        CommentVote(user_id=2, comment_id=65, is_upvote=True),
        # -------------------------------------------------------------------------
        # COMMENT 66 - POST 10 COMMENT 4 || Votes: 12 (+15, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=9, comment_id=66, is_upvote=True),
        CommentVote(user_id=3, comment_id=66, is_upvote=True),
        CommentVote(user_id=4, comment_id=66, is_upvote=True),
        CommentVote(user_id=5, comment_id=66, is_upvote=True),
        CommentVote(user_id=6, comment_id=66, is_upvote=True),
        CommentVote(user_id=7, comment_id=66, is_upvote=True),
        CommentVote(user_id=8, comment_id=66, is_upvote=True),
        CommentVote(user_id=20, comment_id=66, is_upvote=True),
        CommentVote(user_id=10, comment_id=66, is_upvote=True),
        CommentVote(user_id=11, comment_id=66, is_upvote=True),
        CommentVote(user_id=12, comment_id=66, is_upvote=True),
        CommentVote(user_id=13, comment_id=66, is_upvote=True),
        CommentVote(user_id=14, comment_id=66, is_upvote=True),
        CommentVote(user_id=15, comment_id=66, is_upvote=True),
        CommentVote(user_id=16, comment_id=66, is_upvote=True),
        CommentVote(user_id=17, comment_id=66, is_upvote=False),
        CommentVote(user_id=18, comment_id=66, is_upvote=False),
        CommentVote(user_id=19, comment_id=66, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 67 - POST 10 COMMENT 5 || Votes: 8 (+10, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=10, comment_id=67, is_upvote=True),
        CommentVote(user_id=20, comment_id=67, is_upvote=True),
        CommentVote(user_id=21, comment_id=67, is_upvote=True),
        CommentVote(user_id=22, comment_id=67, is_upvote=True),
        CommentVote(user_id=23, comment_id=67, is_upvote=True),
        CommentVote(user_id=24, comment_id=67, is_upvote=True),
        CommentVote(user_id=25, comment_id=67, is_upvote=True),
        CommentVote(user_id=26, comment_id=67, is_upvote=True),
        CommentVote(user_id=27, comment_id=67, is_upvote=True),
        CommentVote(user_id=28, comment_id=67, is_upvote=True),
        CommentVote(user_id=29, comment_id=67, is_upvote=False),
        CommentVote(user_id=30, comment_id=67, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 68 - POST 10 COMMENT 6 || Votes: 7 (+10, -3)
        # -------------------------------------------------------------------------
        CommentVote(user_id=12, comment_id=68, is_upvote=True),
        CommentVote(user_id=31, comment_id=68, is_upvote=True),
        CommentVote(user_id=32, comment_id=68, is_upvote=True),
        CommentVote(user_id=33, comment_id=68, is_upvote=True),
        CommentVote(user_id=34, comment_id=68, is_upvote=True),
        CommentVote(user_id=35, comment_id=68, is_upvote=True),
        CommentVote(user_id=36, comment_id=68, is_upvote=True),
        CommentVote(user_id=37, comment_id=68, is_upvote=True),
        CommentVote(user_id=38, comment_id=68, is_upvote=True),
        CommentVote(user_id=39, comment_id=68, is_upvote=True),
        CommentVote(user_id=40, comment_id=68, is_upvote=False),
        CommentVote(user_id=41, comment_id=68, is_upvote=False),
        CommentVote(user_id=42, comment_id=68, is_upvote=False),


        # -------------------------------------------------------------------------
        # POST 11
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 69 - POST 11 COMMENT 1 || Votes: 21 (+28, -7)
        # -------------------------------------------------------------------------
        CommentVote(user_id=13, comment_id=69, is_upvote=True),
        CommentVote(user_id=43, comment_id=69, is_upvote=True),
        CommentVote(user_id=44, comment_id=69, is_upvote=True),
        CommentVote(user_id=45, comment_id=69, is_upvote=True),
        CommentVote(user_id=46, comment_id=69, is_upvote=True),
        CommentVote(user_id=47, comment_id=69, is_upvote=True),
        CommentVote(user_id=48, comment_id=69, is_upvote=True),
        CommentVote(user_id=49, comment_id=69, is_upvote=True),
        CommentVote(user_id=50, comment_id=69, is_upvote=True),
        CommentVote(user_id=1, comment_id=69, is_upvote=True),
        CommentVote(user_id=2, comment_id=69, is_upvote=True),
        CommentVote(user_id=3, comment_id=69, is_upvote=True),
        CommentVote(user_id=4, comment_id=69, is_upvote=True),
        CommentVote(user_id=5, comment_id=69, is_upvote=True),
        CommentVote(user_id=6, comment_id=69, is_upvote=True),
        CommentVote(user_id=7, comment_id=69, is_upvote=True),
        CommentVote(user_id=8, comment_id=69, is_upvote=True),
        CommentVote(user_id=9, comment_id=69, is_upvote=True),
        CommentVote(user_id=10, comment_id=69, is_upvote=True),
        CommentVote(user_id=11, comment_id=69, is_upvote=True),
        CommentVote(user_id=12, comment_id=69, is_upvote=True),
        CommentVote(user_id=14, comment_id=69, is_upvote=True),
        CommentVote(user_id=15, comment_id=69, is_upvote=True),
        CommentVote(user_id=16, comment_id=69, is_upvote=True),
        CommentVote(user_id=17, comment_id=69, is_upvote=True),
        CommentVote(user_id=18, comment_id=69, is_upvote=True),
        CommentVote(user_id=19, comment_id=69, is_upvote=True),
        CommentVote(user_id=20, comment_id=69, is_upvote=True),
        CommentVote(user_id=21, comment_id=69, is_upvote=False),
        CommentVote(user_id=22, comment_id=69, is_upvote=False),
        CommentVote(user_id=23, comment_id=69, is_upvote=False),
        CommentVote(user_id=24, comment_id=69, is_upvote=False),
        CommentVote(user_id=25, comment_id=69, is_upvote=False),
        CommentVote(user_id=26, comment_id=69, is_upvote=False),
        CommentVote(user_id=27, comment_id=69, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 70 - POST 11 COMMENT 2 || Votes: 4 (+6, -2)
        # -------------------------------------------------------------------------
        CommentVote(user_id=14, comment_id=70, is_upvote=True),
        CommentVote(user_id=28, comment_id=70, is_upvote=True),
        CommentVote(user_id=29, comment_id=70, is_upvote=True),
        CommentVote(user_id=30, comment_id=70, is_upvote=True),
        CommentVote(user_id=31, comment_id=70, is_upvote=True),
        CommentVote(user_id=32, comment_id=70, is_upvote=True),
        CommentVote(user_id=33, comment_id=70, is_upvote=False),
        CommentVote(user_id=34, comment_id=70, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 71 - POST 11 COMMENT 3 || Votes: 12 (+16, -4)
        # -------------------------------------------------------------------------
        CommentVote(user_id=15, comment_id=71, is_upvote=True),
        CommentVote(user_id=35, comment_id=71, is_upvote=True),
        CommentVote(user_id=36, comment_id=71, is_upvote=True),
        CommentVote(user_id=37, comment_id=71, is_upvote=True),
        CommentVote(user_id=38, comment_id=71, is_upvote=True),
        CommentVote(user_id=39, comment_id=71, is_upvote=True),
        CommentVote(user_id=40, comment_id=71, is_upvote=True),
        CommentVote(user_id=41, comment_id=71, is_upvote=True),
        CommentVote(user_id=42, comment_id=71, is_upvote=True),
        CommentVote(user_id=43, comment_id=71, is_upvote=True),
        CommentVote(user_id=44, comment_id=71, is_upvote=True),
        CommentVote(user_id=45, comment_id=71, is_upvote=True),
        CommentVote(user_id=46, comment_id=71, is_upvote=True),
        CommentVote(user_id=47, comment_id=71, is_upvote=True),
        CommentVote(user_id=48, comment_id=71, is_upvote=True),
        CommentVote(user_id=49, comment_id=71, is_upvote=True),
        CommentVote(user_id=50, comment_id=71, is_upvote=False),
        CommentVote(user_id=1, comment_id=71, is_upvote=False),
        CommentVote(user_id=2, comment_id=71, is_upvote=False),
        CommentVote(user_id=3, comment_id=71, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 72 - POST 11 COMMENT 4 || Votes: 6 (+7, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=16, comment_id=72, is_upvote=True),
        CommentVote(user_id=4, comment_id=72, is_upvote=True),
        CommentVote(user_id=5, comment_id=72, is_upvote=True),
        CommentVote(user_id=6, comment_id=72, is_upvote=True),
        CommentVote(user_id=7, comment_id=72, is_upvote=True),
        CommentVote(user_id=8, comment_id=72, is_upvote=True),
        CommentVote(user_id=9, comment_id=72, is_upvote=True),
        CommentVote(user_id=10, comment_id=72, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 73 - POST 11 COMMENT 5 || Votes: 5 (+6, -1)
        # -------------------------------------------------------------------------
        CommentVote(user_id=17, comment_id=73, is_upvote=True),
        CommentVote(user_id=11, comment_id=73, is_upvote=True),
        CommentVote(user_id=12, comment_id=73, is_upvote=True),
        CommentVote(user_id=13, comment_id=73, is_upvote=True),
        CommentVote(user_id=14, comment_id=73, is_upvote=True),
        CommentVote(user_id=15, comment_id=73, is_upvote=True),
        CommentVote(user_id=16, comment_id=73, is_upvote=False),
        # -------------------------------------------------------------------------
        # COMMENT 74 - POST 11 COMMENT 6 || Votes: 3 (+3, 0)
        # -------------------------------------------------------------------------
        CommentVote(user_id=18, comment_id=74, is_upvote=True),
        CommentVote(user_id=17, comment_id=74, is_upvote=True),
        CommentVote(user_id=19, comment_id=74, is_upvote=True),


        # -------------------------------------------------------------------------
        # POST 12
        # -------------------------------------------------------------------------

        # -------------------------------------------------------------------------
        # COMMENT 75 - POST 12 COMMENT 1 || Votes: 10 (+13, -3)
        # -------------------------------------------------------------------------
    ])
    db.session.commit()

def undo_commentvotes():
    db.session.execute("DELETE FROM comment_votes")
    db.session.commit()
