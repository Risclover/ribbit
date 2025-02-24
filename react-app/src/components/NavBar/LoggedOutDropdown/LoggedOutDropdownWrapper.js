import React, { useRef, useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { UserIcon } from "assets/icons/UserIcon";
import "./LoggedOutDropdown.css";
import LoggedOutDropdownFace from "./LoggedOutDropdownFace";
import { LoggedOutDropdown } from "./LoggedOutDropdown";
import "./LoggedOutDropdown.css";
import { useOutsideClick } from "hooks";

export function LoggedOutDropdownWrapper() {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

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
