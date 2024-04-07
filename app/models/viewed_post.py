from .db import db
from datetime import datetime, timezone

class ViewedPost(db.Model):
    __tablename__ = "viewed_posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    viewed_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    user = db.relationship('User', back_populates='viewed_posts')
    post = db.relationship('Post', back_populates='viewers')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "postId": self.post_id,
            "viewedAt": self.viewed_at
        }

    def __repr__(self):
        return f"<ViewedPost {self.id}: {self.post}>"
