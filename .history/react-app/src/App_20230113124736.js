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
        <Route path="/login" exact={true}>
          {showLoginForm && (
            <Modal onClose={() => setShowLoginForm(false)}>
              <LoginForm showLoginForm={showLoginForm} />
            </Modal>
          )}
        </Route>
        <Route path="/sign-up" exact={true}>
          {showSignupForm && (
            <Modal onClose={() => setShowSignupForm(false)}>
              <SignUpForm
                showSignupForm={showSignupForm}
                setShowSignupForm={setShowSignupForm}
              />
            </Modal>
          )}
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
