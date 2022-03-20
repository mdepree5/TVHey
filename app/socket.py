from flask_socketio import SocketIO, emit
import os
from .models import Channel, Message, User, db

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'http://tvhey.herokuapp.com/',
    'https://tvhey.herokuapp.com/'
  ]
else:
  origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('connect')
def test_connection():
  print('debugger from websocket')
  print('Connected to websocket!')
  all_users = User.query.all()
  this = [user.to_dict() for user in all_users]
  print(this)
  # all_channels = Channel.query.all()
  # them = [channel.to_dict() for channel in all_channels]
  # print(them)
  print('debugger from websocket')
  emit('response', {'message': 'Connection successful'})
  emit('all_users', {'all_users': this})
  # emit('all_channels', {'all_channels': [channel.to_dict() for channel in all_channels]})
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
  emit('response', {'message': 'Disconnection successful'})