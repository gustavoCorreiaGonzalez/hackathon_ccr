from app import db, ma
from werkzeug.security import generate_password_hash, check_password_hash

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    descripton = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    
    # "bem estar" "saúde" "informativo"
    type_event = db.Column(db.String(255), nullable=False)
    
    latitude = db.Column(db.String(255), nullable=False)
    longitude = db.Column(db.String(255), nullable=False)
    
    def __init__(self, name, descripton, date, type_event, latitude, longitude):
        self.name = name
        self.descripton = descripton
        self.date = date
        self.type_event = type_event
        self.latitude = latitude
        self.longitude = longitude

    def __repr_(self):
        return f'<Event : {self.name} >'

class EventSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'descripton', 'date', 'type_event', 'latitude', 'longitude')

event_share_schema = EventSchema()
events_share_schema = EventSchema(many=True)