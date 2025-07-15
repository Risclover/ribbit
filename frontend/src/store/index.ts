import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  PreloadedState,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

/* ─── Slice reducers ───────────────────────────────────────────────────── */
import session from "./session";
import singlePostReducer from "./one_post";
import postsReducer from "./posts";
import commentsReducer from "./comments";
import singleCommentReducer from "./one_comment";
import communitiesReducer from "./communities";
import singleCommunityReducer from "./one_community";
import allSubscriptionsReducer from "./subscriptions";
import usersReducer from "./users";
import searchReducer from "./search";
import rulesReducer from "./rules";
import followersReducer from "./followers";
import favoriteCommunitiesReducer from "./favorite_communities";
import favoriteUsersReducer from "./favorite_users";
import viewedPostsReducer from "./viewed_posts";
import threadsReducer from "./threads";
import messagesReducer from "./messages";
import notificationsReducer from "./notifications";
import chatThreadReducer from "./chats";
import communitySettingsReducer from "./community_settings";
import reactionsReducer from "./reactions";
import chat2Reducer from "./chats2";

/* ─── Root reducer ─────────────────────────────────────────────────────── */
export const rootReducer = combineReducers({
  session,
  users: usersReducer,
  singlePost: singlePostReducer,
  posts: postsReducer,
  comments: commentsReducer,
  singleComment: singleCommentReducer,
  communities: communitiesReducer,
  singleCommunity: singleCommunityReducer,
  subscriptions: allSubscriptionsReducer,
  search: searchReducer,
  rules: rulesReducer,
  followers: followersReducer,
  favoriteCommunities: favoriteCommunitiesReducer,
  favoriteUsers: favoriteUsersReducer,
  viewedPosts: viewedPostsReducer,
  threads: threadsReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  chatThreads: chatThreadReducer,
  communitySettings: communitySettingsReducer,
  reactions: reactionsReducer,
  chat2: chat2Reducer,
});

/* ─── Middleware / enhancers ───────────────────────────────────────────── */
const baseMiddleware = [thunk];
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(...baseMiddleware);
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logger = require("redux-logger").default;
  const composeEnhancers =
    (typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore  Redux-devtools global
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;

  enhancer = composeEnhancers(applyMiddleware(...baseMiddleware, logger));
}

/* ─── Store creator ─────────────────────────────────────────────────────── */
export const configureStore = (preloadedState?: PreloadedState<RootState>) =>
  createStore(rootReducer, preloadedState, enhancer);

/* ─── Helpful types ─────────────────────────────────────────────────────── */
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

/* ─── Barrel re-exports ─────────────────────────────────────────────────── */
export * from "./chats";
export * from "./comments";
export * from "./communities";
export * from "./community_settings";
export * from "./favorite_communities";
export * from "./favorite_users";
export * from "./followers";
export * from "./messages";
export * from "./notifications";
export * from "./one_comment";
export * from "./one_community";
export * from "./one_post";
export * from "./posts";
export * from "./reactions";
export * from "./rules";
export * from "./search";
export * from "./session";
export * from "./subscriptions";
export * from "./threads";
export * from "./users";
export * from "./viewed_posts";
export * from "./compositeThunks";
export * from "./chats2";
export { useAppSelector, useAppDispatch } from "./hooks";
