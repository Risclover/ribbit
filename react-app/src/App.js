import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ScrollToTop } from "./utils";

import {
  SinglePostPage,
  CommunityPage,
  EditProfile,
  UserProfile,
  CommunitiesDirectory,
  SingleImagePage,
} from "./pages";

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
  AllPostsFeed,
  HomepageFeed,
  SignUpForm,
  EditCommunity,
  Notifications,
  SearchResultsPosts,
  SearchResultsComments,
  SearchResultsCommunities,
  SearchResultsUsers,
  ChatWindow,
} from "./features";
import { NavBar, NavSidebar, LoggedOutSidebar } from "./layouts";

import { getUserChatThreads, getCommunities, authenticate } from "./store";

import {
  PostFormatContext,
  PageTitleContext,
} from "./context";
import { CreatePostPage } from "./pages/CreatePostPage";
import { MetadataProvider } from "./context/Metadata";
import Chat from "features/Chat/components/ChatWindow/Chat";
import { PopupProvider } from "context/Popup";
import { ProtectedRoute } from "components";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const location = useLocation();
  const searchbarRef = useRef();

  const background = location.state && location.state.background;

  // const communities = useSelector((state) => state.communities);
  // const chatThreads = useSelector((state) => Object.values(state.chatThreads));

  const [loaded, setLoaded] = useState(false);
  const [, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustQuery, setAdjustQuery] = useState(false);
  const [postType, setPostType] = useState("post");
  const [format, setFormat] = useState("Card");
  const [pageTitle, setPageTitle] = useState();
  const [pageIcon, setPageIcon] = useState();
  const [showNavSidebar, setShowNavSidebar] = useState(false);
  const [showLoggedOutSidebar, setShowLoggedOutSidebar] = useState();
  const [openChat, setOpenChat] = useState(false);
  const [userCommunities, setUserCommunities] = useState([]);
  const [previewPage, setPreviewPage] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);

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
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserChatThreads());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      setShowLoggedOutSidebar(true);
    } else {
      setShowLoggedOutSidebar(false);
    }
  }, [user]);

  // useEffect(() => {
  //   const userComs = [];
  //   for (let community in communities) {
  //     if (communities[community].communityOwner?.id === user?.id) {
  //       userComs.push(communities[community]);
  //     }
  //   }

  //   setUserCommunities(userComs);
  // }, [communities]);

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
            <NavBar {...navBarProps} />{" "}
            <div
              className={
                showNavSidebar
                  ? "main main-padded"
                  : showLoggedOutSidebar
                  ? "main main-padded"
                  : "main"
              }
            >
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

              {openChat && (
                <Chat setOpenChat={setOpenChat} openChat={openChat} />
              )}

              <Switch>
                {user ? (
                  <Route path="/" exact={true}>
                    <HomepageFeed />
                  </Route>
                ) : (
                  <Route path="/" exact={true}>
                    <AllPostsFeed />
                  </Route>
                )}

                <Route path="/home" exact={true}>
                  <HomepageFeed />
                </Route>

                <Route path="/login">
                  <ProtectedRoute />
                </Route>

                <Route path="/signup">
                  {showSignupForm && (
                    <Modal
                      title="Sign Up"
                      onClose={() => setShowSignupForm(false)}
                      open={() => setShowSignupForm(true)}
                    >
                      <SignUpForm
                        showSignupForm={showSignupForm}
                        setShowLoginForm={setShowLoginForm}
                        setShowSignupForm={setShowSignupForm}
                      />
                    </Modal>
                  )}
                </Route>

                <Route path="/c/all" exact={true}>
                  <AllPostsFeed />
                </Route>

                <ProtectedRoute path="/submit" exact={true}>
                  <CreatePostPage
                    postType={postType}
                    setPostType={setPostType}
                    val="post"
                  />
                </ProtectedRoute>

                <ProtectedRoute path="/c/submit/image" exact={true}>
                  <CreatePostPage
                    postType={postType}
                    setPostType={setPostType}
                    val="image"
                  />
                </ProtectedRoute>

                <ProtectedRoute path="/c/submit/url" exact={true}>
                  <CreatePostPage
                    postType={postType}
                    setPostType={setPostType}
                    val="link"
                  />
                </ProtectedRoute>

                <ProtectedRoute path="/c/:communityName/submit" exact={true}>
                  <CreatePostPage
                    postType={postType}
                    setPostType={setPostType}
                    val="post"
                  />
                </ProtectedRoute>

                <ProtectedRoute
                  path="/c/:communityName/submit/image"
                  exact={true}
                >
                  <CreatePostPage
                    postType={postType}
                    setPostType={setPostType}
                    val="image"
                  />
                </ProtectedRoute>

                <ProtectedRoute
                  path="/c/:communityName/submit/url"
                  exact={true}
                >
                  <CreatePostPage
                    postType={postType}
                    setPostType={setPostType}
                    val="link"
                  />
                </ProtectedRoute>

                <Route path="/posts/:postId" exact={true}>
                  <SinglePostPage />
                </Route>

                <Route path="/images/:postId" exact={true}>
                  <SingleImagePage />
                </Route>

                <Route path="/directory" exact={true}>
                  <CommunitiesDirectory />
                </Route>

                <ProtectedRoute path="/message/messages" exact={true}>
                  <Messages />
                </ProtectedRoute>

                <ProtectedRoute path="/message/unread" exact={true}>
                  <Unread />
                </ProtectedRoute>

                <ProtectedRoute path="/message/sent" exact={true}>
                  <Sent />
                </ProtectedRoute>

                <ProtectedRoute path="/message/inbox" exact={true}>
                  <Inbox />
                </ProtectedRoute>

                <ProtectedRoute path="/message/selfreply" exact={true}>
                  <PostRepliesPage />
                </ProtectedRoute>

                <ProtectedRoute path="/message/messages/:threadId" exact={true}>
                  <Permalink />
                </ProtectedRoute>

                <ProtectedRoute path="/posts/:postId/edit" exact={true}>
                  <UpdatePost />
                </ProtectedRoute>

                <Route path="/c/:communityName" exact={true}>
                  <CommunityPage />
                </Route>

                <ProtectedRoute path="/c/:communityName/style" exact={true}>
                  <PreviewCommunity
                    postType={postType}
                    setPostType={setPostType}
                    previewPage={previewPage}
                    userCommunities={userCommunities}
                    setPreviewPage={setPreviewPage}
                  />
                </ProtectedRoute>

                <ProtectedRoute path="/c/:communityName/edit" exact={true}>
                  <EditCommunity />
                </ProtectedRoute>

                <ProtectedRoute path="/users/:userId/profile/edit" exact={true}>
                  <EditProfile />
                </ProtectedRoute>

                <ProtectedRoute path="/posts/:postId/img/edit" exact={true}>
                  <UpdateImagePost />
                </ProtectedRoute>

                <Route path="/search/comments">
                  <SearchResultsComments searchbarRef={searchbarRef} />
                </Route>

                <Route path="/search/posts">
                  <SearchResultsPosts searchbarRef={searchbarRef} />
                </Route>

                <Route path="/search/communities">
                  <SearchResultsCommunities searchbarRef={searchbarRef} />
                </Route>

                <Route path="/search/users">
                  <SearchResultsUsers searchbarRef={searchbarRef} />
                </Route>

                <Route path="/users/:userId/profile" exact={true}>
                  <UserProfile setOpenChat={setOpenChat} />
                </Route>

                <Route path="/profile" exact={true}>
                  <UserProfile />
                </Route>

                <ProtectedRoute path="/notifications" exact={true}>
                  <Notifications />
                </ProtectedRoute>
              </Switch>
            </div>
          </PostFormatContext.Provider>
        </PageTitleContext.Provider>
      </PopupProvider>
    </MetadataProvider>
  );
}

export default App;
