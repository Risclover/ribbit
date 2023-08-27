import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSubscriptions,
  deleteSubscription,
  getSubscriptions,
} from "../../store/subscriptions";
import { getFavoriteCommunities } from "../../store/favorite_communities";
import LoginSignupModal from "../../components/Modals/LoginSignupModal";
import { getSingleCommunity } from "../../store/communities";

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
              dispatch(getSingleCommunity(communityId));
              dispatch(getSubscriptions(communityId));
              setSubscribed(false);
            }}
            onMouseEnter={(e) => (e.target.textContent = "Leave")}
            onMouseLeave={(e) => (e.target.textContent = "Joined")}
          >
            Joined
          </button>
        )}
        {user && !subscribed && (
          <button
            className="blue-btn-filled btn-short join-btn community-btn-filled join"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(addToSubscriptions(community.id));
              dispatch(getSubscriptions(+communityId));
              dispatch(getSingleCommunity(communityId));

              user && setSubscribed(true);
              !user && setShowLoginForm(true);
            }}
          >
            Join
          </button>
        )}
        {!user && (
          <LoginSignupModal
            btnText="Join"
            className="blue-btn-filled btn-short join-btn"
          />
        )}
      </div>
      <div className="community-header-info-unsubscribe"></div>
    </div>
  );
}
