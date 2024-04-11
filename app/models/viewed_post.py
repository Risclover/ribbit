from .db import db
from datetime import datetime, timezone

class ViewedPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "postId": self.post_id,
            "viewedAt": self.viewed_at
        }

    def __repr__(self):
        return f"<ViewedPost user_id={self.user_id} post_id={self.post_id}>"
