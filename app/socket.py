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


# handle chat messages
@socketio.on('send')
def handle_chat(data):
  print('debugger from websocket')
  print(data)
  print('debugger from websocket')
  emit('send', data, broadcast=True)