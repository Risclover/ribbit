import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import NavUserDropdownFace from "./NavUserDropdownFace";
import NavUserDropdownBox from "./NavUserDropdownBox";
import "./NavUserDropdown.css";

export function NavUserDropdown() {
  const wrapperRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const cuser = useSelector((state) => state.session.user);

  return (
    <div
      className="navbar-user-dropdown"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <NavUserDropdownFace cuser={cuser} />
      {showDropdown && (
        <NavUserDropdownBox
          setShowDropdown={setShowDropdown}
          wrapperRef={wrapperRef}
          cuser={cuser}
        />
      )}
    </div>
  );
}
