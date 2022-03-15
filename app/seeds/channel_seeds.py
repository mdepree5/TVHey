from app.models import db, Channel

def seed_channels():
  movie_1 = Channel(host_id=1, title='Movie 1', topic='Topic 1')

  db.session.add(movie_1)

def undo_channels():
  db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
  db.session.commit()
