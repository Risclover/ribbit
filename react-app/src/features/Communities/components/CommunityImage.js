import React, { useState } from "react";
import { Modal } from "@/context";
import { CommunityImgModal } from "../..";
import { CommunityImg } from "components/CommunityImg";

export function CommunityImage({ user, community }) {
  const [showCommunityImgModal, setShowCommunityImgModal] = useState(false);

  return (
    <>
      <div className="community-img-box">
        <div className="community-header-info-img">
          <CommunityImg
            imgSrc={
              community.communitySettings[community.id]?.hideCommunityIcon
                ? "https://i.imgur.com/9CI9hiO.png"
                : community.communitySettings[community.id]?.communityIcon
            }
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
