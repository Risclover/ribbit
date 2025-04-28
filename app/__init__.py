from pathlib import Path
from flask import Flask, send_from_directory
from .config import Config
from .extensions import db, migrate, socketio, cors, login_manager
from .blueprints import register_blueprints
from .middlewares import register_middlewares
from .errors import register_error_handlers
from .seeds import seed_commands
from .models import User
from .extensions import login_manager, configure_logging

# --------------------------------------------------------------------------- #
#  Application factory
# --------------------------------------------------------------------------- #
def create_app(config_class=None) -> Flask:
    """
    Create and configure a new Flask application instance.

    Parameters
    ----------
    config_class : subclass of `Config`, optional
        If provided, overrides the default Config object.

    Returns
    -------
    Flask
        The configured Flask app.
    """
    static_folder = Path(__file__).resolve().parents[1] / "react-app" / "build"
    app = Flask(
        __name__,
        static_folder=str(static_folder),
        static_url_path="/",
    )

    # --------------------------------------------------------------------- #
    # Configuration & secrets
    # --------------------------------------------------------------------- #
    configure_logging(app)
    app.config.from_object(config_class or Config)
    app.secret_key = app.config.get("SECRET_KEY", "dev-secret-key")

    # --------------------------------------------------------------------- #
    # Initialise extensions
    # --------------------------------------------------------------------- #
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, cors_allowed_origins="*")
    cors.init_app(app, supports_credentials=True)
    login_manager.init_app(app)
    login_manager.login_view = "auth.unauthorized"

    @login_manager.user_loader
    def load_user(user_id: str):
        """Return the User instance given a unicode ID."""
        return User.query.get(int(user_id))
    # --------------------------------------------------------------------- #
    # Blueprints, CLI commands, middlewares, error handlers
    # --------------------------------------------------------------------- #
    register_blueprints(app)
    register_middlewares(app)
    register_error_handlers(app)
    app.cli.add_command(seed_commands)

    # --------------------------------------------------------------------- #
    # Single‑Page App fallback
    # --------------------------------------------------------------------- #
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def spa_fallback(path: str):
        """
        Serve React app for any non‑API route.

        All requests **not** starting with `/api/` (and not pointing at an
        existing static asset) are redirected to `index.html`.
        """
        static_dir = Path(app.static_folder)
        requested = static_dir / path
        if path.startswith("api/"):               # let Blueprints handle it
            return ("", 404)
        if requested.exists():
            return send_from_directory(static_dir, path)
        return send_from_directory(static_dir, "index.html")

    return app
