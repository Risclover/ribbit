import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import moment from "moment";

import { RecentlyViewedPosts } from "./RecentlyViewedPosts";
const mockStore = configureStore([]);

describe("RecentlyViewedPosts", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      viewedPosts: {
        posts: [
          {
            id: 1,
            title: "Test Post 1",
            votes: 10,
            postComments: [],
            createdAt: moment().subtract(1, "day").toISOString(),
          },
          {
            id: 2,
            title: "Test Post 2",
            votes: 5,
            postComments: [],
            createdAt: moment().subtract(2, "days").toISOString(),
          },
        ],
      },
    });
  });

  test("renders Recent Posts header", () => {
    render(
      <Provider store={store}>
        <Router>
          <RecentlyViewedPosts />
        </Router>
      </Provider>
    );

    const headerElement = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "div" &&
        content.includes("Recent Posts")
      );
    });

    expect(headerElement).toBeInTheDocument();
  })
});
