from app import db, ma

class Occurrence(db.Model):
    __tablename__ = 'occurrences'

    id = db.Column(db.Integer, primary_key=True)
    whatsapp = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    
    # "bem estar" "saúde" "informativo"
    type_occurrence = db.Column(db.String(255), nullable=False)
    
    latitude = db.Column(db.String(255), nullable=False)
    longitude = db.Column(db.String(255), nullable=False)
    
    def __init__(self, whatsapp, date, type_event, latitude, longitude):
        self.whatsapp = whatsapp
        self.date = date
        self.type_occurrence = type_event
        self.latitude = latitude
        self.longitude = longitude

    def __repr_(self):
        return f'<Occurrence : {self.type_occurrence} >'

class OccurrenceSchema(ma.Schema):
    class Meta:
        fields = ('id', 'whatsapp', 'date', 'type_occurrence', 'latitude', 'longitude')

occurrence_share_schema = OccurrenceSchema()
occurrences_share_schema = OccurrenceSchema(many=True)