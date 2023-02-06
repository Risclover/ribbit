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
