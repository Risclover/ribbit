import { useRef, useState, useCallback } from "react";
import { LoggedOutDropdownFace } from "./LoggedOutDropdownFace";
import { LoggedOutDropdown } from "./LoggedOutDropdown";
import { useOutsideClick, useFocusTrap } from "@/hooks";
import "./LoggedOutDropdown.css";

export function LoggedOutDropdownWrapper() {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null); // ← correct generic

  const toggleDropdown = useCallback(
    () => setShowDropdown((prev) => !prev),
    []
  );

  useFocusTrap(showDropdown, wrapperRef);
  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  return (
    <div className="logged-out-dropdown-wrapper" ref={wrapperRef}>
      <LoggedOutDropdownFace onClick={toggleDropdown} />
      {showDropdown && (
        <LoggedOutDropdown
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      )}
    </div>
  );
}
