// hooks/useCreatePostTarget.js
import { matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Returns the correct “Create Post” target for the current page.
 * • On /c/:communityName/*  →  /c/:communityName/submit
 * • On /posts/:postId/*     →  /c/<that post’s community>/submit
 * • Anywhere else           →  /submit
 */
export default function useCreatePostTarget() {
  const { pathname } = useLocation();

  /* ─── 1. Try to read community straight from the URL ─── */
  const communityMatch = matchPath(pathname, {
    path: "/c/:communityName",
    exact: false,
    strict: false,
  });
  const communityNameInPath = communityMatch?.params?.communityName;

  /* ─── 2. Otherwise look for /posts/:postId and resolve via Redux ─── */
  const postMatch = matchPath(pathname, {
    path: "/posts/:postId",
    exact: false,
    strict: false,
  });
  const postId = postMatch?.params?.postId || null;

  /** Safe selector: returns undefined when postId is null */
  const post = useSelector((state) =>
    postId ? state.posts?.[postId] : undefined
  );

  const communityIdFromPost = post?.community?.id;
  const communityFromStore = useSelector((state) =>
    communityIdFromPost ? state.communities?.[communityIdFromPost] : undefined
  );

  /* ─── 3. Decide final community name ─── */
  const resolvedCommunityName =
    communityNameInPath ||
    communityFromStore?.name ||
    post?.communityName || // fallback field if you store it
    null;

  /* ─── 4. Build the target URL ─── */
  return resolvedCommunityName
    ? `/c/${resolvedCommunityName}/submit`
    : "/submit";
}
