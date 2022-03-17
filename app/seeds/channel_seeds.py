from app.models import db, Channel

def seed_channels():
  ragnarok = Channel(host_id=1, title='Thor: Ragnarok', topic='Topic 1')
  

  db.session.add(ragnarok)
  db.session.commit()

def undo_channels():
  db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
  db.session.commit()
