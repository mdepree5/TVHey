from flask_wtf import FlaskForm
from wtforms import StringField
# todo ——————————————————————————————————————————————————————————————————————————————————
class UpdateUserImageForm(FlaskForm):
  media_url = StringField('media_url')