const LOAD_COMMUNITIES = "communities/LOAD";
const LOAD_COMMUNITY = "communities/LOAD_SINGLE";
const CREATE_COMMUNITY = "communities/CREATE";

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
