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
import { AuthFlowProvider } from "@/context/AuthFlowContext";
import { SkipLocationProvider } from "@/context/SkipLocationContext";
import { OpenChatProvider } from "context/OpenChatContext";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SkipLocationProvider>
        <AuthModalProvider>
          <AuthFlowProvider>
            <SelectedChatProvider>
              <OpenChatProvider>
                <PostModalProvider>
                  <ModalProvider>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                  </ModalProvider>
                </PostModalProvider>
              </OpenChatProvider>
            </SelectedChatProvider>
          </AuthFlowProvider>
        </AuthModalProvider>
      </SkipLocationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
