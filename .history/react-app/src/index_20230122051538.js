import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import NavBar from "./components/NavBar";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
const store = configureStore();
0;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <NavBar />
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
