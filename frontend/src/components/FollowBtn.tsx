import { useMemo, useCallback } from "react";
import classNames from "classnames";
import {
  followUser,
  getFavoriteUsers,
  getFollowers,
  unfollowUser,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { useHistory } from "react-router-dom";

/* ───────────────────────── Types ───────────────────────── */
export interface FollowBtnProps {
  user: { id: number | string; username: string };
  community?: unknown;
  isProfile?: boolean;
}

/* ───────────────────────── Component ───────────────────── */

export function FollowBtn({
  user,
  community,
  isProfile = false,
}: FollowBtnProps): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const follows = useAppSelector((s) => s.followers?.follows);
  const currentUser = useAppSelector((s) => s.session.user);

  const numericId = Number(user?.id); // 🆕 guarantee number

  const isFollowing = useMemo(
    () =>
      follows
        ? Object.values(follows).some(
            (f: any) => f?.username === user?.username
          )
        : false,
    [follows, user?.username]
  );

  const btnText = isFollowing ? "Unfollow" : "Follow";

  const btnClass = classNames({
    "user-profile-following-btn": isFollowing && isProfile,
    "user-profile-follower-btn": !isFollowing && isProfile,
    "blue-btn-unfilled btn-long": isFollowing && !isProfile,
    "blue-btn-filled btn-long": !isFollowing && !isProfile,
    "community-btn": isFollowing && community, // 🆕 allow truthy
    "community-btn-filled": !isFollowing && community,
  });

  const handleFollowClick = useCallback(
    async (e: React.MouseEvent) => {
      if (!currentUser) {
        history.push("/login");
        return;
      }
      e.stopPropagation();
      e.preventDefault();

      if (isFollowing) {
        await dispatch(unfollowUser(numericId));
        await dispatch(getFavoriteUsers());
      } else {
        await dispatch(followUser(numericId));
      }
      await dispatch(getFollowers());
    },
    [currentUser, dispatch, history, isFollowing, numericId]
  );

  return (
    <button
      aria-label={btnText}
      className={btnClass}
      onClick={handleFollowClick}
    >
      {btnText}
    </button>
  );
}
