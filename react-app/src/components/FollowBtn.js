import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import {
  followUser,
  getFavoriteUsers,
  getFollowers,
  unfollowUser,
} from "@/store";

/**
 * A button that users can click to follow or unfollow other users.
 * 
 * @param {community} - The community
 * @param {boolean} isProfile - Whether or not the page this button is on is the user profile page.
 *
 * @example
 * <FollowBtn user={} community={} isProfile />
 */

export const FollowBtn = ({ user, community, isProfile = false }) => {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followers?.follows);

  const isFollowing = useMemo(
    () =>
      follows
        ? Object.values(follows).some(
            (followedUser) => followedUser.username === user?.username
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
    "community-btn": isFollowing && community,
    "community-btn-filled": !isFollowing && community,
  });

  const handleFollowClick = useCallback(
    async (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (isFollowing) {
        await dispatch(unfollowUser(user?.id));
        await dispatch(getFavoriteUsers());
      } else {
        await dispatch(followUser(user?.id));
      }
      await dispatch(getFollowers());
    },
    [dispatch, isFollowing, user?.id]
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
};
