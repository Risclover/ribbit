from app.models import db, PostVote

def seed_postvotes():
    db.session.add_all([
    # -------------------------------------------------------------------------
    # POST 1 || VOTES: 22 (+29, -7)
    # -------------------------------------------------------------------------
    PostVote(user_id=1, post_id=1, is_upvote=True),
    PostVote(user_id=2, post_id=1, is_upvote=True),
    PostVote(user_id=3, post_id=1, is_upvote=True),
    PostVote(user_id=4, post_id=1, is_upvote=True),
    PostVote(user_id=5, post_id=1, is_upvote=True),
    PostVote(user_id=6, post_id=1, is_upvote=True),
    PostVote(user_id=7, post_id=1, is_upvote=True),
    PostVote(user_id=8, post_id=1, is_upvote=True),
    PostVote(user_id=9, post_id=1, is_upvote=True),
    PostVote(user_id=10, post_id=1, is_upvote=True),
    PostVote(user_id=11, post_id=1, is_upvote=True),
    PostVote(user_id=12, post_id=1, is_upvote=True),
    PostVote(user_id=13, post_id=1, is_upvote=True),
    PostVote(user_id=14, post_id=1, is_upvote=True),
    PostVote(user_id=15, post_id=1, is_upvote=True),
    PostVote(user_id=16, post_id=1, is_upvote=True),
    PostVote(user_id=17, post_id=1, is_upvote=True),
    PostVote(user_id=18, post_id=1, is_upvote=True),
    PostVote(user_id=19, post_id=1, is_upvote=True),
    PostVote(user_id=20, post_id=1, is_upvote=True),
    PostVote(user_id=21, post_id=1, is_upvote=True),
    PostVote(user_id=22, post_id=1, is_upvote=True),
    PostVote(user_id=23, post_id=1, is_upvote=True),
    PostVote(user_id=24, post_id=1, is_upvote=True),
    PostVote(user_id=25, post_id=1, is_upvote=True),
    PostVote(user_id=26, post_id=1, is_upvote=True),
    PostVote(user_id=27, post_id=1, is_upvote=True),
    PostVote(user_id=28, post_id=1, is_upvote=True),
    PostVote(user_id=29, post_id=1, is_upvote=True),
    PostVote(user_id=30, post_id=1, is_upvote=False),
    PostVote(user_id=31, post_id=1, is_upvote=False),
    PostVote(user_id=32, post_id=1, is_upvote=False),
    PostVote(user_id=33, post_id=1, is_upvote=False),
    PostVote(user_id=34, post_id=1, is_upvote=False),
    PostVote(user_id=35, post_id=1, is_upvote=False),
    PostVote(user_id=36, post_id=1, is_upvote=False),
    # -------------------------------------------------------------------------
    # POST 2 || VOTES: 14 (+21, -7)
    # -------------------------------------------------------------------------
    PostVote(user_id=37, post_id=2, is_upvote=True),
    PostVote(user_id=38, post_id=2, is_upvote=True),
    PostVote(user_id=39, post_id=2, is_upvote=True),
    PostVote(user_id=40, post_id=2, is_upvote=True),
    PostVote(user_id=41, post_id=2, is_upvote=True),
    PostVote(user_id=42, post_id=2, is_upvote=True),
    PostVote(user_id=43, post_id=2, is_upvote=True),
    PostVote(user_id=44, post_id=2, is_upvote=True),
    PostVote(user_id=45, post_id=2, is_upvote=True),
    PostVote(user_id=46, post_id=2, is_upvote=True),
    PostVote(user_id=47, post_id=2, is_upvote=True),
    PostVote(user_id=48, post_id=2, is_upvote=True),
    PostVote(user_id=49, post_id=2, is_upvote=True),
    PostVote(user_id=50, post_id=2, is_upvote=True),
    PostVote(user_id=1, post_id=2, is_upvote=True),
    PostVote(user_id=2, post_id=2, is_upvote=True),
    PostVote(user_id=3, post_id=2, is_upvote=True),
    PostVote(user_id=4, post_id=2, is_upvote=True),
    PostVote(user_id=5, post_id=2, is_upvote=True),
    PostVote(user_id=6, post_id=2, is_upvote=True),
    PostVote(user_id=7, post_id=2, is_upvote=True),
    PostVote(user_id=8, post_id=2, is_upvote=False),
    PostVote(user_id=9, post_id=2, is_upvote=False),
    PostVote(user_id=10, post_id=2, is_upvote=False),
    PostVote(user_id=11, post_id=2, is_upvote=False),
    PostVote(user_id=12, post_id=2, is_upvote=False),
    PostVote(user_id=13, post_id=2, is_upvote=False),
    PostVote(user_id=14, post_id=2, is_upvote=False),
    # PostVote(user_id=15, post_id=2, is_upvote=False),
    # PostVote(user_id=16, post_id=2, is_upvote=False),
    # PostVote(user_id=17, post_id=2, is_upvote=False),
    # PostVote(user_id=18, post_id=2, is_upvote=False),
    # PostVote(user_id=19, post_id=2, is_upvote=False),
    # PostVote(user_id=20, post_id=2, is_upvote=False),
    # PostVote(user_id=21, post_id=2, is_upvote=False),
    # PostVote(user_id=22, post_id=2, is_upvote=False),
    # PostVote(user_id=23, post_id=2, is_upvote=False),
    # PostVote(user_id=24, post_id=2, is_upvote=False),
    # PostVote(user_id=25, post_id=2, is_upvote=False),
    # PostVote(user_id=26, post_id=2, is_upvote=False),
    # PostVote(user_id=27, post_id=2, is_upvote=False),
    # PostVote(user_id=28, post_id=2, is_upvote=False),
    # -------------------------------------------------------------------------
    # POST 3 || VOTES: 5 (+13, -8)
    # -------------------------------------------------------------------------
    PostVote(user_id=29, post_id=3, is_upvote=True),
    PostVote(user_id=31, post_id=3, is_upvote=True),
    PostVote(user_id=32, post_id=3, is_upvote=True),
    PostVote(user_id=33, post_id=3, is_upvote=True),
    PostVote(user_id=34, post_id=3, is_upvote=True),
    PostVote(user_id=35, post_id=3, is_upvote=True),
    PostVote(user_id=36, post_id=3, is_upvote=True),
    PostVote(user_id=37, post_id=3, is_upvote=True),
    PostVote(user_id=38, post_id=3, is_upvote=True),
    PostVote(user_id=39, post_id=3, is_upvote=True),
    PostVote(user_id=40, post_id=3, is_upvote=True),
    PostVote(user_id=41, post_id=3, is_upvote=True),
    PostVote(user_id=42, post_id=3, is_upvote=True),
    PostVote(user_id=43, post_id=3, is_upvote=False),
    PostVote(user_id=44, post_id=3, is_upvote=False),
    PostVote(user_id=45, post_id=3, is_upvote=False),
    PostVote(user_id=46, post_id=3, is_upvote=False),
    PostVote(user_id=47, post_id=3, is_upvote=False),
    PostVote(user_id=48, post_id=3, is_upvote=False),
    PostVote(user_id=49, post_id=3, is_upvote=False),
    PostVote(user_id=50, post_id=3, is_upvote=False),
    # -------------------------------------------------------------------------
    # POST 4 || VOTES: 39 (+45, -6)
    # -------------------------------------------------------------------------
    PostVote(user_id=1, post_id=4, is_upvote=True),
    PostVote(user_id=2, post_id=4, is_upvote=True),
    PostVote(user_id=3, post_id=4, is_upvote=True),
    PostVote(user_id=4, post_id=4, is_upvote=True),
    PostVote(user_id=5, post_id=4, is_upvote=True),
    PostVote(user_id=6, post_id=4, is_upvote=True),
    PostVote(user_id=7, post_id=4, is_upvote=True),
    PostVote(user_id=8, post_id=4, is_upvote=True),
    PostVote(user_id=9, post_id=4, is_upvote=True),
    PostVote(user_id=10, post_id=4, is_upvote=True),
    PostVote(user_id=11, post_id=4, is_upvote=True),
    PostVote(user_id=12, post_id=4, is_upvote=True),
    PostVote(user_id=13, post_id=4, is_upvote=True),
    PostVote(user_id=14, post_id=4, is_upvote=True),
    PostVote(user_id=15, post_id=4, is_upvote=True),
    PostVote(user_id=16, post_id=4, is_upvote=True),
    PostVote(user_id=17, post_id=4, is_upvote=True),
    PostVote(user_id=18, post_id=4, is_upvote=True),
    PostVote(user_id=19, post_id=4, is_upvote=True),
    PostVote(user_id=20, post_id=4, is_upvote=True),
    PostVote(user_id=21, post_id=4, is_upvote=True),
    PostVote(user_id=22, post_id=4, is_upvote=True),
    PostVote(user_id=23, post_id=4, is_upvote=True),
    PostVote(user_id=24, post_id=4, is_upvote=True),
    PostVote(user_id=25, post_id=4, is_upvote=True),
    PostVote(user_id=26, post_id=4, is_upvote=True),
    PostVote(user_id=27, post_id=4, is_upvote=True),
    PostVote(user_id=28, post_id=4, is_upvote=True),
    PostVote(user_id=29, post_id=4, is_upvote=True),
    PostVote(user_id=30, post_id=4, is_upvote=True),
    PostVote(user_id=31, post_id=4, is_upvote=True),
    PostVote(user_id=32, post_id=4, is_upvote=True),
    PostVote(user_id=33, post_id=4, is_upvote=True),
    PostVote(user_id=34, post_id=4, is_upvote=True),
    PostVote(user_id=35, post_id=4, is_upvote=True),
    PostVote(user_id=36, post_id=4, is_upvote=True),
    PostVote(user_id=37, post_id=4, is_upvote=True),
    PostVote(user_id=38, post_id=4, is_upvote=True),
    PostVote(user_id=39, post_id=4, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 5 || VOTES: 25
    # -------------------------------------------------------------------------
    PostVote(user_id=40, post_id=5, is_upvote=True),
    PostVote(user_id=41, post_id=5, is_upvote=True),
    PostVote(user_id=42, post_id=5, is_upvote=True),
    PostVote(user_id=43, post_id=5, is_upvote=True),
    PostVote(user_id=44, post_id=5, is_upvote=True),
    PostVote(user_id=45, post_id=5, is_upvote=True),
    PostVote(user_id=46, post_id=5, is_upvote=True),
    PostVote(user_id=47, post_id=5, is_upvote=True),
    PostVote(user_id=48, post_id=5, is_upvote=True),
    PostVote(user_id=49, post_id=5, is_upvote=True),
    PostVote(user_id=50, post_id=5, is_upvote=True),
    PostVote(user_id=1, post_id=5, is_upvote=True),
    PostVote(user_id=2, post_id=5, is_upvote=True),
    PostVote(user_id=3, post_id=5, is_upvote=True),
    PostVote(user_id=4, post_id=5, is_upvote=True),
    PostVote(user_id=5, post_id=5, is_upvote=True),
    PostVote(user_id=6, post_id=5, is_upvote=True),
    PostVote(user_id=7, post_id=5, is_upvote=True),
    PostVote(user_id=8, post_id=5, is_upvote=True),
    PostVote(user_id=9, post_id=5, is_upvote=True),
    PostVote(user_id=10, post_id=5, is_upvote=True),
    PostVote(user_id=11, post_id=5, is_upvote=True),
    PostVote(user_id=12, post_id=5, is_upvote=True),
    PostVote(user_id=13, post_id=5, is_upvote=True),
    PostVote(user_id=14, post_id=5, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 6 || VOTES: 12
    # -------------------------------------------------------------------------
    PostVote(user_id=15, post_id=6, is_upvote=True),
    PostVote(user_id=16, post_id=6, is_upvote=True),
    PostVote(user_id=17, post_id=6, is_upvote=True),
    PostVote(user_id=18, post_id=6, is_upvote=True),
    PostVote(user_id=19, post_id=6, is_upvote=True),
    PostVote(user_id=20, post_id=6, is_upvote=True),
    PostVote(user_id=21, post_id=6, is_upvote=True),
    PostVote(user_id=22, post_id=6, is_upvote=True),
    PostVote(user_id=23, post_id=6, is_upvote=True),
    PostVote(user_id=24, post_id=6, is_upvote=True),
    PostVote(user_id=25, post_id=6, is_upvote=True),
    PostVote(user_id=26, post_id=6, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 7 || VOTES: 26
    # -------------------------------------------------------------------------
    PostVote(user_id=27, post_id=7, is_upvote=True),
    PostVote(user_id=28, post_id=7, is_upvote=True),
    PostVote(user_id=29, post_id=7, is_upvote=True),
    PostVote(user_id=30, post_id=7, is_upvote=True),
    PostVote(user_id=31, post_id=7, is_upvote=True),
    PostVote(user_id=32, post_id=7, is_upvote=True),
    PostVote(user_id=33, post_id=7, is_upvote=True),
    PostVote(user_id=34, post_id=7, is_upvote=True),
    PostVote(user_id=35, post_id=7, is_upvote=True),
    PostVote(user_id=36, post_id=7, is_upvote=True),
    PostVote(user_id=37, post_id=7, is_upvote=True),
    PostVote(user_id=38, post_id=7, is_upvote=True),
    PostVote(user_id=39, post_id=7, is_upvote=True),
    PostVote(user_id=40, post_id=7, is_upvote=True),
    PostVote(user_id=41, post_id=7, is_upvote=True),
    PostVote(user_id=42, post_id=7, is_upvote=True),
    PostVote(user_id=43, post_id=7, is_upvote=True),
    PostVote(user_id=44, post_id=7, is_upvote=True),
    PostVote(user_id=45, post_id=7, is_upvote=True),
    PostVote(user_id=46, post_id=7, is_upvote=True),
    PostVote(user_id=47, post_id=7, is_upvote=True),
    PostVote(user_id=48, post_id=7, is_upvote=True),
    PostVote(user_id=49, post_id=7, is_upvote=True),
    PostVote(user_id=50, post_id=7, is_upvote=True),
    PostVote(user_id=1, post_id=7, is_upvote=True),
    PostVote(user_id=2, post_id=7, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 8 || VOTES: 5
    # -------------------------------------------------------------------------
    PostVote(user_id=3, post_id=8, is_upvote=True),
    PostVote(user_id=4, post_id=8, is_upvote=True),
    PostVote(user_id=5, post_id=8, is_upvote=True),
    PostVote(user_id=6, post_id=8, is_upvote=True),
    PostVote(user_id=7, post_id=8, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 9 || VOTES: 30
    # -------------------------------------------------------------------------
    PostVote(user_id=8, post_id=9, is_upvote=True),
    PostVote(user_id=9, post_id=9, is_upvote=True),
    PostVote(user_id=10, post_id=9, is_upvote=True),
    PostVote(user_id=11, post_id=9, is_upvote=True),
    PostVote(user_id=12, post_id=9, is_upvote=True),
    PostVote(user_id=13, post_id=9, is_upvote=True),
    PostVote(user_id=14, post_id=9, is_upvote=True),
    PostVote(user_id=15, post_id=9, is_upvote=True),
    PostVote(user_id=16, post_id=9, is_upvote=True),
    PostVote(user_id=17, post_id=9, is_upvote=True),
    PostVote(user_id=18, post_id=9, is_upvote=True),
    PostVote(user_id=19, post_id=9, is_upvote=True),
    PostVote(user_id=20, post_id=9, is_upvote=True),
    PostVote(user_id=21, post_id=9, is_upvote=True),
    PostVote(user_id=22, post_id=9, is_upvote=True),
    PostVote(user_id=23, post_id=9, is_upvote=True),
    PostVote(user_id=24, post_id=9, is_upvote=True),
    PostVote(user_id=25, post_id=9, is_upvote=True),
    PostVote(user_id=26, post_id=9, is_upvote=True),
    PostVote(user_id=27, post_id=9, is_upvote=True),
    PostVote(user_id=28, post_id=9, is_upvote=True),
    PostVote(user_id=29, post_id=9, is_upvote=True),
    PostVote(user_id=30, post_id=9, is_upvote=True),
    PostVote(user_id=31, post_id=9, is_upvote=True),
    PostVote(user_id=32, post_id=9, is_upvote=True),
    PostVote(user_id=33, post_id=9, is_upvote=True),
    PostVote(user_id=34, post_id=9, is_upvote=True),
    PostVote(user_id=35, post_id=9, is_upvote=True),
    PostVote(user_id=36, post_id=9, is_upvote=True),
    PostVote(user_id=37, post_id=9, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 10 || VOTES: 4
    # -------------------------------------------------------------------------
    PostVote(user_id=38, post_id=10, is_upvote=True),
    PostVote(user_id=39, post_id=10, is_upvote=True),
    PostVote(user_id=40, post_id=10, is_upvote=True),
    PostVote(user_id=41, post_id=10, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 11 || VOTES: 13
    # -------------------------------------------------------------------------
    PostVote(user_id=42, post_id=11, is_upvote=True),
    PostVote(user_id=43, post_id=11, is_upvote=True),
    PostVote(user_id=44, post_id=11, is_upvote=True),
    PostVote(user_id=45, post_id=11, is_upvote=True),
    PostVote(user_id=46, post_id=11, is_upvote=True),
    PostVote(user_id=47, post_id=11, is_upvote=True),
    PostVote(user_id=48, post_id=11, is_upvote=True),
    PostVote(user_id=49, post_id=11, is_upvote=True),
    PostVote(user_id=50, post_id=11, is_upvote=True),
    PostVote(user_id=1, post_id=11, is_upvote=True),
    PostVote(user_id=2, post_id=11, is_upvote=True),
    PostVote(user_id=3, post_id=11, is_upvote=True),
    PostVote(user_id=4, post_id=11, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 12 || VOTES: 14
    # -------------------------------------------------------------------------
    PostVote(user_id=5, post_id=12, is_upvote=True),
    PostVote(user_id=6, post_id=12, is_upvote=True),
    PostVote(user_id=7, post_id=12, is_upvote=True),
    PostVote(user_id=8, post_id=12, is_upvote=True),
    PostVote(user_id=9, post_id=12, is_upvote=True),
    PostVote(user_id=10, post_id=12, is_upvote=True),
    PostVote(user_id=11, post_id=12, is_upvote=True),
    PostVote(user_id=12, post_id=12, is_upvote=True),
    PostVote(user_id=13, post_id=12, is_upvote=True),
    PostVote(user_id=14, post_id=12, is_upvote=True),
    PostVote(user_id=15, post_id=12, is_upvote=True),
    PostVote(user_id=16, post_id=12, is_upvote=True),
    PostVote(user_id=17, post_id=12, is_upvote=True),
    PostVote(user_id=18, post_id=12, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 13 || VOTES: 21
    # -------------------------------------------------------------------------
    PostVote(user_id=19, post_id=13, is_upvote=True),
    PostVote(user_id=20, post_id=13, is_upvote=True),
    PostVote(user_id=21, post_id=13, is_upvote=True),
    PostVote(user_id=22, post_id=13, is_upvote=True),
    PostVote(user_id=23, post_id=13, is_upvote=True),
    PostVote(user_id=24, post_id=13, is_upvote=True),
    PostVote(user_id=25, post_id=13, is_upvote=True),
    PostVote(user_id=26, post_id=13, is_upvote=True),
    PostVote(user_id=27, post_id=13, is_upvote=True),
    PostVote(user_id=28, post_id=13, is_upvote=True),
    PostVote(user_id=29, post_id=13, is_upvote=True),
    PostVote(user_id=30, post_id=13, is_upvote=True),
    PostVote(user_id=31, post_id=13, is_upvote=True),
    PostVote(user_id=32, post_id=13, is_upvote=True),
    PostVote(user_id=33, post_id=13, is_upvote=True),
    PostVote(user_id=34, post_id=13, is_upvote=True),
    PostVote(user_id=35, post_id=13, is_upvote=True),
    PostVote(user_id=36, post_id=13, is_upvote=True),
    PostVote(user_id=37, post_id=13, is_upvote=True),
    PostVote(user_id=38, post_id=13, is_upvote=True),
    PostVote(user_id=39, post_id=13, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 14 || VOTES: 8
    # -------------------------------------------------------------------------
    PostVote(user_id=39, post_id=14, is_upvote=True),
    PostVote(user_id=40, post_id=14, is_upvote=True),
    PostVote(user_id=41, post_id=14, is_upvote=True),
    PostVote(user_id=42, post_id=14, is_upvote=True),
    PostVote(user_id=43, post_id=14, is_upvote=True),
    PostVote(user_id=44, post_id=14, is_upvote=True),
    PostVote(user_id=45, post_id=14, is_upvote=True),
    PostVote(user_id=46, post_id=14, is_upvote=True),
    PostVote(user_id=47, post_id=14, is_upvote=True),
    PostVote(user_id=48, post_id=15, is_upvote=True),
    PostVote(user_id=49, post_id=15, is_upvote=True),
    PostVote(user_id=50, post_id=15, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 15 || VOTES: 26
    # -------------------------------------------------------------------------
    PostVote(user_id=1, post_id=15, is_upvote=True),
    PostVote(user_id=2, post_id=15, is_upvote=True),
    PostVote(user_id=3, post_id=15, is_upvote=True),
    PostVote(user_id=4, post_id=15, is_upvote=True),
    PostVote(user_id=5, post_id=15, is_upvote=True),
    PostVote(user_id=6, post_id=15, is_upvote=True),
    PostVote(user_id=7, post_id=15, is_upvote=True),
    PostVote(user_id=8, post_id=15, is_upvote=True),
    PostVote(user_id=9, post_id=15, is_upvote=True),
    PostVote(user_id=10, post_id=15, is_upvote=True),
    PostVote(user_id=11, post_id=15, is_upvote=True),
    PostVote(user_id=12, post_id=15, is_upvote=True),
    PostVote(user_id=13, post_id=15, is_upvote=True),
    PostVote(user_id=14, post_id=15, is_upvote=True),
    PostVote(user_id=15, post_id=15, is_upvote=True),
    PostVote(user_id=16, post_id=15, is_upvote=True),
    PostVote(user_id=17, post_id=15, is_upvote=True),
    PostVote(user_id=18, post_id=15, is_upvote=True),
    PostVote(user_id=19, post_id=15, is_upvote=True),
    PostVote(user_id=20, post_id=15, is_upvote=True),
    PostVote(user_id=21, post_id=15, is_upvote=True),
    PostVote(user_id=22, post_id=15, is_upvote=True),
    PostVote(user_id=23, post_id=15, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 16 || VOTES: -3
    # -------------------------------------------------------------------------
    PostVote(user_id=24, post_id=16, is_upvote=False),
    PostVote(user_id=25, post_id=16, is_upvote=False),
    PostVote(user_id=26, post_id=16, is_upvote=False),
    # -------------------------------------------------------------------------
    # POST 17 || VOTES: 44
    # -------------------------------------------------------------------------
    PostVote(user_id=27, post_id=17, is_upvote=True),
    PostVote(user_id=28, post_id=17, is_upvote=True),
    PostVote(user_id=29, post_id=17, is_upvote=True),
    PostVote(user_id=30, post_id=17, is_upvote=True),
    PostVote(user_id=31, post_id=17, is_upvote=True),
    PostVote(user_id=32, post_id=17, is_upvote=True),
    PostVote(user_id=33, post_id=17, is_upvote=True),
    PostVote(user_id=34, post_id=17, is_upvote=True),
    PostVote(user_id=35, post_id=17, is_upvote=True),
    PostVote(user_id=36, post_id=17, is_upvote=True),
    PostVote(user_id=37, post_id=17, is_upvote=True),
    PostVote(user_id=38, post_id=17, is_upvote=True),
    PostVote(user_id=39, post_id=17, is_upvote=True),
    PostVote(user_id=40, post_id=17, is_upvote=True),
    PostVote(user_id=41, post_id=17, is_upvote=True),
    PostVote(user_id=42, post_id=17, is_upvote=True),
    PostVote(user_id=43, post_id=17, is_upvote=True),
    PostVote(user_id=44, post_id=17, is_upvote=True),
    PostVote(user_id=45, post_id=17, is_upvote=True),
    PostVote(user_id=46, post_id=17, is_upvote=True),
    PostVote(user_id=47, post_id=17, is_upvote=True),
    PostVote(user_id=48, post_id=17, is_upvote=True),
    PostVote(user_id=49, post_id=17, is_upvote=True),
    PostVote(user_id=50, post_id=17, is_upvote=True),
    PostVote(user_id=1, post_id=17, is_upvote=True),
    PostVote(user_id=2, post_id=17, is_upvote=True),
    PostVote(user_id=3, post_id=17, is_upvote=True),
    PostVote(user_id=4, post_id=17, is_upvote=True),
    PostVote(user_id=5, post_id=17, is_upvote=True),
    PostVote(user_id=6, post_id=17, is_upvote=True),
    PostVote(user_id=7, post_id=17, is_upvote=True),
    PostVote(user_id=8, post_id=17, is_upvote=True),
    PostVote(user_id=9, post_id=17, is_upvote=True),
    PostVote(user_id=10, post_id=17, is_upvote=True),
    PostVote(user_id=11, post_id=17, is_upvote=True),
    PostVote(user_id=12, post_id=17, is_upvote=True),
    PostVote(user_id=13, post_id=17, is_upvote=True),
    PostVote(user_id=14, post_id=17, is_upvote=True),
    PostVote(user_id=15, post_id=17, is_upvote=True),
    PostVote(user_id=16, post_id=17, is_upvote=True),
    PostVote(user_id=17, post_id=17, is_upvote=True),
    PostVote(user_id=18, post_id=17, is_upvote=True),
    PostVote(user_id=19, post_id=17, is_upvote=True),
    PostVote(user_id=20, post_id=17, is_upvote=True),
    PostVote(user_id=21, post_id=17, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 18 || VOTES: 12
    # -------------------------------------------------------------------------
    PostVote(user_id=22, post_id=18, is_upvote=True),
    PostVote(user_id=23, post_id=18, is_upvote=True),
    PostVote(user_id=24, post_id=18, is_upvote=True),
    PostVote(user_id=25, post_id=18, is_upvote=True),
    PostVote(user_id=26, post_id=18, is_upvote=True),
    PostVote(user_id=27, post_id=18, is_upvote=True),
    PostVote(user_id=28, post_id=18, is_upvote=True),
    PostVote(user_id=29, post_id=18, is_upvote=True),
    PostVote(user_id=30, post_id=18, is_upvote=True),
    PostVote(user_id=31, post_id=18, is_upvote=True),
    PostVote(user_id=32, post_id=18, is_upvote=True),
    PostVote(user_id=33, post_id=18, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 19 || VOTES: 7
    # -------------------------------------------------------------------------
    PostVote(user_id=34, post_id=19, is_upvote=True),
    PostVote(user_id=35, post_id=19, is_upvote=True),
    PostVote(user_id=36, post_id=19, is_upvote=True),
    PostVote(user_id=37, post_id=19, is_upvote=True),
    PostVote(user_id=38, post_id=19, is_upvote=True),
    PostVote(user_id=39, post_id=19, is_upvote=True),
    PostVote(user_id=40, post_id=19, is_upvote=True),
    # -------------------------------------------------------------------------
    # POST 20 || VOTES: -4
    # -------------------------------------------------------------------------
    PostVote(user_id=41, post_id=20, is_upvote=False),
    PostVote(user_id=42, post_id=20, is_upvote=False),
    PostVote(user_id=43, post_id=20, is_upvote=False),
    PostVote(user_id=44, post_id=20, is_upvote=False),
    # -------------------------------------------------------------------------
    # POST 21 || VOTES: 4
    # -------------------------------------------------------------------------
    PostVote(user_id=45, post_id=21, is_upvote=True),
    PostVote(user_id=46, post_id=21, is_upvote=True),
    PostVote(user_id=47, post_id=21, is_upvote=True),
    PostVote(user_id=48, post_id=21, is_upvote=True),
    PostVote(user_id=49, post_id=21, is_upvote=True),
    PostVote(user_id=50, post_id=21, is_upvote=True),
    PostVote(user_id=1, post_id=21, is_upvote=True),
    PostVote(user_id=2, post_id=21, is_upvote=True),
    PostVote(user_id=3, post_id=22, is_upvote=True),
    PostVote(user_id=4, post_id=22, is_upvote=True),
    PostVote(user_id=5, post_id=22, is_upvote=True),
    PostVote(user_id=6, post_id=22, is_upvote=True),
    PostVote(user_id=7, post_id=22, is_upvote=True),
    PostVote(user_id=8, post_id=22, is_upvote=True),
    PostVote(user_id=9, post_id=22, is_upvote=True),
    PostVote(user_id=10, post_id=22, is_upvote=True),
    PostVote(user_id=11, post_id=22, is_upvote=True),
    PostVote(user_id=12, post_id=22, is_upvote=True),
    PostVote(user_id=13, post_id=22, is_upvote=True),
    PostVote(user_id=14, post_id=22, is_upvote=True),
    PostVote(user_id=15, post_id=22, is_upvote=True),
    PostVote(user_id=16, post_id=22, is_upvote=True),
    PostVote(user_id=17, post_id=22, is_upvote=True),
    PostVote(user_id=18, post_id=22, is_upvote=True),
    PostVote(user_id=19, post_id=22, is_upvote=True),
    PostVote(user_id=20, post_id=22, is_upvote=True),
    PostVote(user_id=21, post_id=22, is_upvote=True),
    PostVote(user_id=22, post_id=22, is_upvote=True),
    PostVote(user_id=23, post_id=23, is_upvote=False),
    PostVote(user_id=24, post_id=23, is_upvote=False),
    PostVote(user_id=25, post_id=23, is_upvote=False),
    PostVote(user_id=26, post_id=23, is_upvote=False),
    PostVote(user_id=27, post_id=23, is_upvote=False),
    PostVote(user_id=28, post_id=24, is_upvote=True),
    PostVote(user_id=29, post_id=24, is_upvote=True),
    PostVote(user_id=30, post_id=24, is_upvote=True),
    PostVote(user_id=31, post_id=24, is_upvote=True),
    PostVote(user_id=32, post_id=24, is_upvote=True),
    PostVote(user_id=33, post_id=24, is_upvote=True),
    PostVote(user_id=34, post_id=24, is_upvote=True),
    PostVote(user_id=35, post_id=24, is_upvote=True),
    PostVote(user_id=36, post_id=24, is_upvote=True),
    PostVote(user_id=37, post_id=24, is_upvote=True),
    PostVote(user_id=38, post_id=24, is_upvote=True),
    PostVote(user_id=39, post_id=24, is_upvote=True),
    PostVote(user_id=40, post_id=24, is_upvote=True),
    PostVote(user_id=41, post_id=24, is_upvote=True),
    PostVote(user_id=42, post_id=24, is_upvote=True),
    PostVote(user_id=43, post_id=24, is_upvote=True),
    PostVote(user_id=44, post_id=24, is_upvote=True),
    PostVote(user_id=45, post_id=25, is_upvote=True),
    PostVote(user_id=46, post_id=25, is_upvote=True),
    PostVote(user_id=47, post_id=25, is_upvote=True),
    PostVote(user_id=48, post_id=25, is_upvote=True),
    PostVote(user_id=49, post_id=25, is_upvote=True),
    PostVote(user_id=50, post_id=25, is_upvote=True),
    PostVote(user_id=1, post_id=25, is_upvote=True),
    PostVote(user_id=2, post_id=25, is_upvote=True),
    PostVote(user_id=3, post_id=25, is_upvote=True),
    PostVote(user_id=4, post_id=25, is_upvote=True),
    PostVote(user_id=5, post_id=25, is_upvote=True),
    PostVote(user_id=6, post_id=25, is_upvote=True),
    PostVote(user_id=7, post_id=25, is_upvote=True),
    PostVote(user_id=8, post_id=25, is_upvote=True),
    PostVote(user_id=9, post_id=25, is_upvote=True),
    PostVote(user_id=10, post_id=25, is_upvote=True),
    PostVote(user_id=11, post_id=26, is_upvote=True),
    PostVote(user_id=12, post_id=26, is_upvote=True),
    PostVote(user_id=13, post_id=26, is_upvote=True),
    PostVote(user_id=14, post_id=26, is_upvote=True),
    PostVote(user_id=15, post_id=26, is_upvote=True),
    PostVote(user_id=16, post_id=26, is_upvote=True),
    PostVote(user_id=17, post_id=26, is_upvote=True),
    PostVote(user_id=18, post_id=26, is_upvote=True),
    PostVote(user_id=19, post_id=26, is_upvote=True),
    PostVote(user_id=20, post_id=26, is_upvote=True),
    PostVote(user_id=21, post_id=26, is_upvote=True),
    PostVote(user_id=22, post_id=26, is_upvote=True),
    PostVote(user_id=23, post_id=26, is_upvote=True),
    PostVote(user_id=24, post_id=26, is_upvote=True),
    PostVote(user_id=25, post_id=26, is_upvote=True),
    PostVote(user_id=26, post_id=26, is_upvote=True),
    PostVote(user_id=27, post_id=26, is_upvote=True),
    PostVote(user_id=28, post_id=26, is_upvote=True),
    PostVote(user_id=29, post_id=26, is_upvote=True),
    PostVote(user_id=30, post_id=26, is_upvote=True),
    PostVote(user_id=31, post_id=26, is_upvote=True),
    PostVote(user_id=32, post_id=26, is_upvote=True),
    PostVote(user_id=33, post_id=26, is_upvote=True),
    PostVote(user_id=34, post_id=26, is_upvote=True),
    PostVote(user_id=35, post_id=26, is_upvote=True),
    PostVote(user_id=36, post_id=27, is_upvote=False),
    PostVote(user_id=37, post_id=27, is_upvote=False),
    PostVote(user_id=38, post_id=28, is_upvote=True),
    PostVote(user_id=39, post_id=28, is_upvote=True),
    PostVote(user_id=40, post_id=28, is_upvote=True),
    PostVote(user_id=41, post_id=28, is_upvote=True),
    PostVote(user_id=42, post_id=28, is_upvote=True),
    PostVote(user_id=43, post_id=28, is_upvote=True),
    PostVote(user_id=44, post_id=28, is_upvote=True),
    PostVote(user_id=45, post_id=28, is_upvote=True),
    PostVote(user_id=46, post_id=28, is_upvote=True),
    PostVote(user_id=47, post_id=30, is_upvote=False),
    PostVote(user_id=48, post_id=30, is_upvote=False),
    PostVote(user_id=49, post_id=30, is_upvote=False),
    PostVote(user_id=50, post_id=30, is_upvote=False),
    PostVote(user_id=1, post_id=30, is_upvote=False),
    PostVote(user_id=2, post_id=30, is_upvote=False)])
    db.session.commit()

def undo_postvotes():
    db.session.execute("DELETE FROM post_votes")
    db.session.commit()
