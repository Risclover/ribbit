import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import SkipLocation from "components/SkipLocation/SkipLocation";
import { AppRoutes } from "routes/AppRoutes";
import { useLeaveLogin } from "hooks/useLeaveLogin";
import { useNotificationsSocket } from "hooks/useNotificationsSocket";
import "./moment-setup";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const location = useLocation();
  const searchbarRef = useRef();
  const users = useSelector((state) => state.users);
  const background = location.state && location.state.background;

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
  const [openChat, setOpenChat] = useState(false);
  const [userCommunities, setUserCommunities] = useState([]);
  const [previewPage, setPreviewPage] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [minimizeChat, setMinimizeChat] = useState(false);

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
    dispatch(getCommunities());
    dispatch(getUsers());
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

  if (!loaded) {
    return null;
  }

  const navBarProps = {
    adjustQuery: adjustQuery,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    setShowNavSidebar: setShowNavSidebar,
    showNavSidebar: showNavSidebar,
    showDropdown: showDropdown,
    setShowDropdown: setShowDropdown,
    setOpenChat: setOpenChat,
    openChat: openChat,
    searchbarRef: searchbarRef,
    screenWidth: screenWidth,
    setScreenWidth: setScreenWidth,
    minimizeChat: minimizeChat,
    setMinimizeChat: setMinimizeChat,
  };

  return (
    <MetadataProvider>
      <PopupProvider>
        <PageTitleContext.Provider
          value={{ pageTitle, setPageTitle, pageIcon, setPageIcon }}
        >
          <PostFormatContext.Provider value={{ format, setFormat }}>
            <ScrollToTop />
            {previewPage && <PreviewCommunitySidebar />}
            <NavBar {...navBarProps} />
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
                  setOpenChat={setOpenChat}
                />
              </div>
              <LoginSignupModal />
              {openChat && !minimizeChat && (
                <Chat
                  setOpenChat={setOpenChat}
                  openChat={openChat}
                  setMinimizeChat={setMinimizeChat}
                />
              )}

              {openChat && minimizeChat && (
                <ChatMinimized
                  setOpenChat={setOpenChat}
                  setMinimizeChat={setMinimizeChat}
                />
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
        </PageTitleContext.Provider>
      </PopupProvider>
    </MetadataProvider>
  );
}

export default App;
