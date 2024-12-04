from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from ..models.message import Message
from ..models.post import Post
from ..models.message import user_threads
from ..models.chat import user_chat_threads
from .joins import subscriptions, favorite_communities, followers, favorite_users

def default_display(context):
    return context.get_current_parameters()['username']

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    display_name = db.Column(db.String(30), default=default_display, nullable=True)
    about = db.Column(db.String(200), nullable=True)
    karma = db.Column(db.Integer, default=0)
    profile_img = db.Column(db.String(255), default="https://i.imgur.com/OkrlO4H.png")
    banner_img = db.Column(db.String(255), nullable=True)

    followed = db.relationship('User', secondary=followers, primaryjoin=(followers.c.follower_id == id), secondaryjoin=(followers.c.followed_id == id), backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    favorited = db.relationship('User', secondary=favorite_users, primaryjoin=(favorite_users.c.current_id == id), secondaryjoin=(favorite_users.c.user_id == id), backref=db.backref('favorite_users', lazy='dynamic'), lazy='dynamic')

    user_posts = db.relationship("Post", back_populates="post_author", cascade="all, delete-orphan")
    user_comments = db.relationship("Comment", back_populates="comment_author", cascade="all, delete-orphan")
    user_subscriptions = db.relationship('Community', back_populates="subscribers", secondary=subscriptions, lazy="joined")

    user_favorite_communities = db.relationship('Community', back_populates='users_who_favorited', secondary=favorite_communities, lazy="joined")

    viewed_posts = db.relationship('ViewedPost', back_populates='user')

    user_post_votes = db.relationship("PostVote", back_populates="user_who_liked", cascade="all,delete-orphan")
    user_comment_votes = db.relationship("CommentVote", back_populates="user_who_liked")
    user_communities = db.relationship('Community', back_populates="community_owner", cascade="all, delete")

    user_threads = db.relationship('MessageThread', back_populates='thread_users', secondary=user_threads, lazy='joined')
    user_messages = db.relationship('Message', back_populates='sender', overlaps="recipient", primaryjoin="User.id==Message.receiver_id", cascade='all, delete')

    chat_threads = db.relationship('ChatMessageThread', back_populates='chat_thread_users', secondary=user_chat_threads, lazy='joined')
    user_chat_messages = db.relationship('ChatMessage', back_populates='sender', overlaps="recipient", primaryjoin="User.id==ChatMessage.receiver_id", cascade='all, delete')
    reactions = db.relationship('Reaction', back_populates="user")
    thread_users = db.relationship("ThreadUser", back_populates="user", cascade="all, delete-orphan")



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0

    def followed_posts(self):
        followed_posts = Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id)
        # user_posts = Post.query.filter_by(user_id=self.id)
        # return followed_posts.union(user_posts)
        return followed_posts

    def followed_users(self):
        followed = User.query.join(
            followers, (followers.c.followed_id == User.id)).filter(
                followers.c.follower_id == self.id)
        return followed

    def user_followers(self):
        follower = User.query.join(
            followers, (followers.c.follower_id == User.id)).filter(
                followers.c.followed_id == self.id)
        return follower

    def favorite(self, user):
        if not self.is_favorited(user):
            self.favorited.append(user)

    def unfavorite(self, user):
        if self.is_favorited(user):
            self.favorited.remove(user)

    def is_favorited(self, user):
        return self.favorited.filter(
            favorite_users.c.user_id == user.id).count() > 0


    def favorited_users(self):
        favorited = User.query.join(
            favorite_users, (favorite_users.c.user_id == User.id)).filter(
            favorite_users.c.current_id == self.id)
        return favorited

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
            'profileImg': self.profile_img,
            'bannerImg': self.banner_img,
            'unreadMsgs': len([msg.id for msg in self.user_messages if not msg.read])

        }

    def __repr__(self):
        return f"<User {self.id}: {self.username}>"
