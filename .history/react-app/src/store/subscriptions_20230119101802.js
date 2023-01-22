/* ------------------------- ACTIONS ------------------------- */

const LOAD_SUBSCRIPTIONS = "subscriptions/LOAD";
const CREATE_SUBSCRIPTION = "subscriptions/NEW";
const DELETE_SUBSCRIPTION = "subscriptions/DELETE";

export const loadSubscriptions = (subscriptions) => {
  return {
    type: LOAD_SUBSCRIPTIONS,
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

export const addToSubscriptions = (communityId) => async (dispatch) => {
  const response = await fetch("/api/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      community_id: communityId,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const getAllSubscriptions = () => async (dispatch) => {
  const response = await fetch(`/api/subscriptions`);

  if (response.ok) {
    const subscriptions = await response.json();
    dispatch(loadSubscriptions(subscriptions));
    return subscriptions;
  }
};

export const getSubscriptions = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/subscriptions/${communityId}`);

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

  console.log("COMMUNITY ID:", communityId);

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
    case CREATE_SUBSCRIPTION:
      return { ...state, [action.subscription.id]: action.subscription };
    case LOAD_SUBSCRIPTIONS:
      return action.subscriptions.Subscriptions.reduce(
        (subscriptions, subscription) => {
          subscriptions[subscription.id] = subscription;
          return subscriptions;
        },
        {}
      );
    case DELETE_SUBSCRIPTION:
      delete newState[action.communityId];
      return newState;
    default:
      return state;
  }
};

export default allSubscriptionsReducer;
