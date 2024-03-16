import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import { CommunityDetails, CommunityOptions } from "../..";
import Cake from "../../../assets/images/misc/piece4.png";
import "react-loading-skeleton/dist/skeleton.css";

export function PostsCommunityInfoBox({ community }) {
  const [members, setMembers] = useState(0);

  useEffect(() => {
    setMembers(community?.members);
  }, [community?.members]);

  return (
    <div className="community-page-community-info">
      <div className="community-page-box-header"></div>
      <CommunityDetails community={community} />
      <CommunityOptions community={community} />
    </div>
  );
}
