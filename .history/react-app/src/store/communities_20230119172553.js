const LOAD_COMMUNITIES = "communities/LOAD";
const LOAD_COMMUNITY = "communities/LOAD_SINGLE";
const LOAD_SUBSCRIBERS = "communities/LOAD_SUBSCRIBERS";
const CREATE_COMMUNITY = "communities/CREATE";
const DELETE_COMMUNITY = "communities/DELETE";

export const loadCommunities = (communities) => {
  return {
    type: LOAD_COMMUNITIES,
    communities,
  };
};

export const loadCommunity = (community) => {
  return {
    type: LOAD_COMMUNITY,
    community,
  };
};

export const createCommunity = (community) => {
  return {
    type: CREATE_COMMUNITY,
    community,
  };
};

export const removeCommunity = (communityName) => {
  return {
    type: DELETE_COMMUNITY,
    communityName,
  };
};

export const loadSubscribers = (subscribers) => {
  return {
    type: LOAD_SUBSCRIBERS,
    subscribers,
  };
};
// ################################################## //
// #################### THUNKS ##################### //
// ################################################ //

export const getCommunities = () => async (dispatch) => {
  const response = await fetch("/api/communities");

  if (response.ok) {
    const communities = await response.json();
    dispatch(loadCommunities(communities));
    return communities;
  }
};

export const getSingleCommunity = (communityName) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityName}`);

  if (response.ok) {
    const community = await response.json();
    dispatch(loadCommunity(community));
    return community;
  }
};

export const getCommunitySubscribers = (communityName) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityName}/subscribers`);

  if (response.ok) {
    const subscribers = await response.json();
    dispatch(loadSubscribers(subscribers));
    return subscribers;
  }
};

export const addCommunity = (payload) => async (dispatch) => {
  const { name, description } = payload;

  console.log("PAYLOAD: --------->", payload);
  const response = await fetch("/api/communities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  if (response.ok) {
    const community = await response.json();
    console.log("-------------------> community", payload);
    dispatch(loadCommunity(community));
    return community;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateCommunity = (payload, communityName) => async (dispatch) => {
  const { display_name, description } = payload;

  const response = await fetch(`/api/communities/${communityName}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      display_name,
      description,
    }),
  });

  if (response.ok) {
    const community = await response.json();
    dispatch(loadCommunity(community));
    return community;
  }
  const data = await response.json();
  return data;
};

export const deleteCommunity = (communityName) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("RESPONSE:", response);
  if (response.ok) {
    const deleted = await response.json();
    console.log("DELETED:", deleted);
    dispatch(removeCommunity(communityName));
    return deleted;
  }
};

// #################### REDUCER #################### //

const initialState = {};

export default function communitiesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMUNITY:
      return { ...state, [action.communities.id]: action.communities };
    case LOAD_COMMUNITIES:
      return action.communities.Communities.reduce((communities, community) => {
        communities[community.id] = community;
        return communities;
      }, {});
    case LOAD_SUBSCRIBERS:
      return action.communities.Subscribers.reduce(
        (subscribers, subscriber) => {
          subscribers[subscriber.id] = subscriber;
          return subscribers;
        }
      );
    case DELETE_COMMUNITY:
      let removeState = { ...state };
      delete removeState[action.id];
      return removeState;
    default:
      return state;
  }
}
