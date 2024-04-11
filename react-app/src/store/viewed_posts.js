const ADD = "viewed_posts/ADD";
const LOAD = "viewed_posts/LOAD";
const DELETE = "viewed_posts/DELETE";

const load = (viewedPosts) => {
  return {
    type: LOAD,
    viewedPosts,
  };
};

export const add = (postId) => {
  return {
    type: ADD,
    postId,
  };
};

export const removeViewedPosts = (userId) => {
  return {
    type: DELETE,
    userId,
  };
};

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
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify({
        user_id: userId,
      }),
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
    return data;
  }
};

const initialState = {};

export default function viewedPostsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      // Assuming action.viewedPosts.posts is an array and you want to maintain its order
      return {
        ...state,
        posts: action.viewedPosts.posts,
      };
    case DELETE:
      // Assuming you want to clear the list of viewed posts
      return {
        ...state,
        posts: [],
      };
    case ADD:
      const newViewed = state.viewedPosts.filter((p) => p !== action.postId);
      newViewed.unshift(action.postId);
      return {
        ...state,
        viewedPosts: newViewed.slice(0, 5),
      };
    default:
      return state;
  }
}
