  # from distutils.errors import DistutilsFileError
import os
import json
import asyncio
import functools
import eventlet
# eventlet.monkey_patch()
from json import dumps
# from flask import request
from datetime import datetime
from flask_login import current_user
from flask_socketio import SocketIO, Namespace, emit, disconnect
# from flask_wtf.csrf import CSRFProtect, generate_csrf
# todo ——————————————————————————————————————————————————————————————————————————————————
from .models import Channel, Message, User, db
# from app.forms.message_form import MessageForm
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
  # async_mode='eventlet'
)

def defaultconverter(o):
  if isinstance(o, datetime):
    return o.__str__()

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                 Decorators
# todo ——————————————————————————————————————————————————————————————————————————————————
""" 
Datetime object serializer because
socketio can't handle date time
"""
def defaultconverter(o):
  if isinstance(o, datetime):
    return o.__str__()

""" 
Custom auth decorator because 'login_required
cannot be used with SocketIO event handlers'
according to flask-socketio docs
"""
def authenticated_only(f):
  @functools.wraps(f)
  def wrapped(*args, **kwargs):
    if not current_user.is_authenticated:
      disconnect()
    else:
      return f(*args, **kwargs)
  return wrapped


# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                 Connection / Disconnection
# todo ——————————————————————————————————————————————————————————————————————————————————
# @socketio.on('connect', namespace='/')
@socketio.on('connect')
def test_connection():
  print('debugger ——————————————————————————————————————————————————————————————————————————————')
  print('Connected to websocket!')
  # print('debugger ——————————————————————————————————————————————————————————————————————————————')
  # all_users = [user.to_dict() for user in User.query.all()]
  # all_channels = [json.dumps(channel, default = defaultconverter) for channel in [channel.to_dict() for channel in Channel.query.all()]]
  # print('debugger ——————————————————————————————————————————————————————————————————————————————')
  # emit('connect response', {'message': 'Connection successful'})
  # emit('get all_users', {'all_users': all_users})
  # emit('get all_channels', {'all_channels': all_channels})
  
@socketio.on('disconnect')
def test_disconnection():
  print('debugger from websocket')
  print('disconnected from websocket!')
  emit('disconnect response', {'message': 'Disconnection successful'})

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                   Message Event Handlers
# todo ——————————————————————————————————————————————————————————————————————————————————
@socketio.on('get messages')
@authenticated_only
def get_messages(channelId):
  messages = Message.query.filter(Message.channel_id == int(channelId)).all()
  all_messages = [json.dumps(message, default = defaultconverter) for message in [message.to_dict() for message in messages]]
  emit('get all messages', {'all_messages': all_messages})

@socketio.on('create message')
@authenticated_only
def create_message(data):
  new_message = Message(author_id=data['author_id'], channel_id=data['channel_id'], content=data['content'], created_at=datetime.now(), updated_at=datetime.now())
  db.session.add(new_message)
  db.session.commit()
  new = new_message.to_dict()
  emit('message to front', [json.dumps(new, default = defaultconverter)], broadcast=True)

@socketio.on('edit message')
@authenticated_only
def edit_message(data):
  message = Message.query.get(data['id'])
  message.content = data['content']
  db.session.commit()
  edited = message.to_dict()
  emit('edited message to front', [json.dumps(edited, default = defaultconverter)], broadcast=True)

@socketio.on('delete message')
@authenticated_only
def delete_message(id):
  message = Message.query.get(id)
  db.session.delete(message)
  db.session.commit()
  emit('deleted message to front', id, broadcast=True)

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                   Channel Event Handlers
# todo ——————————————————————————————————————————————————————————————————————————————————
@socketio.on('get channels')
@authenticated_only
def get_channels():
  channels = Channel.query.all()
  all_channels = [json.dumps(channel, default = defaultconverter) for channel in [channel.to_dict() for channel in channels]]
  emit('get all channels', {'all_channels': all_channels})

@socketio.on('set channel')
@authenticated_only
def set_channel(id):
  emit('set channel to front', [json.dumps(Channel.query.get(id).to_dict(), default = defaultconverter)], broadcast=True)

@socketio.on('create channel')
@authenticated_only
def create_channel(data):
  new_channel = Channel(host_id=data['host_id'], title=data['title'], topic=data['topic'], created_at=datetime.now(), updated_at=datetime.now())
  db.session.add(new_channel)
  db.session.commit()
  new = new_channel.to_dict()
  emit('channel to front', [json.dumps(new, default = defaultconverter)], broadcast=True)

@socketio.on('edit channel')
@authenticated_only
def edit_channel(data):
  channel = Channel.query.get(data['id'])
  channel.title = data['title']
  channel.topic = data['topic']
  channel.updated_at = datetime.now()
  db.session.commit()
  edited = channel.to_dict()
  emit('edited channel to front', [json.dumps(edited, default = defaultconverter)], broadcast=True)

@socketio.on('delete channel')
@authenticated_only
def delete_channel(id):
  channel = Channel.query.get(id)
  print(channel)
  db.session.delete(channel)
  db.session.commit()
  emit('deleted channel to front', id, broadcast=True)

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
