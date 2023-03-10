from builtins import property
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from ..models.message import Message
from .joins import subscriptions
from datetime import datetime
import json
from time import time

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
    # messages_sent = db.relationship('Message',
    #                                 foreign_keys='Message.sender_id',
    #                                 backref='author', lazy='dynamic')
    # messages_received = db.relationship('Message',
    #                                     foreign_keys='Message.recipient_id',
    #                                     backref='recipient', lazy='dynamic')
    # last_message_read_time = db.Column(db.DateTime)
    # notifications = db.relationship('Notification', backref='user', lazy='dynamic')
    # followed = db.relationship(
    #     'User', secondary=followers,
    #     primaryjoin=(followers.c.follower_id == id),
    #     secondaryjoin=(followers.c.followed_id == id),
    #     backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')
    # posts = db.relationship('Post', backref='author', lazy=True)


    user_posts = db.relationship("Post", back_populates="post_author", cascade="all, delete-orphan")
    user_comments = db.relationship("Comment", back_populates="comment_author", cascade="all, delete-orphan")
    user_subscriptions = db.relationship('Community', back_populates="subscribers", secondary=subscriptions, lazy="joined")
    user_post_votes = db.relationship("PostVote", back_populates="user_who_liked")
    user_comment_votes = db.relationship("CommentVote", back_populates="user_who_liked")
    user_communities = db.relationship('Community', back_populates="community_owner", cascade="all, delete")
    # user_messages = db.relationship("Message", back_populates="message_sender")
    # user_chats = db.relationship("Chat", back_populates="chat_users", secondary="user_chat_threads", lazy="joined")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def follow(self, user):
    #     if not self.is_following(user):
    #         self.followed.append(user)

    # def unfollow(self, user):
    #     if self.is_following(user):
    #         self.followed.remove(user)

    # def is_following(self, user):
    #     return self.followed.filter(
    #         followers.c.followed_id == user.id).count() > 0

    # def followed_posts(self):
    #     return Post.query.join(
    #         followers, (followers.c.followed_id == Post.user_id)).filter(
    #             followers.c.follower_id == self.id).order_by(
    #                 Post.created_at.desc())

    # def new_messages(self):
    #     last_read_time = self.last_message_read_time or datetime(1900, 1, 1)
    #     return Message.query.filter_by(recipient=self).filter(
    #         Message.timestamp > last_read_time).count()

    # def add_notification(self, name, data):
    #     self.notifications.filter_by(name=name).delete()
    #     n = Notification(name=name, payload_json=json.dumps(data), user=self)
    #     db.session.add(n)
    #     return n

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "createdAt": self.created_at,
            'displayName': self.display_name,
            'about': self.about,
            'userPosts': len(self.user_posts),
            'karma': (sum([post.to_dict_likes()["likes"] for post in self.user_posts]) - sum([post.to_dict_likes()["dislikes"] for post in self.user_posts])) + (sum([comment.to_dict_likes()["likes"] for comment in self.user_comments]) - sum([comment.to_dict_likes()["dislikes"] for comment in self.user_comments])),
            'postKarma': sum([post.to_dict_likes()["likes"] for post in self.user_posts]) - sum([post.to_dict_likes()["dislikes"] for post in self.user_posts]),
            'commentKarma': sum([comment.to_dict_likes()["likes"] for comment in self.user_comments]) - sum([comment.to_dict_likes()["dislikes"] for comment in self.user_comments]),
            'profile_img': self.profile_img,
            'bannerImg': self.banner_img,
            # 'messagesReceived': {item.to_dict()["id"]: item.to_dict() for item in self.messages_received},
            # 'messagesSent': {item.to_dict()["id"]: item.to_dict() for item in self.messages_sent}
            # 'followers': self.followers,
            # 'userCommunities': {item.to_dict()["id"]: item.to_dict() for item in self.user_communities},

            # 'subscriptions': {item.to_dict()["id"]: item.to_dict() for item in self.user_subscriptions}
            # 'subscriptions': self.user_subscriptions.to_dict()
        }

    def __repr__(self):
        return f"<User {self.id}: {self.username}>"
