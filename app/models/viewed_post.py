from .db import db
from datetime import datetime, timezone

class ViewedPost(db.Model):
    __tablename__ = "viewed_posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    user = db.relationship("User", back_populates="viewed_posts")
    post = db.relationship("Post", back_populates="post_viewers")


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "postId": self.post_id,
            "timestamp": self.timestamp,
            "post": self.post.to_dict()
        }

    def __repr__(self):
        return f"<ViewedPost {self.id}: post id {self.post_id} by user id {self.user_id}>"
