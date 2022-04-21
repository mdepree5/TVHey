from flask.cli import AppGroup
from .user_seeds import seed_users, undo_users
from .channel_seeds import seed_channels, undo_channels
from .message_seeds import seed_messages, undo_messages
from .dm_seeds import seed_dms, undo_dms

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
  seed_users()
  seed_dms()
  seed_channels()
  seed_messages()


@seed_commands.command('undo')
def undo():
  undo_users()
  undo_dms()
  undo_channels()
  undo_messages()