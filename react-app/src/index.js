import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "isomorphic-fetch";
import { GoogleOAuthProvider } from "@react-oauth/google";

import configureStore from "./store";

import { ModalProvider } from "./context/Modal";

import App from "./App";
import "./index.css";
import "./variables.css";

const store = configureStore();

ReactDOM.render(
  <GoogleOAuthProvider clientId="218487043554-0qt6hv2p3i4p530ccnshvnatv48m743q.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
