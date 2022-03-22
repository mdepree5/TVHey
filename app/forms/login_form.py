from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, Email, ValidationError
from app.models import User
# todo ——————————————————————————————————————————————————————————————————————————————————

def user_exists(form, field):
  email = field.data
  user = User.query.filter(User.email == email).first()
  if not user:
    raise ValidationError('Email provided not found.')


def password_matches(form, field):
  password = field.data
  email = form.data['email']
  user = User.query.filter(User.email == email).first()
  if not user:
    raise ValidationError('No such user exists.')
  if not user.check_password(password):
    raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
  email = StringField("email",  [InputRequired(), user_exists, Email("Please provide a valid email address")])
  password = StringField('password', validators=[InputRequired(), password_matches])