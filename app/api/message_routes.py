from flask import Blueprint, render_template, redirect, request
import psycopg2
from app.forms.message_form import MessageForm
from flask_login import login_required, current_user
from app.models import Message, User, db
from datetime import datetime

message_routes = Blueprint('messages', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Message Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@message_routes.route("/", methods=["POST"])
@login_required
def create_message():
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  
  if form.validate_on_submit():
    new_message = Message(
      author_id = form.data['author_id'],
      channel_id = form.data['channel_id'],
      content = form.data['content'],
      created_at = datetime.now(),
      updated_at = datetime.now()
      )

    db.session.add(new_message)
    db.session.commit()
    return {**new_message.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}
# todo ——————————————————————————————————————————————————————————————————————————————————
@message_routes.route('/<int:messageId>', methods=['GET'])
def get_messages(messageId):
  all_messages = Message.query.filter(Message.channel_id == int(messageId)).all()

  return {"all_messages": [message.to_dict() for message in all_messages]}
# todo ——————————————————————————————————————————————————————————————————————————————————
@message_routes.route("/<int:messageId>", methods=['PUT'])
@login_required
def update_message(messageId):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    message = message.query.get(messageId)
    message.author_id = form.data['author_id']
    message.channel_id = form.data['channel_id']
    message.content = form.data['content']
    message.updated_at = datetime.now()
    db.session.commit()
    return {'message': message.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}
# todo ——————————————————————————————————————————————————————————————————————————————————
@message_routes.route("/<int:messageId>", methods=['DELETE'])
@login_required
def delete_message(messageId):
  message = Message.query.get(messageId)
  db.session.delete(message)
  db.session.commit()

  return {'messageId': messageId}
