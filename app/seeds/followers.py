# app/seeds/followers.py
from app.models import User
from app.extensions import db


def seed_followers():
    """
    Populate the followers association table.

    We:
      • Load the users we need in a single query.
      • Drive everything off a simple mapping of follower_id ➜ followed_ids.
    """
    # Preload users 2‑50 once
    users = {u.id: u for u in User.query.filter(User.id.in_(range(2, 51))).all()}

    follow_map = {
        2:  [3, 4, 7, 10, 14, 19, 23, 25, 30, 31, 38, 42, 44, 50],
        3:  [2, 8, 11, 16, 21, 27, 33, 40, 46],
        4:  [2, 3, 12, 17, 22, 28, 34, 41, 47],
        5:  [13, 18, 29, 35, 48],
        6:  [19, 36, 37, 49],
        7:  [2, 4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
        8:  [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
        9:  [6, 11, 16, 21, 26, 31, 36, 41, 46],
        10: [7, 12, 17, 22, 27, 32, 37, 42, 47],
        11: [8, 13, 18, 23, 28, 33, 38, 43, 48],
        12: [2, 10, 20, 30, 40, 50],
        13: [3, 11, 21, 31, 41],
        14: [12, 22, 32, 42],
        15: [13, 23, 33, 43],
        16: [4, 14, 24, 34, 44],
        17: [5, 15, 25, 35, 45],
        18: [6, 16, 26, 36, 46],
        19: [7, 17, 27, 37, 47],
        20: [8, 18, 28, 38, 48],
        21: [9, 19, 29, 39, 49],
        22: [4, 10, 14],
        23: [2, 11, 15],
        24: [7, 16],
        25: [2, 8, 17],
        26: [9, 18],
        27: [3, 10, 19],
        28: [4, 11, 20],
        29: [5, 7, 21],
        30: [2, 8, 12],
        31: [2, 9, 13],
        32: [10, 14],
        33: [3, 11, 15],
        34: [4, 7, 16],
        35: [5, 8, 17],
        36: [6, 9, 18],
        37: [6, 10, 19],
        38: [2, 11, 20],
        39: [7, 21],
        40: [3, 8, 12],
        41: [4, 9, 13],
        42: [2, 10, 14],
        43: [11, 15],
        44: [2, 7, 16],
        45: [8, 17],
        46: [3, 9, 18],
        47: [5, 10, 19],
        48: [5, 11, 20],
        49: [6, 7, 21],
        50: [2, 8, 12],
    }

    for follower_id, followed_ids in follow_map.items():
        users[follower_id].followed.extend(users[uid] for uid in followed_ids)

    db.session.commit()

def undo_followers():
    # Faster than plain DELETE on large tables
    db.session.execute("DELETE FROM followers")
    db.session.commit()
