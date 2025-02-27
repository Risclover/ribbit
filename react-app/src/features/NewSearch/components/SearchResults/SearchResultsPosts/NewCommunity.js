import React, { useState } from "react";
import { CreateCommunityModal } from "@/features";
import { Modal } from "@/context";
import { useSelector } from "react-redux";
import { ribbitBanners } from "@/assets";
import { BackToTop } from "@/components";
import { useAuthFlow } from "@/context/AuthFlowContext";

export const NewCommunity = () => {
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const { openLogin } = useAuthFlow();

  return (
    <div className="last-box-wrapper">
      <div className="search-results-right-box search-results-create-community">
        <img src={ribbitBanners.RibbitBanner} alt="Ribbit Banner" />
        <div className="search-results-create-community-box">
          <p>Have an idea for a new community?</p>
          {currentUser && (
            <button
              className="blue-btn-unfilled btn-long"
              onClick={() => setShowCommunityModal(true)}
            >
              Create Community
            </button>
          )}
          {!currentUser && (
            <button className="blue-btn-filled btn-long" onClick={openLogin}>
              Log In/Sign Up
            </button>
          )}
        </div>
      </div>
      {showCommunityModal && (
        <Modal
          close={showCommunityModal}
          onClose={() => setShowCommunityModal(false)}
          title="Create a community"
          open={() => setShowCommunityModal(true)}
        >
          <CreateCommunityModal
            showCreateCommunityModal={showCommunityModal}
            setShowCreateCommunityModal={setShowCommunityModal}
          />
        </Modal>
      )}
      <BackToTop />
    </div>
  );
};
