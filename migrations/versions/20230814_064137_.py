"""empty message

Revision ID: affad6bc540b
Revises: 83232a3ad82d
Create Date: 2023-08-14 06:41:37.260232

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'affad6bc540b'
down_revision = '83232a3ad82d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chat_message_reaction', sa.Column('reaction_count', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('chat_message_reaction', 'reaction_count')
    # ### end Alembic commands ###