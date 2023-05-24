import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "./store/session";

import SignUpForm from "./features/auth/AuthModal/SignUpForm";
import ProtectedRoute from "./features/auth/ProtectedRoute";

import Posts from "./features/Posts/Posts";
import SubscribedPosts from "./features/Posts/SubscribedPosts";
import CreatePost from "./features/Posts/PostForms/CreatePost";
import SinglePostPage from "./features/Posts/SinglePost/SinglePostPage";
import UpdatePost from "./features/Posts/PostForms/UpdatePost";

import CommunityPage from "./features/Communities/CommunityPage";
import EditCommunity from "./features/Communities/CommunityForms/EditCommunity";

import NavBar from "./components/NavBar/NavBar";
import UsersList from "./components/UsersList";
import ScrollToTop from "./components/ScrollToTop";

import UserProfile from "./pages/UserProfile/UserProfile";
import EditProfile from "./pages/UserProfile/EditProfile/EditProfile";
import SearchResults from "./pages/SearchResults/SearchResults";
import UpdateImagePost from "./features/Posts/ImagePost/UpdateImagePost";
import CommunitiesDirectory from "./pages/CommunitiesDirectory/CommunitiesDirectory";

import { Modal } from "./context/Modal";
import Chat from "./features/Messages/Chat";
import LoginPage from "./features/auth/LoginPage";
import SingleImagePage from "./pages/SingleImagePage/SingleImagePage";
import Notifications from "./pages/Notifications/Notifications";
import Messages from "./features/Messages/Messages";
import Unread from "./features/Messages/Unread/Unread";
import Sent from "./features/Messages/Sent/Sent";
import Inbox from "./features/Messages/Inbox/Inbox";
import PostRepliesPage from "./features/Messages/PostReplies/PostRepliesPage";
import NavSidebar from "./components/NavSidebar.js/NavSidebar";
import Permalink from "./features/Messages/Permalink/Permalink";
import LoggedOutSidebar from "./components/NavSidebar.js/LoggedOutSidebar";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const [, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustQuery, setAdjustQuery] = useState(false);
  const [postType, setPostType] = useState("post");
  const [format, setFormat] = useState("Card");
  const [pageTitle, setPageTitle] = useState();
  const [pageIcon, setPageIcon] = useState();
  const [recentPostList, setRecentPostList] = useState([]);
  const [showNavSidebar, setShowNavSidebar] = useState();
  const [showLoggedOutSidebar, setShowLoggedOutSidebar] = useState(
    !user && true
  );
  const [normalDropdown, setNormalDropdown] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <NavBar
          pageTitle={pageTitle}
          setPageTitle={setPageTitle}
          pageIcon={pageIcon}
          setPageIcon={setPageIcon}
          adjustQuery={adjustQuery}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowNavSidebar={setShowNavSidebar}
          showNavSidebar={showNavSidebar}
          normalDropdown={normalDropdown}
          setNormalDropdown={setNormalDropdown}
        />{" "}
        <div
          className={
            showNavSidebar || showLoggedOutSidebar ? "main main-padded" : "main"
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
          <Switch>
            {user ? (
              <Route path="/" exact={true}>
                <SubscribedPosts
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  format={format}
                  setFormat={setFormat}
                />
              </Route>
            ) : (
              <Route path="/" exact={true}>
                <Posts
                  setPageTitle={setPageTitle}
                  setPageIcon={setPageIcon}
                  format={format}
                  setFormat={setFormat}
                  setRecentPostList={setRecentPostList}
                  recentPostList={recentPostList}
                />
              </Route>
            )}
            <Route path="/home" exact={true}>
              <SubscribedPosts
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
                postType={postType}
                setPostType={setPostType}
                format={format}
                setFormat={setFormat}
              />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              {showSignupForm && (
                <Modal
                  title={"Sign Up"}
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
              <Posts
                setPageIcon={setPageIcon}
                setPageTitle={setPageTitle}
                postType={postType}
                setPostType={setPostType}
                format={format}
                setFormat={setFormat}
                setRecentPostList={setRecentPostList}
                recentPostList={recentPostList}
              />
            </Route>
            <ProtectedRoute path="/c/submit" exact={true}>
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
            <ProtectedRoute path="/c/:communityId/submit" exact={true}>
              <CreatePost
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
                postType={postType}
                setPostType={setPostType}
                val="post"
              />
            </ProtectedRoute>
            <ProtectedRoute path="/c/:communityId/submit/image" exact={true}>
              <CreatePost
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
                postType={postType}
                setPostType={setPostType}
                val="image"
              />
            </ProtectedRoute>
            <ProtectedRoute path="/c/:communityId/submit/url" exact={true}>
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
                setRecentPostList={setRecentPostList}
                recentPostList={recentPostList}
                format={format}
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
              <Messages setPageTitle={setPageTitle} setPageIcon={setPageIcon} />
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
              <PostRepliesPage setPageTitle={setPageTitle} />
            </ProtectedRoute>
            <ProtectedRoute path="/message/messages/:threadId" exact={true}>
              <Permalink />
            </ProtectedRoute>
            <ProtectedRoute path="/posts/:postId/edit" exact={true}>
              <UpdatePost />
            </ProtectedRoute>
            <Route path="/c/:communityId" exact={true}>
              <CommunityPage
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
                postType={postType}
                setPostType={setPostType}
                format={format}
                setFormat={setFormat}
              />
            </Route>
            <ProtectedRoute path="/c/:communityId/edit" exact={true}>
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
            <ProtectedRoute path="/users" exact={true}>
              <UsersList />
            </ProtectedRoute>
            <Route path="/users/:userId/profile" exact={true}>
              <UserProfile
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
              />
            </Route>
            <Route path="/profile" exact={true}>
              <UserProfile
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
              />
            </Route>
            <ProtectedRoute path="/notifications" exact={true}>
              <Notifications
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
              />
            </ProtectedRoute>
            <Route>
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>{" "}
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>{" "}
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>{" "}
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>{" "}
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>{" "}
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>{" "}
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>{" "}
              <h1>
                ERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERR
                ORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR
              </h1>
            </Route>
          </Switch>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
