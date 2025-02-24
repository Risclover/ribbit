import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import NavUserDropdownFace from "./NavUserDropdownFace";
import NavUserDropdownBox from "./NavUserDropdownBox";
import "./NavUserDropdown.css";
import { useOutsideClick } from "hooks";

export function NavUserDropdown() {
  const wrapperRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const cuser = useSelector((state) => state.session.user);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  return (
    <div
      className="navbar-user-dropdown"
      onClick={() => setShowDropdown(!showDropdown)}
      ref={wrapperRef}
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
