import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addToSubscriptions,
  deleteSubscription,
  getSubscriptions,
  getFavoriteCommunities,
  getCommunities,
} from "@/store";
import { useAuthFlow } from "@/context/AuthFlowContext";

export function CommunitySubscribeBtn({
  user,
  community,
  communityId,
  setShowLoginForm,
}) {
  const dispatch = useAppDispatch();
  const { openLogin } = useAuthFlow();

  // 1) Read current state from Redux (single source of truth)
  const subsById = useAppSelector((s) => s.subscriptions.subscriptions);
  const subsLoaded = useAppSelector((s) => s.subscriptions.loaded);
  const isSubscribed = !!subsById?.[community?.id];

  // 2) Local "busy" flag for UX (prevents double clicks)
  const [busy, setBusy] = useState(false);

  const join = async (e) => {
    e.preventDefault();
    if (!community?.id || busy) return;

    if (!user) {
      openLogin();
      setShowLoginForm?.(true);
      return;
    }

    try {
      setBusy(true);
      await dispatch(addToSubscriptions(community.id));
      // refresh whatever UI depends on it
      await Promise.all([
        dispatch(getSubscriptions(+communityId)),
        dispatch(getCommunities()),
        dispatch(getFavoriteCommunities()),
      ]);
    } finally {
      setBusy(false);
    }
  };

  const leave = async (e) => {
    e.preventDefault();
    if (!community?.id || busy) return;

    try {
      setBusy(true);
      await dispatch(deleteSubscription(community.id));
      await Promise.all([
        dispatch(getSubscriptions(+communityId)),
        dispatch(getFavoriteCommunities()),
        dispatch(getCommunities()),
      ]);
    } finally {
      setBusy(false);
    }
  };

  // 3) Avoid the "Join" flash while subscriptions are still loading.
  //    Render a disabled button with the right shape, or nothing.
  if (!subsLoaded) {
    return (
      <div className="community-header-info-details-right">
        <div className="community-header-info-subscribe">
          <button
            className="blue-btn-filled btn-short join-btn community-btn-filled join"
            disabled
            aria-busy="true"
          >
            {/* skeleton / spinner optional */}
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="community-header-info-details-right">
      <div className="community-header-info-subscribe">
        {user && isSubscribed ? (
          <button
            className="blue-btn-unfilled btn-short join-btn community-btn joined"
            onClick={leave}
            aria-pressed="true"
            onMouseEnter={(e) => (e.currentTarget.textContent = "Leave")}
            onMouseLeave={(e) => (e.currentTarget.textContent = "Joined")}
          >
            Joined
          </button>
        ) : (
          <button
            className="blue-btn-filled btn-short join-btn community-btn-filled join"
            onClick={join}
            aria-pressed="false"
          >
            Join
          </button>
        )}
      </div>
      <div className="community-header-info-unsubscribe" />
    </div>
  );
}
