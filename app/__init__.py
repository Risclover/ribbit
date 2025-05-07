from pathlib import Path
from flask import Flask, send_from_directory, jsonify

from .config      import Config
from .extensions  import (
    db,
    migrate,
    socketio,
    cors,
    login_manager,
    configure_logging,
)
from .blueprints  import register_blueprints
from .middlewares import register_middlewares
from .errors      import register_error_handlers
from .seeds       import seed_commands
from .models      import User


# --------------------------------------------------------------------------- #
#  Application factory
# --------------------------------------------------------------------------- #
def create_app(config_class=None) -> Flask:
    """
    Create and configure a new Flask application instance.
    """
    static_folder = (
        Path(__file__).resolve().parents[1] / "frontend" / "build"
    )
    app = Flask(
        __name__,
        static_folder=str(Path(__file__).resolve().parents[1] / "frontend" / "build"),
        static_url_path="/"
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
    socketio.init_app(app, cors_allowed_origins="*")   # already OK
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
    # Single-Page App fallback
    # --------------------------------------------------------------------- #
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def spa_fallback(path):
        # Block only API and auth endpoints from falling through to React
        if path.startswith("api/") or path.startswith("auth/"):
            return jsonify({"error": "Not found"}), 404

        static_dir = Path(app.static_folder)
        requested = static_dir / path

        # Serve real static files if requested (like main.js, logo.png, etc.)
        if path and requested.exists():
            return send_from_directory(static_dir, path)

        # Otherwise, serve React’s entry point
        return send_from_directory(static_dir, "index.html"), 200


    # --------------------------------------------------------------------- #
    # Socket.IO event handlers  (*** NEW LINE ***)
    # --------------------------------------------------------------------- #
    # Import AFTER socketio.init_app so decorators bind to the live instance.
    from app import socket   # noqa: F401

    return app


app = create_app()
