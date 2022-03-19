from flask_wtf import FlaskForm
from wtforms import StringField
# todo ——————————————————————————————————————————————————————————————————————————————————
class UpdateUserDisplayNameForm(FlaskForm):
  display_name = StringField('display_name')