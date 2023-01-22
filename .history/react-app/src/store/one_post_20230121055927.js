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

export const getSinglePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);

  if (response.ok) {
    const post = await response.json();
    dispatch(loadSinglePost(post));
    return post;
  }
};

// export const putImg = (imgId, preview_img_url) => async (dispatch) => {
//   const response = await fetch(`/api/posts/img/${imgId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ preview_img_url }),
//   });

//   if (response.ok) {
//     const img = await response.json();
//     return img;
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data;
//     }
//   } else {
//     return ["An error occurred. Please try again."];
//   }
// };

export const getPostById = (id) => (state) => state.posts[id];

const initialState = {};

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
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.postId) {
            return {
              ...post,
              likes: post.likes + 1,
            };
          }
          return post;
        }),
      };
    default:
      return state;
  }
};

export default singlePostReducer;
