from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired
# todo ——————————————————————————————————————————————————————————————————————————————————

v = [InputRequired()]

class MessageForm(FlaskForm):
  author_id = IntegerField('author_id', v)
  channel_id = IntegerField('channel_id', v)
  content = StringField('content', v)
