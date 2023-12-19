from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

# Association table for the many-to-many relationship between Character and Environment
character_environments_association = db.Table(
    'character_environments_association',
    db.Column('character_id', db.Integer, db.ForeignKey('characters.id'), primary_key=True),
    db.Column('environment_id', db.Integer, db.ForeignKey('environments.id'), primary_key=True)
)

# Association table for the many-to-many relationship between Character and Power
character_power_association = db.Table(
    'character_power_association',
    db.Column('character_id', db.Integer, db.ForeignKey('characters.id'), primary_key=True),
    db.Column('power_id', db.Integer, db.ForeignKey('powers.id'), primary_key=True)
)

class Environment(db.Model, SerializerMixin):
    __tablename__ = 'environments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    label = db.Column(db.String)
    climate = db.Column(db.String)
    description = db.Column(db.String)
    powers_column = db.Column(db.String)

    # Relationships
    characters = db.relationship('Character', secondary=character_environments_association, back_populates='environments')  # many to many with character
    powers = db.relationship('Power', secondary='power_environments_association', back_populates='environments')  # many to many with power

class Power(db.Model, SerializerMixin):
    __tablename__ ='powers'
    id =  db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    label = db.Column(db.String)
    description = db.Column(db.String)

    # Relationships
    characters = db.relationship('Character', secondary='character_power_association', back_populates='powers')  # many to many with character
    environments = db.relationship('Environment', secondary='power_environments_association', back_populates='powers')  # many to many with environment

class Build(db.Model, SerializerMixin):
    __tablename__ = 'builds'
    id =  db.Column(db.Integer, primary_key=True)

    # Relationships
    attributes = db.relationship('Attribute', back_populates='build')  # one to many with Attribute
    characters = db.relationship('Character', back_populates='build')  # many to one with Character

class Character(db.Model, SerializerMixin):
    __tablename__ = 'characters'
    id =  db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    attributes = db.Column(db.String)
    build_id = db.Column(db.Integer, db.ForeignKey('builds.id'))

    # Relationships
    build = db.relationship('Build', back_populates='characters')  # many to one with Build
    powers = db.relationship('Power', secondary='character_power_association', back_populates='characters')  # many to many with power
    environments = db.relationship('Environment', secondary=character_environments_association, back_populates='characters')  # many to many with environment

class Attribute(db.Model, SerializerMixin):
    __tablename__ = 'attributes'
    id =  db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)

    # Relationships
    build = db.relationship('Build', back_populates='attributes')  # many to one with Build
