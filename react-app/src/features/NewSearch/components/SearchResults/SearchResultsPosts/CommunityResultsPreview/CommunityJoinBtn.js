import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSubscriptions,
  deleteSubscription,
  getFavoriteCommunities,
  getSubscriptions,
} from "../../../../../../store";

export function CommunityJoinBtn({ community }) {
  const dispatch = useDispatch();
  const [subscribed, setSubscribed] = useState(false);
  const [btnWord, setBtnWord] = useState("Joined");
  const user = useSelector((state) => state.session.user);
  const subscriptions = useSelector((state) => state.subscriptions);

  useEffect(() => {
    if (subscriptions[community?.id]) setSubscribed(true);
  }, [subscribed, community?.id, subscriptions]);

  return (
    <div>
      {user && subscribed && (
        <button
          className="search-results-page-community-join"
          onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            await dispatch(deleteSubscription(community?.id));
            setSubscribed(false);
            dispatch(getSubscriptions());
            dispatch(getFavoriteCommunities());
          }}
          onMouseEnter={() => setBtnWord("Leave")}
          onMouseLeave={() => setBtnWord("Joined")}
        >
          {btnWord}
        </button>
      )}
      {!subscribed && (
        <button
          className="search-results-page-community-join"
          onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            await dispatch(addToSubscriptions(community?.id));
            user && setSubscribed(true);
            dispatch(getSubscriptions());
          }}
        >
          Join
        </button>
      )}
    </div>
  );
}
