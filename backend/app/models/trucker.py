from app import db, ma

class Trucker(db.Model):
    __tablename__ = 'truckers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    whatsapp = db.Column(db.String(120), unique=True, nullable=False)
    last_latitude = db.Column(db.String(255))
    last_longitude = db.Column(db.String(255))
    created_date = db.Column(db.Date(), nullable=False)
    
    def __init__(self, name, age, whatsapp, last_latitude, last_longitude, created_date):
        self.name = name
        self.age = age
        self.whatsapp = whatsapp
        self.last_latitude = last_latitude
        self.last_longitude = last_longitude
        self.created_date = created_date

    def __repr_(self):
        return f'<Trucker : {self.name} >'

    def __str__(self):
        return 'ID={}, Name={}, Age={}, Whatsapp={}, Created_date={}, Last_latitude={}, Last_longitude={}'.format(
            self.id, self.name, self.age, self.whatsapp, self.created_date, self.last_latitude, self.last_longitude)

class TruckerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'age', 'whatsapp', 'created_date', 'last_latitude', 'last_longitude')

trucker_share_schema = TruckerSchema()
truckers_share_schema = TruckerSchema(many=True)