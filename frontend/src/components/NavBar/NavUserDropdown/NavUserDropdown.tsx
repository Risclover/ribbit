import { useState, useRef, KeyboardEvent, MouseEvent } from "react";
import { useAppSelector } from "@/store";
import { NavUserDropdownFace } from "./NavUserDropdownFace";
import { NavUserDropdownBox } from "./NavUserDropdownBox";
import { useOutsideClick, useFocusTrap, useEscapeKey } from "@/hooks";
import { useSkipLocation } from "@/context";
import "./NavUserDropdown.css";

/* ---------- types ---------- */
interface User {
  id: number;
  profileImg: string;
  username: string;
  /* add more fields as needed */
}

export function NavUserDropdown(): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const currentUser = useAppSelector<User | null>(
    (state) => state.session.user
  );

  /* Close when clicking outside */
  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  /* Trap focus inside dropdown when open */
  useFocusTrap(showDropdown, wrapperRef);

  /* Close on Escape */
  useEscapeKey(() => setShowDropdown(false), showDropdown);

  /* Skip-links a11y helper */
  const { setShowLinks } = useSkipLocation();

  /* ---------- handlers ---------- */
  const toggleDropdown = (e?: MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") toggleDropdown(e);
    if (e.key === "Tab") setShowLinks(true);
  };

  /* ---------- render ---------- */
  return (
    <div
      className="navbar-user-dropdown"
      ref={wrapperRef}
      tabIndex={0}
      onClick={toggleDropdown}
      onKeyDown={handleKeyDown}
    >
      <NavUserDropdownFace cuser={currentUser} />
      {showDropdown && currentUser && (
        <NavUserDropdownBox
          cuser={currentUser}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      )}
    </div>
  );
}
