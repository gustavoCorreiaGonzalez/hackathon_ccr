import json
from datetime import datetime
from time import mktime

from flask import jsonify, request
from flask_jwt_extended import JWTManager, create_access_token
from flask_migrate import Migrate

from app import app, db
from app.models.event import Event, event_share_schema, events_share_schema
from app.models.occurrence import (Occurrence, occurrence_share_schema,
                                   occurrences_share_schema)
from app.models.participation import (Participation,
                                      participation_share_schema,
                                      participations_share_schema)
from app.models.trucker import (Trucker, trucker_share_schema,
                                truckers_share_schema)
from app.models.user import User, user_share_schema

Migrate(app, db)
jwt = JWTManager(app)
    
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Server On'})

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
def trucker_registrer():
    name = request.json['name']
    age = request.json['age']
    whatsapp = request.json['whatsapp']
    last_latitude = request.json['last_latitude']
    last_longitude = request.json['last_longitude']
    created_date = datetime.utcnow()

    trucker = Trucker(
        name,
        age,
        whatsapp,
        last_latitude,
        last_longitude,
        created_date
    )

    db.session.add(trucker)
    db.session.commit()

    result = trucker_share_schema.dump(        
        Trucker.query.filter_by(whatsapp=whatsapp).first()
    )

    return jsonify(result)

@app.route('/trucker', methods=['GET'])
def get_all_truckers():
    result = truckers_share_schema.dump(
        Trucker.query.all()
    )

    return jsonify(result)

@app.route('/trucker/<id>', methods=['GET'])
def get_trucker(id):
    result = trucker_share_schema.dump(
        Trucker.query.filter_by(id=id).first()
    )

    return jsonify(result)

@app.route('/trucker/localization', methods=['POST'])
def update_localization():
    whatsapp = request.json['whatsapp']
    latitude = request.json['latitude']
    longitude = request.json['longitude']

    trucker = Trucker.query.filter_by(whatsapp=whatsapp).first()
    trucker.last_latitude = latitude
    trucker.last_longitude = longitude

    db.session.commit()

    return jsonify({'message': 'Localização atulaizada com sucesso!'})

@app.route('/event', methods=['POST'])
def event_registrer():
    if request.json['type_event'] in ['eventos-saude', 'eventos-bem-estar', 'eventos-informativo']:
        name = request.json['name']
        descripton = request.json['descripton']
        date = datetime.strptime(request.json['date'], '%d/%m/%Y').date()
        type_event = request.json['type_event']
        latitude = request.json['latitude']
        longitude = request.json['longitude']

        event = Event(
            name,
            descripton,
            date,
            type_event,
            latitude,
            longitude
        )

        db.session.add(event)
        db.session.commit()

        result = event_share_schema.dump(        
            Event.query.filter_by(name=name).first()
        )

        return jsonify(result)
    
    return jsonify({'error': 'Tipo de evento inválido!'})

@app.route('/event', methods=['GET'])
def get_all_events():
    result = events_share_schema.dump(
        Event.query.all()
    )

    return jsonify(result)

@app.route('/event/<id>', methods=['GET'])
def get_event(id):
    result = event_share_schema.dump(
        Event.query.filter_by(id=id).first()
    )

    return jsonify(result)

@app.route('/event/type/<type_event>', methods=['GET'])
def get_event_per_type(type_event):
    result = events_share_schema.dump(
        Event.query.filter_by(type_event=type_event, date=datetime.utcnow().strftime('%Y-%m-%d')).all()
    )

    return jsonify(result)

@app.route('/event/date', methods=['GET'])
def get_event_per_date():
    result = db.engine.execute('select date, count(id) as events from events group by date')

    result_dump = json.dumps([dict(r) for r in result])

    return result_dump

@app.route('/occurrence', methods=['POST'])
def occurrence_register():
    whatsapp = request.json['whatsapp']
    date = datetime.utcnow()
    type_occurrence = request.json['type_occurrence']
    latitude = request.json['latitude']
    longitude = request.json['longitude']

    occurrence = Occurrence(
        whatsapp,
        date,
        type_occurrence,
        latitude,
        longitude
    )

    db.session.add(occurrence)
    db.session.commit()

    result = occurrence_share_schema.dump(        
        Occurrence.query.filter_by(whatsapp=whatsapp).first()
    )

    return jsonify(result)

@app.route('/occurrence', methods=['GET'])
def get_all_occurrenceS():
    result = occurrences_share_schema.dump(
        Occurrence.query.all()
    )

    return jsonify(result)

@app.route('/occurrence/<type_occurrence>', methods=['GET'])
def get_occurrence_per_type(type_occurrence):
    if type_occurrence in ['acidente', 'problema-de-saude', 'crime']:
        result = occurrence_share_schema.dump(
            Occurrence.query.filter_by(type_occurrence=type_occurrence).all()
        )

        return jsonify(result)

    return jsonify({'error': 'Tipo de ocorrência inválida!'})

@app.route('/occurrence/<whatsapp>/<type_occurrence>', methods=['GET'])
def get_occurrence_per_whatsapp_and_type(whatsapp, type_occurrence):
    if type_occurrence in ['acidente', 'problema-de-saude', 'crime']:
        result = occurrence_share_schema.dump(
            Occurrence.query.filter_by(
                whatsapp=whatsapp,
                type_occurrence=type_occurrence
            ).all()
        )

        return jsonify(result)

    return jsonify({'error': 'Tipo de ocorrência inválida!'})

@app.route('/participation', methods=['POST'])
def participation_registrer():
    event_id = request.json['event_id']
    trucker_whatsapp = request.json['trucker_whatsapp']
    date = datetime.utcnow()

    participation = Participation(
        event_id,
        trucker_whatsapp,
        date
    )

    db.session.add(participation)
    db.session.commit()

    result = participation_share_schema.dump(        
        Participation.query.filter_by(trucker_whatsapp=trucker_whatsapp).first()
    )

    return jsonify(result)

@app.route('/participation', methods=['GET'])
def get_all_participations():
    result = participations_share_schema.dump(
        Participation.query.all()
    )

    return jsonify(result)

@app.route('/participation/event/<event_name>', methods=['GET'])
def get_all_participations_per_event(event_name):
    result = db.engine.execute("select e.name, count(p.id) as participations from participations as p inner join events as e on p.event_id = e.id where e.type_event = '{}' group by p.event_id".format(
        event_name))

    result_dump = json.dumps([dict(r) for r in result])

    return result_dump

@app.route('/participation/trucker/<trucker_whatsapp>', methods=['GET'])
def get_all_participations_per_trucker(trucker_whatsapp):
    result = db.engine.execute("select t.name, count(p.id) as participations from participations as p inner join truckers as t on p.trucker_whatsapp = t.whatsapp where t.whatsapp = '{}' group by p.trucker_whatsapp".format(
        trucker_whatsapp))

    result_dump = json.dumps([dict(r) for r in result])

    return result_dump
