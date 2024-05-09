import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { CommunityName, CommunitySubscribeBtn, CommunityImgModal } from "../..";
import { Modal } from "@/context";
import { PostFormatContext } from "@/context/PostFormat";

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

function CommunityImage({ user, community }) {
  const [showCommunityImgModal, setShowCommunityImgModal] = useState(false);

  return (
    <>
      <div className="community-img-box">
        <div className="community-header-info-img">
          <img
            src={
              community.communitySettings[community.id].hideCommunityIcon
                ? "https://i.imgur.com/9CI9hiO.png"
                : community.communitySettings[community.id].communityIcon
            }
            alt="Community"
          />
          {user?.id === community.userId && (
            <span
              className="community-update-icon"
              onClick={() => setShowCommunityImgModal(true)}
            >
              Update icon
            </span>
          )}
        </div>
      </div>

      {showCommunityImgModal && (
        <Modal
          onClose={() => setShowCommunityImgModal(false)}
          title="Change community image"
          open={() => setShowCommunityImgModal(true)}
        >
          <CommunityImgModal
            setShowCommunityImgModal={setShowCommunityImgModal}
            communityId={community.id}
          />
        </Modal>
      )}
    </>
  );
}
