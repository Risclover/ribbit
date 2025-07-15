import {
  CREATE_POST,
  LOAD_POSTS,
  LOAD_POST,
  UPDATE_POSTS,
  DELETE_POST,
  LOAD_COMMUNITY_POSTS,
  ADD_POST_VOTE,
  REMOVE_POST_VOTE,
  UPDATE_VIEWED_POSTS,
  APPEND_POSTS,
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
  PostsState,
} from "./types";

export const initialState: PostsState = {
  byId: {}, // all posts live here
  feeds: {}, // keys added on demand
  viewedPosts: [],
  errors: {},
};
export default function postsReducer(
  state: PostsState = initialState,
  action: any
): PostsState {
  switch (action.type) {
    /* ------------- FEED CACHING ------------------------------------- */
    case FETCH_FEED_REQUEST: {
      const { feedKey } = action.payload;
      const feed = state.feeds[feedKey] ?? {
        ids: [],
        page: 0,
        hasMore: true,
        status: "idle",
      };
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [feedKey]: { ...feed, status: "loading" },
        },
      };
    }

    case FETCH_FEED_SUCCESS: {
      const { feedKey, page, posts, hasMore } = action.payload;

      const newById = { ...state.byId };
      posts.forEach((p: any) => (newById[p.id] = p));

      const prev = state.feeds[feedKey] ?? {
        ids: [],
        page: 0,
        hasMore: true,
        status: "idle",
      };

      return {
        ...state,
        byId: newById,
        feeds: {
          ...state.feeds,
          [feedKey]: {
            ids: [...prev.ids, ...posts.map((p: any) => p.id)],
            page,
            hasMore,
            status: "succeeded",
          },
        },
      };
    }

    case FETCH_FEED_FAILURE: {
      const { feedKey } = action.payload;
      const feed = state.feeds[feedKey] ?? {
        ids: [],
        page: 0,
        hasMore: true,
        status: "idle",
      };
      return {
        ...state,
        feeds: { ...state.feeds, [feedKey]: { ...feed, status: "failed" } },
      };
    }

    /* ------------- YOUR ORIGINAL CRUD / VOTE LOGIC ------------------ */
    case APPEND_POSTS: {
      const newById = { ...state.byId };
      action.posts.forEach((p: any) => (newById[p.id] = p));
      return { ...state, byId: newById };
    }

    case CREATE_POST:
    case ADD_POST_VOTE:
    case REMOVE_POST_VOTE:
    case LOAD_POST:
      return {
        ...state,
        byId: { ...state.byId, [action.post.id]: action.post },
      };

    case LOAD_POSTS:
      if (action.posts?.Posts) {
        const obj = action.posts.Posts.reduce(
          (acc: any, p: any) => ((acc[p.id] = p), acc),
          {}
        );
        return { ...state, byId: obj };
      }
      return state;

    case LOAD_COMMUNITY_POSTS:
      if (action.posts?.CommunityPosts) {
        const obj = action.posts.CommunityPosts.reduce(
          (acc: any, p: any) => ((acc[p.id] = p), acc),
          {}
        );
        return { ...state, byId: obj };
      }
      return state;

    case DELETE_POST: {
      const { [action.postId]: _, ...rest } = state.byId;
      return { ...state, byId: rest };
    }

    case UPDATE_VIEWED_POSTS:
      return { ...state, viewedPosts: action.viewedPosts };

    /* ------------- default ------------------------------------------ */
    default:
      return state;
  }
}
