const LOAD_COMMUNITY = "communities/LOAD_SINGLE_COMMUNITY";

export const loadCommunity = (community) => {
  return {
    type: LOAD_COMMUNITY,
    community,
  };
};

export const getSingleCommunity = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`);

  if (response.ok) {
    const community = await response.json();
    dispatch(loadCommunity(community));
    return community;
  }
};

const initialState = {};

export default function singleCommunityReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITY:
      return {
        [action.community.id]: { ...action.community },
      };
  }
}
