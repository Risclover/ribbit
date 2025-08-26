import { useMemo } from "react";
import { useAppSelector, RootState } from "@/store";
import { CommunityRule } from "./CommunityRule";

/* ───────── Types pulled from the Redux models ───────── */

type Community = RootState["communities"][number];
type Post = RootState["posts"][number];
type Rule = Community["communityRules"][number];

export interface CommunityRulesBoxProps {
  community?: Community;
  post?: Post | null;
}

/* ───────────────────── Component ────────────────────── */

export function CommunityRulesBox({
  community,
  post,
}: CommunityRulesBoxProps): JSX.Element | null {
  const communities = useAppSelector((s) => s.communities.communities);

  /* derive community name & rules safely, memoised */
  const { communityName, rules } = useMemo(() => {
    const cName = community?.name ?? "";

    const ruleList: Rule[] = community
      ? Object.values(community.communityRules ?? {})
      : post
      ? Object.values(communities[post.communityId]?.communityRules ?? {})
      : [];

    return { communityName: cName, rules: ruleList };
  }, [community, post, communities]);

  if (rules.length === 0) return null; // nothing to show

  return (
    <div className="community-page-community-rules">
      <div className="community-page-rules-header">c/{communityName} Rules</div>

      <div className="community-page-rules">
        <ol>
          {rules.map((rule, idx) => (
            <CommunityRule key={rule.id} idx={idx} rule={rule} />
          ))}
        </ol>
      </div>
    </div>
  );
}
