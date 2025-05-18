// src/context/AppProviders.jsx
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, AuthModalProvider, PostModalProvider } from "@/context";
import { SelectedChatProvider } from "@/context";
import { AuthFlowProvider } from "@/context/AuthFlowContext";
import { SkipLocationProvider } from "@/context/SkipLocationContext";
import { OpenChatProvider } from "@/context/OpenChatContext";

/* pass the Redux store in as a prop so the file stays generic */
export function AppProviders({ store, children }) {
  return (
    <Provider store={store}>
      <SkipLocationProvider>
        <AuthModalProvider>
          <AuthFlowProvider>
            <SelectedChatProvider>
              <OpenChatProvider>
                <PostModalProvider>
                  <ModalProvider>
                    <BrowserRouter>{children}</BrowserRouter>
                  </ModalProvider>
                </PostModalProvider>
              </OpenChatProvider>
            </SelectedChatProvider>
          </AuthFlowProvider>
        </AuthModalProvider>
      </SkipLocationProvider>
    </Provider>
  );
}
