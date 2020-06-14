from app import db, ma
from werkzeug.security import generate_password_hash, check_password_hash

class Trucker(db.Model):
    __tablename__ = 'truckers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    whatsapp = db.Column(db.String(120), unique=True, nullable=False)
    created_date = db.Column(db.Date(), nullable=False)
    
    def __init__(self, name, age, whatsapp, created_date):
        self.name = name
        self.age = age
        self.whatsapp = whatsapp
        self.created_date = created_date

    def __repr_(self):
        return f'<Trucker : {self.name} >'

    def __str__(self):
        return 'ID={}, Name={}, Age={}, Whatsapp={}, Created_date={}'.format(
            self.id, self.name, self.age, self.whatsapp, self.created_date)

class TruckerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'age', 'whatsapp', 'created_date')

trucker_share_schema = TruckerSchema()
truckers_share_schema = TruckerSchema(many=True)