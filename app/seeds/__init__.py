from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .communities import seed_communities, undo_communities
from .rules import seed_rules, undo_rules

from app.models.db import db

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_communities()
    seed_posts()
    seed_comments()
    seed_rules()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_rules()
    undo_comments()
    undo_posts()
    undo_communities()
    undo_users()
    # Add other undo functions here
