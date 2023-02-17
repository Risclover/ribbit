from .db import db

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())

    message_sender = db.relationship("User", back_populates="user_messages")
    message_chat = db.relationship("Chat", back_populates="chat_messages")

    def to_dict(self):
        return {
            "id": self.id,
            "sender": self.message_sender.to_dict(),
            "chatId": self.chat_id,
            "message": self.message,
            "isRead": self.is_read,
            "createdAt": self.createdAt,
        }

    def __repr__(self):
        return f"<Message {self.id}: {self.body}>"


class Chat(db.Model):
    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    chat_users = db.relationship("User", back_populates="user_chats", secondary="user_chat_threads", lazy="joined")
    chat_messages = db.relationship("Message", back_populates="message_chat")

    def to_dict(self):
        return {
            "id": self.id,
            "createdAt": self.created_at,
            "chatMessages": [message.to_dict() for message in self.chat_messages],
            "chatUsers": [user.to_dict() for user in self.chat_users],
            "unreadMessages": len([item for item in self.chat_messages if not item.to_dict()["isRead"]])
        }

    def __repr__(self):
        return f"<Chat {self.id}>"
