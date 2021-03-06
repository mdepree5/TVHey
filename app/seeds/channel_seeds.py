from app.models import db, Channel

def seed_channels():
  ragnarok = Channel(host_id=1, title='Thor: Ragnarok', topic='Thor must race against time to stop the seemingly imminent Ragnarok, a cataclysmic event that could end all of Asgardian civilization.')
  winter_soldier = Channel(host_id=1, title='Captain America: The Winter Soldier', topic='In present-day Washington, D.C., Steve Rogers, aka Captain America, teams up with Black Widow and new ally the Falcon to battle a powerful yet shadowy enemy.')
  

  db.session.add(ragnarok)
  db.session.add(winter_soldier)
  db.session.commit()

def undo_channels():
  db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
  db.session.commit()
