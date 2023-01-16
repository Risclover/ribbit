const LOAD_SINGLE_COMMENT = "comments/LOAD_SINGLE_COMMENT";

export const loadSingleComment = (comment) => {
  return {
    type: LOAD_SINGLE_COMMENT,
    comment,
  };
};

export const getSingleComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`);

  if (response.ok) {
    const comment = await response.json();
    dispatch(loadSingleComment(comment));
    return comment;
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

export const getCommentById = (id) => (state) => state.comments[id];

const initialState = {};

const singleCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SINGLE_COMMENT:
      return {
        [action.comment.id]: { ...action.comment },
      };
    default:
      return state;
  }
};

export default singleCommentReducer;
