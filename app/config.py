import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")
    BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:5000")
    OAUTH2_PROVIDERS = {
        "google": {
            "client_id":     os.environ.get("GOOGLE_CLIENT_ID"),
            "client_secret": os.environ.get("GOOGLE_CLIENT_SECRET"),
            "authorize_url": "https://accounts.google.com/o/oauth2/v2/auth",
            "token_url":     "https://oauth2.googleapis.com/token",
            "userinfo": {
                'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
                'email': lambda json_data: json_data.get('email'),
            },
            "scopes": ["openid", "email", "profile"],
        }
    }
