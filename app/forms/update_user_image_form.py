from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class UpdateUserImageForm(FlaskForm):
  media_url = StringField('media_url')
  
  submit = SubmitField("Submit")