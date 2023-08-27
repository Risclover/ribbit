import React, { useState } from "react";
import "../../CommunityPage.css";
import "./PreviewCommunity.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import PreviewCommunitySidebarAppearance from "./PreviewCommunitySidebarAppearance";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import OutsideClickWarning from "./OutsideClickWarning";
import { Modal } from "../../../../context/Modal";

export default function PreviewCommunitySidebar() {
  const location = useLocation();

  const community = useSelector(
    (state) => state.communities[Number(location.pathname.slice(3, 5))]
  );

  const [showWarning, setShowWarning] = useState(false);
  const [openAppearance, setOpenAppearance] = useState(false);
  const [appearanceSidebar, setAppearanceSidebar] = useState("");

  const appearanceSidebarList = [
    "Color theme",
    "Name & icon",
    "Banner",
    "Menu",
    "Posts",
  ];

  const handleOutsideClick = (e) => {
    setShowWarning(true);
  };

  return (
    <div className="preview-community-sidebar">
      <button className="back-to-community">
        <FaChevronLeft /> Back to community
      </button>
      {!openAppearance && (
        <div className="preview-community-appearance">
          <h1>Appearance</h1>
          {appearanceSidebarList.map((item) => (
            <div
              className="preview-community-appearance-btn"
              onClick={() => {
                setAppearanceSidebar(item);
                setOpenAppearance(true);
              }}
            >
              <span>{item}</span> <FaChevronRight />
            </div>
          ))}
          <button className="reset-to-defaults-btn">Reset to defaults</button>
        </div>
      )}
      {openAppearance && (
        <PreviewCommunitySidebarAppearance
          appearanceSidebar={appearanceSidebar}
          setAppearanceSidebar={setAppearanceSidebar}
          setOpenAppearance={setOpenAppearance}
          community={community}
        />
      )}
      <div
        className="preview-community-prevent-outside-click"
        onClick={handleOutsideClick}
      ></div>

      {showWarning && (
        <Modal
          onClose={() => setShowWarning(false)}
          title="Discard unsaved changes before leaving?"
        >
          <OutsideClickWarning setShowWarning={setShowWarning} />
        </Modal>
      )}
    </div>
  );
}
