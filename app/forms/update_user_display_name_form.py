from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired
# todo ——————————————————————————————————————————————————————————————————————————————————

v = [InputRequired()]

class UpdateUserDisplayNameForm(FlaskForm):
  display_name = StringField('display_name', v)