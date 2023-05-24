import React, { useState } from "react";
import "./NavSidebar.css";
import { TfiClose } from "react-icons/tfi";
import NavLeftDropdown from "../../components/NavBar/NavLeftDropdown/NavLeftDropdown";

export default function NavSidebar({
  setShowNavSidebar,
  showNavSidebar,
  setNormalDropdown,
}) {
  const [showIcon, setShowIcon] = useState(true);

  return (
    <>
      {showNavSidebar && (
        <div className="nav-sidebar-container">
          <div className="nav-sidebar-top">
            <button
              className="close-nav-sidebar-btn"
              onClick={() => {
                setShowNavSidebar(false);
                setShowIcon(false);
                setNormalDropdown(true);
              }}
            >
              <TfiClose />
            </button>
          </div>
          <div className="nav-left-normal">
            <NavLeftDropdown
              mode="sidebar"
              showIcon={showIcon}
              setShowIcon={setShowIcon}
            />
          </div>
        </div>
      )}
    </>
  );
}
