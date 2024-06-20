/* ------------------------- ACTIONS ------------------------- */

const LOAD_FOLLOWERS = "followers/LOAD_FOLLOWERS";
const LOAD_USER_FOLLOWERS = "followers/LOAD_USER_FOLLOWERS";
const LOAD_POSTS = "followers/LOAD_POSTS";

const loadFollowers = (followers) => {
  return {
    type: LOAD_FOLLOWERS,
    followers,
  };
};

const loadUserFollowers = (followers) => {
  return {
    type: LOAD_USER_FOLLOWERS,
    followers,
  };
};

const loadPosts = (followers) => {
  return {
    type: LOAD_POSTS,
    followers,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const getUserFollowers = (id) => async (dispatch) => {
  const response = await fetch(`/api/followers/${id}`);

  if (response.ok) {
    const followers = await response.json();
    dispatch(loadUserFollowers(followers));
    return followers;
  }
};

export const getFollowers = () => async (dispatch) => {
  const response = await fetch("/api/followers");

  if (response.ok) {
    const followers = await response.json();
    dispatch(loadFollowers(followers));
    return followers;
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/followers/follow/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const msg = await response.json();
      dispatch(loadFollowers(msg)); // Ensure this correctly updates the state
      return msg;
    } else {
      // Handle potential errors
      throw new Error("Failed to follow user");
    }
  } catch (error) {
    console.error("Follow action failed:", error);
  }
};

export const unfollowUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/followers/unfollow/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const msg = await response.json();
    dispatch(loadFollowers(msg));
    return msg;
  }
};

export const followerPosts = () => async (dispatch) => {
  const response = await fetch("/api/followers/posts");
  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
    return posts;
  }
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {
  followers: {},
  follows: {},
  posts: {},
  userFollowers: {},
  userFollows: {},
  followedPosts: {},
  followerPosts: {},
};
const followersReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_FOLLOWERS:
      if (action.followers && action.followers.Followers) {
        newState.followers = action.followers.Followers.reduce(
          (follows, follow) => {
            follows[follow.id] = follow;
            return follows;
          },
          {}
        );
      }
      if (action.followers && action.followers.Follows) {
        newState.follows = action.followers.Follows.reduce(
          (follows, follow) => {
            follows[follow.id] = follow;
            return follows;
          },
          {}
        );
      }
      if (action.followers && action.followers.FollowedPosts) {
        newState.posts = action.followers.FollowedPosts.reduce(
          (follows, follow) => {
            follows[follow.id] = follow;
            return follows;
          },
          {}
        );
      }
      return newState;
    case LOAD_USER_FOLLOWERS:
      if (action.followers && action.followers.Followers) {
        newState.userFollowers = action.followers.Followers.reduce(
          (follows, follow) => {
            follows[follow.id] = follow;
            return follows;
          },
          {}
        );
      }
      if (action.followers && action.followers.Follows) {
        newState.userFollows = action.followers.Follows.reduce(
          (follows, follow) => {
            follows[follow.id] = follow;
            return follows;
          },
          {}
        );
      }
      if (action.followers && action.followers.FollowedPosts) {
        newState.followedPosts = action.followers.FollowedPosts.reduce(
          (follows, follow) => {
            follows[follow.id] = follow;
            return follows;
          },
          {}
        );
      }
      return newState;
    case LOAD_POSTS:
      if (action.followers && action.followers.followedPosts) {
        newState.followerPosts = action.followers.followedPosts.reduce(
          (posts, post) => {
            posts[post.id] = post;
            return posts;
          },
          {}
        );
      }
      return newState; // Add return statement here
    default:
      return state;
  }
};

export default followersReducer;
