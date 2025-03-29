from .db import db

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    actor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    action = db.Column(db.String(255), nullable=False)
    resource_id = db.Column(db.Integer, nullable=True)
    resource_type = db.Column(db.String(50), nullable=True)
    message = db.Column(db.String(255), nullable=True)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", foreign_keys=[user_id])
    actor = db.relationship("User", foreign_keys=[actor_id])

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "actorId": self.actor_id,
            "action": self.action,
            "resourceId": self.resource_id,
            "resourceType": self.resource_type,
            "message": self.message,
            "isRead": self.is_read,
            "createdAt": str(self.created_at)
        }

    def __repr__(self):
        return f'<Notification {self.id}: {self.message}>'
