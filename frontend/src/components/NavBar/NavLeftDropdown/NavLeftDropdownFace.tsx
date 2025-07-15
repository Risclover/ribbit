import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  CSSProperties,
  JSX,
} from "react";
import { VscChevronDown } from "react-icons/vsc";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { usePageTitle } from "@/context";
import { useIsSmallScreen, useOutsideClick, useWindowWidth } from "@/hooks";
import { NavLeftDropdown } from "./NavLeftDropdown";
import "react-loading-skeleton/dist/skeleton.css";
import "./NavLeftDropdown.css";

/* ---------- props ---------- */

interface NavLeftDropdownFaceProps {
  setShowNavSidebar: (open: boolean) => void;
  showNavSidebar: boolean;
  showDropdown: boolean;
  setShowDropdown: (open: boolean) => void;
}

export function NavLeftDropdownFace({
  setShowNavSidebar,
  showNavSidebar,
  showDropdown,
  setShowDropdown,
}: NavLeftDropdownFaceProps): JSX.Element {
  const { windowWidth, setWindowWidth } = useWindowWidth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { pageTitle, pageIcon } = usePageTitle();
  const [showIcon, setShowIcon] = useState(false);

  /* -------- resize listener -------- */
  useEffect(() => {
    const BREAKPOINT = 1250; // sidebar appears only above this
    if (showNavSidebar && windowWidth <= BREAKPOINT) {
      setShowNavSidebar(false); // ① close it
      setShowDropdown(false); // ② (optional) also collapse the menu
    }
  }, [windowWidth, showNavSidebar, setShowNavSidebar, setShowDropdown]);

  /* -------- keep local `showIcon` in sync -------- */
  useEffect(() => setShowIcon(showDropdown), [showDropdown]);

  useEffect(() => {
    if (showNavSidebar) setShowIcon(false);
  }, [showNavSidebar]);

  /* -------- close on outside click -------- */
  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  /* -------- helpers -------- */
  const toggleDropdown = () =>
    !showNavSidebar && setShowDropdown(!showDropdown);

  const faceLeftStyle: CSSProperties = {
    cursor: showNavSidebar && !showIcon ? "default" : undefined,
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") toggleDropdown();
  };

  const handleSidebarKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") setShowNavSidebar(true);
  };

  return (
    <div
      className="nav-left-dropdown-wrapper"
      tabIndex={!showNavSidebar ? 0 : -1}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      {/* clickable face */}
      <div
        className={`nav-left-dropdown-face ${
          !showNavSidebar && showIcon
            ? " plus-border"
            : showNavSidebar && !showIcon
            ? " dropdown-disabled"
            : ""
        }`}
        onClick={toggleDropdown}
      >
        {/* first 2/3rds: title button */}
        <button
          className="nav-left-dropdown-face-left"
          tabIndex={-1}
          style={faceLeftStyle}
        >
          <div className="nav-left-dropdown-face-title">
            {pageIcon}
            {windowWidth > 996 && pageTitle}
          </div>

          {!showNavSidebar && (
            <span className="nav-left-dropdown-arrow">
              <VscChevronDown />
            </span>
          )}
        </button>

        {/* sidebar icon (right-hand one-third) */}
        {showIcon && (
          <div
            className="nav-left-dropdown-face-sidebar-icon"
            tabIndex={0}
            onKeyDown={handleSidebarKey}
            onClick={() => setShowNavSidebar(true)}
            role="button"
            aria-label="Open navigation sidebar"
          >
            <BsReverseLayoutTextSidebarReverse />
          </div>
        )}
      </div>

      {/* dropdown panel */}
      {showDropdown && (
        <div className="nav-left-dropdown">
          <NavLeftDropdown
            setShowDropdown={setShowDropdown}
            setShowIcon={setShowIcon}
            setShowNavSidebar={setShowNavSidebar}
          />
        </div>
      )}
    </div>
  );
}
