const LOAD_COMMENTS = "comments/LOAD";
const CREATE_COMMENT = "comments/CREATE";
const DELETE_COMMENT = "comments/DELETE";

const loadComments = (comments) => {
  return {
    type: LOAD_COMMENTS,
    comments,
  };
};

const addComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};

const removeComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

export const getComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${postId}`);

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

export const updateComment = (content, commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
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

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeComment(commentId));
    return data;
  }
};


const initialState = {};

const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_COMMENT:
            return {...state, [action.comment.id] = action.comment };
        case LOAD_COMMENTS:
            return action.comments.Comments.reduce((comments, comment) => {
                comments[comment.id] = comment;
                return comments;
            }, {});
        case DELETE_COMMENT:
            const newState = {...state};
    }
}
