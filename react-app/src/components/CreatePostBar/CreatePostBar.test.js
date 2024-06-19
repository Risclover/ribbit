import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@/store";
import { CreatePostBar } from "./CreatePostBar";

const userId = "123";
const mockStore = configureStore({
  session: {
    user: { id: userId, profileImg: "https://example.com/user1.png" },
  },
});

// Mock for useHistory hook
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("CreatePostBar", () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
  });

  const setup = (props = {}) => {
    return render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreatePostBar {...props} />
        </MemoryRouter>
      </Provider>
    );
  };

  it("renders user profile picture when user is present", () => {
    const { getByAltText } = setup();
    expect(getByAltText("User")).toHaveAttribute(
      "src",
      "https://example.com/user1.png"
    );
  });

  it("does not render when user is not logged in", () => {
    const absentUserMock = configureStore({ session: { user: null } });
    const { queryByTestId } = render(
      <Provider store={absentUserMock}>
        <MemoryRouter>
          <CreatePostBar />
        </MemoryRouter>
      </Provider>
    );

    expect(queryByTestId("create-post-bar")).not.toBeInTheDocument();
  });

  it("has an input field with the correct placeholder text", () => {
    const { getByPlaceholderText } = setup();
    expect(getByPlaceholderText("Create Post")).toBeInTheDocument();
  });

  it("renders NavLink with correct href for user's profile page", () => {
    const { getByAltText } = setup();
    const userImage = getByAltText("User").closest("a");
    expect(userImage).toHaveAttribute("href", `/users/${userId}/profile`);
  });

  it("navigates to general post creation page on input click when on a general page", () => {
    const { getByPlaceholderText } = setup();

    fireEvent.click(getByPlaceholderText("Create Post"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/submit");
  });

  it("renders the image post creation icon", () => {
    const { getByTestId } = setup();
    expect(getByTestId("image-post-icon")).toBeInTheDocument();
  });

  it("renders the URL post creation icon", () => {
    const { getByTestId } = setup();
    expect(getByTestId("url-post-icon")).toBeInTheDocument();
  });

  it("navigates to the community-specific post creation page on input click when on a community page", () => {
    const communityName = "exampleCommunity";
    const { getByPlaceholderText } = setup({
      page: "community",
      communityName,
    });

    fireEvent.click(getByPlaceholderText("Create Post"));
    expect(mockHistoryPush).toHaveBeenCalledWith(`/c/${communityName}/submit`);
  });

  it("navigates to the general image post creation page on image icon click when on a general page", () => {
    const { getByTestId } = setup();

    fireEvent.click(getByTestId("image-post-icon"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/c/submit/image");
  });

  it("navigates to the community-specific image post creation page on image icon click when on a community page", () => {
    const communityName = "exampleCommunity";
    const { getByTestId } = setup({
      page: "community",
      communityName,
    });

    fireEvent.click(getByTestId("image-post-icon"));
    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/c/${communityName}/submit/image`
    );
  });

  it("navigates to the general URL post creation page on URL icon click when on a general page", () => {
    const { getByTestId } = setup();

    fireEvent.click(getByTestId("url-post-icon"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/c/submit/url");
  });

  it("navigates to the community-specific URL post creation page on URL icon click when on a community page", () => {
    const communityName = "exampleCommunity";
    const { getByTestId } = setup({
      page: "community",
      communityName,
    });

    fireEvent.click(getByTestId("url-post-icon"));
    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/c/${communityName}/submit/url`
    );
  });
});
