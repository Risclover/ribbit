import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "./store/session";

import LoginForm from "./features/auth/AuthModal/LoginForm";
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

import { Modal } from "./context/Modal";
import CommunitiesDirectory from "./pages/CommunitiesDirectory.js/CommunitiesDirectory";
import MessageWindow from "./features/Messages/MessageWindow";
import Chat from "./features/Messages/Chat";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        setShowLoginForm={setShowLoginForm}
        setShowSignupForm={setShowSignupForm}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />{" "}
      <div className="main">
        <Switch>
          {user ? (
            <Route path="/" exact={true}>
              <SubscribedPosts />
            </Route>
          ) : (
            <Route path="/" exact={true}>
              <Posts />
            </Route>
          )}
          <Route path="/home" exact={true}>
            <SubscribedPosts />
          </Route>
          <Route path="/login">
            {showLoginForm && (
              <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
                <LoginForm
                  showLoginForm={showLoginForm}
                  setShowLoginForm={setShowLoginForm}
                  setShowSignupForm={setShowSignupForm}
                />
              </Modal>
            )}
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
            <Posts />
          </Route>
          <Route path="/c/submit" exact={true}>
            <CreatePost />
          </Route>
          <Route path="/c/:communityId/submit" exact={true}>
            <CreatePost />
          </Route>
          <Route path="/posts/:postId" exact={true}>
            <SinglePostPage setShowLoginForm={setShowLoginForm} />
          </Route>
          <Route path="/messages/:recipientId" exact={true}>
            <MessageWindow />
          </Route>
          <Route path="/directory" exact={true}>
            <CommunitiesDirectory />
          </Route>
          <Route path="/chat" exact={true}>
            <Chat />
          </Route>
          <Route path="/posts/:postId/edit" exact={true}>
            <UpdatePost />
          </Route>
          <Route path="/c/:communityId" exact={true}>
            <CommunityPage setShowLoginForm={setShowLoginForm} />
          </Route>
          <Route path="/c/:communityId/edit" exact={true}>
            <EditCommunity />
          </Route>
          <Route path="/users/:userId/profile/edit" exact={true}>
            <EditProfile />
          </Route>
          <Route path="/search/results" exact={true}>
            <SearchResults
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId/profile" exact={true}>
            <UserProfile />
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
