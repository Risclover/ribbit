from .db import db

user_chat_threads = db.Table('user_chat_threads',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('chat_thread_id', db.Integer, db.ForeignKey('chat_message_threads.id'), primary_key=True),
)

class ChatMessage(db.Model):
    __tablename__ = "chat_messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.String(10000), nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey("chat_message_threads.id"), unique=False, nullable=False)
    read = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    chat_message_thread = db.relationship('ChatMessageThread', back_populates="messages")
    sender = db.relationship("User", back_populates="user_chat_messages", primaryjoin="User.id==ChatMessage.sender_id")
    recipient = db.relationship("User", primaryjoin="User.id==ChatMessage.receiver_id")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "read": self.read,
            "sender": self.sender.to_dict(),
            "receiver": self.recipient.to_dict(),
            "threadId": self.thread_id,
            "createdAt": self.created_at,
        }

    def __repr__(self):
        return f"<Chat Message {self.id}: {self.content}>"


class ChatMessageThread(db.Model):
    __tablename__ = "chat_message_threads"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    messages = db.relationship('ChatMessage', back_populates='chat_message_thread', cascade='all, delete')
    chat_thread_users = db.relationship('User', back_populates='chat_threads', secondary=user_chat_threads, lazy='joined')

    def to_dict(self):
        return {
            "id": self.id,
            "messages": [msg.to_dict() for msg in self.messages],
            "users": [user.to_dict() for user in self.chat_thread_users],
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }

    def __repr__(self):
        return f"<Chat Message Thread {self.id}: {[msg.to_dict() for msg in self.messages]}>"
