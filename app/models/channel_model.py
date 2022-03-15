from app.models.db import db
from datetime import datetime

class Channel(db.Model):
  __tablename__ = "channels"

  id = db.Column(db.Integer, primary_key=True)
  host_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  topic = db.Column(db.String(255), nullable=False)
  dependencies = db.Column(db.Text, nullable=False)
  media_url = db.Column(db.String(255), nullable=True)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  users = db.relationship("User", back_populates="channels")
  messages = db.relationship("Message", back_populates="channels", cascade="all, delete")

  def to_dict(self):
    return {
      "id": self.id,
      "host_id": self.host_id,
      "title": self.title,
      "topic": self.topic,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      'owner': self.users.username
    }
