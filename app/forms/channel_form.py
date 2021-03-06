from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired, ValidationError
# todo ——————————————————————————————————————————————————————————————————————————————————

def title_max_length(form, field):
  title = field.data
  if len(title) > 50:
    raise ValidationError('Please write a shorter title (50 chars or less).')

def topic_max_length(form, field):
  topic = field.data
  if len(topic) > 255:
    raise ValidationError('Please write a shorter topic (255 chars or less).')

class ChannelForm(FlaskForm):
  host_id = IntegerField('host_id')
  title = StringField('title', validators=[InputRequired(), title_max_length])
  topic = StringField('topic', validators=[topic_max_length])
