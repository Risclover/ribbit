import type { ThunkAction } from "redux-thunk";
import type { AnyAction } from "redux";
import { getSinglePost, getCommunities, getPosts, addViewedPost } from "."; // adjust path if these live elsewhere
import type { RootState } from "../store"; // your root-state type

/**
 * Fetches everything the PostModal needs in parallel,
 * while also marking the post as “viewed”.
 *
 * If the same post is already in state and fresh enough,
 * you can add cache-skip logic here.
 */
export const bootstrapPostModal =
  (
    postId: number | string
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    await Promise.all([
      dispatch<any>(getSinglePost(postId)),
      dispatch<any>(getCommunities()),
      dispatch<any>(getPosts()),
      dispatch<any>(addViewedPost(postId)),
    ]);
  };
