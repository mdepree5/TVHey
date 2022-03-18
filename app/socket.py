from flask_socketio import SocketIO, emit
import os


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
  print('debugger from websocket')
  emit('response', {'message': 'Connection successful'})

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