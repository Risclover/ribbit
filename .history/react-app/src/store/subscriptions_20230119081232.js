const ADD_SUBSCRIPTION = "subscriptions/ADD";
const LOAD_SUBSCRIPTIONS = "subscriptions/LOAD";

export const createSubscription = (subscription) => {
  return {
    type: ADD_SUBSCRIPTION,
    subscription,
  };
};

export const loadSubscriptions = (subscriptions) => {
  return {
    type: LOAD_SUBSCRIPTIONS,
    subscriptions,
  };
};

export const getSubscriptions = () => async (dispatch) => {
  const response = await fetch(`/api/subscriptions`);

  if (response.ok) {
    const subscriptions = await response.json();
    dispatch(loadSubscriptions(subscriptions));
    return subscriptions;
  }
};

export const addSubscription = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      communityId: communityId,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createSubscription(data));
    return data;
  }
};

const initialState = {};

const subscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      return { ...state, [action.subscription.id]: action.subscription };
    default:
      return state;
  }
};

export default subscriptionsReducer;
