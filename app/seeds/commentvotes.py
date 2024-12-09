from app.models import db, CommentVote

def seed_commentvotes():
    db.session.add_all([
        #----------------------- POST 1 -----------------------#
        CommentVote(user_id=1, comment_id=1, is_upvote=True),
        CommentVote(user_id=2, comment_id=1, is_upvote=True),
        CommentVote(user_id=3, comment_id=1, is_upvote=True),
        CommentVote(user_id=4, comment_id=1, is_upvote=True),
        CommentVote(user_id=5, comment_id=1, is_upvote=True),
        CommentVote(user_id=3, comment_id=2, is_upvote=True),
        CommentVote(user_id=1, comment_id=2, is_upvote=False),
        CommentVote(user_id=2, comment_id=2, is_upvote=False),
        CommentVote(user_id=5, comment_id=2, is_upvote=False)
    ])
    db.session.commit()

def undo_commentvotes():
    db.session.execute("DELETE FROM comment_votes")
    db.session.commit()
