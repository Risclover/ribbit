from .db import db

################
# COMMENT MODEL:
################
class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(10000), nullable=False)
    votes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    # parent_comment =
    comment_author = db.relationship('User', back_populates="user_comments")
    comment_post = db.relationship('Post', back_populates='post_comments')
    users_who_liked = db.relationship("CommentVote", back_populates="user_comment_vote")
    # comment_post = db.relationship('Post', back_populates=('post_comments'))

    def to_dict(self):
        return {
            "id": self.id,
            "postId": self.post_id,
            "userId": self.user_id,
            "commentAuthor": self.comment_author.to_dict(),
            "votes": len(self.users_who_liked),
            "commentVoters": {item.to_dict()["userId"]: item.to_dict() for item in self.users_who_liked},
            # "commentPosts": self.comment_posts.to_dict(),
            "content": self.content,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }

    def to_dict_likes(self):
        return {
            "likes": len({item.to_dict()["userID"]: item.to_dict()["isUpvote"] for item in self.users_who_liked}),
            "dislikes": len({item.to_dict()["userID"]: item.to_dict()["isDownvote"] for item in self.users_who_liked})
        }

    def __repr__(self):
        return f"<Comment {self.id}: {self.content}"
