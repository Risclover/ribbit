from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .joins import subscriptions, post_votes, comment_votes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    karma = db.Column(db.Integer, default=0)
    profile_img = db.Column(db.String(255), default="https://ribbit-img-upload.s3.us-west-1.amazonaws.com/user.png")
    posts = db.relationship('Post', backref='author', lazy=True)
    user_posts = db.relationship("Post", back_populates="post_author", cascade="all, delete")
    user_comments = db.relationship("Comment", back_populates="comment_author", cascade="all, delete")
    user_subscriptions = db.relationship('Community', back_populates="subscribers", secondary=subscriptions, lazy="joined")
    user_post_votes = db.relationship('Post', back_populates='users_who_liked', secondary=post_votes, lazy="joined")
    user_comment_votes = db.relationship("Comment", back_populates='comment_voters', secondary=comment_votes, lazy='joined')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'karma': sum([post.to_dict_likes()["likes"] for post in self.user_posts]),
            'profile_img': self.profile_img

            # 'subscriptions': {item.to_dict()["id"]: item.to_dict() for item in self.user_subscriptions}
            # 'subscriptions': self.user_subscriptions.to_dict()
        }
