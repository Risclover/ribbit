from .db import db
import datetime
# from .joins import post_karma

################
# POST MODEL:
################
class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    content = db.Column(db.String(40000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    # preview_img_id = db.Column(db.Integer, nullable=False)
    # post_community = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    # # post_images = db.relationship('ImagePost', back_populates='image_post')
    post_author = db.relationship('User', back_populates='user_posts')
    post_comments = db.relationship('Comment', back_populates='comment_post', cascade='all, delete')
    post_community = db.relationship('Community', back_populates="community_posts")
    # liked_users = db.relationship('User', back_populates='user_likes', secondary=likes, lazy='joined')
    # post_votes = db.relationship('PostVote', backref='post_votes', lazy='dynamic')


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "userId": self.user_id,
            "postAuthor": self.post_author.to_dict(),
            "communityId": self.community_id,
            # "previewImgId": self.preview_img_id,
            "postCommunity": self.post_community.to_dict(),
            # "community": {item.to_dict()["id"]: item.to_dict() for item in self.communities},
            "postComments": {item.to_dict()["id"]: item.to_dict() for item in self.post_comments},
            # "postComments": self.post_comments.to_dict(),
            # "likedUsers": {user.to_dict()["id"]: user.to_dict() for user in self.liked_users},
            # "likes": len(self.liked_users),
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    def __repr__(self):
        return f"<Post {self.id}: {self.title}"


# class ImagePost(db.Model):
#     __tablename__ = "image_posts"

#     id = db.Column(db.Integer, primary_key=True)
#     url = db.Column(db.String(1500), nullable=False)
#     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
#     image_post = db.relationship("Post", back_populates="post_images")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "url": self.url,
#             "postId": self.post_id,
#             "createdAt": self.created_at,
#             "updatedAt": self.updated_at,
#         }
#     def __repr__(self):
#         return f"<Image ID: {self.id}, Post ID: {self.post_id}>"

# # class PostImage(db.Model):
# #     __tablename__ = 'post_images'

# #     id = db.Column(db.Integer, primary_key=True)
# #     url = db.Column(db.String(1500), nullable=False)
# #     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
# #     created_at = db.Column(db.DateTime, server_default=db.func.now())
# #     updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

# #     image_post = db.relationship('Post', back_populates='post_images')

# #     def to_dict(self):
# #         return {
# #             "id": self.id,
# #             "url": self.url,
# #             "postId": self.post_id,
# #             "createdAt": self.created_at,
# #             "updatedAt": self.updated_at
# #         }

# #     def __repr__(self):
# #         return f"<Image ID: {self.id}, Post ID: {self.post_id}>"
