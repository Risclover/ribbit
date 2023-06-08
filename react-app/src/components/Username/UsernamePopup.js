import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Username.css";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowers,
  getUserFollowers,
} from "../../store/followers";
import { Modal } from "../../context/Modal";
import MessageModal from "../Modals/MessageModal";
import { NavLink } from "react-router-dom";

export default function UsernamePopup({ setShowUserBox, user }) {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followers.follows);
  const currentUser = useSelector((state) => state.session.user);

  const [following, setFollowing] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  useEffect(() => {
    if (currentUser && follows && user && user[0]) {
      for (let followed of Object.values(follows)) {
        if (followed?.username === user[0]?.username) {
          setFollowing(true);
          break;
        } else {
          setFollowing(false);
        }
      }
    }
  }, [currentUser, follows, user]);

  const handleFollowing = async (e) => {
    e.preventDefault();
    await dispatch(followUser(user[0]?.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user[0]?.id));
    setFollowing(!following);
  };

  if (!follows || !user || !user[0]) return null;
  return (
    <>
      <div className="username-popup">
        <div className="username-popup-user-info">
          <img
            src={user[0]?.profile_img}
            alt="User"
            className="username-popup-user-icon"
          />
          <div className="username-popup-user-info-name">
            <NavLink to={`/users/${user[0]?.id}/profile`}>
              {user[0]?.displayName}
            </NavLink>
            <div className="username-popup-user-info-details">
              {user[0]?.username} • {moment(user[0]?.createdAt).fromNow()}
            </div>
          </div>
        </div>
        <div className="username-popup-karma-info">
          <div className="username-popup-karma-left">
            <div className="username-popup-karma-title">
              {user[0]?.postKarma}
            </div>
            <div className="username-popup-karma-body">Post Karma</div>
          </div>
          <div className="username-popup-karma-right">
            <div className="username-popup-karma-title">
              {user[0]?.commentKarma}
            </div>
            <div className="username-popup-karma-body">Comment Karma</div>
          </div>
        </div>
        <button
          className="blue-btn-unfilled btn-long username-popup-btn-top"
          onClick={(e) => {
            e.preventDefault();
            setShowUserBox(false);
            setShowMsgModal(true);
          }}
        >
          Send a Message
        </button>
        <button
          className={
            !following
              ? "blue-btn-filled btn-long username-popup-btn-btm"
              : "blue-btn-unfilled btn-long username-popup-btn-btm"
          }
          onClick={handleFollowing}
        >
          {!following ? "Follow" : "Following"}
        </button>
      </div>
      {showMsgModal && (
        <Modal onClose={() => setShowMsgModal(false)} title="Send a Message">
          <MessageModal
            setShowMessageModal={setShowMsgModal}
            username={user[0]?.username}
          />
        </Modal>
      )}
    </>
  );
}
