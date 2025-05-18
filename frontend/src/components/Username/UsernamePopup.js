import React, { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import { Modal } from "@/context";
import { MessageModal } from "@/features";
import { FollowBtn } from "../FollowBtn";
import "./Username.css";
import { useSelector } from "react-redux";
import { useOutsideClick } from "hooks";

export function UsernamePopup({ community, user, setIsPopupOpen }) {
  const wrapperRef = useRef(null);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  const {
    id,
    displayName,
    username,
    createdAt,
    profileImg,
    postKarma,
    commentKarma,
  } = user[0] || {};

  useOutsideClick(wrapperRef, () => setIsPopupOpen(false));

  return (
    <div ref={wrapperRef}>
      <div className="username-popup" onClick={(e) => e.stopPropagation()}>
        <div className="username-popup-user-info">
          <img
            src={profileImg}
            alt="User"
            className="username-popup-user-icon"
          />
          <div className="username-popup-user-info-name">
            <NavLink
              onClick={(e) => e.stopPropagation()}
              to={`/users/${id}/profile`}
            >
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
        {currentUser && (
          <button
            className={`blue-btn-unfilled btn-long username-popup-btn-top ${
              community ? " community-btn" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              setShowMsgModal(true);
            }}
          >
            Send a Message
          </button>
        )}
        {currentUser && <FollowBtn user={user[0]} community={community} />}
      </div>
      {showMsgModal && (
        <Modal
          close={showMsgModal}
          onClose={(e) => {
            e.stopPropagation();
            setShowMsgModal(false);
          }}
          title="Send a Message"
          open={() => setShowMsgModal(true)}
        >
          <MessageModal
            setShowMessageModal={setShowMsgModal}
            username={username}
          />
        </Modal>
      )}
    </div>
  );
}
