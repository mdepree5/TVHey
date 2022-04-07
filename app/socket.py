# from distutils.errors import DistutilsFileError
import os
import json
import functools
from json import dumps
from flask import request
from datetime import datetime
from flask_login import current_user
from flask_socketio import SocketIO, Namespace, emit, disconnect
from flask_wtf.csrf import CSRFProtect, generate_csrf
# todo ——————————————————————————————————————————————————————————————————————————————————
from .models import Channel, Message, User, db
from app.forms.message_form import MessageForm
# todo ——————————————————————————————————————————————————————————————————————————————————
# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'http://tvhey.herokuapp.com', 'https://tvhey.herokuapp.com',
    'http://tvhey-staging.herokuapp.com', 'https://tvhey-staging.herokuapp.com',
  ]
else:
  origins = "*"

# initialize your socket instance
socketio = SocketIO(
  logger=True,
  engineio_logger=True,
  cors_allowed_origins=origins,
  allow_upgrades=True,
  always_connect=True,
  async_mode='eventlet'
)





@socketio.on('connect')
def test_connect(auth):
  emit('my response', {'data': 'Connected'})
  
@socketio.on('disconnect')
def test_disconnect():

  print('Client disconnected')


# !!!! ——————————————————————————————————————————————————————————————————————————————————
# !!!! ——————————————————————————————————————————————————————————————————————————————————     
# !!!! ——————————————————————————————————————————————————————————————————————————————————

# # todo ——————————————————————————————————————————————————————————————————————————————————
# # todo                 Decorators
# # todo ——————————————————————————————————————————————————————————————————————————————————
# """ 
# Datetime object serializer because
# socketio can't handle date time
# """
# def defaultconverter(o):
#   if isinstance(o, datetime):
#     return o.__str__()

# """ 
# Custom auth decorator because 'login_required
# cannot be used with SocketIO event handlers'
# according to flask-socketio docs
# """
# def authenticated_only(f):
#   @functools.wraps(f)
#   def wrapped(*args, **kwargs):
#     if not current_user.is_authenticated:
#       disconnect()
#     else:
#       return f(*args, **kwargs)
#   return wrapped


# # todo ——————————————————————————————————————————————————————————————————————————————————
# # todo                 Connection / Disconnection
# # todo ——————————————————————————————————————————————————————————————————————————————————
# @socketio.on('connect', namespace='/')
# def test_connection(socket):
#   print('Connected ———————————————————————————————————————————— debugger')
#   print(socket)
#   print('Connected ———————————————————————————————————————————— debugger')
#   emit('my response', {'data': 'Connected'})
#   # all_channels = [json.dumps(channel, default = defaultconverter) for channel in [channel.to_dict() for channel in Channel.query.all()]]
#   # emit('get all channels', {'all_channels': all_channels})

# @socketio.on('disconnect')
# def test_disconnection():
#   print('... DISCONNECT WEBSOCKET —————————————————————————————————————————————————— debugger')
#   emit('disconnect response', {'message': 'Disconnection successful'})

# # todo ——————————————————————————————————————————————————————————————————————————————————
# # todo                   Message Event Handlers
# # todo ——————————————————————————————————————————————————————————————————————————————————
# @socketio.on('get messages')
# @authenticated_only
# def get_messages(channelId):
#   messages = Message.query.filter(Message.channel_id == int(channelId)).all()
#   all_messages = [json.dumps(message, default = defaultconverter) for message in [message.to_dict() for message in messages]]
#   emit('get all messages', {'all_messages': all_messages})

# @socketio.on('create message')
# @authenticated_only
# def create_message(data):
#   new_message = Message(author_id=data['author_id'], channel_id=data['channel_id'], content=data['content'], created_at=datetime.now(), updated_at=datetime.now())
#   db.session.add(new_message)
#   db.session.commit()
#   new = new_message.to_dict()
#   emit('message to front', [json.dumps(new, default = defaultconverter)], broadcast=True)

# @socketio.on('edit message')
# @authenticated_only
# def edit_message(data):
#   message = Message.query.get(data['id'])
#   message.content = data['content']
#   db.session.commit()
#   edited = message.to_dict()
#   emit('edited message to front', [json.dumps(edited, default = defaultconverter)], broadcast=True)

# @socketio.on('delete message')
# @authenticated_only
# def delete_message(id):
#   message = Message.query.get(id)
#   db.session.delete(message)
#   db.session.commit()
#   emit('deleted message to front', id)

# # todo ——————————————————————————————————————————————————————————————————————————————————
# # todo             MessageForm form validators and csrf
# # todo ——————————————————————————————————————————————————————————————————————————————————
# # def inject_csrf_token(data):
# #   data.set_cookie(
# #     'csrf_token',
# #     generate_csrf(),
# #     secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
# #     samesite='Strict' if os.environ.get(
# #       'FLASK_ENV') == 'production' else None,
# #     httponly=True)
# #   return data


# # form = MessageForm()
#   # data['csrf_token'] = generate_csrf()
#   # form['csrf_token'].data = data
#   # if form.validate_on_submit():
#   #   print('validated for real debugger')
