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

export const createSubscription = (communityId) => {
  return {
    type: CREATE_SUBSCRIPTION,
    communityId,
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
    body: JSON.stringify({ communityId }),
  });

  if (response.ok) {
    // Dispatch the new subscription ID to the reducer
    dispatch(createSubscription(communityId));
    const data = await response.json();
    return data;
  }
};

export const getSubscribers = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/subscriptions/${communityId}`);
  if (response.ok) {
    const data = await response.json(); // { subscribers: [...] }
    dispatch(loadSubscribers(data.subscribers));
    return data;
  }
};
export const getSubscriptions = () => async (dispatch) => {
  const response = await fetch(`/api/subscriptions`);

  if (response.ok) {
    const data = await response.json(); // { subscriptions: [1,2,5] }
    dispatch(loadSubscriptions(data.subscriptions)); // send only the array
    return data;
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

const initialState = {
  loaded: false,
  subscriptions: [], // store as array of IDs
};

const allSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.subscriptions, // array of IDs
        loaded: true,
      };
    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.includes(action.communityId)
          ? state.subscriptions
          : [...state.subscriptions, action.communityId],
      };
    case LOAD_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.subscriptions, // array of subscriber objects
      };

    case DELETE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          (id) => id !== action.communityId
        ),
      };

    default:
      return state;
  }
};

export default allSubscriptionsReducer;
