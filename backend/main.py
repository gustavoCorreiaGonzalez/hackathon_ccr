import datetime

from flask import jsonify, request
from flask_migrate import Migrate
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_identity, jwt_required)

from app import app, db
from app.models.user import User, user_share_schema
from app.models.trucker import Trucker, trucker_share_schema, truckers_share_schema

Migrate(app, db)
jwt = JWTManager(app)
    
@app.route('/auth/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']

    if not username:
        return jsonify({'error': 'Username não encontrado na requisição'}), 400
    if not password:
        return jsonify({'error': 'Password não encontrado na requisição'}), 400

    user = User(
        username,
        password
    )

    db.session.add(user)
    db.session.commit()

    result = user_share_schema.dump(        
        User.query.filter_by(username=username).first()
    )

    return jsonify(result)

@app.route('/auth/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    if not username:
        return jsonify({'error': 'Username não encontrado na requisição'}), 400
    if not password:
        return jsonify({'error': 'Password não encontrado na requisição'}), 400

    user = User.query.filter_by(username=username).first_or_404()

    if not user.verify_password(password):
        return jsonify({'error': 'Suas credências estão erradas!'}), 400

    access_token = create_access_token(identity=user.id)
    return jsonify({
        'id': user.id,
        'token': access_token
    }), 200

@app.route('/trucker', methods=['POST'])
@jwt_required
def trucker_registrer():
    name = request.json['name']
    age = request.json['age']
    whatsapp = request.json['whatsapp']

    if not name:
        return jsonify({'error': 'Nome não encontrado na requisição'}), 400
    if not age:
        return jsonify({'error': 'Age não encontrado na requisição'}), 400
    if not whatsapp:
        return jsonify({'error': 'Whatsapp não encontrado na requisição'}), 400

    trucker = Trucker(
        name,
        age,
        whatsapp
    )

    db.session.add(trucker)
    db.session.commit()

    result = trucker_share_schema.dump(        
        User.query.filter_by(whatsapp=whatsapp).first()
    )

    return jsonify(result)

@app.route('/trucker', methods=['GET'])
@jwt_required
def get_all_truckers():
    result = truckers_share_schema.dump(
        Trucker.query.all()
    )

    return jsonify(result)

@app.route('/trucker/<id>', methods=['GET'])
@jwt_required
def get_trucker():
    result = trucker_share_schema.dump(
        Trucker.query.filter_by(id=id).first()
    )

    return jsonify(result)