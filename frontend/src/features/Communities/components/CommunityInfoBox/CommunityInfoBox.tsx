import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import { BiShieldAlt } from "react-icons/bi";

import {
  CommunityInfoMenu,
  CommunityDescription,
  CommunityOptions,
  CommunityJoinBtn,
  useCommunitySettings,
} from "@/features";
import { CakeIcon } from "@/assets";
import { getTextColor } from "@/utils";
import { CommunityImg } from "@/components/CommunityImg";
import { useAuthFlow } from "@/context";
import { useAppSelector, RootState } from "@/store";

/* ───────────────────────────────────────────── Types */

type Community = RootState["communities"][number];
type User = RootState["session"]["user"] | null;

export interface CommunityInfoBoxProps {
  community: Community;
  /** Logged-in user (may be `null`) */
  user: User;
  /**
   * When rendered inside the Single-Post page pass `"singlepage"`.
   * On full community pages pass `true | undefined`.
   */
  isPage?: boolean | "singlepage";
}

/* ────────────────────────────────────────────── Component */

export function CommunityInfoBox({
  community,
  user,
  isPage,
}: CommunityInfoBoxProps): JSX.Element {
  const { checked, setChecked } = useCommunitySettings(community);
  const { openLogin } = useAuthFlow();
  const history = useHistory();
  const currentUser = useAppSelector((s) => s.session.user);

  /* ---------- local state ---------- */
  const [members, setMembers] = useState<number>(community?.members ?? 0);

  /* ---------- effects -------------- */

  /** keep `members` in sync */
  useEffect(() => setMembers(community?.members ?? 0), [community?.members]);

  /** compute –community-base-color-text dynamically */
  useEffect(() => {
    const varColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--community-base-color");

    document.documentElement.style.setProperty(
      "--community-base-color-text",
      getTextColor(varColor)
    );
  }, [community, checked]);

  /* ---------- render --------------- */

  return (
    <div className="community-page-community-info">
      {/* ─── Header ──────────────────── */}
      <div className="community-page-box-header">
        <div className="community-page-box-header-left">
          <h3>About Community</h3>
        </div>

        <div className="community-page-box-header-right">
          {user?.id === community.userId && (
            <button
              className="community-page-mod-tools"
              onClick={() => history.push(`/c/${community.name}/edit`)}
            >
              <BiShieldAlt /> Mod Tools
            </button>
          )}
          {currentUser && <CommunityInfoMenu community={community} />}
        </div>
      </div>

      {/* ─── Body ────────────────────── */}
      <div className="community-page-box-content">
        {/* single-post breadcrumb */}
        {isPage === "singlepage" && (
          <div className="single-post-community-info-name">
            <CommunityImg
              imgSrc={community.communitySettings[community.id].communityIcon}
              imgAlt="Community"
              imgClass="single-post-community-info-img"
            />
            <NavLink to={`/c/${community.name}`}>c/{community.name}</NavLink>
          </div>
        )}

        <h4>{community.displayName}</h4>

        <CommunityDescription
          isPage={isPage}
          community={community}
          user={user}
        />

        <div className="community-page-box-date">
          <span className="community-cake-icon">
            <CakeIcon />
          </span>
          Created {moment(new Date(community.createdAt)).format("MMM DD, YYYY")}
        </div>

        <div className="community-page-box-members">
          <h2>{members.toLocaleString()}</h2>
          <span>{members === 1 ? "Member" : "Members"}</span>
        </div>

        {/* action buttons */}
        <div className="community-page-box-btn">
          {user && isPage === "singlepage" && (
            <CommunityJoinBtn community={community} isPage={isPage} />
          )}

          {user ? (
            <NavLink
              to={`/c/${community.name}/submit`}
              className="blue-btn-filled btn-long community-btn-filled"
            >
              Create Post
            </NavLink>
          ) : (
            <button
              type="button"
              className="blue-btn-filled btn-long community-btn-filled"
              onClick={openLogin}
            >
              Log In / Sign Up
            </button>
          )}
        </div>

        <CommunityOptions
          checked={checked}
          setChecked={setChecked}
          community={community}
        />
      </div>
    </div>
  );
}
