from .db import db

class CommunitySettings(db.Model):
    __tablename__ = "community_settings"

    id = db.Column(db.Integer, primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)

    base_color = db.Column(db.String(10), default="var(--highlight-color)", nullable=False)
    highlight = db.Column(db.String(10), default="var(--highlight-color)", nullable=False)
    bg_color = db.Column(db.String(10), default="#dae0e6", nullable=False)

    background_img = db.Column(db.String(255), nullable=True)
    background_img_format = db.Column(db.String(10), default="fill", nullable=False)
    name_format = db.Column(db.String(5), default="c/")

    hide_community_icon = db.Column(db.Boolean, default=False, nullable=False)
    community_icon = db.Column(db.String(255), default="https://i.imgur.com/9CI9hiO.png")

    banner_height = db.Column(db.String(10), default="64px", nullable=False)
    banner_color = db.Column(db.String(10), default="#33a8ff", nullable=False)
    custom_banner_color = db.Column(db.Boolean, default=False)
    banner_img = db.Column(db.String(255), nullable=True)
    banner_img_format = db.Column(db.String(10), default="fill", nullable=False)

    secondary_banner_img = db.Column(db.String(255), nullable=True)
    hover_banner_img = db.Column(db.String(255), nullable=True)
    secondary_banner_format = db.Column(db.String(10), default="left", nullable=False)
    mobile_banner_img = db.Column(db.String(255), nullable=True)

    active_link_color = db.Column(db.String(10), default="var(--highlight-color)", nullable=False)
    inactive_link_color = db.Column(db.String(10), default="var(--highlight-color)", nullable=False)
    hover_link_color = db.Column(db.String(10), default="var(--highlight-color)", nullable=False)
    menu_bg_color = db.Column(db.String(10), default="#dbf0ff", nullable=False)
    submenu_bg_color = db.Column(db.String(10), default="#dbf0ff", nullable=False)

    post_title_color = db.Column(db.String(10), default="#222222", nullable=False)
    upvote_img_active = db.Column(db.String(255), nullable=True)
    upvote_img_inactive = db.Column(db.String(255), nullable=True)
    downvote_img_active = db.Column(db.String(255), nullable=True)
    downvote_img_inactive = db.Column(db.String(255), nullable=True)
    upvote_count_color = db.Column(db.String(10), default="#FF4500", nullable=False)
    downvote_count_color = db.Column(db.String(10), default="#7193FF", nullable=False)
    post_bg_color = db.Column(db.String(10), default="#FFFFFF", nullable=False)
    post_bg_img = db.Column(db.String(255), nullable=True)
    post_bg_img_format = db.Column(db.String(10), default="fill", nullable=False)
    link_placeholder_img = db.Column(db.String(255), nullable=True)
    link_placeholder_img_format = db.Column(db.String(10), default="fill", nullable=False)

    settings_of_community = db.relationship("Community", back_populates="community_settings")

    def to_dict(self):
        return {
            "id": self.id,
            "communityId": self.community_id,
            "baseColor": self.base_color,
            "highlight": self.highlight,
            "bgColor": self.bg_color,
            "backgroundImg": self.background_img,
            "backgroundImgFormat": self.background_img_format,
            "nameFormat": self.name_format,
            "hideCommunityIcon": self.hide_community_icon,
            "communityIcon": self.community_icon,
            "bannerHeight": self.banner_height,
            "bannerColor": self.banner_color,
            "customBannerColor": self.custom_banner_color,
            "bannerImg": self.banner_img,
            "bannerImgFormat": self.banner_img_format,
            "secondaryBannerImg": self.secondary_banner_img,
            "hoverBannerImg": self.hover_banner_img,
            "secondaryBannerFormat": self.secondary_banner_format,
            "mobileBannerImg": self.mobile_banner_img,
            "activeLinkColor": self.active_link_color,
            "inactiveLinkColor": self.inactive_link_color,
            "hoverLinkColor": self.hover_link_color,
            "menuBgColor": self.menu_bg_color,
            "submenuBgColor": self.submenu_bg_color,
            "postTitleColor": self.post_title_color,
            "upvoteImgActive": self.upvote_img_active,
            "upvoteImgInactive": self.upvote_img_inactive,
            "downvoteImgActive": self.downvote_img_active,
            "downvoteImgInactive": self.downvote_img_inactive,
            "upvoteCountColor": self.upvote_count_color,
            "downvoteCountColor": self.downvote_count_color,
            "postBgColor": self.post_bg_color,
            "postBgImg": self.post_bg_img,
            "postBgImgFormat": self.post_bg_img_format,
            "linkPlaceholderImg": self.link_placeholder_img,
            "linkPlaceholderImgFormat": self.link_placeholder_img_format
        }

    def __repr__(self):
        return f"<Community Settings {self.id}: Community {self.community_id}>"
