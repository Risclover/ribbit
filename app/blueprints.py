from importlib import import_module

# Hold dotted‑path strings to avoid circular imports
_BLUEPRINT_PATHS = (
    "app.api.user_routes:user_routes",
    "app.api.auth_routes:auth_routes",
    "app.api.post_routes:post_routes",
    "app.api.comment_routes:comment_routes",
    "app.api.community_routes:community_routes",
    "app.api.subscription_routes:subscription_routes",
    "app.api.search_routes:search_routes",
    "app.api.rule_routes:rule_routes",
    "app.api.follower_routes:follower_routes",
    "app.api.favorite_community_routes:favorite_community_routes",
    "app.api.favorite_user_routes:favorite_user_routes",
    "app.api.viewed_post_routes:viewed_post_routes",
    "app.api.thread_routes:thread_routes",
    "app.api.message_routes:message_routes",
    "app.api.notification_routes:notification_routes",
    "app.api.chat_thread_routes:chat_thread_routes",
    "app.api.community_settings_routes:community_settings_routes",
    "app.api.chat_reaction_routes:chat_reaction_routes"
)

def register_blueprints(app):
    for dotted in _BLUEPRINT_PATHS:
        module_path, bp_name = dotted.split(":")
        bp = getattr(import_module(module_path), bp_name)
        app.register_blueprint(bp, url_prefix=f"/api/{bp.name}")
