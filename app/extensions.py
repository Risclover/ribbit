import logging
import sys

from flask_sqlalchemy import SQLAlchemy
from flask_migrate    import Migrate
from flask_socketio   import SocketIO
from flask_cors       import CORS
from flask_login      import LoginManager

db            = SQLAlchemy()
migrate       = Migrate()
socketio      = SocketIO()
cors          = CORS()
login_manager = LoginManager()

def configure_logging(app):
    """Attach a sane logger to `app.logger` and your blueprints."""
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter(
        "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
    ))

    root = logging.getLogger()               # root logger
    root.setLevel(logging.INFO if app.config["ENV"] == "production" else logging.DEBUG)
    root.addHandler(handler)
