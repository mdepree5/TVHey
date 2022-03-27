# from distutils.errors import DistutilsFileError
import os
import json
import functools
from json import dumps
from flask import request
from datetime import datetime
from flask_login import current_user
from flask_socketio import SocketIO, emit, disconnect
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
  logger=True, cors_allowed_origins=origins
)

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
@socketio.on('connect')
def test_connection():
  print('Connected ———————————————————————————————————————————— debugger')
  all_channels = [json.dumps(channel, default = defaultconverter) for channel in [channel.to_dict() for channel in Channel.query.all()]]
  emit('get all channels', {'all_channels': all_channels})

@socketio.on('disconnect')
def test_disconnection():
  print('... DISCONNECT WEBSOCKET —————————————————————————————————————————————————— debugger')
  emit('disconnect response', {'message': 'Disconnection successful'})

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                   Message Event Handlers
# todo ——————————————————————————————————————————————————————————————————————————————————
@socketio.on('get messages')
@authenticated_only
def get_messages(channelId):
  messages = Message.query.filter(Message.channel_id == int(channelId)).all()
  all_messages = [json.dumps(message, default = defaultconverter) for message in [message.to_dict() for message in messages]]
  
  emit('all_messages', {'all_messages': all_messages})

@socketio.on('create message')
@authenticated_only
def create_message(data):
  form = MessageForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  form['csrf_token'].data = data
  print('validated! ———————————————— debugger')
  print('form.data debugger')
  print(form.data)
  print('form.data debugger')
  print('validated! ———————————————— debugger')
  
  new_message = Message(author_id=data['author_id'], channel_id=data['channel_id'], content=data['content'], created_at=datetime.now(), updated_at=datetime.now())
  db.session.add(new_message)
  db.session.commit()
  # print('validated! ———————————————— debugger')
  nm = new_message.to_dict()
  emit('message to front', [json.dumps(nm, default = defaultconverter)], broadcast=True)
  # return {**new_message.to_dict()}
  # return {'errors': validation_errors_to_error_messages(form.errors)}

@socketio.on('edit message')
@authenticated_only
def edit_message(data):
  message = Message.query.get(data['id'])
  message.content = data['content']
  db.session.commit()
  em = message.to_dict()
  emit('edited message to front', [json.dumps(em, default = defaultconverter)], broadcast=True)
  print('edited! ———————————————— debugger')
  # return {**new_message.to_dict()}
  # return {'errors': validation_errors_to_error_messages(form.errors)}

@socketio.on('delete message')
@authenticated_only
def delete_message(id):
  message = Message.query.get(id)
  db.session.delete(message)
  db.session.commit()
  emit('deleted message to front', id)

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               CHannels
# todo ——————————————————————————————————————————————————————————————————————————————————

