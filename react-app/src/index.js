import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { configureStore } from "./store";
import { ModalProvider } from "./context/Modal";
import { AuthModalProvider } from "./context/AuthModal";
import { PostModalProvider } from "./context/PostModal";
import App from "./App";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import "isomorphic-fetch";
import { SelectedChatProvider } from "context/SelectedChat";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthModalProvider>
        <SelectedChatProvider>
          <PostModalProvider>
            <ModalProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ModalProvider>
          </PostModalProvider>
        </SelectedChatProvider>
      </AuthModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
