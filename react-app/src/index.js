import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store";

import { ModalProvider } from "./context/Modal";

import App from "./App";
import "./index.css";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
