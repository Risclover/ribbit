/* ------------------------- ACTIONS ------------------------- */

const LOAD_COMMUNITIES = "communities/LOAD";
const LOAD_COMMUNITY = "communities/LOAD_SINGLE";
const LOAD_SUBSCRIBERS = "communities/LOAD_SUBSCRIBERS";
const CREATE_COMMUNITY = "communities/CREATE";
const DELETE_COMMUNITY = "communities/DELETE";

/* ------------------------- ACTION CREATORS ------------------------- */

const loadCommunities = (communities) => {
  return {
    type: LOAD_COMMUNITIES,
    communities,
  };
};

const loadCommunity = (community) => {
  return {
    type: LOAD_COMMUNITY,
    community,
  };
};

const removeCommunity = (communityId) => {
  return {
    type: DELETE_COMMUNITY,
    communityId,
  };
};

const loadSubscribers = (subscribers) => {
  return {
    type: LOAD_SUBSCRIBERS,
    subscribers,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const getCommunities = () => async (dispatch) => {
  const response = await fetch("/api/communities");

  if (response.ok) {
    const communities = await response.json();
    dispatch(loadCommunities(communities));
    return communities;
  }
};

export const addCommunity = (payload) => async (dispatch) => {
  const { name, description } = payload;

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

export const updateCommunity = (payload, communityId) => async (dispatch) => {
  const { displayName, description } = payload;

  const response = await fetch(`/api/communities/${communityId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      display_name: displayName, // Mapped to snake_case
      description,
    }),
  });

  if (response.ok) {
    const community = await response.json();
    dispatch(loadCommunity(community)); // Update the Redux state
    return community;
  }
  const data = await response.json();
  return data;
};

export const deleteCommunity = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const deleted = await response.json();
    dispatch(removeCommunity(communityId));
    return deleted;
  }
};

export const checkCommunityName = (name) => async (dispatch) => {
  const response = await fetch(`/api/communities/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) throw new Error("Error");
  return response;
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {
  loaded: false,
  communities: {},
};

export default function communitiesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITIES:
      const byId = {};
      action.communities.Communities.forEach((c) => {
        byId[c.id] = c;
      });

      return { ...state, communities: byId, loaded: true };
    case CREATE_COMMUNITY:
    case LOAD_COMMUNITY:
      return {
        ...state,
        communities: {
          ...state.communities,
          [action.community.id]: action.community,
        },
      };
    case LOAD_SUBSCRIBERS:
      return {
        ...state,
        [action.communityId]: {
          ...state[action.communityId],
          subscribers: action.subscribers,
        },
      };
    case DELETE_COMMUNITY: {
      const { [action.communityId]: _, ...rest } = state.communities;
      return { ...state, communities: rest };
    }
    default:
      return state;
  }
}
