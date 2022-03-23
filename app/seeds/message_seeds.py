from app.models import db, Message

ragnarok_messages = [
  Message(author_id=3, channel_id=1, content='I really wish I had my hammer'),
  Message(author_id=5, channel_id=1, content='Hammer?'),
  Message(author_id=3, channel_id=1, content='Quite unique. It was made from this special metal from the heart of a dying star. And when I spun it really, really fast, it gave me the ability to fly'),
  Message(author_id=5, channel_id=1, content='You rode a hammer?'),
  Message(author_id=3, channel_id=1, content='No, I didn\'t ride the hammer'),
  Message(author_id=5, channel_id=1, content='The hammer rode you on your back?'),
  Message(author_id=3, channel_id=1, content='No. I used to spin it really fast, and it would pull me off the...'),
  Message(author_id=5, channel_id=1, content='Oh, my God. A hammer pulled you off?'),
  Message(author_id=3, channel_id=1, content='The ground. It would pull me off the ground, up into the air, and I would fly. Every time I threw it, it would always come back to me'),
  Message(author_id=5, channel_id=1, content='Sounds like you had a pretty special and intimate relationship with this hammer, and that losing it was almost comparable to losing a loved one'),
  Message(author_id=3, channel_id=1, content='That\'s a nice way of putting it')  ,
  Message(author_id=3, channel_id=1, content='Hey, let\'s do "Get Help"'),
  Message(author_id=4, channel_id=1, content='What?'),
  Message(author_id=3, channel_id=1, content='"Get Help"'),
  Message(author_id=4, channel_id=1, content='No'),
  Message(author_id=3, channel_id=1, content='Come on, you love it'),
  Message(author_id=4, channel_id=1, content='I hate it'),
  Message(author_id=3, channel_id=1, content='It\'s great, it works every time'),
  Message(author_id=4, channel_id=1, content='It\'s humiliating'),
  Message(author_id=3, channel_id=1, content='Do you have a better plan?'),
  Message(author_id=4, channel_id=1, content='No'),
  Message(author_id=3, channel_id=1, content='We\'re doing it'),
  Message(author_id=4, channel_id=1, content='We are not doing "Get Help"')
]

winter_soldier_messages = [
  Message(author_id=6, channel_id=2, content='On your left'),
  Message(author_id=6, channel_id=2, content='On your left'),
  Message(author_id=7, channel_id=2, content='Uh huh, on my left. Got it'),
  Message(author_id=7, channel_id=2, content='Don\'t say it, don\'t you say it!'),
  Message(author_id=6, channel_id=2, content='On your left'),
  Message(author_id=7, channel_id=2, content='Come on!'),
  Message(author_id=6, channel_id=2, content='Need a medic?'),
  Message(author_id=7, channel_id=2, content='I need a new set of lungs. Dude, you just ran like 13 miles in 30 minutes'),
  Message(author_id=6, channel_id=2, content='Guess I got a late start'),
  Message(author_id=7, channel_id=2, content='Really? you should be ashamed of yourself. You should take another lap.'),
  Message(author_id=7, channel_id=2, content='Did you just take it? I assume you just took it'),
  Message(author_id=6, channel_id=2, content='What unit you with?'),
  Message(author_id=7, channel_id=2, content='58th pararescue, but now I\'m working down at the VA. Sam Wilson'),
  Message(author_id=6, channel_id=2, content='Steve Rogers.'),
  Message(author_id=7, channel_id=2, content='I kind of put that together. Must have freaked you out coming home after the whole defrosting thing.'),
  Message(author_id=6, channel_id=2, content='Takes some getting used to. It\'s good to meet you, Sam'),
  Message(author_id=7, channel_id=2, content='It\'s your bed, right?'),
  Message(author_id=6, channel_id=2, content='What\'s up?'),
  Message(author_id=7, channel_id=2, content='It\'s your bed, it\'s too soft. When I was over there I sleep on the ground, use rock for pillows like a caveman. Now I\'m home, lying in my bed, and it\'s like…'),
  Message(author_id=6, channel_id=2, content='Lying on a marshmallow. Feel like I\'m going to sink right to the floor. How long?'),
  Message(author_id=7, channel_id=2, content='Two tours. You must miss the good old days, huh?'),
  Message(author_id=6, channel_id=2, content='Well, things aren\'t so bad. Food\'s a lot better (we used to boil everything). No polio\'s good. Internet! So helpful. Been reading that a lot trying to catch up.'),
  Message(author_id=7, channel_id=2, content='Marvin Gaye. 1972. Trouble Man soundtrack. Everything you missed, jammed into one album.'),
  Message(author_id=6, channel_id=2, content='I\'ll put it on the list. Alright Sam, duty calls. Thanks for the run, if that\'s what you want to call running.'),
  Message(author_id=7, channel_id=2, content='Oh, that\'s how it is?'),
  Message(author_id=6, channel_id=2, content='Oh, that\'s how it is!'),
  Message(author_id=7, channel_id=2, content='Okay, lol. Any time you want to stop by the VA, make me look awesome in front of the girl at the front desk, you let me know'),
  Message(author_id=6, channel_id=2, content='I\'ll keep it in mind'),
  Message(author_id=8, channel_id=2, content='Hey fellas. Either one of you know where the Smithsonian is? I\'m here to pick up a fossil'),
  Message(author_id=6, channel_id=2, content='Hilarious.'),
  Message(author_id=7, channel_id=2, content='How you doin?'),
  Message(author_id=8, channel_id=2, content='Heyy'),
  Message(author_id=6, channel_id=2, content='Can\'t run everywhere'),
  Message(author_id=7, channel_id=2, content='No you can\'t')
]

def seed_messages():
  for message in ragnarok_messages:
    db.session.add(message)
  for message in winter_soldier_messages:
    db.session.add(message)

  db.session.commit()

def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
