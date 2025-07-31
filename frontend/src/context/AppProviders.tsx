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
  AuthFlowProvider,
  SkipLocationProvider,
} from "@/context";

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
            <OpenChatProvider>
              <AuthModalProvider>
                <AuthFlowProvider>
                  <SelectedChatProvider>
                    <PostModalProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </PostModalProvider>
                  </SelectedChatProvider>
                </AuthFlowProvider>
              </AuthModalProvider>
            </OpenChatProvider>
          </PageTitleProvider>
        </SkipLocationProvider>
      </BrowserRouter>
    </Provider>
  );
}
