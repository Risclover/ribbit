/* ------------------------- ACTIONS ------------------------- */

const LOAD_SINGLE_COMMENT = "comments/LOAD_SINGLE_COMMENT";

export const loadSingleComment = (comment) => {
  return {
    type: LOAD_SINGLE_COMMENT,
    comment,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const getSingleComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`);

  if (response.ok) {
    const comment = await response.json();
    dispatch(loadSingleComment(comment));
    return comment;
  }
};

/* ------------------------- REDUCER ------------------------- */

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
