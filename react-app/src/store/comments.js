const ADD_COMMENT = "comments/ADD";
const LOAD_COMMENTS = "comments/LOAD";
const DELETE_COMMENT = "comments/DELETE";
const LOAD_ALL_COMMENTS = "comments/LOAD_ALL";
const ADD_COMMENT_VOTE = "comments/ADD_VOTE";
const REMOVE_COMMENT_VOTE = "comments/REMOVE_VOTE";

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

export const addVote = (comment) => {
  return {
    type: ADD_COMMENT_VOTE,
    comment,
  };
};

export const removeVote = (comment) => {
  return {
    type: REMOVE_COMMENT_VOTE,
    comment,
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
      let removeState = { ...state };
      delete removeState[action.commentId];
      return removeState;
    case ADD_COMMENT_VOTE:
      return { ...state, [action.comment.id]: action.comment };
    case REMOVE_COMMENT_VOTE:
      return { ...state, [action.comment.id]: action.comment };
    default:
      return state;
  }
};

export default commentsReducer;
