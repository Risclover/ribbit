from app.extensions import db

class Reaction(db.Model):
    __tablename__ = "chat_reactions"

    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('chat_messages.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reaction_type = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='reactions')
    message = db.relationship('ChatMessage', back_populates='reactions')

    def to_dict(self):
        return {
            "id": self.id,
            "messageId": self.message_id,
            "userId": self.user_id,
            "reactionType": self.reaction_type
        }

    def __repr__(self):
        return f"<Reaction {self.id}: {self.reaction_type} for user id {self.user_id} and message {self.message_id}"
