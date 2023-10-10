from .db import db

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

viewed_posts = db.Table(
    "viewed_posts",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id"), primary_key=True)
)

class PostVote(db.Model):
    __tablename__ = "post_votes"

    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)
    post_id = db.Column(db.ForeignKey("posts.id"), primary_key=True)
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
