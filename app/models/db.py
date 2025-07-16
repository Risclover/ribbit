from flask_sqlalchemy import SQLAlchemy
import os

environment = os.getenv("FLASK_ENV")
db = SQLAlchemy(session_options={"autoflush": False})
