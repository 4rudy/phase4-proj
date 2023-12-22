#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import *

# Views go here!

class AllCharacters(Resource):
    def get(self):
        characters = Character.query.all()
        response = jsonify([char.to_dict() for char in characters])
        return make_response(response, 200)

    def post(self):
        data = request.get_json()
        print(data)
        #Validate
        if 'name' not in data:
            response_body = {
                "error": "Missing required field :name"
            }
            return make_response(response_body, 400)

        new_build = Build(ears=data['ears']['current']+1, eyes=data['eyes']['current']+1, mouth=data['mouth']['current']+1, body=data['body']['current']+1, arms=data['arms']['current']+1, legs=data['legs']['current']+1, region=data['region']['current']+1)
        db.session.add(new_build)
        db.session.commit()

        name = data['name']
        origin = data['region']['current']+1
        build_id = new_build.id
        power_id = data['power_id']

        new_character = Character(name=name, origin=origin, build_id=build_id, power_id=power_id)

        if new_character:
            db.session.add(new_character)
            db.session.commit()

            response_body = new_character.to_dict()
            return make_response(response_body, 201)
        else:
            response_body = {
                "error": "Character creation failed"
            }
            return make_response(response_body, 404)
api.add_resource(AllCharacters, '/characters')

class CharacterById(Resource):
    def get(self, id):
        character = Character.query.filter(Character.id == id).first()
        if character:
            response_body = character.to_dict()
            return make_response(response_body, 200)
        else:
            response_body = {
                "error": "Character not found"
            }
            return make_response(response_body, 404)

    def delete(self, id):
        character = Character.query.filter(Character.id == id).first()
        if character:
            db.session.delete(character)
            db.session.commit()
            response_body = {}

            return make_response(response_body, 204)
        else:
            response_body = {
                "error": "Character not found"
            }
            return make_response(response_body, 404)
api.add_resource(CharacterById, '/characters/<int:id>')

class AllBuilds(Resource):
    def get(self):
        builds = Build.query.all()
        response = jsonify([build.to_dict() for build in builds])
        return make_response(response, 200)
api.add_resource(AllBuilds, '/builds')

class BuildById(Resource):
    def get(self, id):
        build = Build.query.filter(Build.id == id).first()
        if build:
            response_body = build.to_dict()
            return make_response(response_body, 200)
        else:
            response_body = {
                "error": "Build not found"
            }
            return make_response(response_body, 404)
api.add_resource(BuildById, '/builds/<int:id>')

class CreateBuild(Resource):
    def post(self):
        data = request.get_json()

        # Validate
        if 'ears' not in data or 'eyes' not in data or 'mouth' not in data or 'body' not in data or 'arms' not in data or 'legs' not in data:
            response_body = {
                "error": "Missing required fields (ears, eyes, mouth, body, arms, legs)"
            }
            return make_response(response_body, 400)

        ears = data['ears']
        eyes = data['eyes']
        mouth = data['mouth']
        body = data['body']
        arms = data['arms']
        legs = data['legs']

        new_build = Build(ears=ears, eyes=eyes, mouth=mouth, body=body, arms=arms, legs=legs)

        db.session.add(new_build)
        db.session.commit()

        response_body = new_build.to_dict()
        return make_response(response_body, 201)
api.add_resource(CreateBuild, '/builds')

class AllPowers(Resource):
    def get(self):
        powers = Power.query.all()
        response = jsonify([power.to_dict(include_name=True) for power in powers])
        return make_response(response, 200)
api.add_resource(AllPowers, '/powers')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
