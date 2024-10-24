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
import { SelectedChatContext } from "@/context/SelectedChat";
import { FollowBtn } from "@/components";

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
      <div className="user-profile-about-box-banner">
        {banner === null ? (
          ""
        ) : (
          <img src={banner} className="user-profile-banner" alt="Banner" />
        )}
        {currentUser?.id === +userId && (
          <UploadUserBanner user={user} currentUser={currentUser} />
        )}
      </div>
      <div className="user-profile-img-box">
        {currentUser?.id === +userId && (
          <UploadUserImage user={user} currentUser={currentUser} />
        )}
        <img src={user?.profileImg} alt="User" className="user-profile-img" />
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
              <img src={Flower} className="stats-icon" alt="Flower" />{" "}
              <span className="stats-label">{karma}</span>
            </div>
          </div>
          <div className="user-profile-stats stats-cakeday">
            <h5>Cake day</h5>
            <div className="stats-stats">
              <img src={Cakeday} className="stats-icon" alt="Cakeday" />
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
