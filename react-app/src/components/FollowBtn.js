import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import {
  followUser,
  getFavoriteUsers,
  getFollowers,
  unfollowUser,
} from "@/store";

export const FollowBtn = ({ user, community, btnType }) => {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followers?.follows);

  const { username, id: userId } = user;

  const isFollowing = useMemo(
    () =>
      follows
        ? Object.values(follows).some(
            (followedUser) => followedUser.username === username
          )
        : false,
    [follows, username]
  );

  const btnText = isFollowing ? "Unfollow" : "Follow";

  const btnClass = classNames({
    "user-profile-following-btn": isFollowing && btnType === "profile",
    "user-profile-follower-btn": !isFollowing && btnType === "profile",
    "blue-btn-unfilled btn-long": isFollowing && btnType !== "profile",
    "blue-btn-filled btn-long": !isFollowing && btnType !== "profile",
    "community-btn": isFollowing && community,
    "community-btn-filled": !isFollowing && community,
  });

  const handleFollowClick = useCallback(
    async (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (isFollowing) {
        await dispatch(unfollowUser(userId));
        await dispatch(getFavoriteUsers());
      } else {
        await dispatch(followUser(userId));
      }
      await dispatch(getFollowers());
    },
    [dispatch, isFollowing, userId]
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
