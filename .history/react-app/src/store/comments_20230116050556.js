const ADD_COMMENT = "comments/ADD";
const LOAD_COMMENTS = "comments/LOAD";
const DELETE_COMMENT = "comments/DELETE";
const LOAD_ALL_COMMENTS = "comments/LOAD_ALL";

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

export const loadAllComments = (comments) => {
  return {
    type: LOAD_ALL_COMMENTS,
    comments,
  };
};

export const loadComments = (comments) => {
  return {
    type: LOAD_COMMENTS,
    comments,
  };
};

export const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

export const getAllComments = () => async (dispatch) => {
  const response = await fetch(`/api/comments`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadComments(data));
    return data;
  }
};

export const getComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${postId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadComments(data));
    return data;
  }
};

export const getUserComments = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/comments`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadComments(data));
    return data;
  }
};

export const createComment = (content, postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addComment(data));
    return data;
  }
};

export const updateComment = (content, id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addComment(data));
    return data;
  }
};

export const removeComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(id));
    return data;
  }
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case LOAD_COMMENTS:
      return action.comments.Comments.reduce((comments, comment) => {
        comments[comment.id] = comment;
        return comments;
      }, {});
    case DELETE_COMMENT:
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
