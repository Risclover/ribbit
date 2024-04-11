import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  getCommunities,
  getFollowers,
  getSubscriptions,
  getViewedPosts,
} from "../../../store";
import { SortingFunction } from "../../../utils";

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
    dispatch(getPosts());
    dispatch(getCommunities());
    dispatch(getSubscriptions());
    dispatch(getFollowers());
  }, [dispatch]);

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

    return SortingFunction(posts, sortMode);
  }, [userPosts, subscriptions, follows, sortMode, isAllPosts, user?.id]);
  return { sortedPosts, sortMode, setSortMode, user, viewedPosts };
}
