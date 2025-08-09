// src/store/bootstrap.ts
import {
  getUsers,
  getPosts,
  getSubscriptions,
  getFollowers,
  getCommunities,
  AppDispatch,
  RootState,
} from "@/store";

/** Runs once when the app starts.
    1. getUsers
    2. getPosts   (after users finish)
    3. the rest   (after posts start, can be parallel) */
export const bootstrapApp =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      /* 1️⃣ Strict ordering for critical data */
      await dispatch(getUsers());
      console.log("users");
      await dispatch(getPosts());

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
