import random
from app.models import Post, PostVote, User
from app.extensions import db



# --------------------------------------------------------------------------- #
# Desired   post_id → net_score
# --------------------------------------------------------------------------- #
desired_post_scores: dict[int, int] = {
    1:  22,   # (+29  / −7)
    2:  14,   # (+21  / −7)
    3:   5,   # (+13  / −8)
    4:  39,   # (+45  / −6)
    5:  25,
    6:  12,
    7:  26,
    8:   5,
    9:  30,
    10:  4,
    11: 13,
    12: 14,
    13: 21,
    14:  8,
    15: 26,
    16: -3,
    17: 44,
    18: 12,
    19:  7,
    20: -4,
    21:  4,
    22: 20,
    23: -5,
    24: 17,
    25: 20,
    26: 25,
    27: -2,
    28:  9,
    30: -6,
    31:  10,   # small burst of interest
    32:   6,
    33:   8,
    34:  12,
    35:   9,
    36:  15,   # front‑page for a bit
    37:   5,
    38:  18,
    39:  11,
    40:   7,
    41:  -2,   # slightly unpopular
    42:   4,
    43:  20,   # trending
    44:  -1,
    45:  14,
    46:   3,
    47:   4,
    48:   4,
    49:   1,
    50:   0,   # no traction
    51:  19,
    52:  16,
    53:   1,
    54:  14,
    55:   5,
    56:   2,
    57:  11,
    58:   4,
    59:   1,
    60:   1,
    61:   4,
    62:  -2,
    63:  15,
    64:  10,
    65:   3,
    66:  12,
}


# --------------------------------------------------------------------------- #
def seed_postvotes() -> None:
    """Populate the post_votes table with realistic‑looking data."""
    posts   = Post.query.all()
    users   = User.query.all()
    user_ids = [u.id for u in users]

    votes_to_add: list[PostVote] = []

    for post in posts:
        author_id = post.user_id

        # 1. Author always up‑votes their own post
        votes_to_add.append(
            PostVote(user_id=author_id, post_id=post.id, is_upvote=True)
        )

        remaining_user_ids = [u for u in user_ids if u != author_id]

        # ------------------------------------------------------------ #
        # deterministic branch — we have a target net score
        # ------------------------------------------------------------ #
        if post.id in desired_post_scores:
            target = desired_post_scores[post.id]

            # subtract author’s guaranteed +1
            net_after_author = target - 1

            # Choose a total number T of additional voters
            T = random.randint(abs(net_after_author), abs(net_after_author) + 10)

            # Make T even‑compatible with desired net, and fit the user pool
            while (T + net_after_author) & 1:          # keep it even
                T += 1
            T = min(T, len(remaining_user_ids))

            up_cnt   = (T + net_after_author) // 2
            down_cnt = T - up_cnt

            # Safety guards
            up_cnt   = max(0, min(up_cnt,   len(remaining_user_ids)))
            down_cnt = max(0, min(down_cnt, len(remaining_user_ids) - up_cnt))

            # Pick voters
            up_voters   = random.sample(remaining_user_ids, up_cnt)
            remaining   = [u for u in remaining_user_ids if u not in up_voters]
            down_voters = random.sample(remaining, down_cnt)

            votes_to_add.extend(
                PostVote(user_id=u, post_id=post.id, is_upvote=True)  for u in up_voters
            )
            votes_to_add.extend(
                PostVote(user_id=u, post_id=post.id, is_upvote=False) for u in down_voters
            )

        # ------------------------------------------------------------ #
        # fallback — vanilla random seeding
        # ------------------------------------------------------------ #
        else:
            for u in remaining_user_ids:
                if random.random() < 0.30:  # 30 % chance this user votes
                    votes_to_add.append(
                        PostVote(
                            user_id=u,
                            post_id=post.id,
                            is_upvote=random.random() < 0.70  # 70 % up‑votes
                        )
                    )

    # One round‑trip → DB
    db.session.bulk_save_objects(votes_to_add)
    db.session.commit()


def undo_postvotes() -> None:
    db.session.execute("TRUNCATE post_votes RESTART IDENTITY CASCADE;")
    db.session.commit()
