from .db import db
from .joins import CommentVote

################
# COMMENT MODEL:
################
class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)
    content = db.Column(db.String(10000), nullable=False)
    votes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    comment_author = db.relationship('User', back_populates="user_comments")
    comment_post = db.relationship('Post', back_populates='post_comments')
    users_who_liked = db.relationship("CommentVote", back_populates="user_comment_vote", cascade='all, delete-orphan')
    children = db.relationship(
        'Comment',
        backref=db.backref('parent', remote_side=[id]),
        lazy='joined',
        cascade="all, delete-orphan"
    )

    def calculated_votes(self):
        upvotes = db.session.query(CommentVote).filter_by(comment_id=self.id, is_upvote=True).count()
        downvotes = db.session.query(CommentVote).filter_by(comment_id=self.id, is_upvote=False).count()
        return upvotes - downvotes

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "postId": self.post_id,
            "userId": self.user_id,
            "parentId": self.parent_id,
            "commentAuthor": {
                "id": self.comment_author.id,
                "username": self.comment_author.username,
                "profileImg": self.comment_author.profile_img,
                # Add other non-recursive fields as needed
            },
            "votes": self.calculated_votes(),
            "upvotes": db.session.query(CommentVote).filter_by(comment_id=self.id, is_upvote=True).count(),
            "downvotes": db.session.query(CommentVote).filter_by(comment_id=self.id, is_upvote=False).count(),
            "commentVoters": {item.to_dict()["userId"]: item.to_dict() for item in self.users_who_liked},
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "children": [child.to_dict() for child in self.children]  # Serialize nested comments

        }

    def to_dict_likes(self):
        upvotes = len([item for item in self.users_who_liked if item.to_dict()["isUpvote"]])
        downvotes = len([item for item in self.users_who_liked if not item.to_dict()["isUpvote"]])
        return {
            "likes": upvotes,
            "dislikes": downvotes
        }

    def __repr__(self):
        return f"<Comment {self.id}: {self.content}>"
