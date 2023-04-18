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

export const addViewedPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/viewed_posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId: postId }),
  });
  return response;
};

// export const clearViewedPosts = () => async (dispatch) => {
//   const response = await fetch("/api/viewed_posts", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(remove());
//     return data;
//   }
// };

const initialState = {};

export default function viewedPostsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return action.viewedPosts.posts.reduce((posts, post) => {
        posts[post.id] = post;
        return posts;
      }, {});
    case DELETE:
      return initialState;
    default:
      return state;
  }
}
