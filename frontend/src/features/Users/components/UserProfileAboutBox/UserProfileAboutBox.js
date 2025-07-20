import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { Modal } from "context";
import { CommunityFeedAbout } from "@/features";
import { UserProfileFollowers } from "@/features";
import { useUserProfileAboutBox } from "features/Users/hooks/useUserProfileAboutBox";
import { MobileHeader } from "./MobileHeader";
import { StatsSection } from "./StatsSection";
import { ActionButtons } from "./ActionButtons";
import "../../styles/UserProfile.css";
import { UserUploadModal } from "pages";

export function UserProfileAboutBox({
  currentUser,
  user,
  username,
  showAbout,
  setShowAbout,
}) {
  const { userId } = useParams();
  const about = useUserProfileAboutBox({ user, currentUser });

  return (
    <div className="user-profile-about-box">
      {/* banner */}
      <div
        className="user-profile-about-box-banner"
        style={{
          background: user?.bannerImg
            ? `center / cover no-repeat url(${about.bannerImg})`
            : "#0079d3",
        }}
      >
        {about.isMe && (
          <UserUploadModal
            title="Change User Profile Banner"
            showModal={about.showBannerModal}
            setShowModal={about.setShowBannerModal}
            imgUrl={about.bannerImg}
            userId={currentUser?.id}
            uploadType="banner"
          />
        )}
      </div>

      {/* avatar */}
      <div
        className="user-profile-img-box"
        style={{
          background: `center / cover no-repeat url(${about.profileImg}) #FFF`,
        }}
      >
        {about.isMe && (
          <UserUploadModal
            title="Change User Image"
            showModal={about.showUploadModal}
            setShowModal={about.setShowUploadModal}
            imgUrl={about.profileImg}
            userId={currentUser?.id}
            uploadType="profile"
          />
        )}
      </div>

      {/* main content */}
      <div className="user-profile-about-content">
        {/* settings icon (desktop) */}
        {about.isMe && (
          <NavLink to="/settings/profile">
            <IoSettingsSharp />
          </NavLink>
        )}

        {/* mobile header (display-name + kebab) */}
        <MobileHeader
          user={user}
          about={about}
          userId={userId}
          currentUser={currentUser}
          username={username}
        />

        {/* “about me” text */}
        <div className="user-profile-about">{user?.about}</div>

        {/* community toggle */}
        <CommunityFeedAbout showAbout={showAbout} setShowAbout={setShowAbout} />

        {/* stats */}
        <StatsSection about={about} user={user} showAbout={showAbout} />

        {/* follow / chat / message buttons */}
        <ActionButtons
          about={about}
          user={user}
          currentUser={currentUser}
          userId={userId}
          username={username}
        />
      </div>

      {/* followers modal */}
      {about.showFollowersModal && (
        <Modal
          title="Followers"
          onClose={() => about.setShowFollowersModal(false)}
        >
          <UserProfileFollowers
            setShowFollowersModal={about.setShowFollowersModal}
          />
        </Modal>
      )}
    </div>
  );
}
