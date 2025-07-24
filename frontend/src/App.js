import React, { useState, useEffect, useRef, useContext } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { getComments, useAppDispatch, useAppSelector } from "@/store";
import { AppRoutes } from "@/routes";

import { ScrollToTop } from "./utils";

import { NavBar, NavSidebar, LoggedOutSidebar } from "./components";

import { NotificationsPage } from "./pages";

import { Modal } from "./context";
import {
  Messages,
  Unread,
  Sent,
  Inbox,
  PostRepliesPage,
  Permalink,
  PreviewCommunitySidebar,
  PreviewCommunity,
  UpdateImagePost,
  UpdatePost,
  SignUpForm,
  EditCommunity,
  SearchResultsPosts,
  SearchResultsComments,
  SearchResultsCommunities,
  SearchResultsUsers,
  Chat,
  LoginSignupModal,
} from "./features";

import {
  getUserChatThreads,
  getCommunities,
  authenticate,
  getCurrentUser,
  getUsers,
  getCommunitySettings,
  fetchNotifications,
} from "./store";

import { PostFormatContext, PageTitleContext } from "./context";
import { MetadataProvider } from "@/context";
import { PopupProvider } from "@/context";
import { ProtectedRoute } from "@/components";
import ChatMinimized from "@/features/Chat/components/ChatWindow/ChatMinimized";
import { ImagePage } from "pages/ImagePage";
import {
  getSidebarState,
  setSidebarState,
} from "@/features/Communities/utils/localStorage";
import { ScrollProvider } from "@/context/ScrollContext";
import { SkipLocation } from "@/components/SkipLocation/SkipLocation";
import { useLeaveLogin } from "hooks/useLeaveLogin";
import { useNotificationsSocket } from "hooks/useNotificationsSocket";
import "./moment-setup.js";
import { LoggedOutNavBar } from "components/NavBar/MobileNavbar";
import { useIsMobile } from "hooks/useIsMobile";
import { MobileNavbarDropdown } from "components/NavBar/MobileNavbar/MobileNavbarDropdown";
import { MobileSearchbar } from "features/NewSearch/components/MobileSearchbar/MobileSearchbar";
import { MobileNavBar } from "components/NavBar/MobileNavbar/MobileNavbar";
import { useOpenChat } from "context/OpenChatContext";
import { useIsSmallScreen, useScrollToTop } from "./hooks";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.session.user);
  const location = useLocation();
  const searchbarRef = useRef();
  const users = useAppSelector((state) => state.users);
  const background = location.state && location.state.background;
  const comments = useAppSelector((state) => Object.values(state.comments.comments));
  const communities = useAppSelector((state) =>
    Object.values(state.communities.communities)
  );
  const { openChat } = useOpenChat();
  const communitiesLoaded = useAppSelector((state) => state.communities.loaded);

  const [loaded, setLoaded] = useState(false);
  const [, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustQuery, setAdjustQuery] = useState(false);
  const [postType, setPostType] = useState("post");
  const [format, setFormat] = useState("Card");
  const [pageTitle, setPageTitle] = useState("testing");
  const [pageIcon, setPageIcon] = useState();
  const [showNavSidebar, setShowNavSidebar] = useState(() => getSidebarState());
  const [showLoggedOutSidebar, setShowLoggedOutSidebar] = useState();
  const [userCommunities, setUserCommunities] = useState([]);
  const [previewPage, setPreviewPage] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [minimizeChat, setMinimizeChat] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  useNotificationsSocket(user);

  useEffect(() => {
    if (screenWidth <= 1250) {
      setShowNavSidebar(false);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (location.pathname.endsWith("/style")) {
      document.body.classList.add("scoot-over");
      setPreviewPage(true);
    } else {
      document.body.classList.remove("scoot-over");
      setPreviewPage(false);
    }
  }, [location]);

  useEffect(() => {
    document.documentElement.style.setProperty("--current-color-theme", "dark");
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!communitiesLoaded) dispatch(getCommunities());
    dispatch(getUsers());
    if (comments.length === 0) dispatch(getComments());
    dispatch(getCommunitySettings());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications());
      dispatch(getUserChatThreads());
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setShowLoggedOutSidebar(true);
    } else {
      setShowLoggedOutSidebar(false);
    }
  }, [user]);

  useEffect(() => {
    setSidebarState(showNavSidebar);
  }, [showNavSidebar]);

  useLeaveLogin(() => {
    // This will run exactly once, the moment you leave /login:
    document.body.style.overflow = "";
    // or your own custom cleanup, e.g. unlockScroll();
  });

  const navBarProps = {
    adjustQuery: adjustQuery,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    setShowNavSidebar: setShowNavSidebar,
    showNavSidebar: showNavSidebar,
    showDropdown: showDropdown,
    setShowDropdown: setShowDropdown,
    searchbarRef: searchbarRef,
    screenWidth: screenWidth,
    setScreenWidth: setScreenWidth,
    minimizeChat: minimizeChat,
    setMinimizeChat: setMinimizeChat,
  };

  const mobileNavBarProps = {
    openUserDropdown: openUserDropdown,
    setOpenUserDropdown: setOpenUserDropdown,
  };

  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();

  useScrollToTop();

  return (
    <MetadataProvider>
      <PopupProvider>
        <PostFormatContext.Provider value={{ format, setFormat }}>
          {previewPage && <PreviewCommunitySidebar />}
          {isSmall ? (
            <MobileNavBar
              setOpenUserDropdown={setOpenUserDropdown}
              openUserDropdown={openUserDropdown}
              showSearchScreen={showSearchScreen}
              setShowSearchScreen={setShowSearchScreen}
              showNavSidebar={showNavSidebar}
              setShowNavSidebar={setShowNavSidebar}
            />
          ) : (
            <NavBar {...navBarProps} />
          )}

          <MobileNavbarDropdown
            userImg={user?.profileImg}
            setOpenUserDropdown={setOpenUserDropdown}
            openUserDropdown={openUserDropdown}
          />
          {showSearchScreen && (
            <MobileSearchbar
              showSearchScreen={showSearchScreen}
              setShowSearchScreen={setShowSearchScreen}
            />
          )}
          <div
            className={
              showNavSidebar
                ? "main main-padded"
                : showLoggedOutSidebar
                ? "main main-padded"
                : "main"
            }
          >
            <div className="page-content">
              <SkipLocation showNavSidebar={showNavSidebar} />
              <AppRoutes
                user={user}
                postType={postType}
                setPostType={setPostType}
                searchbarRef={searchbarRef}
              />
            </div>
            <LoginSignupModal />
            {openChat && !minimizeChat && (
              <Chat setMinimizeChat={setMinimizeChat} />
            )}

            {openChat && minimizeChat && (
              <ChatMinimized setMinimizeChat={setMinimizeChat} />
            )}

            {!user && (
              <LoggedOutSidebar
                setShowSignupForm={setShowSignupForm}
                showLoggedOutSidebar={showLoggedOutSidebar}
              />
            )}

            {user && (
              <NavSidebar
                setShowNavSidebar={setShowNavSidebar}
                showNavSidebar={showNavSidebar}
                setShowDropdown={setShowDropdown}
              />
            )}
          </div>
        </PostFormatContext.Provider>
      </PopupProvider>
    </MetadataProvider>
  );
}

export default App;
