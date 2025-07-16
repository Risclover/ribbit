# app/seeds/subscriptions.py
from sqlalchemy import text
from app.models import User, Community
from app.extensions import db



def seed_subscriptions() -> None:
    """
    Populate the subscriptions association table.

    Steps
    -----
    1.  Bulk‑load every user we care about (id 2‑50) in one query.
    2.  Bulk‑load every community we care about (id 1‑21) in one query.
    3.  Drive the inserts from a plain dict:  user_id ➜ [community_ids …].
    """
    users = {u.id: u for u in User.query.filter(User.id.in_(range(2, 51))).all()}
    communities = {
        c.id: c
        for c in Community.query.filter(Community.id.in_(range(1, 22))).all()
    }

    sub_map = {
        2:  [18, 19, 3, 21, 17, 16, 11, 7],
        3:  [2, 4, 15, 6],
        4:  [9, 5, 1],
        5:  [10, 12, 13, 14],
        6:  [18, 19],
        7:  [3, 21],
        8:  [11, 7],
        9:  [8, 20, 1],
        10: [1, 5, 13, 12],
        11: [18, 3, 16, 11],
        12: [15, 4],
        13: [6, 2],
        14: [10, 5, 20],
        15: [13, 14, 8],
        16: [17, 18, 3],
        17: [1, 10, 9, 8],
        18: [17, 16, 18, 3, 11],
        19: [7, 10],
        20: [15, 4, 9, 14],
        21: [13, 1, 3],
        22: [21, 3, 7],
        23: [19, 18, 7],
        24: [14, 20, 10, 9, 1, 5],
        25: [13, 20],
        26: [18, 19, 3, 21, 17, 16, 11, 7],
        27: [11, 17, 16, 21, 3],
        28: [2, 4, 15, 6],
        29: [9, 5, 1],
        30: [10, 12, 13, 14],
        31: [18, 19],
        32: [3, 21],
        33: [11, 7],
        34: [8, 20, 1],
        35: [1, 5, 13, 12],
        36: [18, 3, 16, 11],
        37: [15, 4],
        38: [6, 2],
        39: [10, 5, 20],
        40: [13, 14, 8],
        41: [17, 18, 3],
        42: [1, 10, 9, 8],
        43: [17, 16, 18, 3, 11],
        44: [7, 10],
        45: [15, 4, 9, 14],
        46: [13, 1, 3],
        47: [21, 3, 7],
        48: [19, 18, 7],
        49: [14, 20, 10, 9, 1, 5, 12],
        50: [13, 20, 12],
    }

    for user_id, community_ids in sub_map.items():
        users[user_id].user_subscriptions.extend(
            communities[cid] for cid in community_ids
        )

    db.session.commit()


def undo_subscriptions() -> None:
    # TRUNCATE is much faster than DELETE for seed/undo cycles.
    db.session.execute("DELETE FROM subscriptions")
    db.session.commit()
