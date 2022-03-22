from flask import Blueprint, session, request
from app.models import User, db
from app.forms.signup_form import SignUpForm
from app.forms.login_form import LoginForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f"{field.capitalize()} : {error}")
  return errorMessages
# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Auth Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@auth_routes.route('/')
def authenticate():
  if current_user.is_authenticated:
    return current_user.to_dict()
  return {'errors': ['Unauthorized']}
  # return {'errors': ['Initial unauthenticated app render']}
# todo ——————————————————————————————————————————————————————————————————————————————————
@auth_routes.route('/login', methods=['POST'])
def login():
  form = LoginForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  print('debugger login form')
  print(form.data)
  # Get the csrf_token from the request cookie and put it into the
  # form manually to validate_on_submit can be used
  if form.validate_on_submit():
    print('validated')
    user = User.query.filter(User.email == form.data['email']).first()
    login_user(user)
    return user.to_dict()
  print(form.errors)
  print(validation_errors_to_error_messages(form.errors))
  print('debugger login form')
  
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
# todo ——————————————————————————————————————————————————————————————————————————————————
@auth_routes.route('/logout')
def logout():
  logout_user()
  return {'message': 'User logged out'}
# todo ——————————————————————————————————————————————————————————————————————————————————
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
  form = SignUpForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  
  print('debugger signup form')
  print(form)
  print('signup form.data', form.data)
  print('debugger signup form')
  
  if form.validate_on_submit():
    print('debugger validate on submit')
    print('form.data', form.data)
    print('debugger validate on submit')
    user = User(
      username=form.data['username'],
      email=form.data['email'],
      password=form.data['password'],
      display_name=form.data['username'],
      image_url='no image provided'
    )
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return user.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
# todo ——————————————————————————————————————————————————————————————————————————————————
@auth_routes.route('/unauthorized')
def unauthorized():
  return {'errors': ['Unauthorized']}, 401
