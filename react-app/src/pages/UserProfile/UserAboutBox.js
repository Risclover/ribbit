import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import moment from "moment";

import {
  followUser,
  getFollowers,
  getUserFollowers,
  createChatThread,
  getUserChatThreads,
  addNotification,
} from "@/store";

import { FollowBtn } from "@/components";
import { Modal, SelectedChatContext, useAuthFlow } from "@/context";
import { UserProfileFollowers } from "@/features";
import { SendMessage } from "@/pages";
import { UserUploadModal } from "./UserUploadModal";
import { KarmaIcon } from "@/assets";
import { OVERLAYS } from "@/features/Chat/components/ChatWindow/Chat";

export function UserAboutBox({ currentUser, user, username, setOpenChat }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();

  const { openLogin } = useAuthFlow();

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [banner, setBanner] = useState();
  const [karma, setKarma] = useState();
  const followers = useSelector((state) => state.followers.followers);
  const follows = useSelector((state) => state.followers?.follows);
  const userFollowers = useSelector((state) => state.followers.userFollowers);
  const userChats = useSelector((state) => Object.values(state.chatThreads));
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isFollowing = () => follows && user && follows[user.id];

  const { setSelectedChat } = useContext(SelectedChatContext);

  useEffect(() => {
    dispatch(getUserChatThreads());
    if (followers.length === 0) dispatch(getFollowers());
    dispatch(getUserFollowers(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    setBanner(user?.bannerImg);
    setKarma(user?.karma);
  }, [userId, user?.bannerImg, user?.karma]);

  const handleFollow = async () => {
    const data = await dispatch(followUser(user?.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user?.id));
    setFollowing(!following);
    const payload = {
      notificationType: "follower",
      id: data.id,
    };

    if (!following) {
      await dispatch(addNotification(payload));
    }
  };

  const handleChat = async () => {
    setOpenChat(true);

    const existingThread = userChats.find(
      (thread) =>
        thread.users?.some((aUser) => aUser.id === currentUser?.id) &&
        thread.users?.some((bUser) => bUser.id === user.id)
    );

    if (existingThread) {
      setSelectedChat(existingThread);
    } else {
      setSelectedChat(null);
      setPendingReceiver(user.username);
      setActiveOverlay(OVERLAYS.INVITE);
    }

    if (!existingThread) {
      const newChat = await dispatch(createChatThread(userId));
      setSelectedChat(newChat);
    } else {
      setSelectedChat(existingThread);
    }
  };

  return (
    <div className="user-profile-about-box" id="sidebar">
      <div
        className="user-profile-about-box-banner"
        style={{
          background:
            banner === null
              ? "#0079d3"
              : `center / cover no-repeat url(${banner})`,
        }}
      >
        {currentUser?.id === +userId && (
          <UserUploadModal
            title="Change User Profile Banner"
            showModal={showBannerModal}
            setShowModal={setShowBannerModal}
            imgUrl={user?.bannerImg}
            userId={currentUser?.id}
            uploadType="banner"
          />
        )}
        {/* {currentUser?.id === +userId && (
          <UploadUserBanner user={user} currentUser={currentUser} />
        )} */}
      </div>
      <div
        className="user-profile-img-box"
        style={{
          background: `center / cover no-repeat url(${user?.profileImg}) #FFF`,
        }}
      >
        {/* {currentUser?.id === +userId && (
          <UploadUserImage user={user} currentUser={currentUser} />
        )} */}
        {currentUser?.id === +userId && (
          <UserUploadModal
            title="Change User Image"
            showModal={showUploadModal}
            setShowModal={setShowUploadModal}
            imgUrl={user?.profileImg}
            userId={currentUser?.id}
            uploadType="profile"
          />
        )}
      </div>
      <div className="user-profile-about-content">
        {currentUser?.id === +userId && (
          <NavLink to={`/settings/profile`}>
            <i className="fa-solid fa-gear user-settings"></i>
          </NavLink>
        )}
        <h1 className="user-profile-display-name">{user?.displayName}</h1>
        <div className="user-profile-username-year">
          <span>u/{user?.username}</span>
        </div>
        <div className="user-profile-about">{user?.about}</div>
        <div className="user-profile-stats-box">
          <div className="user-profile-stats stats-karma">
            <h5>Karma</h5>
            <div className="stats-stats">
              <KarmaIcon />
              <span className="stats-label">{karma}</span>
            </div>
          </div>
          <div className="user-profile-stats stats-cakeday">
            <h5>Cake day</h5>
            <div className="stats-stats">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="2.99 2 26.01 28"
              >
                {" "}
                <g data-name="Layer 2">
                  {" "}
                  <path d="M22.36,10.06A5.5,5.5,0,0,1,12,7.5a5.389,5.389,0,0,1,.59-2.47,4.755,4.755,0,0,0-1.19.03A10.321,10.321,0,0,0,6.41,7.17a8.981,8.981,0,0,0-3.35,5.67A9.029,9.029,0,0,0,2.99,14H28.32Z"></path>{" "}
                  <path d="M17.5,11a3.486,3.486,0,0,0,2.155-6.237,4.715,4.715,0,0,1,1.611-.8,1,1,0,1,0-.532-1.928A6.722,6.722,0,0,0,18.387,3.21a6.572,6.572,0,0,0-.84.8c-.016,0-.031,0-.047,0a3.5,3.5,0,0,0,0,7Z"></path>{" "}
                  <path d="M3,16v5.251a7.951,7.951,0,0,1,2.289,1.107A5.142,5.142,0,0,0,8.5,23.4a5.136,5.136,0,0,0,3.209-1.042A7.042,7.042,0,0,1,16,21a7.054,7.054,0,0,1,4.29,1.357,5.467,5.467,0,0,0,6.424,0A7.957,7.957,0,0,1,29,21.251V16Z"></path>{" "}
                  <path d="M23.5,25.4a7.05,7.05,0,0,1-4.29-1.357A5.14,5.14,0,0,0,16,23a5.139,5.139,0,0,0-3.209,1.042A7.036,7.036,0,0,1,8.5,25.4,7.042,7.042,0,0,1,4.21,24.042,7.947,7.947,0,0,0,3,23.368V27a3,3,0,0,0,3,3H26a3,3,0,0,0,3-3V23.367a7.978,7.978,0,0,0-1.212.676A7.05,7.05,0,0,1,23.5,25.4Z"></path>{" "}
                </g>{" "}
              </svg>
              <span className="stats-label">
                {moment(new Date(user?.createdAt)).format("MMMM DD, YYYY")}
              </span>
            </div>
          </div>
          {currentUser?.id === user?.id && (
            <div
              className="user-profile-stats stats-followers"
              onClick={() => setShowFollowersModal(true)}
            >
              <h5>Followers</h5>
              <div className="stats-stats">
                <i className="fa-solid fa-user"></i>
                <span className="stats-label">
                  {followers && Object.values(followers).length}
                </span>
                <SlArrowRight />
              </div>
            </div>
          )}
        </div>

        <div className="half-btns">
          {currentUser && currentUser?.id !== +userId && (
            <FollowBtn user={user} />
          )}
          {!currentUser && (
            <button className="blue-btn-filled btn-long" onClick={openLogin}>
              Follow
            </button>
          )}
          {currentUser && currentUser?.id !== +userId && (
            <button className="blue-btn-filled btn-long" onClick={handleChat}>
              Chat
            </button>
          )}{" "}
          {!currentUser && (
            <button className="blue-btn-filled btn-long" onClick={openLogin}>
              Chat
            </button>
          )}
        </div>
        {currentUser && currentUser?.id !== +userId && (
          <SendMessage
            userId={userId}
            currentUser={currentUser}
            username={username}
          />
        )}
        {!currentUser && (
          <button className="blue-btn-filled btn-long" onClick={openLogin}>
            Send Message
          </button>
        )}
      </div>

      {showFollowersModal && (
        <Modal
          close={showFollowersModal}
          onClose={() => setShowFollowersModal(false)}
          title="Followers"
          open={() => setShowFollowersModal(true)}
        >
          <UserProfileFollowers setShowFollowersModal={setShowFollowersModal} />
        </Modal>
      )}
    </div>
  );
}
