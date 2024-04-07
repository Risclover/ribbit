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

export const getViewedPosts = () => async (dispatch) => {
  const response = await fetch("/api/viewed_posts");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const addViewedPost = (postId) => async () => {
  const response = await fetch(`/api/viewed_posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId: postId }),
  });
  return response;
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
    default:
      return state;
  }
}
