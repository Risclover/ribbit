import React, { useContext, useState } from "react";
import { useAppSelector } from "@/store";
import { CommunityName, CommunityImage, CommunityFeedAbout } from "../..";
import { PostFormatContext } from "@/context";

export function CommunityPageHeader({ community, showAbout, setShowAbout }) {
  const user = useAppSelector((state) => state.session.user);

  const { format } = useContext(PostFormatContext);

  if (!community) return null;

  return (
    <div className="community-page-header">
      <div className="community-page-header-top"></div>
      <div className="community-page-header-btm">
        <div
          className={
            format === "Card"
              ? "community-header-info"
              : "community-header-info-alt"
          }
        >
          <div className="community-header-info-details">
            <div className="community-header-info-details-top">
              <CommunityImage user={user} community={community} />
              <CommunityName community={community} />
              <p>{community.description}</p>
            </div>
            <CommunityFeedAbout
              showAbout={showAbout}
              setShowAbout={setShowAbout}
              community={community}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
