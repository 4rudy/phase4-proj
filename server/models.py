from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship
from config import db

# Association table for the many-to-many relationship between Power and Region
power_regions_association = db.Table(
    'power_regions_association',
    db.Column('power_id', db.Integer, db.ForeignKey('powers.id'), primary_key=True),
    db.Column('region_id', db.Integer, db.ForeignKey('regions.id'), primary_key=True)
)
# Association table for the many-to-many relationship between Build and Attribute
build_attribute_association = db.Table(
    'build_attribute_association',
    db.Column('build_id', db.Integer, db.ForeignKey('builds.id'), primary_key=True),
    db.Column('attribute_id', db.Integer, db.ForeignKey('attributes.id'), primary_key=True)
)

class Region(db.Model, SerializerMixin):
    __tablename__ = 'regions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    climate = db.Column(db.String)
    description = db.Column(db.String)
    powers_column = db.Column(db.Integer)

    # Relationships
    characters = db.relationship("Character", back_populates="region")
    power = db.relationship('Power', secondary='power_regions_association', uselist=False, back_populates='region')

class Power(db.Model, SerializerMixin):
    __tablename__ ='powers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'))

    # Relationships
    characters = db.relationship('Character', back_populates='power')  # one-to-many with character
    region = db.relationship('Region', back_populates='power', uselist=False)  # one-to-one with region

class Build(db.Model, SerializerMixin):
    __tablename__ = 'builds'
    id =  db.Column(db.Integer, primary_key=True)
    ears = db.Column(db.Integer)
    eyes = db.Column(db.Integer)
    mouth = db.Column(db.Integer)
    body = db.Column(db.Integer)
    arms = db.Column(db.Integer)
    legs = db.Column(db.Integer)
    region = db.Column(db.Integer, db.ForeignKey('regions.id'))

    # Relationships
    attributes = db.relationship('Attribute', secondary=build_attribute_association, back_populates='builds')  # many-to-many with Attribute
    characters = db.relationship('Character', back_populates='build')  # many to one with Character

class Character(db.Model, SerializerMixin):
    __tablename__ = 'characters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    origin = db.Column(db.Integer, db.ForeignKey('regions.id'))
    build_id = db.Column(db.Integer, db.ForeignKey('builds.id'))
    power_id = db.Column(db.Integer, db.ForeignKey('powers.id'))
    # Relationships
    build = db.relationship('Build', back_populates='characters')  # many to one with Build
    power = db.relationship('Power', back_populates='characters')  # one-to-many with power
    region = db.relationship("Region", back_populates="characters")  # one-to-one with region

class Attribute(db.Model, SerializerMixin):
    __tablename__ = 'attributes'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String)
    category_id = db.Column(db.Integer)

    # Relationships
    builds = db.relationship('Build', secondary=build_attribute_association, back_populates='attributes')  # many-to-many with Build
