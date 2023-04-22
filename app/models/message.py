from .db import db

user_threads = db.Table('user_threads',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('thread_id', db.Integer, db.ForeignKey('message_threads.id'), primary_key=True),
)

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.String(10000), nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey("message_threads.id"), unique=False, nullable=False)
    read = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    message_thread = db.relationship('MessageThread', back_populates="messages")
    sender = db.relationship("User", back_populates="user_messages", primaryjoin="User.id==Message.sender_id")
    recipient = db.relationship("User", primaryjoin="User.id==Message.receiver_id")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "read": self.read,
            "sender": self.sender.to_dict(),
            "receiver": self.recipient.id,
            "createdAt": self.created_at,
        }

    def __repr__(self):
        return f"<Message {self.id}: {self.content}>"


class MessageThread(db.Model):
    __tablename__ = "message_threads"

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(50), nullable=True)

    messages = db.relationship('Message', back_populates='message_thread', cascade='all, delete')
    thread_users = db.relationship('User', back_populates='user_threads', secondary=user_threads, lazy='joined')

    def to_dict(self):
        return {
            "id": self.id,
            "subject": self.subject,
            "messages": [msg.to_dict() for msg in self.messages],
            "users": [user.to_dict() for user in self.thread_users],
        }

    def __repr__(self):
        return f"<Message Thread {self.id}: {[msg.to_dict() for msg in self.messages]}>"


# class Chat(db.Model):
#     __tablename__ = "chats"

#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default = db.func.now())
#     chat_users = db.relationship("User", back_populates="user_chats", secondary="user_chat_threads", lazy="joined")
#     chat_messages = db.relationship("Message", back_populates="message_chat")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "createdAt": self.created_at,
#             "chatMessages": [message.to_dict() for message in self.chat_messages],
#             "chatUsers": [user.to_dict() for user in self.chat_users],
#             "unreadMessages": len([item for item in self.chat_messages if not item.to_dict()["isRead"]])
#         }

#     def __repr__(self):
#         return f"<Chat {self.id}>"
