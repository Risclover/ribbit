import { useEffect, useCallback } from "react";
import { CommunityThemeToggle } from "@/features";
import { useDarkMode, useEscapeKey } from "@/hooks";
import { NavLink, useHistory } from "react-router-dom";
import { SlLogin } from "react-icons/sl";
import type {
  MouseEvent as ReactMouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";

interface LoggedOutDropdownProps {
  setShowDropdown: (open: boolean) => void;
  showDropdown: boolean;
}

export function LoggedOutDropdown({
  setShowDropdown,
  showDropdown,
}: LoggedOutDropdownProps) {
  const history = useHistory();
  const { toggleTheme, checked } = useDarkMode();

  /** Close dropdown helper (stable reference) */
  const closeDropdown = useCallback(
    () => setShowDropdown(false),
    [setShowDropdown]
  );

  /** Navigate to /login and close dropdown */
  const handleOpenLogin = useCallback(() => {
    closeDropdown();
    history.push("/login");
  }, [history, closeDropdown]);

  /** Toggle dark mode without bubbling to parent dropdown */
  const handleToggleTheme = useCallback(
    (e: ReactMouseEvent | ReactKeyboardEvent) => {
      e.stopPropagation();
      toggleTheme(e);
    },
    [toggleTheme]
  );

  /** Close on Escape (DOM KeyboardEvent) */
  useEscapeKey(() => setShowDropdown(false), showDropdown);

  return (
    <div className="logged-out-dropdown">
      <div className="nav-user-top-section">
        <NavLink to="/directory" onClick={closeDropdown}>
          <div className="nav-user-dropdown-btn">
            Communities&nbsp;Directory
          </div>
        </NavLink>

        <button
          type="button"
          className="nav-user-dropdown-btn dark-mode-toggle"
          onClick={handleToggleTheme}
          aria-label="Toggle dark mode"
        >
          Dark&nbsp;Mode{" "}
          <CommunityThemeToggle
            checked={checked}
            handleThemeToggle={toggleTheme}
          />
        </button>
      </div>

      <button
        type="button"
        className="nav-user-dropdown-logout-btn"
        onClick={handleOpenLogin}
      >
        <span className="door-icon">
          <SlLogin />
        </span>
        Log&nbsp;In&nbsp;/&nbsp;Sign&nbsp;Up
      </button>
    </div>
  );
}
