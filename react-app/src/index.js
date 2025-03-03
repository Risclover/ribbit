import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { configureStore } from "./store";
import { ModalProvider } from "@/context";
import { AuthModalProvider } from "@/context";
import { PostModalProvider } from "@/context";
import App from "./App";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import "isomorphic-fetch";
import { SelectedChatProvider } from "@/context";
import { AuthFlowProvider } from "context/AuthFlowContext";
import { DarkModeProvider } from "context/DarkModeContext";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <AuthModalProvider>
          <AuthFlowProvider>
            <SelectedChatProvider>
              <PostModalProvider>
                <ModalProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </ModalProvider>
              </PostModalProvider>
            </SelectedChatProvider>
          </AuthFlowProvider>
        </AuthModalProvider>
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
