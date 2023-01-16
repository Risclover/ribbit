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

export const getComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${postId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadComments(data));
    return data;
  }
};
