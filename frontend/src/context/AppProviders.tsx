import { ReactNode } from "react";
import { Provider } from "react-redux";
import type { Store } from "redux";
import { BrowserRouter } from "react-router-dom";

import {
  ModalProvider,
  AuthModalProvider,
  PostModalProvider,
  SelectedChatProvider,
  OpenChatProvider,
  PageTitleProvider,
} from "@/context";
import { AuthFlowProvider } from "@/context/AuthFlowContext";
import { SkipLocationProvider } from "@/context/SkipLocationContext";

interface AppProvidersProps {
  store: Store;
  children: ReactNode;
}

export function AppProviders({ store, children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SkipLocationProvider>
          <PageTitleProvider>
            <AuthModalProvider>
              <AuthFlowProvider>
                <SelectedChatProvider>
                  <OpenChatProvider>
                    <PostModalProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </PostModalProvider>
                  </OpenChatProvider>
                </SelectedChatProvider>
              </AuthFlowProvider>
            </AuthModalProvider>
          </PageTitleProvider>
        </SkipLocationProvider>
      </BrowserRouter>
    </Provider>
  );
}
