from app.extensions import db
from .joins import subscriptions, favorite_communities

class Community(db.Model):
    __tablename__ = "communities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    display_name = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    community_posts = db.relationship('Post', back_populates="post_community", cascade="all, delete-orphan")
    subscribers = db.relationship('User', back_populates="user_subscriptions", secondary=subscriptions, lazy="joined")
    users_who_favorited = db.relationship('User', back_populates='user_favorite_communities', secondary=favorite_communities, lazy="joined")
    community_owner = db.relationship('User', back_populates="user_communities")
    community_rules = db.relationship("Rule", back_populates="rule_of_community", cascade="all, delete")
    community_settings = db.relationship("CommunitySettings", back_populates="settings_of_community", cascade="all, delete", uselist=False)


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "name": self.name,
            "displayName": self.display_name,
            "description": self.description,
            "createdAt": self.created_at,
            'subscribers': {item.to_dict()["id"]: item.to_dict() for item in self.subscribers},
            'usersWhoFavorited': {item.to_dict()["id"]: item.to_dict() for item in self.users_who_favorited},
            'members': len(self.subscribers),
            'communityPosts': {item.to_dict()["id"]: item.to_dict() for item in self.community_posts},
            'communityOwner': self.community_owner.to_dict(),
            "communityRules": {item.to_dict()["id"]: item.to_dict() for item in self.community_rules},
            "communitySettings": {item.to_dict()["id"]: item.to_dict() for item in self.community_settings},
        }

    def __repr__(self):
        return f"<Community {self.id}: {self.name}>"
