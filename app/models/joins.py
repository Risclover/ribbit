from app.extensions import db
from flask_login import current_user

# Subscriptions join table (users <- subscriptions -> communities)
subscriptions = db.Table(
    "subscriptions",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("community_id", db.Integer, db.ForeignKey("communities.id"), primary_key=True)
)

favorite_communities = db.Table(
    "favorite_communities",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("community_id", db.Integer, db.ForeignKey("communities.id"), primary_key=True)
)

class PostVote(db.Model):
    __tablename__ = "post_votes"

    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)
    post_id = db.Column(db.ForeignKey("posts.id", ondelete='CASCADE'), primary_key=True)
    is_upvote = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_who_liked = db.relationship("User", back_populates="user_post_votes")
    user_post_vote = db.relationship("Post", back_populates="users_who_liked")


    def to_dict(self):
        return {
            "userID": self.user_id,
            "postID": self.post_id,
            "isUpvote": self.is_upvote,
            "createdAt": self.created_at
        }

class CommentVote(db.Model):
    __tablename__ = "comment_votes"

    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)
    comment_id = db.Column(db.ForeignKey("comments.id"), primary_key=True)
    is_upvote = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_who_liked = db.relationship("User", back_populates="user_comment_votes")
    user_comment_vote = db.relationship("Comment", back_populates="users_who_liked")

    def to_dict(self):
        return {
            "userId": self.user_id,
            "commentId": self.comment_id,
            "isUpvote": self.is_upvote,
            "createdAt": self.created_at
        }

comment_votes = db.Table(
    "CommentVotes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("comment_id", db.Integer, db.ForeignKey("comments.id"), primary_key=True)
)

followers = db.Table('followers',
    db.Model.metadata,
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

favorite_users = db.Table('favorite_users',
    db.Model.metadata,
    db.Column('current_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

class ThreadUser(db.Model):
    __tablename__ = "thread_users"

    id = db.Column(db.Integer, primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('chat_message_threads.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    has_unread = db.Column(db.Boolean, default=False)

    thread = db.relationship('ChatMessageThread', back_populates="thread_users")
    user = db.relationship("User", back_populates="thread_users")

    def to_dict(self):
        return {
            "threadId": self.thread_id,
            "userId": self.userId,
            "hasUnread": any(
                tu.has_unread for tu in self.thread_users if tu.user_id == current_user.get_id()
            ),
        }

    def __repr__(self):
        return f"<ThreadUser {self.id}: {self.has_unread}>"
