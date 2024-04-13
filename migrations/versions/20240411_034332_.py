"""empty message

Revision ID: b01d020f9cb9
Revises: 7947d7d134f2
Create Date: 2024-04-11 03:43:32.947153

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b01d020f9cb9'
down_revision = '7947d7d134f2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'viewed_post', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'viewed_post', 'posts', ['post_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'viewed_post', type_='foreignkey')
    op.drop_constraint(None, 'viewed_post', type_='foreignkey')
    # ### end Alembic commands ###
