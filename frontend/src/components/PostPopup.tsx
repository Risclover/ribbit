// src/components/PostPopup.tsx
import { ReactElement, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useCommunitySettings } from "@/features";
import { SinglePostPage } from "@/pages";

/* ----------  Types ---------- */

interface Post {
  id: number | string;
  community: {
    id: number | string;
  };
  /* …add any other fields you rely on here */
}

interface PostPopupProps {
  post: Post;
}

/* ----------  Component ---------- */

export function PostPopup({ post }: PostPopupProps): ReactElement | null {
  /** memo-select the community to avoid extra renders */
  const community = useSelector((s: RootState) =>
    s.communities ? s.communities[post.community.id] : undefined
  );

  /* Sync the global “community settings” when present */
  useCommunitySettings(community);

  /* If the community hasn’t loaded yet show nothing (or a loader if you like) */
  if (!community) return null;

  return (
    <div className="post-popup">
      {/* If SinglePostPage accepts props, pass `post` down here */}
      <SinglePostPage />
    </div>
  );
}
