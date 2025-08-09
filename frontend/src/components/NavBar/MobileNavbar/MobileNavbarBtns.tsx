import { useCallback } from "react";
import { TfiPlus } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

import { HamburgerMenuIcon, SearchIcon } from "@/assets";
import { useAuthFlow } from "@/context";
import { NotificationBell } from "@/features";
import { useCreatePostTarget } from "@/hooks";
import { useAppSelector, RootState } from "@/store";
import { RandomLogo } from "@/layouts";

interface MobileNavbarBtnsProps {
  setShowSearchScreen: (v: boolean | ((p: boolean) => boolean)) => void;
  showSearchScreen: boolean;
  setShowNavSidebar: (v: boolean | ((p: boolean) => boolean)) => void;
}

/* typed selector keeps useSelector stable */
const selectUser = (s: RootState) => s.session.user;

export function MobileNavbarBtns({
  setShowSearchScreen,
  setShowNavSidebar,
}: MobileNavbarBtnsProps) {
  const target = useCreatePostTarget();
  const user = useAppSelector(selectUser);
  const { openLogin } = useAuthFlow();

  /* one stable handler instead of recreating an arrow every render */
  const toggleSearch = useCallback(
    () => setShowSearchScreen((p) => !p),
    [setShowSearchScreen]
  );

  const toggleSidebar = useCallback(
    () => setShowNavSidebar(true),
    [setShowNavSidebar]
  );

  return (
    <div className="navbar-buttons">
      <div className="logged-out-navbar-left">
        <button
          className="navbar-button"
          aria-label="Toggle navigation sidebar"
          onClick={toggleSidebar}
        >
          <HamburgerMenuIcon />
        </button>

        <NavLink to="/" exact>
          <RandomLogo />
        </NavLink>
      </div>
      {/* Search is always present */}
      <button
        className="navbar-button"
        aria-label="Search"
        onClick={toggleSearch}
      >
        <SearchIcon height="20" width="20" />
      </button>

      {user ? (
        <>
          <NavLink
            to={target}
            className="navbar-button"
            aria-label="Create post"
          >
            <TfiPlus />
          </NavLink>
          <NotificationBell />
        </>
      ) : (
        <button
          className="navbar-login-btn"
          aria-label="Log in"
          onClick={openLogin}
        >
          Log In
        </button>
      )}
    </div>
  );
}
