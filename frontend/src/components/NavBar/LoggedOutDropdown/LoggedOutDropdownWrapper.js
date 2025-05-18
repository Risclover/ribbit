import React, { useRef, useState } from "react";
import { LoggedOutDropdownFace } from "./LoggedOutDropdownFace";
import { LoggedOutDropdown } from "./LoggedOutDropdown";
import { useOutsideClick, useFocusTrap } from "@/hooks";
import "./LoggedOutDropdown.css";

export function LoggedOutDropdownWrapper() {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  useFocusTrap(showDropdown, wrapperRef);
  useOutsideClick(wrapperRef, () => setShowDropdown(false));
  return (
    <div className="logged-out-dropdown-wrapper" ref={wrapperRef}>
      <LoggedOutDropdownFace onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <LoggedOutDropdown setShowDropdown={setShowDropdown} />
      )}{" "}
    </div>
  );
}
