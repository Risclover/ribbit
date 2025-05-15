from app.extensions import db

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    actor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    action = db.Column(db.String(255), nullable=False)
    resource_id = db.Column(db.Integer, nullable=True)
    resource_type = db.Column(db.String(50), nullable=True)
    resource_content = db.Column(db.String(10000), nullable=True)
    message = db.Column(db.String(255), nullable=True)
    is_read = db.Column(db.Boolean, default=False)
    is_seen = db.Column(db.Boolean, default=False, nullable=False)
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
            "resourceContent": self.resource_content,
            "message": self.message,
            "isRead": self.is_read,
            "isSeen": self.is_seen,
            "createdAt": self.created_at.isoformat()
        }

    def __repr__(self):
        return f'<Notification {self.id}: {self.message}>'
