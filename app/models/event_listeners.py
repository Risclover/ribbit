from sqlalchemy import event
from app.models import Comment, Post
from app.extensions import db

@event.listens_for(Comment, "after_insert")
def inc_comment_num(mapper, conn, target):
    conn.execute(
        Post.__table__.update()
        .where(Post.id == target.post_id)
        .values(comment_num = Post.comment_num + 1)
    )

@event.listens_for(Comment, "after_delete")
def dec_comment_num(mapper, conn, target):
    conn.execute(
        Post.__table__.update()
        .where(Post.id == target.post_id)
        .values(comment_num = Post.comment_num - 1)
    )
