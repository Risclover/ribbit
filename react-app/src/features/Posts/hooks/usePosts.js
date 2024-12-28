import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getViewedPosts } from "@/store";
import { sortPosts } from "@/utils";

export function usePosts(isAllPosts) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userPosts = useSelector((state) => state.posts);
  const subscriptions = useSelector((state) =>
    Object.values(state.subscriptions)
  );
  const follows = useSelector((state) => state.followers.posts);
  const viewedPosts = useSelector((state) => state.viewedPosts);
  const [sortMode, setSortMode] = useState("new");

  useEffect(() => {
    dispatch(getViewedPosts());
    if (Object.values(userPosts).length === 0) dispatch(getPosts());
  }, [userPosts]);

  const sortedPosts = useMemo(() => {
    let posts = [...Object.values(userPosts)];

    if (!isAllPosts) {
      const subbedPostsIds = new Set();

      subscriptions.forEach((sub) => {
        if (sub.subscribers[user?.id]) {
          Object.values(sub.communityPosts).forEach((post) =>
            subbedPostsIds.add(post.id)
          );
        }
      });

      if (follows) {
        Object.values(follows).forEach((post) => subbedPostsIds.add(post.id));
      }

      posts = posts.filter((post) => subbedPostsIds.has(post.id));
    }

    return sortPosts(posts, sortMode);
  }, [userPosts, subscriptions, follows, sortMode, isAllPosts, user?.id]);
  return { sortedPosts, sortMode, setSortMode, user, viewedPosts, userPosts };
}
