const LOAD_COMMUNITY = "communities/LOAD_SINGLE_COMMUNITY";
const LOAD_RULES = "communities/LOAD_RULES";

const loadCommunity = (community) => {
  return {
    type: LOAD_COMMUNITY,
    community,
  };
};

const loadRules = (rules) => {
  return {
    type: LOAD_RULES,
    rules,
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

export const getPostCommunity = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadCommunity(data));
    return data;
  }
};

export const getRules = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}/rules`);

  if (response.ok) {
    const community = await response.json();
    dispatch(loadRules(community));
    return community;
  }
};

const initialState = {};

export default function singleCommunityReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RULES: {
      return action.singleCommunity.communityRules.reduce((rules, rule) => {
        rules[rule.id] = rule;
        return rules;
      }, {});
    }
    case LOAD_COMMUNITY:
      return {
        [action.community.id]: { ...action.community },
      };
    default:
      return state;
  }
}
