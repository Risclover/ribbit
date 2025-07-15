import { KeyboardEvent, MouseEvent } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";

import { CommunityThemeToggle } from "@/features";
import { useDarkMode, useEscapeKey } from "@/hooks";
import { logout, useAppDispatch } from "@/store";

interface User {
  id: number;
  username: string;
  profileImg: string;
}

interface NavUserDropdownBoxProps {
  cuser: User | null;
  setShowDropdown: (v: boolean) => void;
  showDropdown: boolean;
}

export function NavUserDropdownBox({
  cuser,
  setShowDropdown,
  showDropdown,
}: NavUserDropdownBoxProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { toggleTheme, checked } = useDarkMode();

  /* guard: auth state not ready yet */

  const onLogout = async () => {
    await dispatch(logout());
    setShowDropdown(false);
    history.push("/");
  };

  const handleKeyNav =
    (to: string) => (e: KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === "Enter") {
        e.stopPropagation();
        setShowDropdown(false);
        history.push(to);
      }
    };

  useEscapeKey(() => setShowDropdown(false), showDropdown);

  if (!cuser) return null;
  return (
    <div className="nav-user-dropdown-box" role="menu">
      {/* ───── top section ───── */}
      <div className="nav-user-top-section">
        <div className="nav-user-dropdown-btn-title" aria-hidden="true">
          <HiOutlineUserCircle /> My Stuff
        </div>

        <NavLink
          to={`/users/${cuser.id}/profile`}
          className="nav-user-dropdown-btn"
          onClick={() => setShowDropdown(false)}
          onKeyDown={handleKeyNav(`/users/${cuser.id}/profile`)}
        >
          Profile
        </NavLink>

        <NavLink
          to="/directory"
          className="nav-user-dropdown-btn"
          onClick={() => setShowDropdown(false)}
          onKeyDown={handleKeyNav("/directory")}
        >
          Communities Directory
        </NavLink>

        <NavLink
          to="/settings/profile"
          className="nav-user-dropdown-btn"
          onClick={() => setShowDropdown(false)}
          onKeyDown={handleKeyNav("/settings/profile")}
        >
          User Settings
        </NavLink>

        <button
          type="button"
          className="nav-user-dropdown-btn dark-mode-toggle"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            toggleTheme(e);
          }}
        >
          Dark Mode
          <CommunityThemeToggle
            checked={checked}
            handleThemeToggle={toggleTheme}
          />
        </button>
      </div>

      {/* ───── logout ───── */}
      <button
        type="button"
        className="nav-user-dropdown-logout-btn"
        onClick={onLogout}
        onKeyDown={(e) => e.key === "Enter" && onLogout()}
      >
        <span className="door-icon">
          <SlLogin />
        </span>
        Log Out
      </button>
    </div>
  );
}
