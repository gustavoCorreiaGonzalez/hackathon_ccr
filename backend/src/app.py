from flask import (Flask, flash, json, jsonify, redirect, request,
                   send_from_directory, url_for)
from flask_sqlalchemy import SQLAlchemy                   
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_identity, jwt_required)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['RESULT_FOLDER'] = 'results'

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)

CORS(app)

    
@app.route('/users/registrar', methods=["POST"])
#@jwt_required
def registrar():
    users = mongo.db.users 
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')

    user_id = users.insert_one({
        'email': email,
        'password': password,
        'created': created 
    })

    new_user = users.find_one({'_id': user_id})

    result = {'email': new_user['email'] + ' registered'}

    return jsonify({'message' : result}), 200
    #return jsonify({'message' : "Seu usuário não tem permissão para registrar usuário"}), 400

@app.route('/users/logar', methods=['POST'])
def logar():
    if not request.is_json:
        return jsonify({'message': 'A requisição não é um JSON'}), 400

    email = request.get_json()['email']
    password = request.get_json()['password']

    if not email:
        return jsonify({'message': 'E-mail não encontrado na requisição'}), 400
    if not password:
        return jsonify({'message': 'Password não encontrado na requisição'}), 400

    users = mongo.db.users 

    response = users.find_one({'email': email})
    if response:
        if bcrypt.check_password_hash(response['password'], password): 
            access_token = create_access_token(identity=dumps(response['_id']))
            return jsonify({'token': access_token}), 200
        else:
            return jsonify({'message': 'Senha errada'}), 400
    else:
        return jsonify({'message': 'Usuário não está presente no banco de dados'}), 400


if __name__ == '__main__':
    app.run(debug=True, port=8000)
