const LOAD_COMMUNITY = "communities/LOAD_SINGLE_COMMUNITY";

export const loadCommunity = (community) => {
  return {
    type: LOAD_COMMUNITY,
    community,
  };
};

export const getSingleCommunity = (communityName) => async (dispatch) => {
  const response = await fetch(`/api/c/${communityName}`);

  if (response.ok) {
    const community = await response.json();
    dispatch(loadCommunity(community));
    return community;
  }
};

export const getPostCommunity = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadCommunity(data));
    return data;
  }
};

const initialState = {};

export default function singleCommunityReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITY:
      return {
        [action.community.id]: { ...action.community },
      };
    default:
      return state;
  }
}
