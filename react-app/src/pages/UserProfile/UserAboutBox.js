import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { SlArrowRight } from "react-icons/sl";
import Flower from "../../images/user-profile-icons/poinsettia.png";
import Cakeday from "../../images/user-profile-icons/cakeday.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowers,
  getUserFollowers,
} from "../../store/followers";
import UserProfileFollowers from "../../components/Modals/UserProfileFollowers";
import UserBannerModal from "./UploadUserBanner";
import UserImageModal from "./UploadUserImage";
import SendMessage from "./SendMessage";
import { addNotification } from "../../store/notifications";
import StartChat from "./StartChat";
import ChatWindow from "../../components/Modals/ChatWindow/ChatWindow";
import { createChatThread, getUserChatThreads } from "../../store/chats";

export default function UserAboutBox({
  currentUser,
  user,
  username,
  setOpenChat,
  setSelectedChat,
}) {
  const dispatch = useDispatch();

  const { userId } = useParams();

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [banner, setBanner] = useState();
  const [karma, setKarma] = useState();
  const [following, setFollowing] = useState(false);
  const followers = useSelector((state) => state.followers.followers);
  const follows = useSelector((state) => state.followers.follows);
  const userFollowers = useSelector((state) => state.followers.userFollowers);
  const userChats = useSelector((state) => Object.values(state.chatThreads));

  useEffect(() => {
    dispatch(getUserChatThreads());
  }, [dispatch]);

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
      type: "follower",
      id: data.id,
    };

    if (!following) {
      await dispatch(addNotification(payload));
    }
  };

  useEffect(() => {
    if (follows) {
      for (let followed of Object.values(follows)) {
        if (followed?.username === user?.username) {
          setFollowing(true);
          break;
        }
      }
    }
  }, []);

  const handleChat = async () => {
    setOpenChat(true);
    const existingThread = userChats.find(
      (thread) =>
        thread.users?.some((userz) => userz.id === currentUser.id) &&
        thread.users?.some((userz) => userz.id === user.id)
    );
    if (!existingThread) {
      const newChat = await dispatch(createChatThread(+userId));
      setSelectedChat(newChat);
    } else {
      setSelectedChat(existingThread);
    }

    await dispatch(getUserChatThreads());
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
          <UserBannerModal user={user} currentUser={currentUser} />
        )}
      </div>
      <div className="user-profile-img-box">
        {currentUser?.id === +userId && (
          <UserImageModal user={user} currentUser={currentUser} />
        )}
        <img src={user?.profile_img} alt="User" className="user-profile-img" />
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
          {userFollowers && currentUser?.id !== +userId && (
            <button
              className={
                !follows[+userId]
                  ? "blue-btn-filled btn-long"
                  : "blue-btn-unfilled btn-long"
              }
              onClick={handleFollow}
            >
              {!follows[+userId] ? "Follow" : "Unfollow"}
            </button>
          )}
          {currentUser?.id !== +userId && (
            <button className="blue-btn-filled btn-long" onClick={handleChat}>
              Chat
            </button>
          )}
        </div>
        {userFollowers && currentUser?.id !== +userId && (
          <SendMessage userId={+userId} username={username} />
        )}
      </div>
      {showFollowersModal && (
        <Modal onClose={() => setShowFollowersModal(false)} title="Followers">
          <UserProfileFollowers setShowFollowersModal={setShowFollowersModal} />
        </Modal>
      )}
    </div>
  );
}
