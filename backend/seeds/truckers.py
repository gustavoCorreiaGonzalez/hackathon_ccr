from flask_seeder import Seeder, Faker, generator
from app.models.trucker import Trucker


class TruckerSeeder(Seeder):

  def run(self):
    faker = Faker(
      cls=Trucker,
      init={
        'name': generator.Name(),
        'age': generator.Integer(start=18, end=60),
        'whatsapp': generator.String(r'+55\d{11}')
      }
    )

    for trucker in faker.create(5):
      print('Adding trucker: %s' % trucker)
      self.db.session.add(trucker)