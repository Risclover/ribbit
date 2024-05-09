import React, { useState } from "react";
import { LoginSignupModal, CreateCommunityModal } from "@/features";
import { Modal } from "@/context";
import { useSelector } from "react-redux";
import { ribbitBanners } from "@/assets";
import { BackToTop } from "@/components";

export const NewCommunity = () => {
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

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
            <LoginSignupModal
              btnText="Log In/Sign Up"
              className="blue-btn-filled btn-long"
              formType="login"
            />
          )}
        </div>
      </div>
      {showCommunityModal && (
        <Modal
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
