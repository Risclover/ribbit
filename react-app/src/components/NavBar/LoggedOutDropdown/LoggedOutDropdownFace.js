import { UserIcon } from "assets/icons/UserIcon";
import { useOutsideClick } from "hooks";
import React, { useRef } from "react";
import { TbChevronDown } from "react-icons/tb";

export default function LoggedOutDropdownFace({ onClick }) {
  return (
    <div
      className="logged-out-user-menu"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      <div className="user-icon">
        <UserIcon color="#868686" />
      </div>
      <span className="user-icon-chevron">
        <TbChevronDown />
      </span>
    </div>
  );
}
