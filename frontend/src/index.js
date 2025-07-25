import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "./store";
import App from "./App";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import "isomorphic-fetch";
import { AppProviders } from "@/context";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <AppProviders store={store}>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
