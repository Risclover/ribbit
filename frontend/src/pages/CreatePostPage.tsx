import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CreatePostForm } from "@/features";
import { CommunityDetails, CommunityRulesBox, RibbitRules } from "@/features";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  getCommunities,
  getPosts,
  getSubscriptions,
} from "@/store";

import { usePageSettings } from "@/hooks";
import { CreatePostIcon } from "@/assets/icons/CreatePostIcon";

import "@/features/Posts/components/CreatePost/PostForm.css";

/* ───────────────────────── Types ───────────────────────── */

type Community = RootState["communities"][number];

export interface CreatePostPageProps {
  postType: string;
  setPostType: React.Dispatch<React.SetStateAction<string>>;
  /** initial value that triggers `setPostType(val)` */
  val: string;
}

/* ───────────────────────── Component ───────────────────── */

/* …all existing imports & type aliases stay the same … */

export function CreatePostPage({
  postType,
  setPostType,
  val,
}: CreatePostPageProps): JSX.Element {
  /* ---------- local hooks ---------- */
  const { communityName } = useParams<{ communityName?: string }>();
  const dispatch = useAppDispatch();
  const communities = useAppSelector((s) => s.communities);

  /* ---------- helpers -------------- */
  /** Type-guard so TS knows each item really is a Community */
  const isCommunity = (x: unknown): x is Community =>
    Boolean(x && (x as Community).name);

  /* ---------- state ---------------- */
  const [community, setCommunity] = useState<Community | undefined>(() =>
    Object.values(communities)
      .filter(isCommunity)
      .find((c) => c.name === communityName)
  );

  /* ---------- effects (unchanged, but with type-guard) ---------- */
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    dispatch(getSubscriptions());
  }, [dispatch]);

  useEffect(() => setPostType(val), [val, setPostType]);

  /* … usePageSettings & highlight-colour effect stay unchanged … */

  /* keep local `community` synced with store */
  useEffect(() => {
    const current = Object.values(communities)
      .filter(isCommunity)
      .find((c) => c.name === communityName);
    setCommunity(current);
  }, [communities, communityName]);

  /* ---------- render (unchanged) ---------- */
  return (
    <div className="create-post-page">
      <div className="create-post-page-left">
        <CreatePostForm
          community={community}
          setCommunity={setCommunity}
          postType={postType}
          setPostType={setPostType}
        />
      </div>

      <div className="create-post-page-right" id="sidebar">
        {community && (
          <>
            <CommunityDetails community={community} post={null} />
            {Object.values(community.communityRules).length > 0 && (
              <CommunityRulesBox community={community} />
            )}
          </>
        )}

        <RibbitRules />
      </div>
    </div>
  );
}
