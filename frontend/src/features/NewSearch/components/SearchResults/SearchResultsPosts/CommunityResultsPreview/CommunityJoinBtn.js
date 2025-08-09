import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addToSubscriptions,
  deleteSubscription,
  getFavoriteCommunities,
  getSubscriptions,
} from "@/store";
import { getCommunities } from "@/store";

export function CommunityJoinBtn({ community, isPage }) {
  const dispatch = useAppDispatch();
  const [subscribed, setSubscribed] = useState(false);
  const [btnWord, setBtnWord] = useState("Joined");
  const user = useAppSelector((state) => state.session.user);
  const subscriptions = useAppSelector(
    (state) => state.subscriptions.subscriptions
  );

  useEffect(() => {
    if (subscriptions[community?.id]) setSubscribed(true);
  }, [subscribed, community?.id, subscriptions]);

  const toggleCommunityJoin = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await dispatch(deleteSubscription(community?.id));
    setSubscribed(false);
    dispatch(getSubscriptions());
    dispatch(getFavoriteCommunities());
    dispatch(getCommunities());
  };

  const toggleCommunityLeave = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await dispatch(addToSubscriptions(community?.id));
    user && setSubscribed(true);
    dispatch(getSubscriptions());
    dispatch(getCommunities());
  };

  return (
    <div>
      {user && subscribed && (
        <button
          className={
            isPage === "singlepage"
              ? "community-btn btn-long blue-btn-unfilled"
              : "search-results-page-community-join"
          }
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              toggleCommunityJoin(e);
            }
          }}
          onClick={toggleCommunityJoin}
          onMouseEnter={() => setBtnWord("Leave")}
          onMouseLeave={() => setBtnWord("Joined")}
        >
          {btnWord}
        </button>
      )}
      {user && !subscribed && (
        <button
          className={
            isPage === "singlepage"
              ? "community-btn-filled btn-long blue-btn-filled"
              : "search-results-page-community-join"
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleCommunityLeave(e);
            }
          }}
          onClick={toggleCommunityLeave}
        >
          Join
        </button>
      )}
    </div>
  );
}
