from app.models import db, Post, User, PostVote

def seed_postvotes():
    db.session.add_all([
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
    PostVote(user_id=1, post_id=2, is_upvote=False),
    PostVote(user_id=2, post_id=2, is_upvote=False),
    PostVote(user_id=3, post_id=2, is_upvote=False),
    PostVote(user_id=4, post_id=2, is_upvote=False),
    PostVote(user_id=5, post_id=2, is_upvote=False),
    PostVote(user_id=6, post_id=2, is_upvote=False),
    PostVote(user_id=7, post_id=2, is_upvote=False),
    PostVote(user_id=8, post_id=2, is_upvote=False),
    PostVote(user_id=9, post_id=2, is_upvote=False),
    PostVote(user_id=10, post_id=2, is_upvote=False),
    PostVote(user_id=11, post_id=2, is_upvote=False),
    PostVote(user_id=12, post_id=2, is_upvote=False),
    PostVote(user_id=13, post_id=2, is_upvote=False),
    PostVote(user_id=14, post_id=2, is_upvote=False),
    PostVote(user_id=15, post_id=2, is_upvote=False),
    PostVote(user_id=16, post_id=2, is_upvote=False),
    PostVote(user_id=17, post_id=2, is_upvote=False),
    PostVote(user_id=18, post_id=2, is_upvote=False),
    PostVote(user_id=19, post_id=2, is_upvote=False),
    PostVote(user_id=20, post_id=2, is_upvote=False),
    PostVote(user_id=21, post_id=2, is_upvote=False),
    PostVote(user_id=22, post_id=2, is_upvote=False),
    PostVote(user_id=23, post_id=2, is_upvote=False),
    PostVote(user_id=24, post_id=2, is_upvote=False),
    PostVote(user_id=25, post_id=2, is_upvote=False),
    PostVote(user_id=26, post_id=2, is_upvote=False),
    PostVote(user_id=27, post_id=2, is_upvote=False),
    PostVote(user_id=28, post_id=2, is_upvote=False),
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
    PostVote(user_id=3, post_id=8, is_upvote=False),
    PostVote(user_id=4, post_id=8, is_upvote=False),
    PostVote(user_id=5, post_id=8, is_upvote=False),
    PostVote(user_id=6, post_id=8, is_upvote=False),
    PostVote(user_id=7, post_id=8, is_upvote=False),
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
    PostVote(user_id=38, post_id=10, is_upvote=False),
    PostVote(user_id=39, post_id=10, is_upvote=False),
    PostVote(user_id=40, post_id=10, is_upvote=False),
    PostVote(user_id=41, post_id=10, is_upvote=False),
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
    PostVote(user_id=39, post_id=14, is_upvote=False),
    PostVote(user_id=40, post_id=14, is_upvote=False),
    PostVote(user_id=41, post_id=14, is_upvote=False),
    PostVote(user_id=42, post_id=14, is_upvote=False),
    PostVote(user_id=43, post_id=14, is_upvote=False),
    PostVote(user_id=44, post_id=14, is_upvote=False),
    PostVote(user_id=45, post_id=14, is_upvote=False),
    PostVote(user_id=46, post_id=14, is_upvote=False),
    PostVote(user_id=47, post_id=14, is_upvote=False),
    PostVote(user_id=48, post_id=15, is_upvote=True),
    PostVote(user_id=49, post_id=15, is_upvote=True),
    PostVote(user_id=50, post_id=15, is_upvote=True),
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
    PostVote(user_id=24, post_id=16, is_upvote=False),
    PostVote(user_id=25, post_id=16, is_upvote=False),
    PostVote(user_id=26, post_id=16, is_upvote=False),
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
    PostVote(user_id=34, post_id=19, is_upvote=True),
    PostVote(user_id=35, post_id=19, is_upvote=True),
    PostVote(user_id=36, post_id=19, is_upvote=True),
    PostVote(user_id=37, post_id=19, is_upvote=True),
    PostVote(user_id=38, post_id=19, is_upvote=True),
    PostVote(user_id=39, post_id=19, is_upvote=True),
    PostVote(user_id=40, post_id=19, is_upvote=True),
    PostVote(user_id=41, post_id=20, is_upvote=False),
    PostVote(user_id=42, post_id=20, is_upvote=False),
    PostVote(user_id=43, post_id=20, is_upvote=False),
    PostVote(user_id=44, post_id=20, is_upvote=False),
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
    PostVote(user_id=2, post_id=30, is_upvote=False),
    # PostVote(user_id=3, post_id=32, is_upvote=False),
    # PostVote(user_id=4, post_id=32, is_upvote=False),
    # PostVote(user_id=5, post_id=32, is_upvote=False),
    # PostVote(user_id=6, post_id=32, is_upvote=False),
    # PostVote(user_id=7, post_id=33, is_upvote=True),
    # PostVote(user_id=8, post_id=33, is_upvote=True),
    # PostVote(user_id=9, post_id=33, is_upvote=True),
    # PostVote(user_id=10, post_id=33, is_upvote=True),
    # PostVote(user_id=11, post_id=33, is_upvote=True),
    # PostVote(user_id=12, post_id=33, is_upvote=True),
    # PostVote(user_id=13, post_id=33, is_upvote=True),
    # PostVote(user_id=14, post_id=33, is_upvote=True),
    # PostVote(user_id=15, post_id=33, is_upvote=True),
    # PostVote(user_id=16, post_id=33, is_upvote=True),
    # PostVote(user_id=17, post_id=33, is_upvote=True),
    # PostVote(user_id=18, post_id=33, is_upvote=True),
    # PostVote(user_id=19, post_id=33, is_upvote=True),
    # PostVote(user_id=20, post_id=33, is_upvote=True),
    # PostVote(user_id=21, post_id=33, is_upvote=True),
    # PostVote(user_id=22, post_id=33, is_upvote=True),
    # PostVote(user_id=23, post_id=37, is_upvote=True),
    # PostVote(user_id=24, post_id=37, is_upvote=True),
    # PostVote(user_id=25, post_id=37, is_upvote=True),
    # PostVote(user_id=26, post_id=37, is_upvote=True),
    # PostVote(user_id=27, post_id=37, is_upvote=True),
    # PostVote(user_id=28, post_id=37, is_upvote=True),
    # PostVote(user_id=29, post_id=37, is_upvote=True),
    # PostVote(user_id=30, post_id=37, is_upvote=True),
    # PostVote(user_id=31, post_id=37, is_upvote=True),
    # PostVote(user_id=32, post_id=37, is_upvote=True),
    # PostVote(user_id=33, post_id=37, is_upvote=True),
    # PostVote(user_id=34, post_id=37, is_upvote=True),
    # PostVote(user_id=35, post_id=37, is_upvote=True),
    # PostVote(user_id=36, post_id=37, is_upvote=True),
    # PostVote(user_id=37, post_id=37, is_upvote=True),
    # PostVote(user_id=38, post_id=37, is_upvote=True),
    # PostVote(user_id=39, post_id=37, is_upvote=True),
    # PostVote(user_id=40, post_id=37, is_upvote=True),
    # PostVote(user_id=41, post_id=37, is_upvote=True),
    # PostVote(user_id=42, post_id=37, is_upvote=True),
    # PostVote(user_id=43, post_id=37, is_upvote=True),
    # PostVote(user_id=44, post_id=37, is_upvote=True),
    # PostVote(user_id=45, post_id=37, is_upvote=True),
    # PostVote(user_id=46, post_id=37, is_upvote=True),
    # PostVote(user_id=47, post_id=37, is_upvote=True),
    # PostVote(user_id=48, post_id=37, is_upvote=True),
    # PostVote(user_id=49, post_id=37, is_upvote=True),
    # PostVote(user_id=50, post_id=37, is_upvote=True),
    # PostVote(user_id=1, post_id=37, is_upvote=True),
    # PostVote(user_id=2, post_id=37, is_upvote=True),
    # PostVote(user_id=3, post_id=37, is_upvote=True),
    # PostVote(user_id=4, post_id=37, is_upvote=True),
    # PostVote(user_id=5, post_id=37, is_upvote=True),
    # PostVote(user_id=6, post_id=37, is_upvote=True),
    # PostVote(user_id=7, post_id=37, is_upvote=True),
    # PostVote(user_id=8, post_id=37, is_upvote=True),
    # PostVote(user_id=9, post_id=37, is_upvote=True),
    # PostVote(user_id=10, post_id=37, is_upvote=True),
    # PostVote(user_id=11, post_id=37, is_upvote=True),
    # PostVote(user_id=12, post_id=37, is_upvote=True),
    # PostVote(user_id=13, post_id=37, is_upvote=True),
    # PostVote(user_id=14, post_id=37, is_upvote=True),
    # PostVote(user_id=15, post_id=38, is_upvote=True),
    # PostVote(user_id=16, post_id=38, is_upvote=True),
    # PostVote(user_id=17, post_id=38, is_upvote=True),
    # PostVote(user_id=18, post_id=38, is_upvote=True),
    # PostVote(user_id=19, post_id=38, is_upvote=True),
    # PostVote(user_id=20, post_id=38, is_upvote=True),
    # PostVote(user_id=21, post_id=38, is_upvote=True),
    # PostVote(user_id=22, post_id=38, is_upvote=True),
    # PostVote(user_id=23, post_id=38, is_upvote=True),
    # PostVote(user_id=24, post_id=38, is_upvote=True),
    # PostVote(user_id=25, post_id=38, is_upvote=True),
    # PostVote(user_id=26, post_id=38, is_upvote=True),
    # PostVote(user_id=27, post_id=38, is_upvote=True),
    # PostVote(user_id=28, post_id=38, is_upvote=True),
    # PostVote(user_id=29, post_id=38, is_upvote=True),
    # PostVote(user_id=30, post_id=38, is_upvote=True),
    # PostVote(user_id=31, post_id=38, is_upvote=True),
    # PostVote(user_id=32, post_id=38, is_upvote=True),
    # PostVote(user_id=33, post_id=38, is_upvote=True),
    # PostVote(user_id=34, post_id=38, is_upvote=True),
    # PostVote(user_id=35, post_id=38, is_upvote=True),
    # PostVote(user_id=36, post_id=38, is_upvote=True),
    # PostVote(user_id=37, post_id=38, is_upvote=True),
    # PostVote(user_id=38, post_id=38, is_upvote=True),
    # PostVote(user_id=39, post_id=38, is_upvote=True),
    # PostVote(user_id=40, post_id=39, is_upvote=False),
    # PostVote(user_id=41, post_id=39, is_upvote=False),
    # PostVote(user_id=42, post_id=39, is_upvote=False),
    # PostVote(user_id=43, post_id=40, is_upvote=True),
    # PostVote(user_id=44, post_id=40, is_upvote=True),
    # PostVote(user_id=45, post_id=40, is_upvote=True),
    # PostVote(user_id=46, post_id=40, is_upvote=True),
    # PostVote(user_id=47, post_id=40, is_upvote=True),
    # PostVote(user_id=48, post_id=40, is_upvote=True),
    # PostVote(user_id=49, post_id=40, is_upvote=True),
    # PostVote(user_id=50, post_id=40, is_upvote=True),
    # PostVote(user_id=1, post_id=40, is_upvote=True),
    # PostVote(user_id=2, post_id=40, is_upvote=True),
    # PostVote(user_id=3, post_id=40, is_upvote=True),
    # PostVote(user_id=4, post_id=40, is_upvote=True),
    # PostVote(user_id=5, post_id=40, is_upvote=True),
    # PostVote(user_id=6, post_id=40, is_upvote=True),
    # PostVote(user_id=7, post_id=40, is_upvote=True),
    # PostVote(user_id=8, post_id=40, is_upvote=True),
    # PostVote(user_id=9, post_id=40, is_upvote=True),
    # PostVote(user_id=10, post_id=40, is_upvote=True),
    # PostVote(user_id=11, post_id=40, is_upvote=True),
    # PostVote(user_id=12, post_id=40, is_upvote=True),
    # PostVote(user_id=13, post_id=40, is_upvote=True),
    # PostVote(user_id=14, post_id=40, is_upvote=True),
    # PostVote(user_id=15, post_id=40, is_upvote=True),
    # PostVote(user_id=16, post_id=40, is_upvote=True),
    # PostVote(user_id=17, post_id=40, is_upvote=True),
    # PostVote(user_id=18, post_id=40, is_upvote=True),
    # PostVote(user_id=19, post_id=40, is_upvote=True),
    # PostVote(user_id=20, post_id=40, is_upvote=True),
    # PostVote(user_id=21, post_id=40, is_upvote=True),
    # PostVote(user_id=22, post_id=40, is_upvote=True),
    # PostVote(user_id=23, post_id=40, is_upvote=True),
    # PostVote(user_id=24, post_id=40, is_upvote=True),
    # PostVote(user_id=25, post_id=40, is_upvote=True),
    # PostVote(user_id=26, post_id=40, is_upvote=True),
    # PostVote(user_id=27, post_id=40, is_upvote=True),
    # PostVote(user_id=28, post_id=40, is_upvote=True),
    # PostVote(user_id=29, post_id=40, is_upvote=True),
    # PostVote(user_id=30, post_id=40, is_upvote=True),
    # PostVote(user_id=31, post_id=40, is_upvote=True),
    # PostVote(user_id=32, post_id=40, is_upvote=True),
    # PostVote(user_id=33, post_id=40, is_upvote=True),
    # PostVote(user_id=34, post_id=45, is_upvote=True),
    # PostVote(user_id=35, post_id=45, is_upvote=True),
    # PostVote(user_id=36, post_id=45, is_upvote=True),
    # PostVote(user_id=37, post_id=45, is_upvote=True),
    # PostVote(user_id=38, post_id=45, is_upvote=True),
    # PostVote(user_id=39, post_id=45, is_upvote=True),
    # PostVote(user_id=40, post_id=45, is_upvote=True),
    # PostVote(user_id=41, post_id=47, is_upvote=True),
    # PostVote(user_id=42, post_id=47, is_upvote=True),
    # PostVote(user_id=43, post_id=47, is_upvote=True),
    # PostVote(user_id=44, post_id=47, is_upvote=True),
    # PostVote(user_id=45, post_id=47, is_upvote=True),
    # PostVote(user_id=46, post_id=47, is_upvote=True),
    # PostVote(user_id=47, post_id=47, is_upvote=True),
    # PostVote(user_id=48, post_id=47, is_upvote=True),
    # PostVote(user_id=49, post_id=47, is_upvote=True),
    # PostVote(user_id=50, post_id=47, is_upvote=True),
    # PostVote(user_id=1, post_id=47, is_upvote=True),
    # PostVote(user_id=2, post_id=47, is_upvote=True),
    # PostVote(user_id=3, post_id=47, is_upvote=True),
    # PostVote(user_id=4, post_id=47, is_upvote=True),
    # PostVote(user_id=5, post_id=47, is_upvote=True),
    # PostVote(user_id=6, post_id=48, is_upvote=True),
    # PostVote(user_id=7, post_id=48, is_upvote=True),
    # PostVote(user_id=8, post_id=48, is_upvote=True),
    # PostVote(user_id=9, post_id=48, is_upvote=True),
    # PostVote(user_id=10, post_id=48, is_upvote=True),
    # PostVote(user_id=11, post_id=48, is_upvote=True),
    # PostVote(user_id=12, post_id=48, is_upvote=True),
    # PostVote(user_id=13, post_id=48, is_upvote=True),
    # PostVote(user_id=14, post_id=48, is_upvote=True),
    # PostVote(user_id=15, post_id=50, is_upvote=True),
    # PostVote(user_id=16, post_id=50, is_upvote=True),
    # PostVote(user_id=17, post_id=51, is_upvote=True),
    # PostVote(user_id=18, post_id=51, is_upvote=True),
    # PostVote(user_id=19, post_id=51, is_upvote=True),
    # PostVote(user_id=20, post_id=51, is_upvote=True),
    # PostVote(user_id=21, post_id=51, is_upvote=True),
    # PostVote(user_id=21, post_id=52, is_upvote=True),
    # PostVote(user_id=22, post_id=52, is_upvote=True),
    # PostVote(user_id=23, post_id=52, is_upvote=True),
    # PostVote(user_id=24, post_id=53, is_upvote=True),
    # PostVote(user_id=25, post_id=53, is_upvote=True),
    # PostVote(user_id=26, post_id=53, is_upvote=True),
    # PostVote(user_id=27, post_id=53, is_upvote=True),
    # PostVote(user_id=28, post_id=53, is_upvote=True),
    # PostVote(user_id=29, post_id=53, is_upvote=True),
    # PostVote(user_id=30, post_id=53, is_upvote=True),
    # PostVote(user_id=31, post_id=53, is_upvote=True),
    # PostVote(user_id=32, post_id=53, is_upvote=True),
    # PostVote(user_id=33, post_id=53, is_upvote=True),
    # PostVote(user_id=34, post_id=53, is_upvote=True),
    # PostVote(user_id=35, post_id=53, is_upvote=True),
    # PostVote(user_id=36, post_id=53, is_upvote=True),
    # PostVote(user_id=37, post_id=53, is_upvote=True),
    # PostVote(user_id=38, post_id=53, is_upvote=True),
    # PostVote(user_id=39, post_id=53, is_upvote=True),
    # PostVote(user_id=40, post_id=53, is_upvote=True),
    # PostVote(user_id=41, post_id=53, is_upvote=True),
    # PostVote(user_id=42, post_id=53, is_upvote=True),
    # PostVote(user_id=43, post_id=53, is_upvote=True),
    # PostVote(user_id=44, post_id=53, is_upvote=True),
    # PostVote(user_id=45, post_id=53, is_upvote=True),
    # PostVote(user_id=46, post_id=53, is_upvote=True),
    # PostVote(user_id=47, post_id=57, is_upvote=True),
    # PostVote(user_id=48, post_id=57, is_upvote=True),
    # PostVote(user_id=49, post_id=57, is_upvote=True),
    # PostVote(user_id=50, post_id=57, is_upvote=True),
    # PostVote(user_id=1, post_id=57, is_upvote=True),
    # PostVote(user_id=2, post_id=57, is_upvote=True),
    # PostVote(user_id=3, post_id=57, is_upvote=True),
    # PostVote(user_id=4, post_id=57, is_upvote=True),
    # PostVote(user_id=5, post_id=57, is_upvote=True),
    # PostVote(user_id=6, post_id=57, is_upvote=True),
    # PostVote(user_id=7, post_id=57, is_upvote=True),
    # PostVote(user_id=8, post_id=60, is_upvote=True),
    # PostVote(user_id=9, post_id=60, is_upvote=True),
    # PostVote(user_id=10, post_id=60, is_upvote=True),
    # PostVote(user_id=11, post_id=60, is_upvote=True),
    # PostVote(user_id=12, post_id=60, is_upvote=True),
    # PostVote(user_id=13, post_id=60, is_upvote=True),
    # PostVote(user_id=14, post_id=60, is_upvote=True),
    # PostVote(user_id=15, post_id=60, is_upvote=True),
    # PostVote(user_id=16, post_id=60, is_upvote=True),
    # PostVote(user_id=17, post_id=60, is_upvote=True),
    # PostVote(user_id=18, post_id=60, is_upvote=True),
    # PostVote(user_id=19, post_id=60, is_upvote=True),
    # PostVote(user_id=20, post_id=60, is_upvote=True),
    # PostVote(user_id=21, post_id=60, is_upvote=True),
    # PostVote(user_id=22, post_id=60, is_upvote=True),
    # PostVote(user_id=23, post_id=60, is_upvote=True),
    # PostVote(user_id=24, post_id=60, is_upvote=True),
    # PostVote(user_id=25, post_id=60, is_upvote=True),
    # PostVote(user_id=26, post_id=60, is_upvote=True),
    # PostVote(user_id=27, post_id=60, is_upvote=True),
    # PostVote(user_id=28, post_id=60, is_upvote=True),
    # PostVote(user_id=29, post_id=60, is_upvote=True),
    # PostVote(user_id=30, post_id=60, is_upvote=True),
    # PostVote(user_id=31, post_id=60, is_upvote=True),
    # PostVote(user_id=32, post_id=60, is_upvote=True),
    # PostVote(user_id=33, post_id=60, is_upvote=True),
    # PostVote(user_id=34, post_id=60, is_upvote=True),
    # PostVote(user_id=35, post_id=61, is_upvote=True),
    # PostVote(user_id=36, post_id=61, is_upvote=True),
    # PostVote(user_id=37, post_id=61, is_upvote=True),
    # PostVote(user_id=38, post_id=61, is_upvote=True),
    # PostVote(user_id=39, post_id=61, is_upvote=True),
    # PostVote(user_id=40, post_id=61, is_upvote=True),
    # PostVote(user_id=41, post_id=61, is_upvote=True),
    # PostVote(user_id=42, post_id=61, is_upvote=True),
    # PostVote(user_id=43, post_id=61, is_upvote=True),
    # PostVote(user_id=44, post_id=61, is_upvote=True),
    # PostVote(user_id=45, post_id=61, is_upvote=True),
    # PostVote(user_id=46, post_id=61, is_upvote=True),
    # PostVote(user_id=47, post_id=61, is_upvote=True),
    # PostVote(user_id=48, post_id=61, is_upvote=True),
    # PostVote(user_id=49, post_id=61, is_upvote=True),
    # PostVote(user_id=50, post_id=61, is_upvote=True),
    # PostVote(user_id=1, post_id=61, is_upvote=True),
    # PostVote(user_id=2, post_id=61, is_upvote=True),
    # PostVote(user_id=3, post_id=61, is_upvote=True),
    # PostVote(user_id=4, post_id=61, is_upvote=True),
    # PostVote(user_id=5, post_id=61, is_upvote=True),
    # PostVote(user_id=6, post_id=61, is_upvote=True),
    # PostVote(user_id=7, post_id=61, is_upvote=True),
    # PostVote(user_id=8, post_id=61, is_upvote=True),
    # PostVote(user_id=9, post_id=61, is_upvote=True),
    # PostVote(user_id=10, post_id=61, is_upvote=True),
    # PostVote(user_id=11, post_id=61, is_upvote=True),
    # PostVote(user_id=12, post_id=61, is_upvote=True),
    # PostVote(user_id=13, post_id=61, is_upvote=True),
    # PostVote(user_id=14, post_id=62, is_upvote=True),
    # PostVote(user_id=15, post_id=62, is_upvote=True),
    # PostVote(user_id=16, post_id=62, is_upvote=True),
    # PostVote(user_id=17, post_id=62, is_upvote=True),
    # PostVote(user_id=18, post_id=62, is_upvote=True),
    # PostVote(user_id=19, post_id=62, is_upvote=True),
    # PostVote(user_id=20, post_id=62, is_upvote=True),
    # PostVote(user_id=21, post_id=62, is_upvote=True),
    # PostVote(user_id=22, post_id=62, is_upvote=True),
    # PostVote(user_id=23, post_id=62, is_upvote=True),
    # PostVote(user_id=24, post_id=62, is_upvote=True),
    # PostVote(user_id=25, post_id=62, is_upvote=True),
    # PostVote(user_id=26, post_id=62, is_upvote=True),
    # PostVote(user_id=27, post_id=62, is_upvote=True),
    # PostVote(user_id=28, post_id=62, is_upvote=True),
    # PostVote(user_id=29, post_id=62, is_upvote=True),
    # PostVote(user_id=30, post_id=62, is_upvote=True),
    # PostVote(user_id=31, post_id=63, is_upvote=False),
    # PostVote(user_id=32, post_id=63, is_upvote=False),
    # PostVote(user_id=33, post_id=63, is_upvote=False),
    # PostVote(user_id=34, post_id=63, is_upvote=False),
    # PostVote(user_id=35, post_id=64, is_upvote=False),
    # PostVote(user_id=36, post_id=65, is_upvote=True),
    # PostVote(user_id=37, post_id=65, is_upvote=True),
    # PostVote(user_id=38, post_id=65, is_upvote=True),
    # PostVote(user_id=39, post_id=65, is_upvote=True),
    # PostVote(user_id=40, post_id=65, is_upvote=True),
    # PostVote(user_id=41, post_id=65, is_upvote=True),
    # PostVote(user_id=42, post_id=65, is_upvote=True),
    # PostVote(user_id=43, post_id=65, is_upvote=True),
    # PostVote(user_id=44, post_id=65, is_upvote=True),
    # PostVote(user_id=45, post_id=65, is_upvote=True),
    # PostVote(user_id=46, post_id=65, is_upvote=True),
    # PostVote(user_id=47, post_id=65, is_upvote=True),
    # PostVote(user_id=48, post_id=65, is_upvote=True),
    # PostVote(user_id=49, post_id=66, is_upvote=False),
    # PostVote(user_id=50, post_id=66, is_upvote=False),
    # PostVote(user_id=1, post_id=67, is_upvote=False),
    # PostVote(user_id=2, post_id=67, is_upvote=False),
    # PostVote(user_id=3, post_id=67, is_upvote=False),
    # PostVote(user_id=4, post_id=67, is_upvote=False),
    # PostVote(user_id=5, post_id=67, is_upvote=False),
    # PostVote(user_id=6, post_id=67, is_upvote=False),
    # PostVote(user_id=7, post_id=68, is_upvote=False),
    # PostVote(user_id=8, post_id=68, is_upvote=False),
    # PostVote(user_id=9, post_id=68, is_upvote=False),
    # PostVote(user_id=10, post_id=68, is_upvote=False),
    # PostVote(user_id=11, post_id=68, is_upvote=False),
    # PostVote(user_id=12, post_id=69, is_upvote=True),
    # PostVote(user_id=13, post_id=69, is_upvote=True),
    # PostVote(user_id=14, post_id=69, is_upvote=True),
    # PostVote(user_id=15, post_id=69, is_upvote=True),
    # PostVote(user_id=16, post_id=69, is_upvote=True),
    # PostVote(user_id=17, post_id=69, is_upvote=True),
    # PostVote(user_id=18, post_id=69, is_upvote=True),
    # PostVote(user_id=19, post_id=69, is_upvote=True),
    # PostVote(user_id=20, post_id=69, is_upvote=True),
    # PostVote(user_id=21, post_id=69, is_upvote=True),
    # PostVote(user_id=22, post_id=69, is_upvote=True),
    # PostVote(user_id=23, post_id=69, is_upvote=True),
    # PostVote(user_id=24, post_id=69, is_upvote=True),
    # PostVote(user_id=25, post_id=69, is_upvote=True),
    # PostVote(user_id=26, post_id=69, is_upvote=True),
    # PostVote(user_id=27, post_id=69, is_upvote=True),
    # PostVote(user_id=28, post_id=69, is_upvote=True),
    # PostVote(user_id=29, post_id=69, is_upvote=True),
    # PostVote(user_id=30, post_id=69, is_upvote=True),
    # PostVote(user_id=31, post_id=69, is_upvote=True),
    # PostVote(user_id=32, post_id=69, is_upvote=True),
    # PostVote(user_id=33, post_id=69, is_upvote=True),
    # PostVote(user_id=34, post_id=69, is_upvote=True),
    # PostVote(user_id=35, post_id=69, is_upvote=True),
    # PostVote(user_id=36, post_id=69, is_upvote=True),
    # PostVote(user_id=37, post_id=70, is_upvote=True),
    # PostVote(user_id=38, post_id=70, is_upvote=True),
    # PostVote(user_id=39, post_id=70, is_upvote=True),
    # PostVote(user_id=40, post_id=70, is_upvote=True),
    # PostVote(user_id=41, post_id=73, is_upvote=True),
    # PostVote(user_id=42, post_id=73, is_upvote=True),
    # PostVote(user_id=43, post_id=73, is_upvote=True),
    # PostVote(user_id=44, post_id=73, is_upvote=True),
    # PostVote(user_id=45, post_id=73, is_upvote=True),
    # PostVote(user_id=46, post_id=73, is_upvote=True),
    # PostVote(user_id=47, post_id=73, is_upvote=True),
    # PostVote(user_id=48, post_id=73, is_upvote=True),
    # PostVote(user_id=49, post_id=73, is_upvote=True),
    # PostVote(user_id=50, post_id=73, is_upvote=True),
    # PostVote(user_id=1, post_id=73, is_upvote=True),
    # PostVote(user_id=2, post_id=73, is_upvote=True),
    # PostVote(user_id=3, post_id=73, is_upvote=True),
    # PostVote(user_id=4, post_id=73, is_upvote=True),
    # PostVote(user_id=5, post_id=73, is_upvote=True),
    # PostVote(user_id=6, post_id=73, is_upvote=True),
    # PostVote(user_id=7, post_id=73, is_upvote=True),
    # PostVote(user_id=8, post_id=73, is_upvote=True),
    # PostVote(user_id=9, post_id=73, is_upvote=True),
    # PostVote(user_id=10, post_id=73, is_upvote=True),
    # PostVote(user_id=11, post_id=74, is_upvote=True),
    # PostVote(user_id=1, post_id=75, is_upvote=True),
    # PostVote(user_id=2, post_id=75, is_upvote=True),
    # PostVote(user_id=3, post_id=75, is_upvote=True),
    # PostVote(user_id=4, post_id=75, is_upvote=True),
    # PostVote(user_id=5, post_id=75, is_upvote=True),
    # PostVote(user_id=6, post_id=75, is_upvote=True),
    # PostVote(user_id=7, post_id=75, is_upvote=True),
    # PostVote(user_id=8, post_id=75, is_upvote=True),
    # PostVote(user_id=9, post_id=75, is_upvote=True),
    # PostVote(user_id=10, post_id=75, is_upvote=True),
    # PostVote(user_id=11, post_id=75, is_upvote=True),
    # PostVote(user_id=12, post_id=75, is_upvote=True),
    # PostVote(user_id=13, post_id=75, is_upvote=True),
    # PostVote(user_id=14, post_id=75, is_upvote=True),
    # PostVote(user_id=15, post_id=75, is_upvote=True),
    # PostVote(user_id=16, post_id=75, is_upvote=True),
    # PostVote(user_id=17, post_id=75, is_upvote=True),
    # PostVote(user_id=18, post_id=75, is_upvote=True),
    # PostVote(user_id=19, post_id=75, is_upvote=True),
    # PostVote(user_id=20, post_id=75, is_upvote=True),
    # PostVote(user_id=21, post_id=75, is_upvote=True),
    # PostVote(user_id=22, post_id=75, is_upvote=True),
    # PostVote(user_id=23, post_id=75, is_upvote=True),
    # PostVote(user_id=24, post_id=75, is_upvote=True),
    # PostVote(user_id=25, post_id=75, is_upvote=True),
    # PostVote(user_id=26, post_id=75, is_upvote=True),
    # PostVote(user_id=27, post_id=75, is_upvote=True),
    # PostVote(user_id=28, post_id=75, is_upvote=True),
    # PostVote(user_id=29, post_id=75, is_upvote=True),
    # PostVote(user_id=30, post_id=75, is_upvote=True),
    # PostVote(user_id=31, post_id=75, is_upvote=True),
    # PostVote(user_id=32, post_id=75, is_upvote=True),
    # PostVote(user_id=33, post_id=75, is_upvote=True),
    # PostVote(user_id=34, post_id=75, is_upvote=True),
    # PostVote(user_id=35, post_id=75, is_upvote=True),
    # PostVote(user_id=36, post_id=75, is_upvote=True),
    # PostVote(user_id=37, post_id=75, is_upvote=True),
    # PostVote(user_id=38, post_id=75, is_upvote=True),
    # PostVote(user_id=39, post_id=75, is_upvote=True),
    # PostVote(user_id=40, post_id=75, is_upvote=True),
    # PostVote(user_id=41, post_id=75, is_upvote=True),
    # PostVote(user_id=42, post_id=75, is_upvote=True),
    # PostVote(user_id=43, post_id=75, is_upvote=True),
    # PostVote(user_id=44, post_id=75, is_upvote=True),
    # PostVote(user_id=45, post_id=75, is_upvote=True),
    # PostVote(user_id=46, post_id=75, is_upvote=True),
    # PostVote(user_id=47, post_id=75, is_upvote=True),
    # PostVote(user_id=48, post_id=75, is_upvote=True),
    # PostVote(user_id=49, post_id=75, is_upvote=True),
    # PostVote(user_id=50, post_id=75, is_upvote=True)]
    )

    # db.session.add(post1_vote1)
    # db.session.add(post1_vote2)
    # db.session.add(post1_vote3)
    # db.session.add(post1_vote4)
    # db.session.add(post1_vote5)
    # db.session.add(post1_vote6)
    # db.session.add(post1_vote7)
    # db.session.add(post1_vote8)
    # db.session.add(post1_vote9)
    # db.session.add(post1_vote10)
    # db.session.add(post1_vote11)
    # db.session.add(post1_vote12)
    # db.session.add(post1_vote13)
    # db.session.add(post1_vote14)
    # db.session.add(post1_vote15)
    # db.session.add(post1_vote16)
    # db.session.add(post1_vote17)
    # db.session.add(post1_vote18)
    # db.session.add(post1_vote19)
    # db.session.add(post1_vote20)
    # db.session.add(post1_vote21)
    # db.session.add(post1_vote22)
    # db.session.add(post1_vote23)
    # db.session.add(post1_vote24)
    # db.session.add(post1_vote25)
    # db.session.add(post1_vote26)
    # db.session.add(post1_vote27)
    # db.session.add(post1_vote28)
    # db.session.add(post1_vote29)
    # db.session.add(post1_vote30)
    # db.session.add(post1_vote31)
    # db.session.add(post1_vote32)
    # db.session.add(post1_vote33)
    # db.session.add(post1_vote34)
    # db.session.add(post1_vote35)
    # db.session.add(post1_vote36)

    # db.session.add(post2_vote1)
    # db.session.add(post2_vote2)
    # db.session.add(post2_vote3)
    # db.session.add(post2_vote4)
    # db.session.add(post2_vote5)
    # db.session.add(post2_vote6)
    # db.session.add(post2_vote7)
    # db.session.add(post2_vote8)
    # db.session.add(post2_vote9)
    # db.session.add(post2_vote10)
    # db.session.add(post2_vote11)
    # db.session.add(post2_vote12)
    # db.session.add(post2_vote13)
    # db.session.add(post2_vote14)
    # db.session.add(post2_vote15)
    # db.session.add(post2_vote16)
    # db.session.add(post2_vote17)
    # db.session.add(post2_vote18)
    # db.session.add(post2_vote19)
    # db.session.add(post2_vote20)
    # db.session.add(post2_vote21)
    # db.session.add(post2_vote22)
    # db.session.add(post2_vote23)
    # db.session.add(post2_vote24)
    # db.session.add(post2_vote25)
    # db.session.add(post2_vote26)
    # db.session.add(post2_vote27)
    # db.session.add(post2_vote28)
    # db.session.add(post2_vote29)
    # db.session.add(post2_vote30)
    # db.session.add(post2_vote31)
    # db.session.add(post2_vote32)
    # db.session.add(post2_vote33)
    # db.session.add(post2_vote34)
    # db.session.add(post2_vote35)
    # db.session.add(post2_vote36)
    # db.session.add(post2_vote37)
    # db.session.add(post2_vote38)
    # db.session.add(post2_vote39)
    # db.session.add(post2_vote40)
    # db.session.add(post2_vote41)
    # db.session.add(post2_vote42)

    # db.session.add(post3_vote1)
    # db.session.add(post3_vote2)
    # db.session.add(post3_vote3)
    # db.session.add(post3_vote4)
    # db.session.add(post3_vote5)
    # db.session.add(post3_vote6)
    # db.session.add(post3_vote7)
    # db.session.add(post3_vote8)
    # db.session.add(post3_vote9)
    # db.session.add(post3_vote10)
    # db.session.add(post3_vote11)
    # db.session.add(post3_vote12)
    # db.session.add(post3_vote13)
    # db.session.add(post3_vote14)
    # db.session.add(post3_vote15)
    # db.session.add(post3_vote16)
    # db.session.add(post3_vote17)
    # db.session.add(post3_vote18)
    # db.session.add(post3_vote19)
    # db.session.add(post3_vote20)
    # db.session.add(post3_vote21)

    # db.session.add(post4_vote1)
    # db.session.add(post4_vote2)
    # db.session.add(post4_vote3)
    # db.session.add(post4_vote4)
    # db.session.add(post4_vote5)
    # db.session.add(post4_vote6)
    # db.session.add(post4_vote7)
    # db.session.add(post4_vote8)
    # db.session.add(post4_vote9)
    # db.session.add(post4_vote10)
    # db.session.add(post4_vote11)
    # db.session.add(post4_vote12)
    # db.session.add(post4_vote13)
    # db.session.add(post4_vote14)
    # db.session.add(post4_vote15)
    # db.session.add(post4_vote16)
    # db.session.add(post4_vote17)
    # db.session.add(post4_vote18)
    # db.session.add(post4_vote19)
    # db.session.add(post4_vote20)
    # db.session.add(post4_vote21)
    # db.session.add(post4_vote22)
    # db.session.add(post4_vote23)
    # db.session.add(post4_vote24)
    # db.session.add(post4_vote25)
    # db.session.add(post4_vote26)
    # db.session.add(post4_vote27)
    # db.session.add(post4_vote28)
    # db.session.add(post4_vote29)
    # db.session.add(post4_vote30)
    # db.session.add(post4_vote31)
    # db.session.add(post4_vote32)
    # db.session.add(post4_vote33)
    # db.session.add(post4_vote34)
    # db.session.add(post4_vote35)
    # db.session.add(post4_vote36)
    # db.session.add(post4_vote37)
    # db.session.add(post4_vote38)
    # db.session.add(post4_vote39)

    # db.session.add(post5_vote1)
    # db.session.add(post5_vote2)
    # db.session.add(post5_vote3)
    # db.session.add(post5_vote4)
    # db.session.add(post5_vote5)
    # db.session.add(post5_vote6)
    # db.session.add(post5_vote7)
    # db.session.add(post5_vote8)
    # db.session.add(post5_vote9)
    # db.session.add(post5_vote10)
    # db.session.add(post5_vote11)
    # db.session.add(post5_vote12)
    # db.session.add(post5_vote13)
    # db.session.add(post5_vote14)
    # db.session.add(post5_vote15)
    # db.session.add(post5_vote16)
    # db.session.add(post5_vote17)
    # db.session.add(post5_vote18)
    # db.session.add(post5_vote19)
    # db.session.add(post5_vote20)
    # db.session.add(post5_vote21)
    # db.session.add(post5_vote22)
    # db.session.add(post5_vote23)
    # db.session.add(post5_vote24)
    # db.session.add(post5_vote25)

    # db.session.add(post6_vote1)
    # db.session.add(post6_vote2)
    # db.session.add(post6_vote3)
    # db.session.add(post6_vote4)
    # db.session.add(post6_vote5)
    # db.session.add(post6_vote6)
    # db.session.add(post6_vote7)
    # db.session.add(post6_vote8)
    # db.session.add(post6_vote9)
    # db.session.add(post6_vote10)
    # db.session.add(post6_vote11)
    # db.session.add(post6_vote12)

    # db.session.add(post7_vote1)
    # db.session.add(post7_vote2)
    # db.session.add(post7_vote3)
    # db.session.add(post7_vote4)
    # db.session.add(post7_vote5)
    # db.session.add(post7_vote6)
    # db.session.add(post7_vote7)
    # db.session.add(post7_vote8)
    # db.session.add(post7_vote9)
    # db.session.add(post7_vote10)
    # db.session.add(post7_vote11)
    # db.session.add(post7_vote12)
    # db.session.add(post7_vote13)
    # db.session.add(post7_vote14)
    # db.session.add(post7_vote15)
    # db.session.add(post7_vote16)
    # db.session.add(post7_vote17)
    # db.session.add(post7_vote18)
    # db.session.add(post7_vote19)
    # db.session.add(post7_vote20)
    # db.session.add(post7_vote21)
    # db.session.add(post7_vote22)
    # db.session.add(post7_vote23)
    # db.session.add(post7_vote24)
    # db.session.add(post7_vote25)
    # db.session.add(post7_vote26)

    # db.session.add(post8_vote1)
    # db.session.add(post8_vote2)
    # db.session.add(post8_vote3)
    # db.session.add(post8_vote4)
    # db.session.add(post8_vote5)

    # db.session.add(post9_vote1)
    # db.session.add(post9_vote2)
    # db.session.add(post9_vote3)
    # db.session.add(post9_vote4)
    # db.session.add(post9_vote5)
    # db.session.add(post9_vote6)
    # db.session.add(post9_vote7)
    # db.session.add(post9_vote8)
    # db.session.add(post9_vote9)
    # db.session.add(post9_vote10)
    # db.session.add(post9_vote11)
    # db.session.add(post9_vote12)
    # db.session.add(post9_vote13)
    # db.session.add(post9_vote14)
    # db.session.add(post9_vote15)
    # db.session.add(post9_vote16)
    # db.session.add(post9_vote17)
    # db.session.add(post9_vote18)
    # db.session.add(post9_vote19)
    # db.session.add(post9_vote20)
    # db.session.add(post9_vote21)
    # db.session.add(post9_vote22)
    # db.session.add(post9_vote23)
    # db.session.add(post9_vote24)
    # db.session.add(post9_vote25)
    # db.session.add(post9_vote26)
    # db.session.add(post9_vote27)
    # db.session.add(post9_vote28)
    # db.session.add(post9_vote29)
    # db.session.add(post9_vote30)

    # db.session.add(post10_vote1)
    # db.session.add(post10_vote2)
    # db.session.add(post10_vote3)
    # db.session.add(post10_vote4)

    # db.session.add(post11_vote1)
    # db.session.add(post11_vote2)
    # db.session.add(post11_vote3)
    # db.session.add(post11_vote4)
    # db.session.add(post11_vote5)
    # db.session.add(post11_vote6)
    # db.session.add(post11_vote7)
    # db.session.add(post11_vote8)
    # db.session.add(post11_vote9)
    # db.session.add(post11_vote10)
    # db.session.add(post11_vote11)
    # db.session.add(post11_vote12)
    # db.session.add(post11_vote13)

    # db.session.add(post12_vote1)
    # db.session.add(post12_vote2)
    # db.session.add(post12_vote3)
    # db.session.add(post12_vote4)
    # db.session.add(post12_vote5)
    # db.session.add(post12_vote6)
    # db.session.add(post12_vote7)
    # db.session.add(post12_vote8)
    # db.session.add(post12_vote9)
    # db.session.add(post12_vote10)
    # db.session.add(post12_vote11)
    # db.session.add(post12_vote12)
    # db.session.add(post12_vote13)
    # db.session.add(post12_vote14)

    # db.session.add(post13_vote1)
    # db.session.add(post13_vote2)
    # db.session.add(post13_vote3)
    # db.session.add(post13_vote4)
    # db.session.add(post13_vote5 )
    # db.session.add(post13_vote6)
    # db.session.add(post13_vote7)
    # db.session.add(post13_vote8)
    # db.session.add(post13_vote9)
    # db.session.add(post13_vote10)
    # db.session.add(post13_vote11)
    # db.session.add(post13_vote12)
    # db.session.add(post13_vote13)
    # db.session.add(post13_vote14)
    # db.session.add(post13_vote15)
    # db.session.add(post13_vote16)
    # db.session.add(post13_vote17)
    # db.session.add(post13_vote18)
    # db.session.add(post13_vote19)
    # db.session.add(post13_vote20)
    # db.session.add(post13_vote21)

    # db.session.add(post14_vote1)
    # db.session.add(post14_vote2)
    # db.session.add(post14_vote3)
    # db.session.add(post14_vote4)
    # db.session.add(post14_vote5 )
    # db.session.add(post14_vote6)
    # db.session.add(post14_vote7)
    # db.session.add(post14_vote8)
    # db.session.add(post14_vote9)

    # db.session.add(post15_vote1)
    # db.session.add(post15_vote2)
    # db.session.add(post15_vote3)
    # db.session.add(post15_vote4)
    # db.session.add(post15_vote5 )
    # db.session.add(post15_vote6)
    # db.session.add(post15_vote7)
    # db.session.add(post15_vote8)
    # db.session.add(post15_vote9)
    # db.session.add(post15_vote10)
    # db.session.add(post15_vote11)
    # db.session.add(post15_vote12)
    # db.session.add(post15_vote13)
    # db.session.add(post15_vote14)
    # db.session.add(post15_vote15)
    # db.session.add(post15_vote16)
    # db.session.add(post15_vote17)
    # db.session.add(post15_vote18)
    # db.session.add(post15_vote19)
    # db.session.add(post15_vote20)
    # db.session.add(post15_vote21)
    # db.session.add(post15_vote22)
    # db.session.add(post15_vote23)
    # db.session.add(post15_vote24)
    # db.session.add(post15_vote25)
    # db.session.add(post15_vote26)

    # db.session.add(post16_vote1)
    # db.session.add(post16_vote2)
    # db.session.add(post16_vote3)

    # db.session.add(post17_vote1)
    # db.session.add(post17_vote2)
    # db.session.add(post17_vote3)
    # db.session.add(post17_vote4)
    # db.session.add(post17_vote5 )
    # db.session.add(post17_vote6)
    # db.session.add(post17_vote7)
    # db.session.add(post17_vote8)
    # db.session.add(post17_vote9)
    # db.session.add(post17_vote10)
    # db.session.add(post17_vote11)
    # db.session.add(post17_vote12)
    # db.session.add(post17_vote13)
    # db.session.add(post17_vote14)
    # db.session.add(post17_vote15)
    # db.session.add(post17_vote16)
    # db.session.add(post17_vote17)
    # db.session.add(post17_vote18)
    # db.session.add(post17_vote19)
    # db.session.add(post17_vote20)
    # db.session.add(post17_vote21)
    # db.session.add(post17_vote22)
    # db.session.add(post17_vote23)
    # db.session.add(post17_vote24)
    # db.session.add(post17_vote25)
    # db.session.add(post17_vote26)
    # db.session.add(post17_vote27)
    # db.session.add(post17_vote28)
    # db.session.add(post17_vote29)
    # db.session.add(post17_vote30)
    # db.session.add(post17_vote31)
    # db.session.add(post17_vote32)
    # db.session.add(post17_vote33)
    # db.session.add(post17_vote34)
    # db.session.add(post17_vote35)
    # db.session.add(post17_vote36)
    # db.session.add(post17_vote37)
    # db.session.add(post17_vote38)
    # db.session.add(post17_vote39)
    # db.session.add(post17_vote40)
    # db.session.add(post17_vote41)
    # db.session.add(post17_vote42)
    # db.session.add(post17_vote43)
    # db.session.add(post17_vote44)
    # db.session.add(post17_vote45)

    # db.session.add(post18_vote1)
    # db.session.add(post18_vote2)
    # db.session.add(post18_vote3)
    # db.session.add(post18_vote4)
    # db.session.add(post18_vote5 )
    # db.session.add(post18_vote6)
    # db.session.add(post18_vote7)
    # db.session.add(post18_vote8)
    # db.session.add(post18_vote9)
    # db.session.add(post18_vote10)
    # db.session.add(post18_vote11)
    # db.session.add(post18_vote12)

    # db.session.add(post19_vote1)
    # db.session.add(post19_vote2)
    # db.session.add(post19_vote3)
    # db.session.add(post19_vote4)
    # db.session.add(post19_vote5 )
    # db.session.add(post19_vote6)
    # db.session.add(post19_vote7)

    # db.session.add(post20_vote1)
    # db.session.add(post20_vote2)
    # db.session.add(post20_vote3)
    # db.session.add(post20_vote4)

    # db.session.add(post21_vote1)
    # db.session.add(post21_vote2)
    # db.session.add(post21_vote3)
    # db.session.add(post21_vote4)
    # db.session.add(post21_vote5 )
    # db.session.add(post21_vote6)
    # db.session.add(post21_vote7)
    # db.session.add(post21_vote8)

    # db.session.add(post22_vote1)
    # db.session.add(post22_vote2)
    # db.session.add(post22_vote3)
    # db.session.add(post22_vote4)
    # db.session.add(post22_vote5 )
    # db.session.add(post22_vote6)
    # db.session.add(post22_vote7)
    # db.session.add(post22_vote8)
    # db.session.add(post22_vote9)
    # db.session.add(post22_vote10)
    # db.session.add(post22_vote11)
    # db.session.add(post22_vote12)
    # db.session.add(post22_vote13)
    # db.session.add(post22_vote14)
    # db.session.add(post22_vote15)
    # db.session.add(post22_vote16)
    # db.session.add(post22_vote17)
    # db.session.add(post22_vote18)
    # db.session.add(post22_vote19)

    # db.session.add(post23_vote1)
    # db.session.add(post23_vote2)
    # db.session.add(post23_vote3)
    # db.session.add(post23_vote4)
    # db.session.add(post23_vote5 )

    # db.session.add(post24_vote1)
    # db.session.add(post24_vote2)
    # db.session.add(post24_vote3)
    # db.session.add(post24_vote4)
    # db.session.add(post24_vote5 )
    # db.session.add(post24_vote6)
    # db.session.add(post24_vote7)
    # db.session.add(post24_vote8)
    # db.session.add(post24_vote9)
    # db.session.add(post24_vote10)
    # db.session.add(post24_vote11)
    # db.session.add(post24_vote12)
    # db.session.add(post24_vote13)
    # db.session.add(post24_vote14)
    # db.session.add(post24_vote15)
    # db.session.add(post24_vote16)
    # db.session.add(post24_vote17)

    # db.session.add(post25_vote1)
    # db.session.add(post25_vote2)
    # db.session.add(post25_vote3)
    # db.session.add(post25_vote4)
    # db.session.add(post25_vote5 )
    # db.session.add(post25_vote6)
    # db.session.add(post25_vote7)
    # db.session.add(post25_vote8)
    # db.session.add(post25_vote9)
    # db.session.add(post25_vote10)
    # db.session.add(post25_vote11)
    # db.session.add(post25_vote12)
    # db.session.add(post25_vote13)
    # db.session.add(post25_vote14)
    # db.session.add(post25_vote15)
    # db.session.add(post25_vote16)

    # db.session.add(post26_vote1)
    # db.session.add(post26_vote2)
    # db.session.add(post26_vote3)
    # db.session.add(post26_vote4)
    # db.session.add(post26_vote5 )
    # db.session.add(post26_vote6)
    # db.session.add(post26_vote7)
    # db.session.add(post26_vote8)
    # db.session.add(post26_vote9)
    # db.session.add(post26_vote10)
    # db.session.add(post26_vote11)
    # db.session.add(post26_vote12)
    # db.session.add(post26_vote13)
    # db.session.add(post26_vote14)
    # db.session.add(post26_vote15)
    # db.session.add(post26_vote16)
    # db.session.add(post26_vote17)
    # db.session.add(post26_vote18)
    # db.session.add(post26_vote19)
    # db.session.add(post26_vote20)
    # db.session.add(post26_vote21)
    # db.session.add(post26_vote22)
    # db.session.add(post26_vote23)
    # db.session.add(post26_vote24)
    # db.session.add(post26_vote25)

    # db.session.add(post27_vote1)
    # db.session.add(post27_vote2)

    # db.session.add(post28_vote1)
    # db.session.add(post28_vote2)
    # db.session.add(post28_vote3)
    # db.session.add(post28_vote4)
    # db.session.add(post28_vote5 )
    # db.session.add(post28_vote6)
    # db.session.add(post28_vote7)
    # db.session.add(post28_vote8)
    # db.session.add(post28_vote9)

    # db.session.add(post30_vote1)
    # db.session.add(post30_vote2)
    # db.session.add(post30_vote3)
    # db.session.add(post30_vote4)
    # db.session.add(post30_vote5 )
    # db.session.add(post30_vote6)

    # db.session.add(post32_vote1)
    # db.session.add(post32_vote2)
    # db.session.add(post32_vote3)
    # db.session.add(post32_vote4)

    # db.session.add(post33_vote1)
    # db.session.add(post33_vote2)
    # db.session.add(post33_vote3)
    # db.session.add(post33_vote4)
    # db.session.add(post33_vote5 )
    # db.session.add(post33_vote6)
    # db.session.add(post33_vote7)
    # db.session.add(post33_vote8)
    # db.session.add(post33_vote9)
    # db.session.add(post33_vote10)
    # db.session.add(post33_vote11)
    # db.session.add(post33_vote12)
    # db.session.add(post33_vote13)
    # db.session.add(post33_vote14)
    # db.session.add(post33_vote15)
    # db.session.add(post33_vote16)

    # db.session.add(post37_vote1)
    # db.session.add(post37_vote2)
    # db.session.add(post37_vote3)
    # db.session.add(post37_vote4)
    # db.session.add(post37_vote5 )
    # db.session.add(post37_vote6)
    # db.session.add(post37_vote7)
    # db.session.add(post37_vote8)
    # db.session.add(post37_vote9)
    # db.session.add(post37_vote10)
    # db.session.add(post37_vote11)
    # db.session.add(post37_vote12)
    # db.session.add(post37_vote13)
    # db.session.add(post37_vote14)
    # db.session.add(post37_vote15)
    # db.session.add(post37_vote16)
    # db.session.add(post37_vote17)
    # db.session.add(post37_vote18)
    # db.session.add(post37_vote19)
    # db.session.add(post37_vote20)
    # db.session.add(post37_vote21)
    # db.session.add(post37_vote22)
    # db.session.add(post37_vote23)
    # db.session.add(post37_vote24)
    # db.session.add(post37_vote25)
    # db.session.add(post37_vote26)
    # db.session.add(post37_vote27)
    # db.session.add(post37_vote28)
    # db.session.add(post37_vote29)
    # db.session.add(post37_vote30)
    # db.session.add(post37_vote31)
    # db.session.add(post37_vote32)
    # db.session.add(post37_vote33)
    # db.session.add(post37_vote34)
    # db.session.add(post37_vote35)
    # db.session.add(post37_vote36)
    # db.session.add(post37_vote37)
    # db.session.add(post37_vote38)
    # db.session.add(post37_vote39)
    # db.session.add(post37_vote40)
    # db.session.add(post37_vote41)
    # db.session.add(post37_vote42)

    # db.session.add(post38_vote1)
    # db.session.add(post38_vote2)
    # db.session.add(post38_vote3)
    # db.session.add(post38_vote4)
    # db.session.add(post38_vote5 )
    # db.session.add(post38_vote6)
    # db.session.add(post38_vote7)
    # db.session.add(post38_vote8)
    # db.session.add(post38_vote9)
    # db.session.add(post38_vote10)
    # db.session.add(post38_vote11)
    # db.session.add(post38_vote12)
    # db.session.add(post38_vote13)
    # db.session.add(post38_vote14)
    # db.session.add(post38_vote15)
    # db.session.add(post38_vote16)
    # db.session.add(post38_vote17)
    # db.session.add(post38_vote18)
    # db.session.add(post38_vote19)
    # db.session.add(post38_vote20)
    # db.session.add(post38_vote21)
    # db.session.add(post38_vote22)
    # db.session.add(post38_vote23)
    # db.session.add(post38_vote24)
    # db.session.add(post38_vote25)

    # db.session.add(post39_vote1)
    # db.session.add(post39_vote2)
    # db.session.add(post39_vote3)

    # db.session.add(post40_vote1)
    # db.session.add(post40_vote2)
    # db.session.add(post40_vote3)
    # db.session.add(post40_vote4)
    # db.session.add(post40_vote5 )
    # db.session.add(post40_vote6)
    # db.session.add(post40_vote7)
    # db.session.add(post40_vote8)
    # db.session.add(post40_vote9)
    # db.session.add(post40_vote10)
    # db.session.add(post40_vote11)
    # db.session.add(post40_vote12)
    # db.session.add(post40_vote13)
    # db.session.add(post40_vote14)
    # db.session.add(post40_vote15)
    # db.session.add(post40_vote16)
    # db.session.add(post40_vote17)
    # db.session.add(post40_vote18)
    # db.session.add(post40_vote19)
    # db.session.add(post40_vote20)
    # db.session.add(post40_vote21)
    # db.session.add(post40_vote22)
    # db.session.add(post40_vote23)
    # db.session.add(post40_vote24)
    # db.session.add(post40_vote25)
    # db.session.add(post40_vote26)
    # db.session.add(post40_vote27)
    # db.session.add(post40_vote28)
    # db.session.add(post40_vote29)
    # db.session.add(post40_vote30)
    # db.session.add(post40_vote31)
    # db.session.add(post40_vote32)
    # db.session.add(post40_vote33)
    # db.session.add(post40_vote34)
    # db.session.add(post40_vote35)
    # db.session.add(post40_vote36)
    # db.session.add(post40_vote37)
    # db.session.add(post40_vote38)
    # db.session.add(post40_vote39)
    # db.session.add(post40_vote40)
    # db.session.add(post40_vote41)

    # db.session.add(post45_vote1)
    # db.session.add(post45_vote2)
    # db.session.add(post45_vote3)
    # db.session.add(post45_vote4)
    # db.session.add(post45_vote5 )
    # db.session.add(post45_vote6)
    # db.session.add(post45_vote7)

    # db.session.add(post47_vote1)
    # db.session.add(post47_vote2)
    # db.session.add(post47_vote3)
    # db.session.add(post47_vote4)
    # db.session.add(post47_vote5 )
    # db.session.add(post47_vote6)
    # db.session.add(post47_vote7)
    # db.session.add(post47_vote8)
    # db.session.add(post47_vote9)
    # db.session.add(post47_vote10)
    # db.session.add(post47_vote11)
    # db.session.add(post47_vote12)
    # db.session.add(post47_vote13)
    # db.session.add(post47_vote14)
    # db.session.add(post47_vote15)

    # db.session.add(post48_vote1)
    # db.session.add(post48_vote2)
    # db.session.add(post48_vote3)
    # db.session.add(post48_vote4)
    # db.session.add(post48_vote5 )
    # db.session.add(post48_vote6)
    # db.session.add(post48_vote7)
    # db.session.add(post48_vote8)
    # db.session.add(post48_vote9)

    # db.session.add(post50_vote1)
    # db.session.add(post50_vote2)

    # db.session.add(post51_vote1)
    # db.session.add(post51_vote2)
    # db.session.add(post51_vote3)
    # db.session.add(post51_vote4)
    # db.session.add(post51_vote5 )

    # db.session.add(post52_vote1)
    # db.session.add(post52_vote2)
    # db.session.add(post52_vote3)

    # db.session.add(post53_vote1)
    # db.session.add(post53_vote2)
    # db.session.add(post53_vote3)
    # db.session.add(post53_vote4)
    # db.session.add(post53_vote5 )
    # db.session.add(post53_vote6)
    # db.session.add(post53_vote7)
    # db.session.add(post53_vote8)
    # db.session.add(post53_vote9)
    # db.session.add(post53_vote10)
    # db.session.add(post53_vote11)
    # db.session.add(post53_vote12)
    # db.session.add(post53_vote13)
    # db.session.add(post53_vote14)
    # db.session.add(post53_vote15)
    # db.session.add(post53_vote16)
    # db.session.add(post53_vote17)
    # db.session.add(post53_vote18)
    # db.session.add(post53_vote19)
    # db.session.add(post53_vote20)
    # db.session.add(post53_vote21)
    # db.session.add(post53_vote22)
    # db.session.add(post53_vote23)

    # db.session.add(post57_vote1)
    # db.session.add(post57_vote2)
    # db.session.add(post57_vote3)
    # db.session.add(post57_vote4)
    # db.session.add(post57_vote5 )
    # db.session.add(post57_vote6)
    # db.session.add(post57_vote7)
    # db.session.add(post57_vote8)
    # db.session.add(post57_vote9)
    # db.session.add(post57_vote10)
    # db.session.add(post57_vote11)

    # db.session.add(post60_vote1)
    # db.session.add(post60_vote2)
    # db.session.add(post60_vote3)
    # db.session.add(post60_vote4)
    # db.session.add(post60_vote5 )
    # db.session.add(post60_vote6)
    # db.session.add(post60_vote7)
    # db.session.add(post60_vote8)
    # db.session.add(post60_vote9)
    # db.session.add(post60_vote10)
    # db.session.add(post60_vote11)
    # db.session.add(post60_vote12)
    # db.session.add(post60_vote13)
    # db.session.add(post60_vote14)
    # db.session.add(post60_vote15)
    # db.session.add(post60_vote16)
    # db.session.add(post60_vote17)
    # db.session.add(post60_vote18)
    # db.session.add(post60_vote19)
    # db.session.add(post60_vote20)
    # db.session.add(post60_vote21)
    # db.session.add(post60_vote22)
    # db.session.add(post60_vote23)
    # db.session.add(post60_vote24)
    # db.session.add(post60_vote25)
    # db.session.add(post60_vote26)
    # db.session.add(post60_vote27)

    # db.session.add(post61_vote1)
    # db.session.add(post61_vote2)
    # db.session.add(post61_vote3)
    # db.session.add(post61_vote4)
    # db.session.add(post61_vote5 )
    # db.session.add(post61_vote6)
    # db.session.add(post61_vote7)
    # db.session.add(post61_vote8)
    # db.session.add(post61_vote9)
    # db.session.add(post61_vote10)
    # db.session.add(post61_vote11)
    # db.session.add(post61_vote12)
    # db.session.add(post61_vote13)
    # db.session.add(post61_vote14)
    # db.session.add(post61_vote15)
    # db.session.add(post61_vote16)
    # db.session.add(post61_vote17)
    # db.session.add(post61_vote18)
    # db.session.add(post61_vote19)
    # db.session.add(post61_vote20)
    # db.session.add(post61_vote21)
    # db.session.add(post61_vote22)
    # db.session.add(post61_vote23)
    # db.session.add(post61_vote24)
    # db.session.add(post61_vote25)
    # db.session.add(post61_vote26)
    # db.session.add(post61_vote27)
    # db.session.add(post61_vote28)
    # db.session.add(post61_vote29)

    # db.session.add(post62_vote1)
    # db.session.add(post62_vote2)
    # db.session.add(post62_vote3)
    # db.session.add(post62_vote4)
    # db.session.add(post62_vote5 )
    # db.session.add(post62_vote6)
    # db.session.add(post62_vote7)
    # db.session.add(post62_vote8)
    # db.session.add(post62_vote9)
    # db.session.add(post62_vote10)
    # db.session.add(post62_vote11)
    # db.session.add(post62_vote12)
    # db.session.add(post62_vote13)
    # db.session.add(post62_vote14)
    # db.session.add(post62_vote15)
    # db.session.add(post62_vote16)
    # db.session.add(post62_vote17)

    # db.session.add(post63_vote1)
    # db.session.add(post63_vote2)
    # db.session.add(post63_vote3)
    # db.session.add(post63_vote4)

    # db.session.add(post64_vote1)

    # db.session.add(post65_vote1)
    # db.session.add(post65_vote2)
    # db.session.add(post65_vote3)
    # db.session.add(post65_vote4)
    # db.session.add(post65_vote5 )
    # db.session.add(post65_vote6)
    # db.session.add(post65_vote7)
    # db.session.add(post65_vote8)
    # db.session.add(post65_vote9)
    # db.session.add(post65_vote10)
    # db.session.add(post65_vote11)
    # db.session.add(post65_vote12)
    # db.session.add(post65_vote13)

    # db.session.add(post66_vote1)
    # db.session.add(post66_vote2)

    # db.session.add(post67_vote1)
    # db.session.add(post67_vote2)
    # db.session.add(post67_vote3)
    # db.session.add(post67_vote4)
    # db.session.add(post67_vote5 )
    # db.session.add(post67_vote6)

    # db.session.add(post68_vote1)
    # db.session.add(post68_vote2)
    # db.session.add(post68_vote3)
    # db.session.add(post68_vote4)
    # db.session.add(post68_vote5 )

    # db.session.add(post69_vote1)
    # db.session.add(post69_vote2)
    # db.session.add(post69_vote3)
    # db.session.add(post69_vote4)
    # db.session.add(post69_vote5 )
    # db.session.add(post69_vote6)
    # db.session.add(post69_vote7)
    # db.session.add(post69_vote8)
    # db.session.add(post69_vote9)
    # db.session.add(post69_vote10)
    # db.session.add(post69_vote11)
    # db.session.add(post69_vote12)
    # db.session.add(post69_vote13)
    # db.session.add(post69_vote14)
    # db.session.add(post69_vote15)
    # db.session.add(post69_vote16)
    # db.session.add(post69_vote17)
    # db.session.add(post69_vote18)
    # db.session.add(post69_vote19)
    # db.session.add(post69_vote20)
    # db.session.add(post69_vote21)
    # db.session.add(post69_vote22)
    # db.session.add(post69_vote23)
    # db.session.add(post69_vote24)
    # db.session.add(post69_vote25)

    # db.session.add(post70_vote1)
    # db.session.add(post70_vote2)
    # db.session.add(post70_vote3)
    # db.session.add(post70_vote4)

    # db.session.add(post73_vote1)
    # db.session.add(post73_vote2)
    # db.session.add(post73_vote3)
    # db.session.add(post73_vote4)
    # db.session.add(post73_vote5 )
    # db.session.add(post73_vote6)
    # db.session.add(post73_vote7)
    # db.session.add(post73_vote8)
    # db.session.add(post73_vote9)
    # db.session.add(post73_vote10)
    # db.session.add(post73_vote11)
    # db.session.add(post73_vote12)
    # db.session.add(post73_vote13)
    # db.session.add(post73_vote14)
    # db.session.add(post73_vote15)
    # db.session.add(post73_vote16)
    # db.session.add(post73_vote17)
    # db.session.add(post73_vote18)
    # db.session.add(post73_vote19)
    # db.session.add(post73_vote20)

    # db.session.add(post74_vote1)

    # db.session.add(post75_vote1)
    # db.session.add(post75_vote2)
    # db.session.add(post75_vote3)
    # db.session.add(post75_vote4)
    # db.session.add(post75_vote5)
    # db.session.add(post75_vote6)
    # db.session.add(post75_vote7)
    # db.session.add(post75_vote8)
    # db.session.add(post75_vote9)
    # db.session.add(post75_vote10)
    # db.session.add(post75_vote11)
    # db.session.add(post75_vote12)
    # db.session.add(post75_vote13)
    # db.session.add(post75_vote14)
    # db.session.add(post75_vote15)
    # db.session.add(post75_vote16)
    # db.session.add(post75_vote17)
    # db.session.add(post75_vote18)
    # db.session.add(post75_vote19)
    # db.session.add(post75_vote20)
    # db.session.add(post75_vote21)
    # db.session.add(post75_vote22)
    # db.session.add(post75_vote23)
    # db.session.add(post75_vote24)
    # db.session.add(post75_vote25)
    # db.session.add(post75_vote26)
    # db.session.add(post75_vote27)
    # db.session.add(post75_vote28)
    # db.session.add(post75_vote29)
    # db.session.add(post75_vote30)
    # db.session.add(post75_vote31)
    # db.session.add(post75_vote32)
    # db.session.add(post75_vote33)
    # db.session.add(post75_vote34)
    # db.session.add(post75_vote35)
    # db.session.add(post75_vote36)
    # db.session.add(post75_vote37)
    # db.session.add(post75_vote38)
    # db.session.add(post75_vote39)
    # db.session.add(post75_vote40)
    # db.session.add(post75_vote41)
    # db.session.add(post75_vote42)
    # db.session.add(post75_vote43)
    # db.session.add(post75_vote44)
    # db.session.add(post75_vote45)
    # db.session.add(post75_vote46)
    # db.session.add(post75_vote47)
    # db.session.add(post75_vote48)
    # db.session.add(post75_vote49)
    # db.session.add(post75_vote50)

    db.session.commit()

def undo_postvotes():
    db.session.execute("DELETE FROM post_votes")
    db.session.commit()
