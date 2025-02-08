// src/features/CommunitySettings/components/PreviewCommunitySidebar.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { getCommunities } from "@/store";
import { Modal } from "@/context";
import { PreviewCommunitySidebarAppearance, OutsideClickWarning } from "..";
import { ResetToDefaultsWarning } from "./ResetToDefaultsWarning";
import { useCommunitySettingsState } from "../../hooks";
import "./PreviewCommunity.css";

export function PreviewCommunitySidebar() {
  const dispatch = useDispatch();
  const history = useHistory();

  // We can parse out the community name from React Router or window.location
  const fullURL = window.location.href;
  const communityName = fullURL.split("/")[4];

  const communities = useSelector((state) => Object.values(state.communities));
  const community = communities?.find((c) => c.name === communityName);

  // Initiate custom hook for local states & actions
  const settingsState = useCommunitySettingsState(community);
  const { handleResetToDefault } = settingsState; // destructuring only what we need at the top level

  // Local UI states
  const [showWarning, setShowWarning] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [openAppearance, setOpenAppearance] = useState(false);
  const [appearanceSidebar, setAppearanceSidebar] = useState("");

  const appearanceSidebarList = [
    "Color theme",
    "Name & icon",
    "Banner",
    "Menu",
    "Posts",
  ];

  const handleOutsideClick = () => {
    // If user clicks outside, warn them about unsaved changes
    setShowWarning(true);
  };

  return (
    <div className="preview-community-sidebar">
      <NavLink to={`/c/${communityName}`}>
        <FaChevronLeft /> Back to community
      </NavLink>

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
              key={uuidv4()}
            >
              <span>{item}</span> <FaChevronRight />
            </div>
          ))}
          <button
            className="reset-to-defaults-btn"
            onClick={() => setShowResetWarning(true)}
          >
            Reset to defaults
          </button>
        </div>
      )}

      {openAppearance && (
        <PreviewCommunitySidebarAppearance
          appearanceSidebar={appearanceSidebar}
          setAppearanceSidebar={setAppearanceSidebar}
          setOpenAppearance={setOpenAppearance}
          settingsState={settingsState}
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
          open={() => setShowWarning(true)}
        >
          <OutsideClickWarning
            community={community}
            setShowWarning={setShowWarning}
          />
        </Modal>
      )}

      {showResetWarning && (
        <Modal
          onClose={() => setShowResetWarning(false)}
          title="Reset to default styling?"
          open={() => setShowResetWarning(true)}
        >
          <ResetToDefaultsWarning
            community={community}
            setShowResetWarning={setShowResetWarning}
            handleResetToDefault={handleResetToDefault}
          />
        </Modal>
      )}
    </div>
  );
}
