from .db import db
# from .joins import comment_karma

################
# COMMENT MODEL:
################
class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    # parent_comment =
    comment_author = db.relationship('User', back_populates="user_comments")
    comment_post = db.relationship('Post', back_populates='post_comments', cascade='all, delete')
    # comment_post = db.relationship('Post', back_populates=('post_comments'))

    def to_dict(self):
        return {
            "id": self.id,
            "postId": self.post_id,
            "userId": self.user_id,
            "commentAuthor": self.comment_author.to_dict(),
            # "commentPosts": self.comment_posts.to_dict(),
            "content": self.content,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }

    def __repr__(self):
        return f"<Comment {self.id}: {self.content}"
