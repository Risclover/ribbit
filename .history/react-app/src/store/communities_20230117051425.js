const LOAD_COMMUNITIES = "communities/LOAD";
const LOAD_COMMUNITY = "communities/LOAD_SINGLE";
const CREATE_COMMUNITY = "communities/CREATE";
const LOAD_POSTS = "communities/POSTS";
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

export const loadPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    posts,
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

export const getSingleCommunity = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`);

  if (response.ok) {
    const community = await response.json();
    dispatch(loadCommunity(community));
    return community;
  }
};

export const getCommunityPosts = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}/posts`);

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
    return posts;
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
    case LOAD_POSTS:
      return action.communities.CommunityPosts.reduce((posts, post) => {
        posts[post.id] = post;
        return posts;
      });
    default:
      return state;
  }
}
