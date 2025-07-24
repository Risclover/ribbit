/* ------------------------- ACTIONS ------------------------- */

const ADD_COMMENT = "comments/ADD";
const LOAD_COMMENTS = "comments/LOAD";
const UPDATE_COMMENT = "comments/UPDATE";
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

const deleteComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

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

export const getCommentsForPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/post/${postId}`);

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
  const { content, parentId } = payload;

  // Construct the body data conditionally
  const bodyData = { content };
  if (parentId !== null && parentId !== undefined) {
    bodyData.parentId = parentId;
  }

  const response = await fetch(`/api/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addComment(data));
    return data;
  } else {
    // Handle errors appropriately
    const errorData = await response.json();
    // You can dispatch an error action or handle it as needed
    return Promise.reject(errorData);
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
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json(); // data is the “[deleted]” stub
    dispatch(deleteComment(data)); // merge it into the store
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

const initialState = { loaded: false, comments: {} };

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    // case LOAD_COMMENTS:
    //   const newState = {}; // Start with an empty state
    //   action.comments.Comments.forEach((comment) => {
    //     newState[comment.id] = comment;
    //     // Recursively add children
    //     const addChildren = (childComments) => {
    //       childComments.forEach((child) => {
    //         newState[child.id] = child;
    //         if (child.children && child.children.length > 0) {
    //           addChildren(child.children);
    //         }
    //       });
    //     };
    //     if (comment.children && comment.children.length > 0) {
    //       addChildren(comment.children);
    //     }
    //   });
    //   return newState; // Return the new state with only the current post's comments

    case LOAD_COMMENTS:
      const byId = {};
      action.comments.Comments.forEach((c) => {
        byId[c.id] = c;
      });

      return { ...state, comments: byId, loaded: true };
    case UPDATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case ADD_COMMENT_VOTE:
    case REMOVE_COMMENT_VOTE:
      return { ...state, [action.comment.id]: action.comment };
    case SEARCH:
      const searchState = {};
      action.comments.SearchedComments.forEach((comment) => {
        searchState[comment.id] = comment;
      });
      return searchState;
    default:
      return state;
  }
};

export default commentsReducer;
