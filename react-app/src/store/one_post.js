/* ------------------------- ACTIONS ------------------------- */

const LOAD_SINGLE_POST = "posts/LOAD_SINGLE_POST";
const UPDATE_SINGLE_POST = "posts/UPDATE_SINGLE_POST";

export const loadSinglePost = (post) => {
  return {
    type: LOAD_SINGLE_POST,
    post,
  };
};

export const updateSinglePost = (post) => {
  return {
    type: UPDATE_SINGLE_POST,
    post,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const getSinglePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);

  if (response.ok) {
    const post = await response.json();
    dispatch(loadSinglePost(post));
    return post;
  }
};

export const getPostById = (id) => (state) => state.posts[id];

/* ------------------------- REDUCER ------------------------- */

const initialState = {
  posts: [],
};

const singlePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SINGLE_POST:
      return {
        [action.post.id]: { ...action.post },
      };
    case UPDATE_SINGLE_POST:
      return {
        ...state,
        [action.post.id]: { ...action.post },
      };

    default:
      return state;
  }
};

export default singlePostReducer;
