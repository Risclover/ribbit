"""Add pg_trgm extension and GIN indexes for full-text search

Revision ID: 2ca4b0efb529
Revises: 833cfeb88c17
Create Date: 2024-10-23 16:36:32.110084

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text

# revision identifiers, used by Alembic.
revision = '2ca4b0efb529'
down_revision = '833cfeb88c17'
branch_labels = None
depends_on = None


def upgrade():
    # Create the pg_trgm extension
    op.execute('CREATE EXTENSION IF NOT EXISTS pg_trgm;')

    # Create GIN indexes for full-text search optimization
    op.execute('CREATE INDEX idx_community_name ON communities USING GIN (name gin_trgm_ops);')
    op.execute('CREATE INDEX idx_user_username ON users USING GIN (username gin_trgm_ops);')
    op.execute('CREATE INDEX idx_post_title ON posts USING GIN (title gin_trgm_ops);')
    op.execute('CREATE INDEX idx_post_content ON posts USING GIN (content gin_trgm_ops);')
    op.execute('CREATE INDEX idx_comment_content ON comments USING GIN (content gin_trgm_ops);')


def downgrade():
    # Drop the GIN indexes
    op.drop_index('idx_comment_content', table_name='comments')
    op.drop_index('idx_post_content', table_name='posts')
    op.drop_index('idx_post_title', table_name='posts')
    op.drop_index('idx_user_username', table_name='users')
    op.drop_index('idx_community_name', table_name='communities')

    # Optionally, drop the pg_trgm extension
    # Be cautious with this, as other parts of your database might depend on it
    # op.execute('DROP EXTENSION IF EXISTS pg_trgm;')
