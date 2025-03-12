import random
from app.models import db, User
from datetime import datetime, timedelta

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

# Adds a demo user, you can add other users here if you want
def seed_users():
    admin = User(username='Ribbit', email='ribbit@aa.io', password='password', about='', profile_img='https://i.imgur.com/OkrlO4H.png')
    demo = User(
        username='Demo', email='demo@aa.io', password='password', about="Hi, I'm Demo", profile_img="https://i.imgur.com/OkrlO4H.png", banner_img="https://wallpapersok.com/images/hd/widescreen-blue-moon-qa91zekh1cl86k1k.jpg", created_at=generate_relative_timestamp())
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', about="Marnieee", profile_img="https://i.imgur.com/OkrlO4H.png", banner_img="https://wallpapersmug.com/download/2560x1080/8d554d/celestial-world-digital-art-space-colorful.jpg", created_at=generate_relative_timestamp())
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', about="Bobbie", profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139981.png", banner_img="https://i.pinimg.com/736x/d4/32/30/d4323062065c96e06e794370cfc01571.jpg", created_at=generate_relative_timestamp())

    user_4 = User(
        username="Videowulff",
        email="Videowulff@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
        about="Hi I'm Rita",
        display_name="Rita",
        banner_img="https://images8.alphacoders.com/135/thumb-1920-1354012.png",
        created_at=generate_relative_timestamp()
    )
    user_5 = User(
        username="pedrowyatt",
        email="pedrowyatt@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6997/6997674.png",
        about="😂😂😂",
        display_name="Pedro the Meme Queen",
        banner_img="https://wallpapers.com/images/hd/astronaut-4k-ultra-widescreen-3anbtnv46uqaugpp.jpg",
        created_at=generate_relative_timestamp()
    )
    user_6 = User(
        username="lexi_the_leo",
        email="lexi_the_leo@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
        about="Just here to mess things up. 😈",
        display_name="Lexi the Leo",
        banner_img="https://wallpapercave.com/wp/wp8566312.jpg",
        created_at=generate_relative_timestamp()
    )
    user_7 = User(
        username="Cheris_P",
        email="Cheris_P@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
        about="Nope.",
        banner_img="https://wallpapercave.com/wp/wp11893074.jpg",
        created_at=generate_relative_timestamp()
    )
    user_8 = User(
        username="lurkinislife",
        email="lurkinislife@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140044.png",
        about="Nothing here.",
        display_name="Lurkin",
        banner_img="https://wallpapercave.com/wp/wp11893042.jpg",
        created_at=generate_relative_timestamp()
    )
    user_9 = User(
        username="asilvertintedrose",
        email="asilvertintedrose@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/5189/5189024.png",
        about="lolk",
        display_name="🌹",
        created_at=generate_relative_timestamp()
    )
    user_10 = User(
        username="Siri0usly",
        email="Siri0usly@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/2716/2716285.png",
        about="Meow meow",
        display_name="Robin",
        created_at=generate_relative_timestamp()
    )
    user_11 = User(
        username="scot816",
        email="scot816@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140052.png",
        about="Hi I'm Scot",
        display_name="Scot",
        created_at=generate_relative_timestamp()
    )
    user_12 = User(
        username="Frigglefragglewaggit",
        email="Frigglefragglewaggit@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/2319/2319672.png",
        about="Wiggity waggety wat?",
        display_name="Wiggity",
        created_at=generate_relative_timestamp()
    )
    user_13 = User(
        username="digitaljohn",
        email="digitaljohn@aa.io",
        password="password",
        display_name="DigiJohn",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128196.png",
        about="Software engineer with a passion for fashion. Jk.",
        created_at=generate_relative_timestamp()
    )
    user_14 = User(
        username="Pinturicchio1897",
        email="Pinturicchio1897@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139997.png",
        created_at=generate_relative_timestamp()
    )
    user_15 = User(
        username="ninadsutrave",
        email="ninadsutrave@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6966/6966268.png",
        created_at=generate_relative_timestamp()
    )
    user_16 = User(
        username="jesus-in-gucci",
        email="jesus-in-gucci@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6998/6998068.png",
        created_at=generate_relative_timestamp()
    )
    user_17 = User(
        username="Plus_Jaguar_2134",
        email="Plus_Jaguar_2134@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140045.png",
        created_at=generate_relative_timestamp()
    )
    user_18 = User(
        username="fagnerbrack",
        email="fagnerbrack@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140042.png",
        created_at=generate_relative_timestamp()
    )
    user_19 = User(
        username="mastagio",
        email="mastagio@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/424/424870.png",
        created_at=generate_relative_timestamp()
    )
    user_20 = User(
        username="darkrai-12",
        email="darkrai-12@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139951.png",
        created_at=generate_relative_timestamp()
    )
    user_21 = User(
        username="Ykk7",
        email="Ykk7@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140039.png",
        created_at=generate_relative_timestamp()
    )
    user_22 = User(
        username="whateverface",
        email="whateverface@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140057.png",
        created_at=generate_relative_timestamp()
    )
    user_23 = User(
        username="sirczechs",
        email="sirczechs@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6997/6997660.png",
        created_at=generate_relative_timestamp()
    )
    user_24 = User(
        username="Gari_305",
        email="Gari_305@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
        created_at=generate_relative_timestamp()
    )
    user_25 = User(
        username="could_use_a_snack",
        email="could_use_a_snack@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        created_at=generate_relative_timestamp()
    )
    user_26 = User(
        username="VitoXzX",
        email="VitoXzX@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
        created_at=generate_relative_timestamp()
    )
    user_27 = User(
        username="Impressive-Menu-2120",
        email="Impressive-Menu-2120@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140077.png",
        created_at=generate_relative_timestamp()
    )
    user_28 = User(
        username="certainlyforgetful",
        email="certainlyforgetful@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139970.png",
        created_at=generate_relative_timestamp()
    )
    user_29 = User(
        username="Emble12",
        email="Emble12@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128244.png",
        created_at=generate_relative_timestamp()
    )
    user_30 = User(
        username="ConfirmedCynic",
        email="ConfirmedCynic@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139993.png",
        created_at=generate_relative_timestamp()
    )
    user_31 = User(
        username="upandtotheleftplease",
        email="upandtotheleftplease@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140074.png",
        created_at=generate_relative_timestamp()
    )
    user_32 = User(
        username="ReasonablyBadass",
        email="ReasonablyBadass@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139948.png",
        created_at=generate_relative_timestamp()
    )
    user_33 = User(
        username="OrionNebula1",
        email="OrionNebula1@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128262.png",
        created_at=generate_relative_timestamp()
    )
    user_34 = User(
        username="anonymous322321",
        email="anonymous322321@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140053.png",
        created_at=generate_relative_timestamp()
    )
    user_35 = User(
        username="goawaybating",
        email="goawaybating@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140040.png",
        created_at=generate_relative_timestamp()
    )
    user_36 = User(
        username="Tieadonna",
        email="Tieadonna@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128400.png",
        created_at=generate_relative_timestamp()
    )
    user_37 = User(
        username="thehourglasses",
        email="thehourglasses@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140060.png",
        created_at=generate_relative_timestamp()
    )
    user_38 = User(
        username="mgslee",
        email="mgslee@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/8774/8774160.png",
        created_at=generate_relative_timestamp()
    )
    user_39 = User(
        username="JorikTheBird",
        email="JorikTheBird@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139967.png",
        created_at=generate_relative_timestamp()
    )
    user_40 = User(
        username="ILL_BE_WATCHING_YOU",
        email="ILL_BE_WATCHING_YOU@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6833/6833591.png",
        created_at=generate_relative_timestamp()
    )
    user_41 = User(
        username="ToothlessGrandma",
        email="ToothlessGrandma@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140065.png",
        created_at=generate_relative_timestamp()
    )
    user_42 = User(
        username="Stud76",
        email="Stud76@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6998/6998061.png",
        created_at=generate_relative_timestamp()
    )
    user_43 = User(
        username="AmyAndAaron",
        email="AmyAndAaron@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/399/399790.png",
        created_at=generate_relative_timestamp()
    )
    user_44 = User(
        username="Dreaminginslowmotion",
        email="Dreaminginslowmotion@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/693/693284.png",
        created_at=generate_relative_timestamp()
    )
    user_45 = User(
        username="Corsair4",
        email="Corsair4@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        created_at=generate_relative_timestamp()
    )
    user_46 = User(
        username="tradtrad100",
        email="tradtrad100@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6998/6998096.png",
        created_at=generate_relative_timestamp()
    )
    user_47 = User(
        username="Erik7494",
        email="Erik7494@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4819/4819723.png",
        created_at=generate_relative_timestamp()
    )
    user_48 = User(
        username="sey1",
        email="sey1@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/9308/9308984.png",
        created_at=generate_relative_timestamp()
    )
    user_49 = User(
        username="thenamelessone7",
        email="thenamelessone7@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/414/414689.png",
        created_at=generate_relative_timestamp()
    )
    user_50 = User(
        username="Heap_Good_Firewater",
        email="Heap_Good_Firewater@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/3277/3277688.png",
        created_at=generate_relative_timestamp()
    )


    db.session.add(admin)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.add(user_6)
    db.session.add(user_7)
    db.session.add(user_8)
    db.session.add(user_9)
    db.session.add(user_10)
    db.session.add(user_11)
    db.session.add(user_12)
    db.session.add(user_13)
    db.session.add(user_14)
    db.session.add(user_15)
    db.session.add(user_16)
    db.session.add(user_17)
    db.session.add(user_18)
    db.session.add(user_19)
    db.session.add(user_20)
    db.session.add(user_21)
    db.session.add(user_22)
    db.session.add(user_23)
    db.session.add(user_24)
    db.session.add(user_25)
    db.session.add(user_26)
    db.session.add(user_27)
    db.session.add(user_28)
    db.session.add(user_29)
    db.session.add(user_30)
    db.session.add(user_31)
    db.session.add(user_32)
    db.session.add(user_33)
    db.session.add(user_34)
    db.session.add(user_35)
    db.session.add(user_36)
    db.session.add(user_37)
    db.session.add(user_38)
    db.session.add(user_39)
    db.session.add(user_40)
    db.session.add(user_41)
    db.session.add(user_42)
    db.session.add(user_43)
    db.session.add(user_44)
    db.session.add(user_45)
    db.session.add(user_46)
    db.session.add(user_47)
    db.session.add(user_48)
    db.session.add(user_49)
    db.session.add(user_50)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    db.session.execute("DELETE FROM users")

    db.session.commit()
