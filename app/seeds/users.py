from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', about="", profile_img="https://i.imgur.com/OkrlO4H.png")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', about="", profile_img="https://i.imgur.com/OkrlO4H.png")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', about="", profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139981.png")

    user_4 = User(
        username="Videowulff",
        email="Videowulff@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
    )
    user_5 = User(
        username="pedrowyatt",
        email="pedrowyatt@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6997/6997674.png"
    )
    user_6 = User(
        username="lexi_the_leo",
        email="lexi_the_leo@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
    )
    user_7 = User(
        username="Cheris_P",
        email="Cheris_P@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
    )
    user_8 = User(
        username="lurkinislife",
        email="lurkinislife@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140044.png"
    )
    user_9 = User(
        username="asilvertintedrose",
        email="asilvertintedrose@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/5189/5189024.png"
    )
    user_10 = User(
        username="Siri0usly",
        email="Siri0usly@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/2716/2716285.png"
    )
    user_11 = User(
        username="scot816",
        email="scot816@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140052.png"
    )
    user_12 = User(
        username="Frigglefragglewaggit",
        email="Frigglefragglewaggit@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/2319/2319672.png"
    )
    user_13 = User(
        username="digitaljohn",
        email="digitaljohn@aa.io",
        password="password",
        about="Testing",
        display_name="DigiJohn",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128196.png"
    )
    user_14 = User(
        username="Pinturicchio1897",
        email="Pinturicchio1897@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139997.png"
    )
    user_15 = User(
        username="ninadsutrave",
        email="ninadsutrave@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6966/6966268.png"
    )
    user_16 = User(
        username="jesus-in-gucci",
        email="jesus-in-gucci@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6998/6998068.png"
    )
    user_17 = User(
        username="Plus_Jaguar_2134",
        email="Plus_Jaguar_2134@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140045.png"
    )
    user_18 = User(
        username="fagnerbrack",
        email="fagnerbrack@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140042.png"
    )
    user_19 = User(
        username="mastagio",
        email="mastagio@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/424/424870.png"
    )
    user_20 = User(
        username="darkrai-12",
        email="darkrai-12@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139951.png"
    )
    user_21 = User(
        username="Ykk7",
        email="Ykk7@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140039.png"
    )
    user_22 = User(
        username="whateverface",
        email="whateverface@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140057.png"
    )
    user_23 = User(
        username="sirczechs",
        email="sirczechs@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6997/6997660.png"
    )
    user_24 = User(
        username="Gari_305",
        email="Gari_305@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
    )
    user_25 = User(
        username="could_use_a_snack",
        email="could_use_a_snack@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
    )
    user_26 = User(
        username="VitoXzX",
        email="VitoXzX@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140061.png"
    )
    user_27 = User(
        username="Impressive-Menu-2120",
        email="Impressive-Menu-2120@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140077.png"
    )
    user_28 = User(
        username="certainlyforgetful",
        email="certainlyforgetful@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139970.png"
    )
    user_29 = User(
        username="Emble12",
        email="Emble12@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128244.png"
    )
    user_30 = User(
        username="ConfirmedCynic",
        email="ConfirmedCynic@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139993.png"
    )
    user_31 = User(
        username="upandtotheleftplease",
        email="upandtotheleftplease@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140074.png"
    )
    user_32 = User(
        username="ReasonablyBadass",
        email="ReasonablyBadass@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139948.png"
    )
    user_33 = User(
        username="OrionNebula1",
        email="OrionNebula1@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128262.png"
    )
    user_34 = User(
        username="anonymous322321",
        email="anonymous322321@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140053.png"
    )
    user_35 = User(
        username="goawaybating",
        email="goawaybating@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140040.png"
    )
    user_36 = User(
        username="Tieadonna",
        email="Tieadonna@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4128/4128400.png"
    )
    user_37 = User(
        username="thehourglasses",
        email="thehourglasses@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140060.png"
    )
    user_38 = User(
        username="mgslee",
        email="mgslee@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/8774/8774160.png"
    )
    user_39 = User(
        username="JorikTheBird",
        email="JorikTheBird@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4139/4139967.png"
    )
    user_40 = User(
        username="ILL_BE_WATCHING_YOU",
        email="ILL_BE_WATCHING_YOU@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6833/6833591.png"
    )
    user_41 = User(
        username="ToothlessGrandma",
        email="ToothlessGrandma@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4140/4140065.png"
    )
    user_42 = User(
        username="Stud76",
        email="Stud76@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6998/6998061.png"
    )
    user_43 = User(
        username="AmyAndAaron",
        email="AmyAndAaron@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/399/399790.png"
    )
    user_44 = User(
        username="Dreaminginslowmotion",
        email="Dreaminginslowmotion@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/693/693284.png"
    )
    user_45 = User(
        username="Corsair4",
        email="Corsair4@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    )
    user_46 = User(
        username="tradtrad100",
        email="tradtrad100@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/6998/6998096.png"
    )
    user_47 = User(
        username="Erik7494",
        email="Erik7494@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/4819/4819723.png"
    )
    user_48 = User(
        username="sey1",
        email="sey1@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/9308/9308984.png"
    )
    user_49 = User(
        username="thenamelessone7",
        email="thenamelessone7@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/414/414689.png"
    )
    user_50 = User(
        username="Heap_Good_Firewater",
        email="Heap_Good_Firewater@aa.io",
        password="password",
        profile_img="https://cdn-icons-png.flaticon.com/512/3277/3277688.png"
    )



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
