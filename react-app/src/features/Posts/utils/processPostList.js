import { SortingFunction } from "../../../utils";

export const processPostList = (posts, userSubscriptions, userId, sortMode) => {
  let filteredPosts = posts;
  if (userSubscriptions) {
    filteredPosts = posts.filter((post) =>
      userSubscriptions.some((sub) => sub.subscribers[userId]?.id === userId)
    );
  }
  return SortingFunction(filteredPosts, sortMode);
};
