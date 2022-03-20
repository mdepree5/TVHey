from app.models.db import db
from datetime import datetime, date

class Channel(db.Model):
  __tablename__ = "channels"

  id = db.Column(db.Integer, primary_key=True)
  host_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  topic = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  users = db.relationship("User", back_populates="channels")
  messages = db.relationship("Message", back_populates="channels", cascade="all, delete")


  def json_serial(obj):
    """JSON serializer for selfects not serializable by default json code"""
    
    if isinstance(obj (datetime, date)):
      return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

  def to_dict(self):
    return {
      "id": self.id,
      "host_id": self.host_id,
      "title": self.title,
      "topic": self.topic,
      "created_at": self.created_at.isoformat(),
      "updated_at": self.updated_at.isoformat(),
      'owner': self.users.username
    }

