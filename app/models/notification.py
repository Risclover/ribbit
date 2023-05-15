from .db import db

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=True)
    comment_id=db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)
    message = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(255), nullable=False)
    title = db.Column(db.Text, nullable=True)
    type = db.Column(db.String, nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "senderId": self.sender_id,
            "postId": self.post_id,
            "commentId": self.comment_id,
            "title": self.title,
            "icon": self.icon,
            "message": self.message,
            "content": self.content,
            "type": self.type,
            "read": self.read,
            "createdAt": self.created_at
        }

    def __repr__(self):
        return f'<Notification {self.id}: {self.message}>'
