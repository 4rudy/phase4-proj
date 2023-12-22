#!/usr/bin/env python3
import random
from app import app
from models import db, Region, Power, Build, Character, Attribute
from random import sample

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        # Create tables
        db.create_all()
        print("Starting seed...")

        # Seed Regions
        region_data = [
            {"name": "Woodland", "climate": "Temperate", "description": "Lush greenery with various trees.", "powers_column": 1},
            {"name": "Sandy Expanse", "climate": "Arid", "description": "Endless stretches of sand and dunes.", "powers_column": 3},
            {"name": "Rocky Mountains", "climate": "Tropical", "description": "Many different types of rocks and mountains.", "powers_column": 2},
            {"name": "Coastal", "climate": "Cold", "description": "Many different types of plants and fauna.", "powers_column": 6}
        ]
        for data in region_data:
            region = Region(**data)
            db.session.add(region)

        # Seed Powers
        power_data = [
            {"name": "Beast Master", "description": "Summon nearby animals for assistance", "region_id": 1},
            {"name": "Shinobi", "description": "Supernatural ninja techniques", "region_id": 2},
            {"name": "Witch", "description": "Use magic and arcane knowledge to cast spells, place curses, scry and more", "region_id": 3},
            {"name": "Flight", "description": "Levitate and fly around at will", "region_id": 4},
            {"name": "Slippery", "description": "Always be able to escape confinement", "region_id": 1},
            {"name": "Precognition", "description": "See what's going to happen before it actually happens", "region_id": 2},
            {"name": "Vampire", "description": "A blood-sucking, immortal being weak to sunlight and certain holy items", "region_id": 3},
            {"name": "Dimension Hopper", "description": "Use supernatural power to travel freely between dimensions", "region_id": 4},
            {"name": "Inventive", "description": "Easily design contraptions to solve any problem", "region_id": 1},
            {"name": "Psychometry", "description": "Gain detailed information about objects, people, events, etc by using the five senses", "region_id": 2}
        ]

        for data in power_data:
            power = Power(**data)
            db.session.add(power)

        attribute_cats = {"ears": 9, "eyes": 9, "arms": 9, "mouth": 9, "body": 7, "legs": 8, "region": 4}
        build_data = []
        # Seed Builds
        for _ in range(20):
            # Create a build with random values for each attribute
            build_data = {category: random.randint(1, max_category_id) for category, max_category_id in attribute_cats.items()}
            build = Build(**build_data)
            db.session.add(build)


        # Seed Attributes
        attribute_data = []
        for category, max_category_id in attribute_cats.items():
            for category_id in range(1, max_category_id + 1):
                attribute_data.append({"category": category, "category_id": category_id})
        for data in attribute_data:
            attribute = Attribute(**data)
            db.session.add(attribute)

        # Seed Characters
        for _ in range(20):  # 20 characters
            build = rc(Build.query.all())  # random build
            power = rc(Power.query.all())  # random power
            regions_with_powers = Region.query.filter(Region.powers_column.isnot(None)).all()
            region = rc(regions_with_powers)
            character = Character(
                name=fake.name(),
                build=build,
                power=power,
                region=region
            )

            db.session.add(character)

        db.session.commit()

        print("Seed completed!")
