# from .db import db

# # Subscriptions join table (users <- subscriptions -> communities)
# subscriptions = db.Table(
#     "subscriptions",
#     db.Model.metadata,
#     db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
#     db.Column("community_id", db.Integer, db.ForeignKey("communities.id"), primary_key=True)
# )
