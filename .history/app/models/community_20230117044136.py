from .db import db

class Community(db.Model):
    __tablename__ = "communities"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    community_posts = db.relationship('Post', back_populates="post_community")

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "name": self.name,
            "description": self.description,
            "createdAt": self.created_at
        }

    def __repr__(self):
        return f"<Community {self.id}: {self.name}"
