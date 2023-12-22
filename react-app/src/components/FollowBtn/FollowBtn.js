import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowers,
  getUserFollowers,
} from "../../store/followers";
import { addNotification } from "../../store/notifications";

export function FollowBtn({ user }) {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followers.follows);

  const isFollowing = Object.values(follows).some(
    (followed) => followed?.username === user?.username
  );

  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async (e) => {
    e.preventDefault();
    const data = await dispatch(followUser(user?.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user?.id));
    setFollowing(!following);
    const payload = {
      type: "follower",
      id: data.id,
    };

    if (!following) {
      await dispatch(addNotification(payload));
    }
  };

  //   if (!follows || !user) return null;

  return (
    <button
      className={
        "username-popup-btn-btm" && !following
          ? "blue-btn-filled btn-long"
          : "blue-btn-unfilled btn-long"
      }
      onClick={handleFollow}
    >
      {!following ? "Follow" : "Unfollow"}
    </button>
  );
}
