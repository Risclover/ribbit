LOAD_COMMENTS = "comments/LOAD";
CREATE_COMMENT = "comments/CREATE";
PUT_COMMENT = "comments/PUT";
DELETE_COMMENT = "comments/DELETE";

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
    dispatch(updateComment(commentId));
    return data;
  }
};
