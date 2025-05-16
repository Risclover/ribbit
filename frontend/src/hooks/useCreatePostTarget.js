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

  /* If URL already has /c/:communityName, grab it right away */
  const commMatch = matchPath(pathname, {
    path: "/c/:communityName",
    exact: false,
    strict: false,
  });
  let communityName = commMatch?.params?.communityName;

  /* Otherwise, check for /posts/:postId and resolve via Redux */
  if (!communityName) {
    const postMatch = matchPath(pathname, {
      path: "/posts/:postId",
      exact: false,
      strict: false,
    });
    const postId = postMatch?.params?.postId;

    if (postId) {
      // posts live directly under state.posts (not in byID)
      const post = useSelector((s) => s.posts?.[postId]);
      const commId = post?.community?.id; // adjust field names as needed
      const comm = useSelector((s) =>
        commId ? s.communities?.[commId] : null
      );

      communityName = comm?.name || post?.communityName;
    }
  }

  /* 3️⃣  Build the final link */
  return communityName ? `/c/${communityName}/submit` : "/submit";
}
