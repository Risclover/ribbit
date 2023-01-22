const ADD_SUBSCRIPTION = "subscriptions/ADD";

export const createSubscription = (subscription) => {
  return {
    type: ADD_SUBSCRIPTION,
    subscription,
  };
};

export const addSubscription = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};
