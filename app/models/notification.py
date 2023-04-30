from .db import db

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String, nullable=False)
    is_read = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "message": self.message,
            "type": self.type,
            "isRead": self.is_read,
            "createdAt": self.createdAt
        }

    def __repr__(self):
        return f'<Notification {self.id}: {self.message}>'
