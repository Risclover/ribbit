/* ------------------------- ACTION TYPES ------------------------- */

const CREATE_POST = "posts/CREATE";
const LOAD_POSTS = "posts/LOAD";
const LOAD_POST = "posts/LOAD_SINGLE";
const UPDATE_POSTS = "posts/UPDATE";
const DELETE_POST = "posts/DELETE";
const LOAD_COMMUNITY_POSTS = "posts/LOAD_COMMUNITY_POSTS";
const ADD_POST_VOTE = "posts/CREATE_VOTE";
const REMOVE_POST_VOTE = "posts/REMOVE_VOTE";
const UPDATE_VIEWED_POSTS = "posts/UPDATE_VIEWED_POSTS";
const APPEND_POSTS = "posts/APPEND";

/* ------------------------- ACTION CREATORS ---------------------- */

export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });
export const appendPosts = (posts) => ({ type: APPEND_POSTS, posts });
export const loadCommunityPosts = (posts) => ({
  type: LOAD_COMMUNITY_POSTS,
  posts,
});
export const loadPost = (post) => ({ type: LOAD_POST, post });
export const createPost = (post) => ({ type: CREATE_POST, post });
export const removePost = (postId) => ({ type: DELETE_POST, postId });
export const addVote = (post) => ({ type: ADD_POST_VOTE, post });
export const removeVote = (post) => ({ type: REMOVE_POST_VOTE, post });
const updateViewedPosts = (viewedPosts) => ({
  type: UPDATE_VIEWED_POSTS,
  viewedPosts,
});

/* ------------------------- THUNKS ------------------------- */

export const getPostsByCommunityId = (communityId) => (state) =>
  state.posts.posts[communityId];

// export const getPosts = () => async (dispatch) => {
//   const response = await fetch("/api/posts");
//   if (response.ok) {
//     const posts = await response.json();
//     dispatch(loadPosts(posts));
//     return posts;
//   }
// };

export const getPosts =
  ({ limit = 100, offset = 0, order = "new" } = {}) =>
  async (dispatch, getState) => {
    if (getState().posts.loaded && offset === 0) {
      /* already have page 0 – skip */
      return { nextOffset: null, hasMore: false };
    }

    const qs = new URLSearchParams({ limit, offset, order });
    const res = await fetch(`/api/posts?${qs}`);

    if (res.ok) {
      const { posts, nextOffset, hasMore } = await res.json();
      if (offset === 0) dispatch(loadPosts(posts));
      else dispatch(appendPosts(posts));
      return { nextOffset, hasMore };
    }
    return { nextOffset: null, hasMore: false };
  };
export const fetchPost = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts/${postId}`);
    if (res.ok) {
      const post = await res.json();
      dispatch({ type: "posts/LOAD_ONE", post });
    } else if (res.status === 404) {
      dispatch({ type: "posts/SET_ERROR", postId, error: "not_found" });
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    dispatch({ type: "posts/SET_ERROR", postId, error: "server_error" });
  }
};

export const addPost = (payload) => async (dispatch) => {
  const { title, content, communityId } = payload;

  const response = await fetch(`/api/posts/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      communityId,
    }),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(loadPost(post));
    return post;
  }
};

export const putSinglePost = (post, postId) => async (dispatch) => {
  const { title, content } = post;
  const response = await fetch(`/api/posts/${postId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadPost(data));
    return data;
  }
  const data = await response.json();
  return data;
};

export const addImagePost = (payload) => async (dispatch) => {
  const { title, imgUrl, communityId } = payload;

  const response = await fetch(`/api/posts/img/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      imgUrl,
      communityId,
    }),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(loadPost(post));
    return post;
  }
};

export const addLinkPost = (payload) => async (dispatch) => {
  const { title, linkUrl, communityId } = payload;

  const response = await fetch(`/api/posts/url/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      linkUrl,
      communityId,
    }),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(loadPost(post));
    return post;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const deleted = await response.json();
    dispatch(removePost(postId));
    return deleted;
  }
};

export const addPostVote = (postId, votetype) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/vote/${votetype}`, {
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

export const removePostVote = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/vote`, {
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

/* ------------------------- REDUCER ------------------------------ */

const initialState = {
  loaded: false,
  posts: {}, // object keyed by post.id
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    /* ---------- bulk loads ---------- */
    case LOAD_POSTS: {
      /* action.posts is an _array_; turn it into an object */
      const byId = {};
      action.posts.forEach((p) => {
        byId[p.id] = p;
      });
      return { ...state, posts: byId, loaded: true };
    }

    case APPEND_POSTS: {
      const byId = { ...state.posts };
      action.posts.forEach((p) => {
        byId[p.id] = p;
      });
      return { ...state, posts: byId };
    }

    case LOAD_COMMUNITY_POSTS: {
      const byId = {};
      action.posts.forEach((p) => {
        byId[p.id] = p;
      });
      return { ...state, posts: byId, loaded: true };
    }

    /* ---------- single‑post CRUD ---------- */
    case CREATE_POST:
    case LOAD_POST:
    case ADD_POST_VOTE:
    case REMOVE_POST_VOTE:
      return {
        ...state,
        posts: { ...state.posts, [action.post.id]: action.post },
      };

    case DELETE_POST: {
      const { [action.postId]: _, ...rest } = state.posts;
      return { ...state, posts: rest };
    }

    /* ---------- misc bookkeeping ---------- */
    case UPDATE_VIEWED_POSTS:
      return { ...state, viewedPosts: action.viewedPosts };

    case "posts/LOAD_ONE":
      return {
        ...state,
        posts: { ...state.posts, [action.post.id]: action.post },
        errors: { ...(state.errors || {}), [action.post.id]: null },
      };

    case "posts/SET_ERROR":
      return {
        ...state,
        errors: { ...(state.errors || {}), [action.postId]: action.error },
      };

    default:
      return state;
  }
}
