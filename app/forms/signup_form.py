from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, Email, ValidationError
from app.models import User
# todo ——————————————————————————————————————————————————————————————————————————————————

def user_exists(form, field):
  email = field.data
  user = User.query.filter(User.email == email).first()
  if user:
    raise ValidationError('Email address is already in use.')

def username_exists(form, field):
  username = field.data
  user = User.query.filter(User.username == username).first()
  if user:
    raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
  username = StringField(
    'username', validators=[InputRequired(), username_exists])
  email = StringField("email",  [InputRequired(), user_exists, Email("Please provide a valid email address")])
  password = StringField('password', validators=[InputRequired()])
  media_url = StringField('media_url')