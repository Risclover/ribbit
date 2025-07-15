import { useCallback } from "react";
import { TfiPlus } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

import { SearchIcon } from "@/assets";
import { useAuthFlow } from "@/context";
import { NotificationBell } from "@/features";
import { useCreatePostTarget } from "@/hooks";
import { useAppSelector, RootState } from "@/store";

interface MobileNavbarBtnsProps {
  setShowSearchScreen: (v: boolean | ((p: boolean) => boolean)) => void;
  showSearchScreen: boolean;
}

/* typed selector keeps useSelector stable */
const selectUser = (s: RootState) => s.session.user;

export function MobileNavbarBtns({
  setShowSearchScreen,
}: MobileNavbarBtnsProps) {
  const target = useCreatePostTarget();
  const user = useAppSelector(selectUser);
  const { openLogin } = useAuthFlow();

  /* one stable handler instead of recreating an arrow every render */
  const toggleSearch = useCallback(
    () => setShowSearchScreen((p) => !p),
    [setShowSearchScreen]
  );

  return (
    <div className="navbar-buttons">
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
