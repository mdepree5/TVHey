from app.models import db, Message

def seed_messages():
  movie_1_message_1 = Message(author_id=1, channel_id=1, content='Content')

  db.session.add(movie_1_message_1)
  db.session.commit()

def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
