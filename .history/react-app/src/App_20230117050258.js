import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/AuthModal/LoginForm";
import SignUpForm from "./components/auth/AuthModal/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import { Modal } from "./context/Modal";
import Posts from "./components/Posts/Posts";
import CreatePost from "./components/Posts/PostForms/CreatePost";
import SinglePostPage from "./components/Posts/SinglePost/SinglePostPage";
import UpdatePost from "./components/Posts/PostForms/UpdatePost";
import CommunityPage from "./components/Communities/CommunityPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const dispatch = useDispatch();

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
      <NavBar
        setShowLoginForm={setShowLoginForm}
        setShowSignupForm={setShowSignupForm}
      />
      <Switch>
        <Route path="/" exact={true}>
          <Posts />
        </Route>
        <Route path="/login" exact={true}>
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
        <Route path="/signup" exact={true}>
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
        <Route path="/posts" exact={true}>
          <Posts />
        </Route>
        <Route path="/posts/submit" exact={true}>
          <CreatePost />
        </Route>
        <Route path="/posts/:postId" exact={true}>
          <SinglePostPage setShowLoginForm={setShowLoginForm} />
        </Route>
        <Route path="/posts/:postId/edit" exact={true}>
          <UpdatePost />
        </Route>
        <Route path="/communities/:communityId" exact={true}>
          <CommunityPage />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
