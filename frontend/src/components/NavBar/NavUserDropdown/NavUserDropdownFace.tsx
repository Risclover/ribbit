import { KeyboardEventHandler, memo, MouseEventHandler } from "react";
import { TbChevronDown } from "react-icons/tb";
import { KarmaIcon } from "@/assets";
import clsx from "clsx";

/* ---------- types ---------- */

interface User {
  id: number;
  username: string;
  profileImg: string;
  karma?: number;
}

interface NavUserDropdownFaceProps {
  cuser: User;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  className?: string;
  /** Pass the current open/closed state so aria-expanded is accurate */
  expanded?: boolean;
}

/* ---------- component ---------- */

export const NavUserDropdownFace = memo(
  ({
    cuser,
    onClick,
    onKeyDown,
    className = "",
    expanded = false,
  }: NavUserDropdownFaceProps): JSX.Element => {
    const { username, profileImg, karma = 0 } = cuser;

    return (
      <div className={clsx("navbar-user-dropdown-face", className)}>
        <div className="navbar-user-info-box">
          <div className="navbar-user-info-details">
            <img
              src={profileImg}
              alt={`${username} avatar`}
              className="navbar-user-img"
              width={28}
              height={28}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://i.imgur.com/9CI9hiO.png";
              }}
            />

            <div className="navbar-user-info">
              {username}
              <div className="user-karma-info">
                <KarmaIcon color="#67b54d" />
                {karma.toLocaleString()} karma
              </div>
            </div>
          </div>

          {/* decorative chevron */}
          <TbChevronDown aria-hidden="true" />
        </div>
      </div>
    );
  }
);
