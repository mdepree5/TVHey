from .db import db
from datetime import datetime, date

class DM(db.Model):
  __tablename__ = "dms"

  id = db.Column(db.Integer, primary_key=True)
  host_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  messages = db.relationship("Message", back_populates="dms", cascade="all, delete")

  host = db.relationship("User", foreign_keys=[host_id], back_populates="dm_host")
  recipient = db.relationship("User", foreign_keys=[recipient_id], back_populates="dm_recipient")
  
  
  def to_dict(self):
    return {
      "id": self.id,
      "host_id": self.host_id,
      "recipient_id": self.recipient_id,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      'host': self.host.display_name if self.host.display_name else self.host.username,
      'recipient': self.recipient.display_name if self.recipient.display_name else self.recipient.username,
    }



""" 
* frontend == websockets ==>  backend: const participantsArr = '[1, 2, 3]'

what needs to happen is: I need to know which users in the backend are involved
I need to know which users to notify/to broadcast to... I think...? 
  |
  L-------------> actually maybe not. broadcast true doesn't matter if users don't have access to certain dms on the frontend in the first place.



* backend: 


* backend == websockets ==> frontend:

"""