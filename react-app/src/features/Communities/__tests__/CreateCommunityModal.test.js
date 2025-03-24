import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { CreateCommunityModal } from "../components/CreateCommunityModal"; // Ensure this import path is correct

const mockStore = configureStore([]);
const store = mockStore({});

// Mock hooks and redux actions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"), // Use actual for all other hooks/actions
  useDispatch: jest.fn(),
}));

// Consolidate store mocks
jest.mock("@/store", () => ({
  addCommunity: jest
    .fn()
    .mockImplementation(({ name, description }) => async (dispatch) => {
      dispatch({
        type: "LOAD_COMMUNITY",
        payload: { id: "123", name, description },
      });
      return { id: "123", name, description };
    }),
  addToSubscriptions: jest.fn(),
  getSubscriptions: jest.fn(),
}));

jest.mock("@/hooks/useCommunityNameTaken", () => ({
  useCommunityNameTaken: jest.fn().mockReturnValue(false),
}));

// Setup useHistory mock
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

// Utility function for component rendering
const renderWithProviders = (showModal) => {
  const mockSetShowCreateCommunityModal = jest.fn();
  return {
    ...render(
      <Provider store={store}>
        <CreateCommunityModal
          showCreateCommunityModal={showModal}
          setShowCreateCommunityModal={mockSetShowCreateCommunityModal}
        />
      </Provider>
    ),
    mockSetShowCreateCommunityModal,
  };
};

describe("CreateCommunityModal", () => {
  const mockHistory = {
    push: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when `showCreateCommunityModal` is true", () => {
    const { getByTestId } = renderWithProviders(true);
    expect(getByTestId("create-community-modal")).toBeInTheDocument();
  });

  it("does not render when `showCreateCommunityModal` is false", () => {
    const { queryByTestId } = renderWithProviders(false);
    expect(queryByTestId("create-community-modal")).not.toBeInTheDocument();
  });

  it("closes modal on cancel", () => {
    const { getByText, mockSetShowCreateCommunityModal } =
      renderWithProviders(true);
    fireEvent.click(getByText(/Cancel/i));
    expect(mockSetShowCreateCommunityModal).toHaveBeenCalledWith(false);
  });

  it("submits form, dispatches actions, and navigates", async () => {
    const { getByText, getByLabelText } = renderWithProviders(true);

    fireEvent.change(getByLabelText("Name"), {
      target: { value: "NewCommunity" },
    });
    fireEvent.change(getByLabelText("Community description"), {
      target: { value: "A description for NewCommunity" },
    });
    fireEvent.click(getByText("Create Community"));

    console.log(mockHistoryPush.mock.calls);

    expect(mockHistoryPush).toBeCalledWith("/c/NewCommunity");

    // Assertions for Redux action dispatches
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "LOAD_COMMUNITY" }),
      ])
    );
  });
});
