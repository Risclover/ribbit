/* ------------------------- ACTIONS ------------------------- */

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

export const appendPosts = (posts) => ({ type: APPEND_POSTS, posts });

export const loadPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    posts,
  };
};

export const loadCommunityPosts = (posts) => {
  return {
    type: LOAD_COMMUNITY_POSTS,
    posts,
  };
};

export const loadPost = (post) => {
  return {
    type: LOAD_POST,
    post,
  };
};

export const createPost = (post) => {
  return {
    type: CREATE_POST,
    post,
  };
};

export const update_posts = (posts) => {
  return {
    type: UPDATE_POSTS,
    posts,
  };
};

export const removePost = (postId) => {
  return {
    type: DELETE_POST,
    postId,
  };
};

export const addVote = (post) => {
  return {
    type: ADD_POST_VOTE,
    post,
  };
};

export const removeVote = (post) => {
  return {
    type: REMOVE_POST_VOTE,
    post,
  };
};

const updateViewedPosts = (viewedPosts) => ({
  type: UPDATE_VIEWED_POSTS,
  viewedPosts,
});

/* ------------------------- THUNKS ------------------------- */

export const getPostsByCommunityId = (communityId) => (state) =>
  state.posts[communityId];

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
  async (dispatch) => {
    const params = new URLSearchParams({ limit, offset, order });
    const response = await fetch(`/api/posts?${params.toString()}`);

    if (response.ok) {
      const { posts, nextOffset, hasMore } = await response.json();
      if (offset === 0) dispatch(loadPosts({ Posts: posts }));
      else dispatch(appendPosts(posts));
      return { nextOffset, hasMore };
    }

    // always return something so .then() never gets undefined
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

export const getFollowedPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/followed");

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
    return posts;
  }
};

export const getCommunityPosts = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/posts/communities/${communityId}`);

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadCommunityPosts(posts));
    return posts;
  }
};

// Add a post to a subcommunity
export const addCommunityPost = (payload) => async (dispatch) => {
  const { title, content, communityId } = payload;

  const response = await fetch(`/api/c/${communityId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      community_id: communityId,
    }),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(loadPost(post));
    return post;
  }
  return { errors: "testing" };
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

export const putImagePost = (post, postId) => async (dispatch) => {
  const { title, imgUrl } = post;
  const response = await fetch(`/api/posts/img/${postId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      imgUrl,
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

export const handlePostView = (postId, userId, dispatch) => {
  fetch(`/posts/${postId}/view`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetch(`/users/${userId}/viewed-posts`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(updateViewedPosts(data.viewedPosts));
          });
      }
    });
};

export const getPostComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case APPEND_POSTS: {
      const newState = { ...state };
      action.posts.forEach((p) => {
        newState[p.id] = p;
      });
      return newState;
    }
    case CREATE_POST:
      return { ...state, [action.post.id]: action.post };
    case LOAD_POSTS:
      if (action.posts && action.posts.Posts) {
        return action.posts.Posts.reduce((posts, post) => {
          posts[post.id] = post;
          return posts;
        }, {});
      } else {
        return state;
      }
    case LOAD_COMMUNITY_POSTS:
      if (action.posts && action.posts.CommunityPosts) {
        return action.posts.CommunityPosts.reduce((posts, post) => {
          posts[post.id] = post;
          return posts;
        }, {});
      } else {
        return state;
      }
    case LOAD_POST:
      return {
        ...state,
        [action.post.id]: { ...action.post },
      };
    case DELETE_POST:
      let removeState = { ...state };
      delete removeState[action.postId];
      return removeState;
    case ADD_POST_VOTE:
      return { ...state, [action.post.id]: action.post };
    case REMOVE_POST_VOTE:
      return { ...state, [action.post.id]: action.post };
    case UPDATE_VIEWED_POSTS:
      return action.viewedPosts;
    case "posts/LOAD_ONE":
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post,
        },
        errors: {
          ...state.errors,
          [action.post.id]: null,
        },
      };

    case "posts/SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.postId]: action.error,
        },
      };
    default:
      return state;
  }
}
