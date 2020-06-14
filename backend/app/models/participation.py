from app import db, ma

class Participation(db.Model):
    __tablename__ = 'participations'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, nullable=True)
    trucker_whatsapp = db.Column(db.String(120), nullable=True)
    date = db.Column(db.Date, nullable=True)
    
    def __init__(self, event_id, trucker_whatsapp, date):
        self.event_id = event_id
        self.trucker_whatsapp = trucker_whatsapp
        self.date = date

    def __repr_(self):
        return f'<Participation : {self.event_id}, {self.trucker_whatsapp}, {self.date} >'

class ParticipationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'event_id', 'trucker_whatsapp', 'date')

participation_share_schema = ParticipationSchema()
participations_share_schema = ParticipationSchema(many=True)