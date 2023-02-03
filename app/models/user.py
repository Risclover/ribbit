from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .joins import subscriptions

def defaultdisplay(context):
    return context.get_current_parameters()['username']

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    display_name = db.Column(db.String(30), default=defaultdisplay, nullable=True)
    about = db.Column(db.String(200), nullable=True)
    karma = db.Column(db.Integer, default=0)
    profile_img = db.Column(db.String(255), default="https://i.imgur.com/OkrlO4H.png")
    banner_img = db.Column(db.String(255), nullable=True)
    followers = db.Column(db.Integer, default=0)
    # posts = db.relationship('Post', backref='author', lazy=True)


    user_posts = db.relationship("Post", back_populates="post_author", cascade="all, delete-orphan")
    user_comments = db.relationship("Comment", back_populates="comment_author", cascade="all, delete-orphan")
    user_subscriptions = db.relationship('Community', back_populates="subscribers", secondary=subscriptions, lazy="joined")
    user_post_votes = db.relationship("PostVote", back_populates="user_who_liked")
    user_comment_votes = db.relationship("CommentVote", back_populates="user_who_liked")
    user_communities = db.relationship('Community', back_populates="community_owner", cascade="all, delete")

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
            "createdAt": self.created_at,
            'displayName': self.display_name,
            'about': self.about,
            'postKarma': sum([post.to_dict_likes()["likes"] for post in self.user_posts]) - sum([post.to_dict_likes()["dislikes"] for post in self.user_posts]),
            'commentKarma': sum([comment.to_dict_likes()["likes"] for comment in self.user_comments]) - sum([comment.to_dict_likes()["dislikes"] for comment in self.user_comments]),
            'karma': (sum([post.to_dict_likes()["likes"] for post in self.user_posts]) - sum([post.to_dict_likes()["dislikes"] for post in self.user_posts])) + (sum([comment.to_dict_likes()["likes"] for comment in self.user_comments]) - sum([comment.to_dict_likes()["dislikes"] for comment in self.user_comments])),
            'profile_img': self.profile_img,
            'bannerImg': self.banner_img,
            'followers': self.followers,
            # 'userCommunities': {item.to_dict()["id"]: item.to_dict() for item in self.user_communities},

            # 'subscriptions': {item.to_dict()["id"]: item.to_dict() for item in self.user_subscriptions}
            # 'subscriptions': self.user_subscriptions.to_dict()
        }

    def __repr__(self):
        return f"<User {self.id}: {self.username}>"
