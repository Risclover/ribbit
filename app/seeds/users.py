# app/seeds/users.py
import random
from datetime import datetime, timedelta

from sqlalchemy import text

from app.models import db, User


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def generate_relative_timestamp(max_days_ago=7):
    """
    Generate a random datetime within the past `max_days_ago` days.
    """
    now = datetime.now()
    days_ago = random.randint(0, max_days_ago)
    hours_ago = random.randint(0, 23)
    minutes_ago = random.randint(0, 59)
    seconds_ago = random.randint(0, 59)

    return now - timedelta(days=days_ago, hours=hours_ago, minutes=minutes_ago, seconds=seconds_ago)


def u(**kwargs) -> User:  # small convenience wrapper
    kwargs.setdefault("created_at", generate_relative_timestamp())
    return User(**kwargs)


# --------------------------------------------------------------------------- #
# Raw user data
# --------------------------------------------------------------------------- #
USER_SPECS = [
    # fmt: off  (keep columns aligned for readability — 'ruff' / 'black' will respect this)
    {"username": "Ribbit", "email": "ribbit@aa.io", "password": "password",
     "about": "", "profile_img": "https://i.imgur.com/OkrlO4H.png"},
    {"username": "Demo", "email": "demo@aa.io", "password": "password",
     "about": "Hi, I'm Demo", "profile_img": "https://i.imgur.com/OkrlO4H.png",
     "banner_img": "https://wallpapersok.com/images/hd/widescreen-blue-moon-qa91zekh1cl86k1k.jpg"},
    {"username": "marnie", "email": "marnie@aa.io", "password": "password",
     "about": "Marnieee", "profile_img": "https://i.imgur.com/OkrlO4H.png",
     "banner_img": "https://wallpapersmug.com/download/2560x1080/8d554d/celestial-world-digital-art-space-colorful.jpg"},
    {"username": "bobbie", "email": "bobbie@aa.io", "password": "password",
     "about": "Bobbie", "profile_img": "https://cdn-icons-png.flaticon.com/512/4139/4139981.png",
     "banner_img": "https://i.pinimg.com/736x/d4/32/30/d4323062065c96e06e794370cfc01571.jpg"},
    {"username": "Videowulff", "email": "Videowulff@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
     "about": "Hi I'm Rita", "display_name": "Rita",
     "banner_img": "https://images8.alphacoders.com/135/thumb-1920-1354012.png"},
    {"username": "pedrowyatt", "email": "pedrowyatt@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6997/6997674.png",
     "about": "😂😂😂", "display_name": "Pedro the Meme Queen",
     "banner_img": "https://wallpapers.com/images/hd/astronaut-4k-ultra-widescreen-3anbtnv46uqaugpp.jpg"},
    {"username": "lexi_the_leo", "email": "lexi_the_leo@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
     "about": "Just here to mess things up. 😈", "display_name": "Lexi the Leo",
     "banner_img": "https://wallpapercave.com/wp/wp8566312.jpg"},
    {"username": "Cheris_P", "email": "Cheris_P@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
     "about": "Nope.", "banner_img": "https://wallpapercave.com/wp/wp11893074.jpg"},
    {"username": "lurkinislife", "email": "lurkinislife@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140044.png",
     "about": "Nothing here.", "display_name": "Lurkin",
     "banner_img": "https://wallpapercave.com/wp/wp11893042.jpg"},
    {"username": "asilvertintedrose", "email": "asilvertintedrose@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/5189/5189024.png",
     "about": "lolk", "display_name": "🌹"},
    {"username": "Siri0usly", "email": "Siri0usly@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/2716/2716285.png",
     "about": "Meow meow", "display_name": "Robin"},
    {"username": "scot816", "email": "scot816@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140052.png",
     "about": "Hi I'm Scot", "display_name": "Scot"},
    {"username": "Frigglefragglewaggit", "email": "Frigglefragglewaggit@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/2319/2319672.png",
     "about": "Wiggity waggety wat?", "display_name": "Wiggity"},
    {"username": "digitaljohn", "email": "digitaljohn@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4128/4128196.png",
     "about": "Software engineer with a passion for fashion. Jk.",
     "display_name": "DigiJohn"},
    {"username": "Pinturicchio1897", "email": "Pinturicchio1897@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4139/4139997.png"},
    {"username": "ninadsutrave", "email": "ninadsutrave@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6966/6966268.png"},
    {"username": "jesus-in-gucci", "email": "jesus-in-gucci@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6998/6998068.png"},
    {"username": "Plus_Jaguar_2134", "email": "Plus_Jaguar_2134@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140045.png"},
    {"username": "fagnerbrack", "email": "fagnerbrack@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140042.png"},
    {"username": "mastagio", "email": "mastagio@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/424/424870.png"},
    {"username": "darkrai-12", "email": "darkrai-12@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4139/4139951.png"},
    {"username": "Ykk7", "email": "Ykk7@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140039.png"},
    {"username": "whateverface", "email": "whateverface@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140057.png"},
    {"username": "sirczechs", "email": "sirczechs@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6997/6997660.png"},
    {"username": "Gari_305", "email": "Gari_305@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"},
    {"username": "could_use_a_snack", "email": "could_use_a_snack@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"},
    {"username": "VitoXzX", "email": "VitoXzX@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140061.png"},
    {"username": "Impressive-Menu-2120", "email": "Impressive-Menu-2120@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140077.png"},
    {"username": "certainlyforgetful", "email": "certainlyforgetful@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4139/4139970.png"},
    {"username": "Emble12", "email": "Emble12@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4128/4128244.png"},
    {"username": "ConfirmedCynic", "email": "ConfirmedCynic@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4139/4139993.png"},
    {"username": "upandtotheleftplease", "email": "upandtotheleftplease@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140074.png"},
    {"username": "ReasonablyBadass", "email": "ReasonablyBadass@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4139/4139948.png"},
    {"username": "OrionNebula1", "email": "OrionNebula1@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4128/4128262.png"},
    {"username": "anonymous322321", "email": "anonymous322321@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140053.png"},
    {"username": "goawaybating", "email": "goawaybating@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140040.png"},
    {"username": "Tieadonna", "email": "Tieadonna@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4128/4128400.png"},
    {"username": "thehourglasses", "email": "thehourglasses@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140060.png"},
    {"username": "mgslee", "email": "mgslee@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/8774/8774160.png"},
    {"username": "JorikTheBird", "email": "JorikTheBird@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4139/4139967.png"},
    {"username": "ILL_BE_WATCHING_YOU", "email": "ILL_BE_WATCHING_YOU@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6833/6833591.png"},
    {"username": "ToothlessGrandma", "email": "ToothlessGrandma@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4140/4140065.png"},
    {"username": "Stud76", "email": "Stud76@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6998/6998061.png"},
    {"username": "AmyAndAaron", "email": "AmyAndAaron@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/399/399790.png"},
    {"username": "Dreaminginslowmotion", "email": "Dreaminginslowmotion@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/693/693284.png"},
    {"username": "Corsair4", "email": "Corsair4@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"},
    {"username": "tradtrad100", "email": "tradtrad100@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/6998/6998096.png"},
    {"username": "Erik7494", "email": "Erik7494@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/4819/4819723.png"},
    {"username": "sey1", "email": "sey1@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/9308/9308984.png"},
    {"username": "thenamelessone7", "email": "thenamelessone7@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/414/414689.png"},
    {"username": "Heap_Good_Firewater", "email": "Heap_Good_Firewater@aa.io", "password": "password",
     "profile_img": "https://cdn-icons-png.flaticon.com/512/3277/3277688.png"},
    # fmt: on
]


# --------------------------------------------------------------------------- #
# Seeding + rollback
# --------------------------------------------------------------------------- #
def seed_users() -> None:
    """
    Create all users in one go with `bulk_save_objects`, which is roughly two
    orders of magnitude faster than 50 individual `session.add()` calls.
    """
    db.session.bulk_save_objects([u(**spec) for spec in USER_SPECS])
    db.session.commit()


def undo_users() -> None:
    """
    Drop‑all for Postgres (fast) or fall back to DELETE for SQLite.
    """
    if db.engine.name.startswith("postgres"):
        db.session.execute(
            text("TRUNCATE users RESTART IDENTITY CASCADE;")
        )
    else:  # SQLite, MySQL, etc.
        db.session.execute(text("DELETE FROM users;"))
    db.session.commit()
