import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
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

import { Modal } from "@/context";
import { UserProfileFollowers } from "@/features";
import { UploadUserBanner, UploadUserImage, SendMessage } from "@/pages";
import Cakeday from "@/assets/images/user-profile-icons/cakeday.png";
import Flower from "@/assets/images/user-profile-icons/poinsettia.png";
import { SelectedChatContext } from "@/context";
import { FollowBtn } from "@/components";
import { UserUploadModal } from "./UserUploadModal";
import { UploadBannerImageModal, UploadImage } from "features";

export function UserAboutBox({ currentUser, user, username, setOpenChat }) {
  const dispatch = useDispatch();

  const { userId } = useParams();

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [banner, setBanner] = useState();
  const [karma, setKarma] = useState();
  const followers = useSelector((state) => state.followers.followers);
  const follows = useSelector((state) => state.followers?.follows);
  const userFollowers = useSelector((state) => state.followers.userFollowers);
  const userChats = useSelector((state) => Object.values(state.chatThreads));
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const isFollowing = () => follows && user && follows[user.id];

  const { setSelectedChat } = useContext(SelectedChatContext);

  useEffect(() => {
    dispatch(getUserChatThreads());
    dispatch(getFollowers());
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

    if (!existingThread) {
      const newChat = await dispatch(createChatThread(userId));
      setSelectedChat(newChat);
    } else {
      setSelectedChat(existingThread);
    }
  };

  return (
    <div className="user-profile-about-box">
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
          <NavLink to={`/users/${userId}/profile/edit`}>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                x="0px"
                y="0px"
                viewBox="2 2 32 32"
                fill="#24a0ed"
              >
                <path
                  className="cls-1"
                  d="M9,18a11.29,11.29,0,0,0-3,3.28,8.74,8.74,0,0,1-2.48-1.75L2,18l1.53-1.53A9,9,0,0,1,6,14.7,11.38,11.38,0,0,0,9,18Z"
                ></path>
                <path
                  className="cls-1"
                  d="M34,18l-1.54,1.54A19.49,19.49,0,0,1,30,21.3,11.19,11.19,0,0,0,27,18a11.38,11.38,0,0,0,3-3.3,8.42,8.42,0,0,1,2.48,1.76Z"
                ></path>
                <path
                  className="cls-1"
                  d="M18,27a11.29,11.29,0,0,0,3.28,3,8.74,8.74,0,0,1-1.75,2.48L18,34l-1.53-1.53A9,9,0,0,1,14.7,30,11.38,11.38,0,0,0,18,27Z"
                ></path>
                <path
                  className="cls-1"
                  d="M18,2l1.54,1.54A19.49,19.49,0,0,1,21.3,6,11.19,11.19,0,0,0,18,9a11.38,11.38,0,0,0-3.3-3,8.42,8.42,0,0,1,1.76-2.48Z"
                ></path>
                <path
                  className="cls-1"
                  d="M17.67,13.43a4.59,4.59,0,0,0-4.23,4.24A9.44,9.44,0,0,1,8.25,14C6.72,11.73,6.69,9.29,6.69,6.69c2.6,0,5,0,7.27,1.57A9,9,0,0,1,17.67,13.43Z"
                ></path>
                <path
                  className="cls-1"
                  d="M29.3,27.14v2.17c-3,0-6.27-.12-8.45-2.51a9.24,9.24,0,0,1-2.55-4.24,4.57,4.57,0,0,0,4.25-4.23,9.07,9.07,0,0,1,5,3.41A9.68,9.68,0,0,1,29.3,27.14Z"
                ></path>
                <path
                  className="cls-1"
                  d="M22.56,17.67a4.59,4.59,0,0,0-4.24-4.23A9.44,9.44,0,0,1,22,8.26c2.23-1.53,4.67-1.57,7.27-1.57,0,2.6,0,5-1.57,7.27A9,9,0,0,1,22.56,17.67Z"
                ></path>
                <path
                  className="cls-1"
                  d="M8.86,29.31H6.69c0-3,.12-6.27,2.51-8.45a9.24,9.24,0,0,1,4.24-2.55,4.57,4.57,0,0,0,4.23,4.25,9.07,9.07,0,0,1-3.41,5A9.68,9.68,0,0,1,8.86,29.31Z"
                ></path>
                <path
                  className="cls-1"
                  d="M20.29,18A2.29,2.29,0,1,1,18,15.71,2.3,2.3,0,0,1,20.29,18Z"
                ></path>
              </svg>
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
                fill="#24a0ed"
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
          {currentUser?.id !== +userId && <FollowBtn user={user} />}
          {currentUser?.id !== +userId && (
            <button className="blue-btn-filled btn-long" onClick={handleChat}>
              Chat
            </button>
          )}
        </div>
        {currentUser?.id !== +userId && (
          <SendMessage userId={userId} username={username} />
        )}
      </div>
      {showFollowersModal && (
        <Modal
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
