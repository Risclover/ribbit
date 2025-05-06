/* ------------------------- ACTIONS ------------------------- */

const LOAD = "viewed_posts/LOAD";
const DELETE = "viewed_posts/DELETE";

const load = (viewedPosts) => {
  return {
    type: LOAD,
    viewedPosts,
  };
};

export const removeViewedPosts = (userId) => {
  return {
    type: DELETE,
    userId,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const getViewedPosts = () => async (dispatch) => {
  const response = await fetch("/api/viewed_posts");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const addViewedPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/viewed_posts/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const clearViewedPosts = () => async () => {
  const response = await fetch(`/api/viewed_posts/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {};

export default function viewedPostsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      if (action.viewedPosts && Array.isArray(action.viewedPosts.ViewedPosts)) {
        return action.viewedPosts.ViewedPosts.reduce((posts, post) => {
          posts[post.id] = post;
          return posts;
        }, {});
      }
      return state; // Return current state if data is not as expected

    case DELETE:
      return initialState;
    default:
      return state;
  }
}
