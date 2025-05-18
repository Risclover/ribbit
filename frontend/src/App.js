import React, {
  Suspense,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./moment-setup";

/* -------------------------------------------------- */
/*  Features                                          */
/* -------------------------------------------------- */
const Chat = lazyNamed(() => import("@/features"), "Chat");
const ChatMinimized = lazyNamed(() => import("@/features"), "ChatMinimized");
const PreviewSidebar = lazyNamed(
  () => import("@/features"),
  "PreviewCommunitySidebar"
);
const MobileSearchbar = lazyNamed(
  () => import("@/features"),
  "MobileSearchbar"
);
import { LoginSignupModal } from "@/features";

/* -------------------------------------------------- */
/*  Components                                        */
/* -------------------------------------------------- */
const NavSidebar = lazyNamed(() => import("@/components"), "NavSidebar");
const LoggedOutSidebar = lazyNamed(
  () => import("@/components"),
  "LoggedOutSidebar"
);
import {
  NavBar,
  MobileNavBar,
  MobileNavbarDropdown,
  SkipLocation,
} from "@/components";

/* -------------------------------------------------- */
/*  Local hooks, utils, routes                        */
/* -------------------------------------------------- */
import {
  useNotificationsSocket,
  useLeaveLogin,
  useWindowWidth,
  useIsMobile,
  useScrollToTop,
} from "@/hooks";
import {
  getSidebarState,
  setSidebarState,
} from "@/features/Communities/utils/localStorage";
import { lazyNamed } from "@/utils";
import { AppRoutes } from "@/routes";

/* -------------------------------------------------- */
/*  Store thunks                                      */
/* -------------------------------------------------- */
import {
  getCommunities,
  getUsers,
  getCommunitySettings,
  authenticate,
  fetchNotifications,
  getUserChatThreads,
} from "@/store";

/* -------------------------------------------------- */
/*  Context & providers                               */
/* -------------------------------------------------- */
import {
  MetadataProvider,
  PopupProvider,
  PageTitleContext,
  PostFormatContext,
  OpenChatContext,
} from "@/context";

/* -------------------------------------------------- */

function AppProviders({ children }) {
  return (
    <MetadataProvider>
      <PopupProvider>{children}</PopupProvider>
    </MetadataProvider>
  );
}

export default function App() {
  /* ---------- store & router ---------- */
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const location = useLocation();
  const { openChat } = useContext(OpenChatContext);
  useScrollToTop();

  /* ---------- derived flags ---------- */
  const isMobile = useIsMobile();
  const previewPage = location.pathname.endsWith("/style");
  const showLoggedOutSidebar = !user;

  /* ---------- local state ---------- */
  const [loaded, setLoaded] = useState(false);
  const [format, setFormat] = useState("Card");
  const [pageTitle, setPageTitle] = useState("");
  const [pageIcon, setPageIcon] = useState();
  const [showNavSidebar, setShowNavSidebar] = useState(getSidebarState());
  const [showDropdown, setShowDropdown] = useState(false);
  const [minimizeChat, setMinimizeChat] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  /* ---------- sockets ---------- */
  useNotificationsSocket(user);

  /* ---------- data bootstrapping ---------- */
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
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications());
      dispatch(getUserChatThreads());
    }
  }, [user, dispatch]);

  /* ---------- body class for preview page ---------- */
  useEffect(() => {
    document.body.classList.toggle("scoot-over", previewPage);
  }, [previewPage]);

  /* ---------- sidebar toggle handler ---------- */
  const handleToggleSidebar = useCallback(() => {
    setShowNavSidebar((prev) => {
      const next = !prev;
      setSidebarState(next); // persist
      return next;
    });
  }, []);

  /* ---------- navbar memo props ---------- */
  const windowWidth = useWindowWidth(); // custom hook returns innerWidth
  const navBarProps = useMemo(
    () => ({
      showNavSidebar,
      setShowNavSidebar: handleToggleSidebar,
      showDropdown,
      setShowDropdown,
      minimizeChat,
      setMinimizeChat,
      windowWidth,
    }),
    [
      showNavSidebar,
      handleToggleSidebar,
      showDropdown,
      minimizeChat,
      windowWidth,
    ]
  );

  /* ---------- main padding class ---------- */
  const mainClass = useMemo(
    () =>
      showNavSidebar || showLoggedOutSidebar ? "main main-padded" : "main",
    [showNavSidebar, showLoggedOutSidebar]
  );

  /* ---------- Scroll unlock after leaving /login ---------- */
  useLeaveLogin(() => {
    document.body.style.overflow = "";
  });

  /* ---------- render ---------- */
  return (
    <AppProviders>
      <PageTitleContext.Provider
        value={{ pageTitle, setPageTitle, pageIcon, setPageIcon }}
      >
        <PostFormatContext.Provider value={{ format, setFormat }}>
          <Suspense fallback={null}>
            {previewPage && <PreviewSidebar />}
          </Suspense>

          {isMobile ? (
            <MobileNavBar
              openUserDropdown={openUserDropdown}
              setOpenUserDropdown={setOpenUserDropdown}
              showSearchScreen={showSearchScreen}
              setShowSearchScreen={setShowSearchScreen}
            />
          ) : (
            <NavBar {...navBarProps} />
          )}

          <MobileNavbarDropdown
            userImg={user?.profileImg}
            openUserDropdown={openUserDropdown}
            setOpenUserDropdown={setOpenUserDropdown}
          />

          {showSearchScreen && (
            <Suspense fallback={null}>
              <MobileSearchbar
                showSearchScreen={showSearchScreen}
                setShowSearchScreen={setShowSearchScreen}
              />
            </Suspense>
          )}

          <div className={mainClass}>
            <div className="page-content">
              <SkipLocation showNavSidebar={showNavSidebar} />
              <AppRoutes user={user} postType="post" setPostType={() => {}} />
            </div>

            <LoginSignupModal />

            <Suspense fallback={null}>
              {openChat && !minimizeChat && (
                <Chat setMinimizeChat={setMinimizeChat} />
              )}
              {openChat && minimizeChat && (
                <ChatMinimized setMinimizeChat={setMinimizeChat} />
              )}
            </Suspense>

            <Suspense fallback={null}>
              {showLoggedOutSidebar && <LoggedOutSidebar />}
              {user && (
                <NavSidebar
                  showNavSidebar={showNavSidebar}
                  setShowNavSidebar={handleToggleSidebar}
                  setShowDropdown={setShowDropdown}
                />
              )}
            </Suspense>
          </div>
        </PostFormatContext.Provider>
      </PageTitleContext.Provider>
    </AppProviders>
  );
}
