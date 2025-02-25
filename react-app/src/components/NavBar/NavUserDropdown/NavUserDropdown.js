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
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setShowDropdown(!showDropdown);
        }
      }}
    >
      <NavUserDropdownFace
        cuser={cuser}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
      />
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
