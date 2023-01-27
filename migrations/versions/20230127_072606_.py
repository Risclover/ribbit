"""empty message

Revision ID: ca080559e379
Revises: 89d8b5e45d91
Create Date: 2023-01-27 07:26:06.643797

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ca080559e379'
down_revision = '89d8b5e45d91'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post_votes', sa.Column('id', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('post_votes', 'id')
    # ### end Alembic commands ###
