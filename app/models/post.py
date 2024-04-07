from .db import db


################
# POST MODEL:
################
class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    content = db.Column(db.String(40000), nullable=True)
    img_url = db.Column(db.String(255), nullable=True)
    link_url = db.Column(db.String(40000), nullable=True)
    votes = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    post_author = db.relationship('User', back_populates='user_posts')
    post_comments = db.relationship('Comment', back_populates='comment_post', cascade="all, delete-orphan")
    post_community = db.relationship('Community', back_populates="community_posts")
    users_who_liked = db.relationship("PostVote", back_populates="user_post_vote", cascade="all,delete-orphan")
    viewers = db.relationship('ViewedPost', back_populates='post')


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "title": self.title,
            "content": self.content,
            "imgUrl": self.img_url,
            "linkUrl": self.link_url,
            "votes": len([item for item in self.users_who_liked if item.to_dict()["isUpvote"]]) - len([item for item in self.users_who_liked if not item.to_dict()["isUpvote"]]),
            "postVoters": {item.to_dict()["userID"]: item.to_dict() for item in self.users_who_liked},
            "postAuthor": self.post_author.to_dict(),
            "postComments": {item.to_dict()["id"]: item.to_dict() for item in self.post_comments},
            "commentNum": len(self.post_comments),
            "communityId": self.community_id,
            "communityName": self.post_community.name if self.post_community else None,
            "communityMembers": len(self.post_community.subscribers) if self.post_community else 0,
            "communityRules": {item.to_dict()["id"]: item.to_dict() for item in (self.post_community.community_rules if self.post_community else [])},
            "communityDesc": self.post_community.description if self.post_community else None,

            "communityDate": self.post_community.created_at if self.post_community else None,

            "communitySettings": {item.to_dict()["id"]: item.to_dict() for item in (self.post_community.community_settings if self.post_community else [])},

            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    def to_dict_likes(self):
        upvotes = len([item for item in self.users_who_liked if item.to_dict()["isUpvote"]])
        downvotes = len([item for item in self.users_who_liked if not item.to_dict()["isUpvote"]])
        return {
            "likes": upvotes,
            "dislikes": downvotes
        }

    def __repr__(self):
        return f"<Post {self.id}: {self.title}>"
