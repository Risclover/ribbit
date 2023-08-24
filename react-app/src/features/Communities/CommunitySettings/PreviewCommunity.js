import React, { useEffect, useState } from "react";
import CommunityPage from "../CommunityPage";
import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../../store/one_community";
import { getCommunities } from "../../../store/communities";

export default function PreviewCommunity({
  setPageTitle,
  setPageIcon,
  format,
  setFormat,
  userCommunities,
}) {
  const dispatch = useDispatch();
  const { communityId } = useParams();
  const communities = useSelector((state) => state.communities);
  const community = useSelector((state) => state.singleCommunity);
  const user = useSelector((state) => state.session.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    for (let community of userCommunities) {
      if (community.id == communityId) {
        setIsAdmin(true);
        break;
      }
    }
  }, [userCommunities]);

  return (
    <>
      {isAdmin ? (
        <div
          className="preview-community-page"
          onClick={() => alert("Nah dawg")}
        >
          <CommunityPage
            setPageTitle={setPageTitle}
            setPageIcon={setPageIcon}
            format={format}
            setFormat={setFormat}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
