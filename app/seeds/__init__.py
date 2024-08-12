from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .communities import seed_communities, undo_communities
from .rules import seed_rules, undo_rules
from .followers import seed_followers, undo_followers
from .subscriptions import seed_subscriptions, undo_subscriptions
from .postvotes import seed_postvotes, undo_postvotes
from .community_settings import seed_community_settings, undo_community_settings

from app.models.db import db

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_users()
    seed_communities()
    seed_posts()
    # seed_comments()
    # seed_rules()
    # seed_followers()
    seed_subscriptions()
    # seed_postvotes()
    seed_community_settings()

@seed_commands.command('undo')
def undo():
    undo_community_settings()
    # undo_postvotes()
    undo_subscriptions()
    # undo_followers()
    # undo_rules()
    # undo_comments()
    undo_posts()
    undo_communities()
    undo_users()
