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
  # all_users = User.query.all()
  # this = [user.to_dict() for user in all_users]
  
  # channels = Channel.query.all()
  # all_channels = [json.dumps(channel, default = defaultconverter) for channel in [channel.to_dict() for channel in channels]]
  # emit('response', {'message': 'Connection successful'})
  # emit('all_channels', {'all_channels': all_channels})
  
  # emit('all_users', {'all_users': this})
  # return {"all_channels": [channel.to_dict() for channel in all_channels]}
  print('[ Connected to Websocket!!! —————————————————————————————————————————————————— debugger')
  
  

# handle chat messages
@socketio.on('chat')
def handle_chat(data):
  print('[ START CHAT Websocket!!! —————————————————————————————————————————————————— debugger')
  print(data)
  emit('chat', data, broadcast=True)
  print('[ END CHAT Websocket!!! —————————————————————————————————————————————————— debugger')
  
@socketio.on('disconnect')
def test_disconnection():
  print('... DISCONNECT WEBSOCKET —————————————————————————————————————————————————— debugger')
  emit('disconnect response', {'message': 'Disconnection successful'})