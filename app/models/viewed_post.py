from .db import db

class ViewedPost(db.Model):
    __tablename__ = "viewed_posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "postId": self.post_id,
            "createdAt": self.created_at
        }

    def __repr__(self):
        return f"<ViewedPost {self.id}: {self.post}>"
