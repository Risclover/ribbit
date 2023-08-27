import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "isomorphic-fetch";

import configureStore from "./store";

import { ModalProvider } from "./context/Modal";

import App from "./App";
import "./index.css";
import "./variables.css";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
