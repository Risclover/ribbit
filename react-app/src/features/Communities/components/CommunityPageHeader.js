import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { CommunityName, CommunityImage } from "../..";
import { PostFormatContext } from "@/context";

export function CommunityPageHeader({ community }) {
  const user = useSelector((state) => state.session.user);

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
            <CommunityImage user={user} community={community} />
            <CommunityName community={community} />
          </div>
        </div>
      </div>
    </div>
  );
}
