import React from "react";
import configureMockStore from "redux-mock-store";

import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { useDispatch, Provider } from "react-redux";
import { PostFeed } from "./PostFeed"; // Adjust the import path as necessary
import { getCommunities, getPosts } from "../../../store"; // Adjust as necessary
import { BrowserRouter } from "react-router-dom";
import { PostFormatContext } from "../../../context";

const mockStore = configureMockStore();

const renderWithRouterAndRedux = (
  component,
  initialState = {
    // Assuming you have other state slices like session, users, etc.
    session: {
      // Example user data, adjust as needed
      user: { id: "3", name: "Example User" },
    },
    users: {
      // Add mock users as necessary, for example, the community owner and subscribers
      3: {
        about: "",
        bannerImg: null,
        commentKarma: 0,
        createdAt: "Fri, 15 Mar 2024 03:41:51 GMT",
        displayName: "marnie",
        // Include other properties as necessary
      },
      // Mock other users who are subscribers or have interacted with the community
    },
    communities: {
      // Structuring a single community based on your provided object structure
      1: {
        communityOwner: {
          about: "",
          bannerImg: null,
          commentKarma: 0,
          createdAt: "Fri, 15 Mar 2024 03:41:51 GMT",
          displayName: "marnie",
          // Include other properties as necessary
        },
        communityPosts: {
          1: {
            /* Post details */
          },
          3: {
            /* Post details */
          },
          // Include other posts as necessary
        },
        communityRules: {},
        communitySettings: {
          1: {
            /* Settings details */
          },
          // Include other settings as necessary
        },
        createdAt: "Fri, 15 Mar 2024 03:41:51 GMT",
        description:
          "Pictures, videos, questions, and articles featuring/about cats.",
        displayName: "Cats",
        id: 1,
        members: 15,
        name: "cats",
        subscribers: {
          // Assuming these are user IDs of subscribers
          2: {
            /* Subscriber details */
          },
          4: {
            /* Subscriber details */
          },
          // Include other subscribers as necessary
        },
        userId: 3,
        usersWhoFavorited: {},
        // Include other properties as necessary
      },
      // Add other communities as necessary
    },
    // Include other slices of state as necessary
  }
) => {
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

// Mock the necessary modules
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"), // This line preserves other exports from react-redux
  useDispatch: jest.fn(),
}));

jest.mock("../../../store", () => ({
  ...jest.requireActual("../../../store"), // Import actual store functions
  getPosts: jest.fn(),
  getCommunities: jest.fn(),
  // Make sure not to mock configureStore if you're using it from redux-mock-store
}));

// Define the mockDispatch function
const mockDispatch = jest.fn();

describe("PostFeed", () => {
  const initialPosts = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    title: `Post ${index}`,
  }));

  beforeEach(() => {
    // Clear mock history before each test
    mockDispatch.mockClear();
    getPosts.mockClear();
    getCommunities.mockClear();
    // Setup useDispatch to return the mockDispatch function
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    cleanup(); // Clean up the DOM
  });

  it("renders with initial posts", () => {
    const { getByTestId } = renderWithRouterAndRedux(
      <PostFeed posts={initialPosts} />
    );
    expect(getByTestId("post-0")).toBeInTheDocument();
    // Check for the first 10 posts
    for (let i = 0; i < 10; i++) {
      expect(getByTestId(`post-${i}`)).toBeInTheDocument();
    }
  });

  it("actions dispatched on component mount", () => {
    renderWithRouterAndRedux(<PostFeed posts={initialPosts} />);
    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(getCommunities).toHaveBeenCalledTimes(1);
  });

  it("loads more posts on scroll", async () => {
    global.innerHeight = 500;
    global.scrollY = 1000;
    Object.defineProperty(document.body, "offsetHeight", {
      value: 1500,
    });

    const { getByTestId, queryByTestId } = renderWithRouterAndRedux(
      <PostFeed posts={initialPosts} />
    );

    // Check that Post 10 and Post 11 are not in the document initially
    expect(queryByTestId(`post-10`)).not.toBeInTheDocument();
    expect(queryByTestId(`post-11`)).not.toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() => {
      // Now check that Post 10 and Post 11 have been loaded and are present
      expect(getByTestId("post-10")).toBeInTheDocument();
      expect(getByTestId("post-11")).toBeInTheDocument();
    });
  });
});
