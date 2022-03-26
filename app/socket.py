from distutils.errors import DistutilsFileError
from flask_socketio import SocketIO, emit
import os
from .models import Channel, Message, User, db
from datetime import datetime, date
import json
from json import dumps


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'http://tvhey.herokuapp.com',
    'https://tvhey.herokuapp.com',
    'http://tvhey-staging.herokuapp.com',
    'https://tvhey-staging.herokuapp.com',
  ]
else:
  origins = "*"

# initialize your socket instance
socketio = SocketIO(
  # async_mode='eventlet',
  logger=True, cors_allowed_origins=origins
  )

def defaultconverter(o):
  if isinstance(o, datetime):
    return o.__str__()

@socketio.on('connect')
def test_connection():
  print('[ START Connected to Websocket!!! —————————————————————————————————————————————————— debugger')
  all_users = User.query.all()
  this = [user.to_dict() for user in all_users]
  
  channels = Channel.query.all()
  all_channels = [json.dumps(channel, default = defaultconverter) for channel in [channel.to_dict() for channel in channels]]
  emit('response', {'message': 'Connection successful'})
  emit('all_channels', {'all_channels': all_channels})
  
  emit('all_users', {'all_users': this})
  # return {"all_channels": [channel.to_dict() for channel in all_channels]}
  print('[ Connected to Websocket!!! —————————————————————————————————————————————————— debugger')

@socketio.on('get_messages')
def get_messages(channelId):
  messages = Message.query.filter(Message.channel_id == int(channelId)).all()
  all_messages = [json.dumps(message, default = defaultconverter) for message in [message.to_dict() for message in messages]]
  emit('all_messages', {'all_messages': all_messages})


# handle chat messages
@socketio.on('chat')
def handle_chat(data):
  print('chat —————————————————————————————————————————————————— debugger')
  print(data)
  emit('chat', data, broadcast=True)
  print('chat —————————————————————————————————————————————————— debugger')
  
@socketio.on('disconnect')
def test_disconnection():
  print('... DISCONNECT WEBSOCKET —————————————————————————————————————————————————— debugger')
  emit('disconnect response', {'message': 'Disconnection successful'})
  
  
@socketio.on('create')
def create(data):
  if data.crud == 'channel':
    print(data.crud)
  if data.crud == 'message':
    print(data.crud)
  
  emit('create', data, broadcast=True)

@socketio.on('edit')
def edit(data):
  emit('edit', data, broadcast=True)

@socketio.on('delete')
def delete(data):
  emit('delete', data, broadcast=True)
  
  