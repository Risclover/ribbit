from .db import db

class PreviewCommunity(db.Model):
    __tablename__ = "preview_community"

    id = db.Column(db.Integer, primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
    base_color = db.Column(db.String(10))
    highlight = db.Column(db.String(10))
    body_background = db.Column(db.String(10))

    def to_dict(self):
        return {
            "id": self.id,
            "communityId": self.community_id,
            "baseColor": self.base_color,
            "highlight": self.highlight,
            "bodyBackground": self.body_background
        }

    def __repr__(self):
        return f"<Preview Community {self.id}>"
