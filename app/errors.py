from flask import jsonify

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found(_: Exception):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(e: Exception):
        app.logger.exception(e)
        return jsonify({"error": "Internal server error"}), 500
