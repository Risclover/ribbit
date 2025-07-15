/* src/store/posts/types.ts ---------------------------------------------- */

export const CREATE_POST = "posts/CREATE" as const;
export const LOAD_POSTS = "posts/LOAD" as const;
export const LOAD_POST = "posts/LOAD_SINGLE" as const;
export const UPDATE_POSTS = "posts/UPDATE" as const;
export const DELETE_POST = "posts/DELETE" as const;
export const LOAD_COMMUNITY_POSTS = "posts/LOAD_COMMUNITY_POSTS" as const;
export const ADD_POST_VOTE = "posts/CREATE_VOTE" as const;
export const REMOVE_POST_VOTE = "posts/REMOVE_VOTE" as const;
export const UPDATE_VIEWED_POSTS = "posts/UPDATE_VIEWED_POSTS" as const;
export const APPEND_POSTS = "posts/APPEND" as const;

/* *NEW* feed‑cache events */
export const FETCH_FEED_REQUEST = "posts/FETCH_FEED_REQUEST" as const;
export const FETCH_FEED_SUCCESS = "posts/FETCH_FEED_SUCCESS" as const;
export const FETCH_FEED_FAILURE = "posts/FETCH_FEED_FAILURE" as const;

/* ---------- Entity models --------------------------------------------- */

export interface Post {
  id: number;
  title: string;
  content?: string;
  imgUrl?: string;
  linkUrl?: string;
  communityId?: number;
  /* …any other columns returned by your API … */
}

export interface FeedCache {
  ids: number[]; // ordered post IDs
  page: number; // highest page fetched
  hasMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
}

/** Shape of the entire posts slice */
export interface PostsState {
  byId: Record<number, Post>;
  feeds: Record<string, FeedCache>; // "all", "user:7", …
  viewedPosts: number[]; // unchanged
  errors: Record<number, string | null>; // for fetchPost error handling
}
