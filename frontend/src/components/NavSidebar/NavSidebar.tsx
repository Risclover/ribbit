import {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { TfiClose } from "react-icons/tfi";
import { useAppDispatch } from "@/store";
import {
  getFavoriteCommunities,
  getFavoriteUsers,
  getFollowers,
  getSubscriptions,
} from "@/store";
import { NavLeftDropdown } from "@/components";
import { useFocusTrap, useOutsideClick, useScrollLock } from "@/hooks";
import { useIsSmallScreen, useIsMobile } from "hooks"; // ← simple width listeners
import "./NavSidebar.css";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface NavSidebarProps {
  showNavSidebar: boolean;
  setShowNavSidebar: Dispatch<SetStateAction<boolean>>;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function NavSidebar({
  showNavSidebar,
  setShowNavSidebar,
  setShowDropdown,
}: NavSidebarProps) {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useIsSmallScreen(768);

  /* ----------  Click outside closes the sidebar  ---------- */
  useOutsideClick(
    wrapperRef,
    () => setShowNavSidebar(false),
    showNavSidebar && isSmall
  );

  // local state for the “hamburger ↔ close” icon shown in <NavLeftDropdown>
  const [showIcon, setShowIcon] = useState(false);

  const isMobile = useIsMobile(); // viewport ≤ 480 px

  /* ----------  Fetch user-specific data once  ---------- */
  useEffect(() => {
    dispatch(getFavoriteCommunities());
    dispatch(getFavoriteUsers());
    dispatch(getFollowers());
    dispatch(getSubscriptions());
  }, [dispatch]);

  /* ----------  Escape key closes the sidebar  ---------- */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowNavSidebar(false);
    if (showNavSidebar) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showNavSidebar, setShowNavSidebar]);

  useScrollLock(showNavSidebar, isSmall);
  useFocusTrap(showNavSidebar, wrapperRef, isSmall);

  /* ----------  Render ---------- */
  return (
    <>
      {showNavSidebar && (isSmall || isMobile) && (
        <div className="auth-modal-background" />
      )}

      {showNavSidebar && (
        <div className="nav-sidebar-container" ref={wrapperRef}>
          {/* Close button is hidden on extra-small screens (uses system back-gesture) */}
          {!isSmall && (
            <div className="nav-sidebar-top" id="side-navigation">
              <button
                aria-label="Close navigation sidebar"
                className="close-nav-sidebar-btn"
                onClick={() => {
                  setShowNavSidebar(false);
                  setShowIcon(false);
                }}
              >
                <TfiClose />
              </button>
            </div>
          )}

          <div className="nav-left-normal">
            <NavLeftDropdown
              setShowIcon={setShowIcon}
              setShowDropdown={setShowDropdown}
              setShowNavSidebar={setShowNavSidebar}
            />
          </div>
        </div>
      )}
    </>
  );
}
