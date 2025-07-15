import { useState, useRef, MouseEvent } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAppSelector } from "@/store";
import { UsernamePopup } from "./UsernamePopup";
import { usePopup } from "@/context";
import "./Username.css";

/* ──────────────────────────── Types ──────────────────────────── */
// The shape `UsernamePopup` expects (sync with that file)
export interface UserSummary {
  id: number | string;
  username: string;
  createdAt: string;
  profileImg: string;
  postKarma: number;
  commentKarma: number;
}

export interface UsernameProps {
  community?: unknown;
  username: string;
  user?: { id: number | string };
  source?: "singlepost" | string;
  disabled?: boolean;
}

/** Username link + optional hover card */
export function Username({
  community,
  username,
  user,
  source,
  disabled = false,
}: UsernameProps): JSX.Element {
  const history = useHistory();
  /* ------- Selectors ------- */
  const users = useAppSelector(
    (s) => Object.values(s.users) as UserSummary[] // ⭐ cast once
  );
  const currentUser = useAppSelector((s) => s.session.user);

  /* Only need first match → find() */
  const foundUser = users.find((u) => u.username === username); // UserSummary | undefined

  /* ------- Popup state (local + global) ------- */
  const [showPopup, setShowPopup] = useState(false);
  const { isPopupOpen, setIsPopupOpen } = usePopup();

  /* Debounced hide-timer lives in a ref */
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  /* ------- Handlers ------- */
  const handleMouseEnter = (): void => {
    if (foundUser?.id === currentUser?.id) return; // don’t show on self
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (!isPopupOpen) {
      setShowPopup(true);
      setIsPopupOpen(true);
    }
  };

  const handleMouseLeave = (): void => {
    hideTimer.current = setTimeout(() => {
      setShowPopup(false);
      setIsPopupOpen(false);
    }, 200);
  };

  const handleNameClick = (e: MouseEvent): void => {
    e.stopPropagation();
  };

  /* ------- Render ------- */
  return (
    <div
      className={`username-component-wrapper${disabled ? " disabled" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {disabled ? (
        username
      ) : (
        <NavLink
          to={`/users/${user?.id}/profile`}
          onClick={handleNameClick}
          className="username-component"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              e.preventDefault();
              history.push(`/users/${user?.id}/profile`);
            }
          }}
        >
          {source === "singlepost" ? `u/${username}` : username}
        </NavLink>
      )}

      {showPopup && !disabled && foundUser && (
        <UsernamePopup
          community={community}
          user={foundUser}
          setIsPopupOpen={setIsPopupOpen}
        />
      )}
    </div>
  );
}
