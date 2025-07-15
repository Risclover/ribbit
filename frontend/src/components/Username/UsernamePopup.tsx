import { MouseEvent, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Modal } from "@/context";
import { MessageModal } from "@/features";
import { FollowBtn } from "../FollowBtn";
import { useAppSelector } from "@/store";
import { useOutsideClick } from "@/hooks";
import "./Username.css";

/* ------------ Types ------------ */

export interface UserSummary {
  id: number | string;
  username: string;
  displayName?: string;
  createdAt: string;
  profileImg: string;
  postKarma: number;
  commentKarma: number;
}

export interface UsernamePopupProps {
  /** Community context for the FollowBtn (may be undefined) */
  community?: unknown;
  /** The user to show – **pass a single user** */
  user: UserSummary;
  /** Setter from `usePopup` to close any open username cards */
  setIsPopupOpen: (v: boolean) => void;
}

/* ------------ Component -------- */

export function UsernamePopup({
  community,
  user,
  setIsPopupOpen,
}: UsernamePopupProps): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const currentUser = useAppSelector((s) => s.session.user);

  useOutsideClick(wrapperRef, () => setIsPopupOpen(false));

  /* ---------- Handlers ---------- */

  const openMessageModal = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMsgModal(true);
  };

  const closeMessageModal = () => setShowMsgModal(false);

  /* ---------- Render ------------ */

  return (
    <div ref={wrapperRef}>
      <div
        className="username-popup"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby={`popup-${user.id}-name`}
      >
        {/* ───────── User header ───────── */}
        <div className="username-popup-user-info">
          <img
            src={user.profileImg}
            alt="User avatar"
            className="username-popup-user-icon"
          />

          <div className="username-popup-user-info-name">
            <NavLink
              id={`popup-${user.id}-name`}
              to={`/users/${user.id}/profile`}
              onClick={(e) => e.stopPropagation()}
            >
              {user.displayName ?? user.username}
            </NavLink>

            <div className="username-popup-user-info-details">
              u/{user.username} • {moment(user.createdAt).fromNow()}
            </div>
          </div>
        </div>

        {/* ───────── Karma stats ───────── */}
        <div className="username-popup-karma-info">
          <div className="username-popup-karma-left">
            <div className="username-popup-karma-title">{user.postKarma}</div>
            <div className="username-popup-karma-body">Post&nbsp;Karma</div>
          </div>
          <div className="username-popup-karma-right">
            <div className="username-popup-karma-title">
              {user.commentKarma}
            </div>
            <div className="username-popup-karma-body">Comment&nbsp;Karma</div>
          </div>
        </div>

        {/* ───────── Actions ──────────── */}
        {currentUser && (
          <>
            <button
              className={`blue-btn-unfilled btn-long username-popup-btn-top${
                community ? " community-btn" : ""
              }`}
              onClick={openMessageModal}
            >
              Send&nbsp;a&nbsp;Message
            </button>

            <FollowBtn user={user} community={community} />
          </>
        )}
      </div>

      {/* ───────── Message modal ──────── */}
      {showMsgModal && (
        <Modal
          open={showMsgModal}
          close={closeMessageModal}
          onClose={closeMessageModal}
          title="Send a Message"
        >
          <MessageModal
            setShowMessageModal={setShowMsgModal}
            username={user.username}
          />
        </Modal>
      )}
    </div>
  );
}
