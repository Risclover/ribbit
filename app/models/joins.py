from .db import db

# Subscriptions join table (users <- subscriptions -> communities)
subscriptions = db.Table(
    "subscriptions",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("community_id", db.Integer, db.ForeignKey("communities.id"), primary_key=True)
)

class PostVote(db.Model):
    __tablename__ = "post_votes"

    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)
    post_id = db.Column(db.ForeignKey("posts.id"), primary_key=True)
    is_upvote = db.Column(db.Boolean)
    user_who_liked = db.relationship("User", back_populates="user_post_votes")
    user_post_vote = db.relationship("Post", back_populates="users_who_liked")


    def to_dict(self):
        return {
            "userID": self.user_id,
            "postID": self.post_id,
            "isUpvote": self.is_upvote
        }




comment_votes = db.Table(
    "CommentVotes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("comment_id", db.Integer, db.ForeignKey("comments.id"), primary_key=True)
)
