import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSubscriptions,
  deleteSubscription,
  getSubscriptions,
} from "../../store/subscriptions";
import { getFavoriteCommunities } from "../../store/favorite_communities";

export default function CommunitySubscribeBtn({
  user,
  community,
  communityId,
  setShowLoginForm,
}) {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (subscriptions[community?.id]) setSubscribed(true);
  }, [subscribed, subscriptions]);

  useEffect(() => {
    if (subscriptions[community?.id]) setSubscribed(true);
  }, [subscribed, subscriptions]);
  return (
    <div className="community-header-info-details-right">
      <div className="community-header-info-subscribe">
        {user && subscribed && (
          <button
            className="blue-btn-unfilled btn-short join-btn"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(deleteSubscription(community.id));
              dispatch(getFavoriteCommunities());
              dispatch(getSubscriptions(communityId));
              setSubscribed(false);
            }}
            onMouseEnter={(e) => (e.target.textContent = "Leave")}
            onMouseLeave={(e) => (e.target.textContent = "Joined")}
          >
            Joined
          </button>
        )}
        {!subscribed && (
          <button
            className="blue-btn-filled btn-short join-btn"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(addToSubscriptions(community.id));
              dispatch(getSubscriptions(+communityId));

              user && setSubscribed(true);
              !user && setShowLoginForm(true);
            }}
          >
            Join
          </button>
        )}
      </div>
      <div className="community-header-info-unsubscribe"></div>
    </div>
  );
}