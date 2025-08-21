import {
  getUsers,
  getPosts,
  getCommunities,
  AppDispatch,
  RootState,
  getThreads,
  getSubscriptions,
  getFollowers,
} from "@/store";

/** Runs once when the app starts.
    1. getUsers
    2. getPosts   (after users finish)
    3. the rest   (after posts start, can be parallel) */
export const bootstrapApp =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const state = getState();
      /* 1️⃣ Strict ordering for critical data */
      if (!state.users.loaded) await dispatch(getUsers());
      if (!state.posts.loaded) await dispatch(getPosts());
      if (!state.communities.loaded) await dispatch(getCommunities());
      if (!state.threads.loaded) await dispatch(getThreads());
      if (!state.subscriptions.loaded) await dispatch(getSubscriptions());
      await dispatch(getFollowers());

      /* 2️⃣ Less‑critical calls can run in parallel */
      // await Promise.all([
      //   dispatch(getSubscriptions()),
      //   dispatch(getFollowers()),
      //   dispatch(getCommunities()),
      // ]);
    } catch (err) {
      // handle global boot errors here if you want
      console.error("Bootstrap failed", err);
    }
  };
