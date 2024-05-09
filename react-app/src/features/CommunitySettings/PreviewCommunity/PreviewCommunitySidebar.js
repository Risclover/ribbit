import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { getCommunitySettings, resetToDefault, getCommunities } from "@/store";
import { Modal } from "@/context";
import { PreviewCommunitySidebarAppearance, OutsideClickWarning } from "../..";

import "./PreviewCommunity.css";
import { NavLink } from "react-router-dom";

export function PreviewCommunitySidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  const fullURL = window.location.href;
  const communityName = fullURL.split("/")[4];
  const communities = useSelector((state) => Object.values(state.communities));

  const communityId = communities?.find(
    (community) => community.name === communityName
  )?.id;
  const user = useSelector((state) => state.session.user);
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  const community = communities?.find(
    (community) => community.name === communityName
  );
  const [preview, setPreview] = useState(
    community?.communitySettings[community?.id].backgroundImg
  );
  const [showWarning, setShowWarning] = useState(false);
  const [openAppearance, setOpenAppearance] = useState(false);
  const [appearanceSidebar, setAppearanceSidebar] = useState("");
  const [base, setBase] = useState(
    community?.communitySettings[community?.id]?.baseColor
  );
  const [highlight, setHighlight] = useState(
    community?.communitySettings[community?.id]?.highlight
  );
  const [bodyBg, setBodyBg] = useState(
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
      "--preview-community-color-theme-bodybg",
      bodyBg
    );

    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img",
      backgroundImg
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
        `${bodyBg} url(${backgroundImg}) no-repeat center / cover`
      );
    } else if (backgroundImgFormat === "tile") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${backgroundImg}) repeat center top`
      );
    } else if (backgroundImgFormat === "center") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${backgroundImg}) no-repeat center top`
      );
    }
  }, [
    community?.communitySettings[community?.id],
    base,
    highlight,
    bodyBg,
    backgroundImg,
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
              key={item}
            >
              <span>{item}</span> <FaChevronRight />
            </div>
          ))}
          <button
            className="reset-to-defaults-btn"
            onClick={handleDefaultReset}
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
          bodyBg={bodyBg}
          setBodyBg={setBodyBg}
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
          <OutsideClickWarning setShowWarning={setShowWarning} />
        </Modal>
      )}
    </div>
  );
}
