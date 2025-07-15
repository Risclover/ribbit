import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "..";
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
  Post,
} from "./types";

/* -------- your unchanged plain actions -------------------------------- */
export const appendPosts = (posts: Post[]) => ({ type: APPEND_POSTS, posts });
export const loadPosts = (posts: any) => ({ type: LOAD_POSTS, posts });
export const loadPost = (post: Post) => ({ type: LOAD_POST, post });
/* …etc for createPost, removePost, votes, viewed … */

/* -------- new typed action creators ----------------------------------- */
export const fetchFeedRequest = (feedKey: string, page: number) => ({
  type: FETCH_FEED_REQUEST as typeof FETCH_FEED_REQUEST,
  payload: { feedKey, page },
});

export const fetchFeedSuccess = (
  feedKey: string,
  page: number,
  posts: Post[],
  hasMore: boolean
) => ({
  type: FETCH_FEED_SUCCESS as typeof FETCH_FEED_SUCCESS,
  payload: { feedKey, page, posts, hasMore },
});

export const fetchFeedFailure = (feedKey: string, error: string) => ({
  type: FETCH_FEED_FAILURE as typeof FETCH_FEED_FAILURE,
  payload: { feedKey, error },
});

/* ----------------------------------------------------------------------
 * Thunk that replaces the old getPosts (but keeps the same call‑site)
 * -------------------------------------------------------------------- */
export interface GetPostsArgs {
  limit?: number;
  offset?: number;
  order?: string;
  /** optional if you already know “all” / “user:${id}” / etc. */
  feedKey?: string;
}

export const getPosts =
  ({
    limit = 100,
    offset = 0,
    order = "new",
    feedKey = "all",
  }: GetPostsArgs = {}): ThunkAction<
    Promise<{ nextOffset: number | null; hasMore: boolean }>,
    RootState,
    unknown,
    any
  > =>
  async (dispatch: AppDispatch, getState) => {
    const page = offset / limit + 1;
    const state = getState().posts;
    const cached = state.feeds[feedKey];

    /* ----- 1  Skip network if already cached ------------------------- */
    if (cached && page <= cached.page) {
      return {
        nextOffset: (cached.page + 1) * limit,
        hasMore: cached.hasMore,
      };
    }

    dispatch(fetchFeedRequest(feedKey, page));

    try {
      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
        order,
      });
      const res = await fetch(`/api/posts?${params.toString()}`);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const { posts, nextOffset, hasMore } = await res.json();

      dispatch(fetchFeedSuccess(feedKey, page, posts, hasMore));
      return { nextOffset, hasMore };
    } catch (err: any) {
      dispatch(fetchFeedFailure(feedKey, err.message));
      return { nextOffset: null, hasMore: false };
    }
  };
