from .db import db
from .joins import subscriptions

class Community(db.Model):
    __tablename__ = "communities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(500))
    display_name = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    community_posts = db.relationship('Post', back_populates="post_community")
    users_who_subscribed = db.relationship('User', back_populates="user_subscriptions", secondary=subscriptions, lazy="joined")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "name": self.name,
            "displayName": self.display_name,
            "description": self.description,
            "createdAt": self.created_at,
            "subscribers": self.subscribers
            # "subscribers": self.subscribed_users.to_dict()

        }

    def __repr__(self):
        return f"<Community {self.id}: {self.name}"
