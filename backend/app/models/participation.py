from app import db, ma

class Participation(db.Model):
    __tablename__ = 'participations'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    trucker_id = db.Column(db.Integer, db.ForeignKey('truckers.id'))
    date = db.Column(db.Date(), nullable=False)
    
    def __init__(self, event_id, trucker_id, date):
        self.event_id = event_id
        self.trucker_id = trucker_id
        self.date = date

    def __repr_(self):
        return f'<Participation : {self.event_id}, {self.trucker_id} >'

class ParticipationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'event_id', 'trucker_id', 'date')

participation_share_schema = ParticipationSchema()
participations_share_schema = ParticipationSchema(many=True)