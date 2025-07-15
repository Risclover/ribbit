import { TbChevronDown } from "react-icons/tb";
import { UserIcon } from "@/assets/icons/UserIcon";

interface LoggedOutDropdownFaceProps {
  onClick: () => void;
}

export function LoggedOutDropdownFace({ onClick }: LoggedOutDropdownFaceProps) {
  return (
    <button
      type="button"
      className="logged-out-user-menu"
      aria-label="Open user menu"
      onClick={onClick}
    >
      <span className="user-icon">
        <UserIcon color="#868686" />
      </span>
      <span className="user-icon-chevron">
        <TbChevronDown />
      </span>
    </button>
  );
}
