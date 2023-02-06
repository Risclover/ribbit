from .db import db

class Rule(db.Model):
    __tablename__ = "rules"

    id = db.Column(db.Integer, primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
    title = db.Column(db.String(100))
    description = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    rule_of_community = db.relationship("Community", back_populates="community_rules")

    def to_dict(self):
        return {
            "id": self.id,
            "communityId": self.community_id,
            "title": self.title,
            "description": self.description,
            "createdAt": self.created_at
        }
