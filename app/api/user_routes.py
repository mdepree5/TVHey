from flask import Blueprint, request
from flask_login import login_required
from app.forms import UpdateUserImageForm, UpdateUserDisplayNameForm
from app.models import User, db
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages
# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               User Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@user_routes.route('/')
@login_required
def users():
  users = User.query.all()
  return {'users': [user.to_dict() for user in users]}
# todo ——————————————————————————————————————————————————————————————————————————————————
@user_routes.route('/<int:userId>')
@login_required
def user(userId):
  user = User.query.get(userId)
  return user.to_dict()
# todo ——————————————————————————————————————————————————————————————————————————————————
@user_routes.route('/<int:userId>/image', methods=['PUT'])
@login_required
def update_user_image(userId):
  form = UpdateUserImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  
  url = form.data['media_url']
  
  if type(form.data['media_url']) is not str:
    image = form.data['media_url']
    if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400
  
    image.filename = get_unique_filename(image.filename)
    
    upload = upload_file_to_s3(image)
    if "url" not in upload:
      return upload, 400
    url = upload["url"]
    
  if form.validate_on_submit():
    user = User.query.get(userId)
    user.image_url= url
    
    db.session.commit()
    return user.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}
# todo ——————————————————————————————————————————————————————————————————————————————————
@user_routes.route('/<int:userId>/display_name', methods=['PUT'])
@login_required
def update_user_display_name(userId):
  form = UpdateUserDisplayNameForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  
  print('debugger')
  print(form.data['display_name'])
  print('debugger')
  
  if form.validate_on_submit():
    user = User.query.get(userId)
    user.display_name= form.data['display_name']
    
    db.session.commit()
    return user.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}
