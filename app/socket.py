from flask_socketio import SocketIO, emit
import os
from .models import Channel, Message, User, db
from datetime import datetime, date
import json
from json import dumps
import asyncio
# import eventlet
# eventlet.monkey_patch()


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'http://tvhey.herokuapp.com/',
    'https://tvhey.herokuapp.com/',
    'ws://tvhey.herokuapp.com/',
    'wss://tvhey.herokuapp.com/'
  ]
else:
  origins = "*"

# initialize your socket instance
socketio = SocketIO(
  # async_mode='eventlet',
  logger=True, 
  cors_allowed_origins=origins
  )

def defaultconverter(o):
  if isinstance(o, datetime):
    return o.__str__()

@socketio.on('connect')
def test_connection():
  print('debugger ——————————————————————————————————————————————————————————————————————————————')
  print('Connected to websocket!')
  # all_users = User.query.all()
  # this = [user.to_dict() for user in all_users]
  # print(this)
  # print('debugger ——————————————————————————————————————————————————————————————————————————————')
  # all_channels = Channel.query.all()
  # themser = [json.dumps(channel, default = defaultconverter) for channel in [channel.to_dict() for channel in all_channels]]
  # print('debugger ——————————————————————————————————————————————————————————————————————————————')
  # emit('response', {'message': 'Connection successful'})
  # emit('all_users', {'all_users': this})
  # emit('all_channels', {'all_channels': themser})
  # return {"all_channels": [channel.to_dict() for channel in all_channels]}

# handle chat messages
@socketio.on('chat')
def handle_chat(data):
  print('debugger from websocket')
  print(data)
  print('debugger from websocket')
  emit('chat', data, broadcast=True)
  
@socketio.on('disconnect')
def test_disconnection():
  print('debugger from websocket')
  print('disconnected from websocket!')
  print('debugger from websocket')
  emit('disconnect response', {'message': 'Disconnection successful'})