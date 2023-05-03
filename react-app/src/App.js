import React, { useState, useEffect } from "react";
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

import { Modal } from "./context/Modal";
import CommunitiesDirectory from "./pages/CommunitiesDirectory.js/CommunitiesDirectory";
import Chat from "./features/Messages/Chat";
import LoginPage from "./features/auth/LoginPage";
import SingleImagePage from "./features/Posts/SinglePost/SingleImagePage/SingleImagePage";
import Notifications from "./pages/Notifications/Notifications";
import Messages from "./features/Messages/Messages";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustQuery, setAdjustQuery] = useState(false);
  const [postType, setPostType] = useState("post");
  const [format, setFormat] = useState("Card");
  const [pageTitle, setPageTitle] = useState();
  const [recentPostList, setRecentPostList] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

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
      <ScrollToTop />
      <NavBar
        pageTitle={pageTitle}
        setPageTitle={setPageTitle}
        adjustQuery={adjustQuery}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />{" "}
      <div className="main">
        <Switch>
          {user ? (
            <Route path="/" exact={true}>
              <SubscribedPosts
                setPageTitle={setPageTitle}
                format={format}
                setFormat={setFormat}
              />
            </Route>
          ) : (
            <Route path="/" exact={true}>
              <Posts
                setPageTitle={setPageTitle}
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
              <Modal title={"Sign Up"} onClose={() => setShowSignupForm(false)}>
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
              postType={postType}
              setPostType={setPostType}
              val="post"
            />
          </ProtectedRoute>
          <ProtectedRoute path="/c/submit/image" exact={true}>
            <CreatePost
              setPageTitle={setPageTitle}
              postType={postType}
              setPostType={setPostType}
              val="image"
            />
          </ProtectedRoute>
          <ProtectedRoute path="/c/submit/url" exact={true}>
            <CreatePost
              setPageTitle={setPageTitle}
              postType={postType}
              setPostType={setPostType}
              val="link"
            />
          </ProtectedRoute>
          <ProtectedRoute path="/c/:communityId/submit" exact={true}>
            <CreatePost
              setPageTitle={setPageTitle}
              postType={postType}
              setPostType={setPostType}
              val="post"
            />
          </ProtectedRoute>
          <ProtectedRoute path="/c/:communityId/submit/image" exact={true}>
            <CreatePost
              setPageTitle={setPageTitle}
              postType={postType}
              setPostType={setPostType}
              val="image"
            />
          </ProtectedRoute>
          <ProtectedRoute path="/c/:communityId/submit/url" exact={true}>
            <CreatePost
              setPageTitle={setPageTitle}
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
          <Route path="/image/:imageId" exact={true}>
            <SingleImagePage />
          </Route>

          <Route path="/directory" exact={true}>
            <CommunitiesDirectory setPageTitle={setPageTitle} />
          </Route>
          <Route path="/chat" exact={true}>
            <Chat />
          </Route>
          <ProtectedRoute path="/message/messages" exact={true}>
            <Messages setPageTitle={setPageTitle} />
          </ProtectedRoute>
          <ProtectedRoute path="/posts/:postId/edit" exact={true}>
            <UpdatePost />
          </ProtectedRoute>
          <Route path="/c/:communityId" exact={true}>
            <CommunityPage
              setPageTitle={setPageTitle}
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
            <EditProfile setPageTitle={setPageTitle} />
          </ProtectedRoute>
          <ProtectedRoute path="/posts/:postId/img/edit" exact={true}>
            <UpdateImagePost />
          </ProtectedRoute>
          <Route path="/search/results" exact={true}>
            <SearchResults
              setPageTitle={setPageTitle}
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
            <UserProfile setPageTitle={setPageTitle} />
          </Route>
          <Route path="/profile" exact={true}>
            <UserProfile setPageTitle={setPageTitle} />
          </Route>
          <ProtectedRoute path="/notifications" exact={true}>
            <Notifications />
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
    </BrowserRouter>
  );
}

export default App;
