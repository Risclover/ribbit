from flask import request, redirect
from flask_wtf.csrf import generate_csrf
import os

def register_middlewares(app):
    @app.before_request
    def https_redirect():
        if os.getenv("FLASK_ENV") == "production" and request.headers.get("X-Forwarded-Proto") == "http":
            return redirect(request.url.replace("http://", "https://", 1), code=301)

    @app.after_request
    def inject_csrf_cookie(response):
        secure = os.getenv("FLASK_ENV") == "production"
        response.set_cookie(
            "csrf_token",
            generate_csrf(),
            secure=secure,
            samesite="Strict" if secure else None,
            httponly=True,
        )
        return response
