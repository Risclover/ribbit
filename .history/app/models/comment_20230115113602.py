from .db import db

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(10000), nullable=False)
    user_id = db.Column(db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    comment_author = db.relationship('User', back_populates='user_comments')

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "userId": self.user_id,
            "postId": self.post_id,
            "commentAuthor": self.comment_author,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }

    def __repr__(self):
        return f"<Comment {self.id}: {self.content}"
