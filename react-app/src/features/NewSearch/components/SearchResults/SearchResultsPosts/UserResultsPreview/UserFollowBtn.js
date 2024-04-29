import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFavoriteUsers,
} from "../../../../../../store";

export const UserFollowBtn = ({ user }) => {
  const dispatch = useDispatch();

  const isFollowing = useSelector((state) => state.followers.follows[user?.id]);

  const [btnWord, setBtnWord] = useState("Following");

  useEffect(() => {
    if (isFollowing) {
      setBtnWord("Following");
    } else {
      setBtnWord("Follow");
    }
  }, [isFollowing]);

  const handleFollowClick = async (e) => {
    e.preventDefault();
    if (isFollowing) {
      await dispatch(unfollowUser(user.id));
      await dispatch(getFavoriteUsers());
    } else {
      await dispatch(followUser(user.id));
    }
    await dispatch(getFollowers());
  };

  const handleMouseEnter = () => {
    if (isFollowing) {
      setBtnWord("Unfollow");
    }
  };

  const handleMouseLeave = () => {
    if (isFollowing) {
      setBtnWord("Following");
    }
  };

  if (!user) return null;
  return (
    <button
      className="search-results-page-person-join"
      onClick={handleFollowClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {btnWord}
    </button>
  );
};
