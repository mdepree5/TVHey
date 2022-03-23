from app.models import db, User

users = [
  User(username='kevin', email='feige@marvel.studios', password='pres0fM@rvl', display_name='Kevin Feige', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/feige.png'),
  User(username='alligatorLoki', email='alligator@lo.ki', password='Thetruel0ki??', display_name='Alligator Loki', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/alligator_loki.png'),
  User(username='thor', email='thor@as.gard', password='L0rd0fthunder!', display_name='Thor', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/thor.jpg'),
  User(username='loki', email='loki@frost.giant', password='321knEEEEEEl!', display_name='Loki', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/loki.png'),
  User(username='korg', email='korg@pileof.rocks', password='0Hheyman!', display_name='Korg', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/korg.png'),
  User(username='nocap2022', email='cap@tain.usa', password='@mericasB0TT0M', display_name='Steve Rogers', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/steve.png'),
  User(username='paparedwing', email='the@fal.con', password='Sm1l1ngT1ger?', display_name='Sam Wilson', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/sam.png'),
  User(username='romanoff', email='natasha@black.widow', password='d@ughterOf1van', display_name='Natasha Romanoff', image_url='https://capstone-slack-clone.s3.amazonaws.com/users/natasha.png'),
]

def seed_users():
  for user in users:
    db.session.add(user)
  
  db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
  db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
  db.session.commit()