from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Post, User, Comment
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, PostUpdateForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

imagepost_routes = Blueprint("image-posts", __name__)
