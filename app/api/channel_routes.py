from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import psycopg2
from app.forms.channel_form import ChannelForm
from app.models import Channel, Message, User, db
from datetime import datetime

channel_routes = Blueprint('channels', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Channel Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@channel_routes.route("/", methods=["POST"])
@login_required
def create_channel():
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  # print('debugger')
  # print(form.data)
  # print('debugger')
  if form.validate_on_submit():
    new_channel = Channel(
      host_id = form.data['host_id'],
      title = form.data['title'],
      topic = form.data['topic'],
      created_at = datetime.now(),
      updated_at = datetime.now()
    )
    db.session.add(new_channel)
    db.session.commit()
    # print('debugger')
    # new = {**new_channel.to_dict()}
    # print(new)
    # print('debugger')
    return {**new_channel.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}
# todo ——————————————————————————————————————————————————————————————————————————————————
@channel_routes.route("/", methods=["GET"])
def get_all_channels():
  all_channels = Channel.query.all()
  return {"all_channels": [channel.to_dict() for channel in all_channels]}
# todo ——————————————————————————————————————————————————————————————————————————————————
@channel_routes.route("/<int:channelId>", methods=["GET"])        
def get_one_channel(channelId):
  one_channel = Channel.query.get(channelId)
  return {**one_channel.to_dict()}
# todo ——————————————————————————————————————————————————————————————————————————————————
@channel_routes.route("/<int:channelId>", methods=['PUT'])
@login_required
def update_channel(channelId):
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    channel = Channel.query.get(channelId)
    channel.title = form.data['title']
    channel.topic = form.data['topic']
    channel.updated_at = datetime.now()
    db.session.commit()
    return {**channel.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}
# todo ——————————————————————————————————————————————————————————————————————————————————
@channel_routes.route("/<int:channelId>", methods=['DELETE'])
@login_required
def delete_channel(channelId):
  channel = Channel.query.get(channelId)
  db.session.delete(channel)
  db.session.commit()

  return {'id': channelId}
# todo ——————————————————————————————————————————————————————————————————————————————————
@channel_routes.route('/<int:channelId>/messages', methods=['GET'])
def get_messages(channelId):
  all_messages = Message.query.filter(Message.channel_id == int(channelId)).all()

  return {"all_messages": [message.to_dict() for message in all_messages]}