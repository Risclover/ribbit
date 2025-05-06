import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSubscriptions,
  deleteSubscription,
  getSubscriptions,
  getFavoriteCommunities,
  getSingleCommunity,
} from "@/store";
import { getCommunities } from "@/store";
import { useAuthFlow } from "@/context/AuthFlowContext";

export function CommunitySubscribeBtn({
  user,
  community,
  communityId,
  setShowLoginForm,
}) {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions);
  const [subscribed, setSubscribed] = useState(false);

  const { openLogin } = useAuthFlow();

  useEffect(() => {
    if (subscriptions[community?.id]) setSubscribed(true);
  }, [subscribed, subscriptions, community?.id]);

  useEffect(() => {
    if (subscriptions[community?.id]) setSubscribed(true);
  }, [subscribed, subscriptions, community?.id]);

  return (
    <div className="community-header-info-details-right">
      <div className="community-header-info-subscribe">
        {user && subscribed && (
          <button
            className="blue-btn-unfilled btn-short join-btn community-btn joined"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(deleteSubscription(community.id));
              dispatch(getFavoriteCommunities());
              dispatch(getCommunities());
              dispatch(getSubscriptions(communityId));
              setSubscribed(false);
            }}
            onMouseEnter={(e) => (e.target.textContent = "Leave")}
            onMouseLeave={(e) => (e.target.textContent = "Joined")}
          >
            Joined
          </button>
        )}
        {(!user || !subscribed) && (
          <button
            className="blue-btn-filled btn-short join-btn community-btn-filled join"
            onClick={async (e) => {
              e.preventDefault();
              if (!user) {
                openLogin();
              } else if (user && !subscribed) {
                await dispatch(addToSubscriptions(community.id));
                dispatch(getSubscriptions(+communityId));
                dispatch(getCommunities());

                user && setSubscribed(true);
                !user && setShowLoginForm(true);
              }
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
