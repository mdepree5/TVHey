from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .message_model import Message


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), nullable=False, unique=True)
  username = db.Column(db.String(50), nullable=False, unique=True)
  display_name = db.Column(db.String(100), nullable=False)
  image_url = db.Column(db.String(255), nullable=True)
  hashed_password = db.Column(db.String(255), nullable=False)
  
  channels = db.relationship('Channel', back_populates='users', cascade="all, delete")
  messages = db.relationship('Message', back_populates="users", cascade="all, delete")
  dms = db.relationship('DM', back_populates="users", cascade="all, delete")

  dm_host = db.relationship('DM', foreign_keys=[Message.host_id], back_populates='host')
  dm_recipient = db.relationship('DM', foreign_keys=[Message.recipient_id], back_populates='recipient')

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      'id': self.id,
      'email': self.email,
      'username': self.username,
      'display_name': self.display_name,
      'image_url': self.image_url,
    }
