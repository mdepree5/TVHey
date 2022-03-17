from app.models import db, User

def seed_users():
  feige = User(
    username='kevin', email='feige@marvel.studios', password='pres', display_name='Kevin Feige', image_url='')
  alligator_loki = User(
    username='alligatorLoki', email='alligator@lo.ki', password='thetrueloki', display_name='Alligator Loki', image_url='')
  thor = User(
    username='thor', email='thor@as.gard', password='lordofthunder', display_name='Thor', image_url='')
  loki = User(
    username='loki', email='loki@lo.ki', password='kneel!', display_name='Loki', image_url='')
  korg = User(
    username='korg', email='korg@pileof.rocks', password='heyman', display_name='Korg', image_url='')

  db.session.add(feige)
  db.session.add(alligator_loki)
  db.session.add(thor)
  db.session.add(loki)
  db.session.add(korg)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
  db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
  db.session.commit()