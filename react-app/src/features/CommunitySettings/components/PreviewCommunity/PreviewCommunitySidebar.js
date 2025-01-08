import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { getCommunitySettings, resetToDefault, getCommunities } from "@/store";
import { Modal } from "@/context";
import { PreviewCommunitySidebarAppearance, OutsideClickWarning } from "..";
import { ResetToDefaultsWarning } from "./ResetToDefaultsWarning";
import "./PreviewCommunity.css";
import { v4 as uuidv4 } from "uuid";

export function PreviewCommunitySidebar() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  const fullURL = window.location.href;
  const communityName = fullURL.split("/")[4];
  const communities = useSelector((state) => Object.values(state.communities));

  const community = communities?.find(
    (community) => community.name === communityName
  );
  const [preview, setPreview] = useState(
    community?.communitySettings[community?.id]?.backgroundImg || ""
  );
  const [showWarning, setShowWarning] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [openAppearance, setOpenAppearance] = useState(false);
  const [appearanceSidebar, setAppearanceSidebar] = useState("");
  const [base, setBase] = useState(
    community?.communitySettings[community?.id]?.baseColor
  );
  const [highlight, setHighlight] = useState(
    community?.communitySettings[community?.id]?.highlight
  );
  const [bgColor, setBgColor] = useState(
    community?.communitySettings[community?.id]?.bgColor
  );
  const [backgroundImg, setBackgroundImg] = useState(
    community?.communitySettings[community?.id]?.backgroundImg
  );
  const [backgroundImgFormat, setBackgroundImgFormat] = useState(
    community?.communitySettings[community?.id]?.backgroundImgFormat
  );
  const [communityIcon, setCommunityIcon] = useState(
    community?.communitySettings[community?.id]?.communityIcon
  );
  const [hideCommunityIcon, setHideCommunityIcon] = useState(
    community?.communitySettings[community?.id]?.hideCommunityIcon
  );
  const [nameFormat, setNameFormat] = useState(
    community?.communitySettings[community?.id]?.nameFormat
  );
  const [bannerHeight, setBannerHeight] = useState(
    community?.communitySettings[community?.id]?.bannerHeight
  );
  const [bannerHeight2, setBannerHeight2] = useState(
    community?.communitySettings[community?.id]?.bannerHeight
  );
  const [bannerColor, setBannerColor] = useState(
    community?.communitySettings[community?.id]?.bannerColor
  );
  const [bannerImg, setBannerImg] = useState(
    community?.communitySettings[community?.id]?.bannerImg
  );
  const [bannerImgFormat, setBannerImgFormat] = useState(
    community?.communitySettings[community.id]?.bannerImgFormat
  );
  const [customBannerColor, setCustomBannerColor] = useState(
    community?.communitySettings[community?.id]?.customBannerColor
  );

  console.log("COMMUNITY:", community);

  const appearanceSidebarList = [
    "Color theme",
    "Name & icon",
    "Banner",
    "Menu",
    "Posts",
  ];

  useEffect(() => {
    dispatch(getCommunitySettings(community?.id));
  }, [dispatch]);

  const handleOutsideClick = (e) => {
    setShowWarning(true);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--preview-community-color-theme-base",
      base
    );

    document.documentElement.style.setProperty(
      "--preview-community-color-theme-highlight",
      highlight
    );

    document.documentElement.style.setProperty(
      "--preview-community-color-theme-bgColor",
      bgColor
    );

    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img-format",
      backgroundImgFormat
    );

    document.documentElement.style.setProperty(
      "--preview-community-banner-height",
      bannerHeight
    );

    document.documentElement.style.setProperty(
      "--preview-community-banner-color",
      customBannerColor === true ? bannerColor : base
    );

    document.documentElement.style.setProperty(
      "--preview-community-banner-img",
      `url(${bannerImg})`
    );

    if (backgroundImgFormat === "fill") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bgColor} url(${preview}) no-repeat center / cover`
      );
    } else if (backgroundImgFormat === "tile") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bgColor} url(${preview}) repeat center top`
      );
    } else if (backgroundImgFormat === "center") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bgColor} url(${preview}) no-repeat center top`
      );
    }
  }, [
    community?.communitySettings[community?.id],
    base,
    highlight,
    bgColor,
    backgroundImgFormat,
    bannerHeight,
    bannerColor,
    bannerImg,
    preview,
  ]);

  const handleDefaultReset = () => {
    dispatch(resetToDefault(community?.id));
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community?.id));
    history.push(`/c/${community?.name}`);
  };

  // if (!communityName) return null;

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
          community={community}
          base={base}
          setBase={setBase}
          highlight={highlight}
          setHighlight={setHighlight}
          bgColor={bgColor}
          setBgColor={setBgColor}
          backgroundImg={backgroundImg}
          setBackgroundImg={setBackgroundImg}
          nameFormat={nameFormat}
          setNameFormat={setNameFormat}
          backgroundImgFormat={backgroundImgFormat}
          setBackgroundImgFormat={setBackgroundImgFormat}
          bannerHeight={bannerHeight}
          setBannerHeight={setBannerHeight}
          bannerHeight2={bannerHeight2}
          setBannerHeight2={setBannerHeight2}
          bannerColor={bannerColor}
          setBannerColor={setBannerColor}
          customBannerColor={customBannerColor}
          setCustomBannerColor={setCustomBannerColor}
          bannerImg={bannerImg}
          setBannerImg={setBannerImg}
          bannerImgFormat={bannerImgFormat}
          setBannerImgFormat={setBannerImgFormat}
          communityIcon={communityIcon}
          setCommunityIcon={setCommunityIcon}
          hideCommunityIcon={hideCommunityIcon}
          setHideCommunityIcon={setHideCommunityIcon}
          preview={preview}
          setPreview={setPreview}
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
          />
        </Modal>
      )}
    </div>
  );
}
