import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { configureStore } from "./store";
import { ModalProvider } from "./context/Modal";
import { AuthModalProvider } from "./context/AuthModal";
import App from "./App";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import "isomorphic-fetch";
import { AuthProvider } from "./context/AuthModal2";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthModalProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </AuthModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
