# from .db import db
# from .joins import user_chat_threads

# class Chat(db.Model):
#     __tablename__ = "chats"

#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.String(2000), nullable=False)
#     read = db.Column(db.Boolean, default=False, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     chat_thread_id = db.Column(db.Integer, db.ForeignKey("chat_threads.id"), nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())

#     chat_owner = db.relationship("User", back_populates="user_chats")
#     chat_thread = db.relationship("ChatThread", back_populates="thread_chats")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "content": self.content,
#             "read": self.read,
#             "userId": self.user_id,
#             "chatThreadId": self.chat_thread_id,
#             "createdAt": self.created_at,
#             "chatOwner": self.chat_owner.to_dict()
#         }

#     def __repr__(self):
#         return f"<Chat {self.id}>"


# class ChatThread(db.Model):
#     __tablename__ = "chat_threads"

#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())

#     chat_users = db.relationship("User", back_populates="user_chats", secondary=user_chat_threads, lazy='joined')
#     thread_chats = db.relationship("Chat", back_populates="chat_thread")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "createdAt": self.created_at,
#             "threadChats": [msg.to_dict() for msg in self.thread_chats],
#             "unreadMsgs": len([msg.to_dict() for msg in self.thread_chats if msg.read is False]),
#             "chatUsers": [user.to_dict() for user in self.chat_users]
#         }

#     def __repr__(self):
#         return f"<Chat Thread {self.id}>"
