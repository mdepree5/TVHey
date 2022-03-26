from distutils.errors import DistutilsFileError
from flask_socketio import SocketIO, emit
import os
from .models import Channel, Message, User, db
from datetime import datetime, date
import json
from json import dumps
# todo ——————————————————————————————————————————————————————————————————————————————————
from flask_login import login_required, current_user
from app.forms.message_form import MessageForm
from app.models import Message, User, db
from datetime import datetime
# todo ——————————————————————————————————————————————————————————————————————————————————




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

@socketio.on('get_messages')
def get_messages(channelId):
  messages = Message.query.filter(Message.channel_id == int(channelId)).all()
  all_messages = [json.dumps(message, default = defaultconverter) for message in [message.to_dict() for message in messages]]
  
  emit('all_messages', {'all_messages': all_messages})


# handle chat messages
@socketio.on('chat')
@login_required
def handle_chat(data):
  print('chat —————————————————————————————————————————————————— debugger')
  print('chat —————————————————————————————————————————————————— debugger')
  print(data)
  print(data['author_id'])
  print('chat —————————————————————————————————————————————————— debugger')
  form = MessageForm()
  # form['csrf_token'].data = data['csrf_token']
  
  print('validated! ———————————————— debugger')
  new_message = Message(
    author_id = data['author_id'],
    channel_id = data['channel_id'],
    content = data['content'],
    created_at = datetime.now(),
    updated_at = datetime.now()
  )
    
  db.session.add(new_message)
  db.session.commit()
  print(new_message)
  print('validated! ———————————————— debugger')
  nm = new_message.to_dict()
  emit('chat to front', [json.dumps(nm, default = defaultconverter)], broadcast=True)
  return {**new_message.to_dict()}

  # return {'errors': validation_errors_to_error_messages(form.errors)}

  
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
  
  