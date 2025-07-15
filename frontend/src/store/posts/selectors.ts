import { RootState } from "..";

export const selectPostsSlice = (s: RootState) => s.posts;

export const selectFeed = (feedKey: string) => (s: RootState) =>
  s.posts.feeds[feedKey];

export const selectFeedPosts = (feedKey: string) => (s: RootState) => {
  const feed = s.posts.feeds[feedKey];
  if (!feed) return [];
  return feed.ids.map((id) => s.posts.byId[id]);
};

export const selectPostById = (id: number) => (s: RootState) =>
  s.posts.byId[id];
