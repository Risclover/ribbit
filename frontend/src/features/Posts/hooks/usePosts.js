import { useEffect, useState, useMemo, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { getPosts, getViewedPosts } from "@/store";
import { sortPosts } from "@/utils";
import { getUsers } from "@/store";

export function usePosts(isAllPosts) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.session.user);
  const userPosts = useAppSelector((state) => Object.values(state.posts.posts));
  const subscriptions = useAppSelector((state) =>
    Object.values(state.subscriptions.subscriptions)
  );
  const follows = useAppSelector((state) => state.followers.posts);
  const viewedPosts = useAppSelector((state) => state.viewedPosts);
  const [sortMode, setSortMode] = useState("new");
  const [page, setPage] = useState(1);
  const nextPage = useRef(null);
  const postsLoaded = useAppSelector((state) => state.posts.loaded);

  useEffect(() => {
    if (Object.values(viewedPosts).length === 0) dispatch(getViewedPosts());
    if (!postsLoaded)
      dispatch(
        getPosts({ limit: 200, offset: (page - 1) * 25, order: sortMode })
      ).then(({ nextOffset, hasMore }) => {
        nextPage.current = hasMore ? nextOffset / 25 + 1 : null;
      });
  }, [page, sortMode, dispatch, postsLoaded]);

  const sortedPosts = useMemo(() => {
    let posts = userPosts;

    if (!isAllPosts) {
      const subbedPostsIds = new Set();

      subscriptions.forEach((sub) => {
        if (sub.subscribers?.includes(user?.id)) {
          sub.communityPostIds.forEach((postId) => subbedPostsIds.add(postId));
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
