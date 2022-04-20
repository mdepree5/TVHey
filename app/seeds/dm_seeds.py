from app.models import db, DM

def seed_dms():
  laters = DM(host_id=2, recipient_id=9)
  lokis = DM(host_id=2, recipient_id=3)
  thor = DM(host_id=2, recipient_id=4)

  db.session.add(laters)
  db.session.add(lokis)
  db.session.add(thor)
  db.session.commit()

def undo_dms():
  db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
  db.session.commit()
