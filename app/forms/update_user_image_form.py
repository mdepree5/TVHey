from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired
# todo ——————————————————————————————————————————————————————————————————————————————————

v = [InputRequired()]

class UpdateUserImageForm(FlaskForm):
  media_url = StringField('media_url', v)