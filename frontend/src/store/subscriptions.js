/* ------------------------- ACTIONS ------------------------- */

const LOAD_SUBSCRIPTIONS = "subscriptions/LOAD";
const LOAD_SUBSCRIBERS = "subscriptions/LOAD_SUBSCRIBERS";
const CREATE_SUBSCRIPTION = "subscriptions/NEW";
const DELETE_SUBSCRIPTION = "subscriptions/DELETE";

export const loadSubscriptions = (subscriptions) => {
  return {
    type: LOAD_SUBSCRIPTIONS,
    subscriptions,
  };
};

export const loadSubscribers = (subscriptions) => {
  return {
    type: LOAD_SUBSCRIBERS,
    subscriptions,
  };
};

export const createSubscription = (subscription) => {
  return {
    type: CREATE_SUBSCRIPTION,
    subscription,
  };
};

export const removeSubscription = (communityId) => {
  return {
    type: DELETE_SUBSCRIPTION,
    communityId,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const addToSubscriptions = (communityId) => async () => {
  const response = await fetch("/api/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      communityId: communityId,
    }),
  });

  return response;
};

export const getSubscribers = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/subscriptions/${communityId}`);

  if (response.ok) {
    const subscriptions = await response.json();
    dispatch(loadSubscriptions(subscriptions));
    return subscriptions;
  }
};

export const getSubscriptions = () => async (dispatch) => {
  const response = await fetch(`/api/subscriptions`);

  if (response.ok) {
    const subscriptions = await response.json();
    dispatch(loadSubscriptions(subscriptions));
    return subscriptions;
  }
};

export const deleteSubscription = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/subscriptions/${communityId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(removeSubscription(communityId));
    return deletedMessage;
  }
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {};

const allSubscriptionsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SUBSCRIPTIONS:
      if (action.subscriptions && action.subscriptions.Subscriptions) {
        return action.subscriptions.Subscriptions.reduce(
          (subscriptions, subscription) => {
            subscriptions[subscription.id] = subscription;
            return subscriptions;
          },
          {}
        );
      }
      return state;

    case LOAD_SUBSCRIBERS:
      if (action.subscriptions && action.subscriptions.Subscribers) {
        return action.subscriptions.Subscribers.reduce(
          (subscribers, subscriber) => {
            subscribers[subscriber.id] = subscriber;
            return subscriber;
          },
          {}
        );
      }
      return state;

    case DELETE_SUBSCRIPTION:
      delete newState[action.communityId];
      return newState;
    default:
      return state;
  }
};

export default allSubscriptionsReducer;
