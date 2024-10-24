import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFavoriteUsers,
  getFollowers,
  unfollowUser,
} from "@/store";

export function FollowBtn({ user, community, btnType }) {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followers?.follows);

  const findIsFollowing = () =>
    follows
      ? Object.values(follows).some(
          (followed) => followed.username === user.username
        )
      : null;

  const [following, setFollowing] = useState(findIsFollowing());
  const [btnText, setBtnText] = useState("");

  const btnClass1 = !following
    ? "user-profile-follower-btn"
    : "user-profile-following-btn";

  const btnClass2 = `${
    !following ? "blue-btn-filled btn-long" : "blue-btn-unfilled btn-long"
  }${
    community ? (!following ? " community-btn-filled" : " community-btn") : ""
  }`;

  const btnClasses = [btnClass1, btnClass2];

  useEffect(() => {
    setFollowing(findIsFollowing());
    setBtnText(findIsFollowing() ? "Unfollow" : "Follow");
  }, [follows, user.username]);

  const handleFollowClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (following) {
      await dispatch(unfollowUser(user.id));
      await dispatch(getFavoriteUsers());
    } else {
      await dispatch(followUser(user.id));
    }
    await dispatch(getFollowers());
  };

  return (
    <button
      aria-label={btnText}
      className={btnType === "profile" ? btnClasses[0] : btnClasses[1]}
      onClick={handleFollowClick}
    >
      {btnText}
    </button>
  );
}
