import React, { useState, useEffect, Suspense } from "react";
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
import Chat from "./components/Modals/Chat/Chat";
import {
  LoginPage,
  // Notifications,
  Messages,
  Unread,
  Sent,
  Inbox,
  PostRepliesPage,
  Permalink,
  ChatWindow,
  PreviewCommunitySidebar,
  PreviewCommunity,
  SearchResults,
  UpdateImagePost,
  UpdatePost,
  CreatePost,
  AllPostsFeed,
  HomepageFeed,
  SignUpForm,
  ProtectedRoute,
  EditCommunity,
} from "./features";
import { NavBar, NavSidebar, LoggedOutSidebar } from "./layouts";

import { getUserChatThreads, getCommunities, authenticate } from "./store";

import {
  PostFormatContext,
  SelectedChatContext,
  PageTitleContext,
} from "./context";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const location = useLocation();

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
  const [normalDropdown, setNormalDropdown] = useState(true);
  const [openChat, setOpenChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");
  const [userCommunities, setUserCommunities] = useState([]);
  const [previewPage, setPreviewPage] = useState(false);

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

  // useEffect(() => {
  //   // dispatch(getUserChatThreads());
  //   dispatch(getCommunities());
  // }, [dispatch]);

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
    pageTitle: pageTitle,
    setPageTitle: setPageTitle,
    pageIcon: pageIcon,
    setPageIcon: setPageIcon,
    adjustQuery: adjustQuery,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    setShowNavSidebar: setShowNavSidebar,
    showNavSidebar: showNavSidebar,
    normalDropdown: normalDropdown,
    setNormalDropdown: setNormalDropdown,
    setOpenChat: setOpenChat,
    openChat: openChat,
  };

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      <PostFormatContext.Provider value={{ format, setFormat }}>
        <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
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
                setNormalDropdown={setNormalDropdown}
                normalDropdown={normalDropdown}
              />
            )}
            {openChat && (
              <ChatWindow setOpenChat={setOpenChat} openChat={openChat} />
            )}
            <Switch>
              {user ? (
                <Route path="/" exact={true}>
                  <HomepageFeed
                    setPageTitle={setPageTitle}
                    setPageIcon={setPageIcon}
                  />
                </Route>
              ) : (
                <Route path="/" exact={true}>
                  <AllPostsFeed
                    setPageTitle={setPageTitle}
                    setPageIcon={setPageIcon}
                  />
                </Route>
              )}
              <Route path="/home" exact={true}>
                <HomepageFeed
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                {showSignupForm && (
                  <Modal
                    title="Sign Up"
                    onClose={() => setShowSignupForm(false)}
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
                <AllPostsFeed
                  setPageIcon={setPageIcon}
                  setPageTitle={setPageTitle}
                />
              </Route>
              <ProtectedRoute path="/submit" exact={true}>
                <CreatePost
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  postType={postType}
                  setPostType={setPostType}
                  val="post"
                />
              </ProtectedRoute>
              <ProtectedRoute path="/c/submit/image" exact={true}>
                <CreatePost
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  postType={postType}
                  setPostType={setPostType}
                  val="image"
                />
              </ProtectedRoute>
              <ProtectedRoute path="/c/submit/url" exact={true}>
                <CreatePost
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  postType={postType}
                  setPostType={setPostType}
                  val="link"
                />
              </ProtectedRoute>
              <ProtectedRoute path="/c/:communityName/submit" exact={true}>
                <CreatePost
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  postType={postType}
                  setPostType={setPostType}
                  val="post"
                />
              </ProtectedRoute>
              <ProtectedRoute
                path="/c/:communityName/submit/image"
                exact={true}
              >
                <CreatePost
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  postType={postType}
                  setPostType={setPostType}
                  val="image"
                />
              </ProtectedRoute>
              <ProtectedRoute path="/c/:communityName/submit/url" exact={true}>
                <CreatePost
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  postType={postType}
                  setPostType={setPostType}
                  val="link"
                />
              </ProtectedRoute>
              <Route path="/posts/:postId" exact={true}>
                <SinglePostPage
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </Route>
              <Route path="/images/:postId" exact={true}>
                <SingleImagePage />
              </Route>

              <Route path="/directory" exact={true}>
                <CommunitiesDirectory
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </Route>
              <Route path="/chat" exact={true}>
                <Chat />
              </Route>
              <ProtectedRoute path="/message/messages" exact={true}>
                <Messages
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </ProtectedRoute>
              <ProtectedRoute path="/message/unread" exact={true}>
                <Unread setPageTitle={setPageTitle} setPageIcon={setPageIcon} />
              </ProtectedRoute>
              <ProtectedRoute path="/message/sent" exact={true}>
                <Sent setPageTitle={setPageTitle} setPageIcon={setPageIcon} />
              </ProtectedRoute>
              <ProtectedRoute path="/message/inbox" exact={true}>
                <Inbox setPageTitle={setPageTitle} setPageIcon={setPageIcon} />
              </ProtectedRoute>
              <ProtectedRoute path="/message/selfreply" exact={true}>
                <PostRepliesPage
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </ProtectedRoute>
              <ProtectedRoute path="/message/messages/:threadId" exact={true}>
                <Permalink />
              </ProtectedRoute>
              <ProtectedRoute path="/posts/:postId/edit" exact={true}>
                <UpdatePost />
              </ProtectedRoute>
              <Route path="/c/:communityName" exact={true}>
                <CommunityPage
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </Route>
              <ProtectedRoute exact path="/c/:communityId/style">
                <PreviewCommunity
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
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
                <EditProfile
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </ProtectedRoute>
              <ProtectedRoute path="/posts/:postId/img/edit" exact={true}>
                <UpdateImagePost />
              </ProtectedRoute>
              <Route path="/search/results" exact={true}>
                <SearchResults
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  adjustQuery={adjustQuery}
                  setAdjustQuery={setAdjustQuery}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </Route>
              <Route path="/users/:userId/profile" exact={true}>
                <UserProfile
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  setOpenChat={setOpenChat}
                />
              </Route>
              <Route path="/profile" exact={true}>
                <UserProfile
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                />
              </Route>
              {/* <ProtectedRoute path="/notifications" exact={true}>
            <Notifications
              setPageTitle={setPageTitle}
              setPageIcon={setPageIcon}
            />
          </ProtectedRoute> */}
              <Route></Route>
            </Switch>
          </div>
        </SelectedChatContext.Provider>
      </PostFormatContext.Provider>
    </PageTitleContext.Provider>
  );
}

export default App;
