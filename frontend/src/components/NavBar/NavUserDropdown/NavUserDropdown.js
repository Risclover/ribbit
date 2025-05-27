import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavUserDropdownFace } from "./NavUserDropdownFace";
import { NavUserDropdownBox } from "./NavUserDropdownBox";
import "./NavUserDropdown.css";
import { useOutsideClick } from "@/hooks";
import { useSkipLocation } from "@/context/SkipLocationContext";
import { useFocusTrap } from "hooks";

export function NavUserDropdown() {
  const wrapperRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const cuser = useSelector((state) => state.session.user);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  const { showLinks, setShowLinks } = useSkipLocation();
  useFocusTrap(showDropdown, wrapperRef);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setShowDropdown(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowDropdown]);
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

        if (e.key === "Tab") {
          setShowLinks(true);
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
