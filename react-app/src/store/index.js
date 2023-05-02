import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
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
import favoriteUsersReducer from "./favorite_users.js";
import viewedPostsReducer from "./viewed_posts";
import threadsReducer from "./threads";
import messagesReducer from "./messages";
import notificationsReducer from "./notifications";

const rootReducer = combineReducers({
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
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
