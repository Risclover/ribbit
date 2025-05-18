import React from "react";
import { TbChevronDown } from "react-icons/tb";
import { UserIcon } from "@/assets/icons/UserIcon";

export function LoggedOutDropdownFace({ onClick }) {
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
