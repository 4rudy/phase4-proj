"""empty message

Revision ID: d2642d830d3d
Revises: d1628ded6828
Create Date: 2023-12-21 23:08:19.721567

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2642d830d3d'
down_revision = 'd1628ded6828'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('attributes')
    op.drop_table('builds')
    op.drop_table('powers')
    op.drop_table('build_attribute_association')
    op.drop_table('power_regions_association')
    op.drop_table('regions')
    op.drop_table('characters')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('characters',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('build_id', sa.INTEGER(), nullable=True),
    sa.Column('origin', sa.INTEGER(), nullable=True),
    sa.Column('power_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['build_id'], ['builds.id'], name='fk_characters_build_id_builds'),
    sa.ForeignKeyConstraint(['origin'], ['regions.id'], name='fk_characters_origin_regions'),
    sa.ForeignKeyConstraint(['power_id'], ['powers.id'], name='fk_characters_power_id_powers'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('regions',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('climate', sa.VARCHAR(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.Column('powers_column', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('power_regions_association',
    sa.Column('power_id', sa.INTEGER(), nullable=False),
    sa.Column('region_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['power_id'], ['powers.id'], name='fk_power_regions_association_power_id_powers'),
    sa.ForeignKeyConstraint(['region_id'], ['regions.id'], name='fk_power_regions_association_region_id_regions'),
    sa.PrimaryKeyConstraint('power_id', 'region_id')
    )
    op.create_table('build_attribute_association',
    sa.Column('build_id', sa.INTEGER(), nullable=False),
    sa.Column('attribute_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['attribute_id'], ['attributes.id'], name='fk_build_attribute_association_attribute_id_attributes'),
    sa.ForeignKeyConstraint(['build_id'], ['builds.id'], name='fk_build_attribute_association_build_id_builds'),
    sa.PrimaryKeyConstraint('build_id', 'attribute_id')
    )
    op.create_table('powers',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.Column('region_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['region_id'], ['regions.id'], name='fk_powers_region_id_regions'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('builds',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('ears', sa.INTEGER(), nullable=True),
    sa.Column('eyes', sa.INTEGER(), nullable=True),
    sa.Column('mouth', sa.INTEGER(), nullable=True),
    sa.Column('body', sa.INTEGER(), nullable=True),
    sa.Column('arms', sa.INTEGER(), nullable=True),
    sa.Column('legs', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('attributes',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('category', sa.VARCHAR(), nullable=True),
    sa.Column('category_id', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
