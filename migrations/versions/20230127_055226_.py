"""empty message

Revision ID: 6f106e0e35df
Revises: e5a070af3196
Create Date: 2023-01-27 05:52:26.803046

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6f106e0e35df'
down_revision = 'e5a070af3196'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('subscriptions',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('community_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['community_id'], ['communities.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'community_id')
    )
    op.create_table('PostVotes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'post_id')
    )
    op.create_table('CommentVotes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'comment_id')
    )
    op.add_column('comments', sa.Column('votes', sa.Integer(), nullable=True))
    op.add_column('communities', sa.Column('community_img', sa.String(length=255), nullable=True))
    op.add_column('posts', sa.Column('img_url', sa.String(length=255), nullable=True))
    op.add_column('posts', sa.Column('votes', sa.Integer(), nullable=True))
    op.add_column('users', sa.Column('karma', sa.Integer(), nullable=True))
    op.add_column('users', sa.Column('profile_img', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_img')
    op.drop_column('users', 'karma')
    op.drop_column('posts', 'votes')
    op.drop_column('posts', 'img_url')
    op.drop_column('communities', 'community_img')
    op.drop_column('comments', 'votes')
    op.drop_table('CommentVotes')
    op.drop_table('PostVotes')
    op.drop_table('subscriptions')
    # ### end Alembic commands ###