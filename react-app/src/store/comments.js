/* ------------------------- ACTIONS ------------------------- */

const ADD_COMMENT = "comments/ADD";
const LOAD_COMMENTS = "comments/LOAD";
const DELETE_COMMENT = "comments/DELETE";
const LOAD_ALL_COMMENTS = "comments/LOAD_ALL";
const ADD_COMMENT_VOTE = "comments/ADD_VOTE";
const REMOVE_COMMENT_VOTE = "comments/REMOVE_VOTE";
const SEARCH = "comments/SEARCH";

const searchComments = (comments) => {
  return {
    type: SEARCH,
    comments,
  };
};

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

const loadComments = (comments) => {
  return {
    type: LOAD_COMMENTS,
    comments,
  };
};

const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

const addVote = (comment) => {
  return {
    type: ADD_COMMENT_VOTE,
    comment,
  };
};

const removeVote = (comment) => {
  return {
    type: REMOVE_COMMENT_VOTE,
    comment,
  };
};

/* ------------------------- THUNKS ------------------------- */

export const getAllComments = () => async (dispatch) => {
  const response = await fetch(`/api/comments`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadComments(data));
    return data;
  }
};

export const getComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${postId}/comments`);

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

export const createComment = (payload, postId) => async (dispatch) => {
  const { content } = payload;
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

export const updateComment = (payload, id) => async (dispatch) => {
  const { content } = payload;
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

export const addCommentVote = (commentId, votetype) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}/vote/${votetype}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addVote(data));
    return data;
  }
  return await response.json();
};

export const removeCommentVote = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}/vote`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeVote(data));
    return data;
  }
  return await response.json();
};

export const searchPostComments = (postId, query) => async (dispatch) => {
  const response = await fetch(`/api/comments/${postId}/search?q=${query}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(searchComments(data));
    return data;
  }
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: { ...action.comment } };
    case LOAD_COMMENTS:
      return action.comments.Comments.reduce((comments, comment) => {
        comments[comment.id] = comment;
        return comments;
      }, {});
    case DELETE_COMMENT:
      let removeState = { ...state };
      delete removeState[action.commentId];
      return removeState;
    case ADD_COMMENT_VOTE:
      return { ...state, [action.comment.id]: action.comment };
    case REMOVE_COMMENT_VOTE:
      return { ...state, [action.comment.id]: action.comment };
    case SEARCH:
      return action.comments.SearchedComments.reduce((comments, comment) => {
        comments[comment.id] = comment;
        return comments;
      }, {});
    default:
      return state;
  }
};

export default commentsReducer;
