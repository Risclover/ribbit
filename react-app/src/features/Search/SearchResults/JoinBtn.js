import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToSubscriptions, deleteSubscription } from "../../../store";

export function JoinBtn({ community }) {
  const dispatch = useDispatch();
  const [subscribed, setSubscribed] = useState(false);
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
            e.preventDefault();
            await dispatch(deleteSubscription(community?.id));
            setSubscribed(false);
          }}
        >
          Joined
        </button>
      )}
      {!subscribed && (
        <button
          className="search-results-page-community-join"
          onClick={async (e) => {
            e.preventDefault();
            await dispatch(addToSubscriptions(community?.id));
            user && setSubscribed(true);
          }}
        >
          Join
        </button>
      )}
    </div>
  );
}
