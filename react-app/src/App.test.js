import { render, screen, act } from "@testing-library/react";
import React from "react";
import App from "./App";
import { configureStore } from "./store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

const store = configureStore();

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("app", () => {
  it("should render", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });
  });
});
