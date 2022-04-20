from app.models.db import db
from datetime import datetime

class Message(db.Model):
  __tablename__ = "messages"

  id = db.Column(db.Integer, primary_key=True)
  author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=True)
  dm_id = db.Column(db.Integer, db.ForeignKey("dms.id"), nullable=True)
  content = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  users = db.relationship("User", back_populates="messages")
  channels = db.relationship("Channel", back_populates="messages")

  def to_dict(self):
    return {
      "id": self.id,
      "author_id": self.author_id,
      "channel_id": self.channel_id,
      "dm_id": self.dm_id,
      "content": self.content,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      'author': self.users.display_name if self.users.display_name else self.users.username,
      'author_image': self.users.image_url
    }
