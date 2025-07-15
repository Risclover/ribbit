import { matchPath, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useAppSelector, RootState } from "@/store";

export function useCreatePostTarget(): string {
  const { pathname } = useLocation();

  /* ---------- 1. Cheap pathname interrogations (no store access) ---------- */

  // /c/<name>/submit  ➜ stay here
  const submitMatch = matchPath(pathname, { path: "/c/:communityName/submit" });

  // /c/<name>         ➜ build from URL
  const communityMatch = matchPath<{ communityName: string }>(pathname, {
    path: "/c/:communityName",
  });

  // /posts/<id>       ➜ need store lookup
  const postMatch = matchPath<{ postId: string }>(pathname, {
    path: "/posts/:postId",
  });
  const postId = postMatch?.params?.postId;

  /* ---------- 2. One unconditional Redux read ---------- */

  const { post, community } = useAppSelector((s: RootState) => {
    const post = postId ? s.posts?.[postId] : undefined;
    const community = post?.community?.id
      ? s.communities?.[post.community.id]
      : undefined;
    return { post, community };
  });

  /* ---------- 3. Derived value (optional useMemo) ---------- */

  return useMemo(() => {
    if (submitMatch?.isExact) return pathname;

    if (communityMatch?.params?.communityName) {
      return `/c/${communityMatch.params.communityName}/submit`;
    }

    if (!postId) return "/submit";

    const name = community?.name ?? post?.communityName;
    return name ? `/c/${name}/submit` : "/submit";
  }, [
    pathname,
    submitMatch?.isExact,
    communityMatch?.params?.communityName,
    postId,
    community?.name,
    post?.communityName,
  ]);
}
