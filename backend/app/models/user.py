from app import db, ma
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, autoincrement=True, primary_key = True)
    username = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(120), nullable = False)

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def __repr_(self):
        return f'<User : {self.username} >'

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username')

user_share_schema = UserSchema()
users_share_schema = UserSchema(many=True)
