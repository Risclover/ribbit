import random
from app.models import db, CommentVote, Comment, User

def seed_commentvotes():
    # Gather existing Comments and Users
    comments = Comment.query.all()
    users = User.query.all()
    user_ids = [u.id for u in users]

    desired_scores = {
        1: 8,
        2: 5,
        3: -3,
        4: 3,
        5: 5,
        6: 4,
        7: 0,
        8: 8,
        9: 8,
        10: 5,
        11: 4,
        12: 3,
        13: 1,
        14: 6,
        15: 5,
        16: 9,
        17: 4,
        18: 3,
        19: 8,
        20: 2,
        21: 11,
        22: 8,
        23: 5,
        24: 2,
        25: 1,
        26: 3,
        27: 1,
        28: 1,
        29: -3,
        30: 14,
        31: 10,
        32: 6,
        33: 4,
        34: 2,
        35: 10,
        36: 5,
        37: 1,
        38: 14,
        39: 9,
        40: 6,
        41: 4,
        42: 1,
        43: 8,
        44: -1,
        45: 12,
        46: 3,
        47: 4,
        48: 4,
        49: 1,
        50: 0,
        51: 20,
        52: 16,
        53: 1,
        54: 14,
        55: 5,
        56: 2,
        57: 11,
        58: 4,
        59: 1,
        60: 1,
        61: 4,
        62: -2,
        63: 15,
        64: 10,
        65: 3,
        66: 12,
        67: 8,
        68: 7,
        69: 21,
        70: 4,
        71: 12,
        72: 6,
        73: 5,
        74: 3,
        75: 10,
        76: 9,
        77: 2,
        78: 3,
        79: 6,
        80: 5,
        81: 4,
        82: 11,
        83: 9,
        84: 10,
        85: 3,
        86: 4,
        87: 2,
        88: 7,
        89: 2,
        90: 5,
        91: 2,
        92: 23,
        93: 3,
        94: 19,
        95: 4,
        96: 3,
        97: 7,
        98: 2,
        99: 1,
        100: 7,
        101: 3,
        102: 1,
        103: 1,
        104: 1,
        105: 3,
        106: 0,
        107: 3,
        108: 1,
        109: 2,
        110: 1,
        111: 9,
        112: 7,
        113: 6,
        114: -1,
        115: 5,
        116: 1,
        117: -1,
        118: 1,
        119: 1,
        120: 5,
        121: 5,
        122: 3,
        123: 1,
        124: 7,
        125: 4,
        126: 3,
        127: 2,
        128: -4,
        129: 5,
        130: 2,
        131: 3,
        132: -3,
        133: 0,
        134: 11,
        135: 8,
        136: 7,
        137: 8,
        138: 4,
        139: 2,
        140: -2,
        141: 0,
        142: 8,
        143: 3,
        144: 12,
        145: 10,
        146: 9,
        147: 6,
        148: 4,
        149: 2,
        150: 2,
        151: 0,
        152: 19,
        153: 16,
        154: 14,
        155: 13,
        156: -1,
        157: 14,
        158: 5,
        159: 17,
        160: 10,
        161: 8,
        162: 5,
        163: 3,
        164: 3,
        165: 2,
        166: 1,
        167: 2,
        168: 1,
        169: 4,
        170: 4,
        171: 2,
        172: 1,
        173: 8,
        174: 6,
        175: 3,
        176: 0,
        177: 9,
        178: 5,
        179: 4,
        180: 4,
        181: 2,
        182: 13,
        183: 9,
        184: 6,
        185: 4,
        186: 3,
        187: 11,
        188: 8,
        189: 6,
        190: 5,
        191: 3,
        192: 10,
        193: 8,
        194: 5,
        195: 3,
        196: -1,
        197: -2,
        198: 1,
        199: 14,
        200: 9,
        201: 8,
        202: 6,
        203: 4,
        204: 2,
        205: 14,
        206: 10,
        207: 6,
        208: 3,
        209: 1,
        210: 10,
        211: 5,
        212: 3,
        213: 7,
        214: 11,
        215: 6,
        216: 3,
        217: 3,
        218: 1,
        219: 5,
        220: 2,
        221: 2,
        222: 4,
        223: 2,
        224: 1,
        225: 2,
        226: -1,
        227: 0,
        228: 16,
        229: 10,
        230: 5,
        231: 3,
        232: 18,
        233: 13,
        234: 10,
        235: 6,
        236: 3,
        237: 1,
        238: 0,
        239: 6,
        240: -4,
        241: 9,
        242: 8,
        243: 2,
        244: 1,
        245: 5,
        246: 3,
        247: 5,
        248: 16,
        249: 16,
        250: 10,
        251: 5,
        252: 8,
        253: 9,
        254: 7,
        255: 6,
        256: 4,
        257: 8,
        258: 6,
        259: 5,
        260: 9,
        261: 11,
        262: 9,
        263: 8,
        264: 1,
        265: 4,
        266: 9,
        267: 10,
    }

    votes_to_add = []

    for comment in comments:
        author_id = comment.user_id
        # 1) Author always upvotes
        votes_to_add.append(
            CommentVote(user_id=author_id, comment_id=comment.id, is_upvote=True)
        )

        remaining_user_ids = [u for u in user_ids if u != author_id]

        if comment.id in desired_scores:
            net_score = desired_scores[comment.id]
            net_score_after_author = net_score - 1

            # 2) Decide a total T (from abs(...) up to abs(...) + 10)
            T = random.randint(abs(net_score_after_author), abs(net_score_after_author) + 10)

            # Ensure T + net is even
            while (T + net_score_after_author) % 2 != 0:
                T += 1

            # Make sure T <= the user pool for no duplications:
            if T > len(remaining_user_ids):
                T = len(remaining_user_ids)
                # Could re-check the evenness condition again if desired...

            # 3) Solve for up_count / down_count
            up_count = (T + net_score_after_author) // 2
            down_count = T - up_count

            # 4) Edge cases
            if up_count < 0:
                up_count = 0
                down_count = 0

            if up_count > len(remaining_user_ids):
                up_count = len(remaining_user_ids)

            # 5) Pick upvoters
            upvoters = random.sample(remaining_user_ids, up_count)
            votes_to_add.extend([
                CommentVote(user_id=u_id, comment_id=comment.id, is_upvote=True)
                for u_id in upvoters
            ])
            remaining_user_ids = [u for u in remaining_user_ids if u not in upvoters]

            # 6) Pick downvoters
            if down_count > len(remaining_user_ids):
                down_count = len(remaining_user_ids)

            downvoters = random.sample(remaining_user_ids, down_count)
            votes_to_add.extend([
                CommentVote(user_id=u_id, comment_id=comment.id, is_upvote=False)
                for u_id in downvoters
            ])

        else:
            # For comments not in desired_scores, do random seeding
            for u_id in remaining_user_ids:
                # 30% chance to vote, and 70% of those are upvotes
                if random.random() < 0.3:
                    is_up = (random.random() < 0.7)
                    votes_to_add.append(
                        CommentVote(user_id=u_id, comment_id=comment.id, is_upvote=is_up)
                    )

    # Finally, commit
    db.session.add_all(votes_to_add)
    db.session.commit()


def undo_commentvotes():
    db.session.execute("DELETE FROM comment_votes")
    db.session.commit()
