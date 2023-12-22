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

class SerializerMixinWithExclusions(SerializerMixin):
    def to_dict(self, depth=1, include_name=False):
        if depth <= 0:
            return {'id': self.id, 'name': self.name} if include_name else {'id': self.id}
        else:
            result = {'id': self.id, 'name': self.name} if include_name else {'id': self.id}

            for key, value in self.__dict__.items():
                if key == 'name':  # Skip the 'name' attribute
                    continue

                # Skip attributes starting with an underscore (e.g., relationships)
                if key.startswith('_'):
                    continue

                # Check if the attribute is an instance of SQLAlchemy model
                if isinstance(value, db.Model):
                    result[key] = value.to_dict(depth=depth-1)
                else:
                    result[key] = value

            return result


class Region(db.Model, SerializerMixinWithExclusions):
    __tablename__ = 'regions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    climate = db.Column(db.String)
    description = db.Column(db.String)
    powers_column = db.Column(db.Integer)

    # Relationships
    characters = db.relationship("Character", back_populates="region")
    power = db.relationship('Power', secondary='power_regions_association', uselist=False, back_populates='region')

    def __repr__(self):
        return f"<Region #: {self.id}, Name: {self.name} >"

class Power(db.Model, SerializerMixinWithExclusions):
    __tablename__ ='powers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'))

    # Relationships
    characters = db.relationship('Character', back_populates='power')  # one-to-many with character
    region = db.relationship('Region', back_populates='power', uselist=False)  # one-to-one with region

class Build(db.Model, SerializerMixinWithExclusions):
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

class Character(db.Model, SerializerMixinWithExclusions):
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

class Attribute(db.Model, SerializerMixinWithExclusions):
    __tablename__ = 'attributes'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String)
    category_id = db.Column(db.Integer)

    # Relationships
    builds = db.relationship('Build', secondary=build_attribute_association, back_populates='attributes')  # many-to-many with Build
