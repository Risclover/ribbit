import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Modal } from "../../context";
import { MessageModal } from "../../features";
import { FollowBtn } from "../FollowBtn";
import "./Username.css";

export function UsernamePopup({ community, user }) {
  const [showMsgModal, setShowMsgModal] = useState(false);

  const {
    id,
    displayName,
    username,
    createdAt,
    profile_img,
    postKarma,
    commentKarma,
  } = user[0] || {};

  return (
    <>
      <div className="username-popup">
        <div className="username-popup-user-info">
          <img
            src={profile_img}
            alt="User"
            className="username-popup-user-icon"
          />
          <div className="username-popup-user-info-name">
            <NavLink to={`/users/${id}/profile`}>
              {displayName ? displayName : username}
            </NavLink>
            <div className="username-popup-user-info-details">
              u/{username} • {moment(createdAt).fromNow()}
            </div>
          </div>
        </div>
        <div className="username-popup-karma-info">
          <div className="username-popup-karma-left">
            <div className="username-popup-karma-title">{postKarma}</div>
            <div className="username-popup-karma-body">Post Karma</div>
          </div>
          <div className="username-popup-karma-right">
            <div className="username-popup-karma-title">{commentKarma}</div>
            <div className="username-popup-karma-body">Comment Karma</div>
          </div>
        </div>
        <button
          className={`blue-btn-unfilled btn-long username-popup-btn-top ${
            community ? " community-btn" : ""
          }`}
          onClick={() => setShowMsgModal(true)}
        >
          Send a Message
        </button>
        <FollowBtn user={user[0]} />
      </div>
      {showMsgModal && (
        <Modal
          onClose={() => setShowMsgModal(false)}
          title="Send a Message"
          open={() => setShowMsgModal(true)}
        >
          <MessageModal
            setShowMessageModal={setShowMsgModal}
            username={username}
          />
        </Modal>
      )}
    </>
  );
}
