import React from "react";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import { SignUpForm } from "./SignUpForm/SignUpForm";
import { configureStore } from "@/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const store = configureStore();

// Mock fetch globally
global.fetch = jest.fn();

jest.mock("../utils/signupFormValidation", () => ({
  handleEmailErrors: jest.fn((email, emailTaken) => {
    if (email === "demo@aa.io" && emailTaken === true) {
      return ["that email is already taken"];
    }
    return [];
  }),
}));

beforeEach(() => {
  // Clear mock calls and setup default mock implementation before each test
  fetch.mockClear().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );
});

describe("SignUpFormMain", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SignUpForm
          email=""
          setEmail={() => {}}
          setShowSignupForm={() => {}}
          setShowLoginForm={() => {}}
          setDisabled={() => {}}
        />
      </Provider>
    );
  });

  it("renders the Sign Up form", () => {
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
  });

  it("displays error for taken email address", async () => {
    const user = userEvent.setup();

    const input = screen.getByLabelText("Email*");
    await user.type(input, "demo@aa.io");

    await waitFor(() => {
      expect(input).toHaveValue("demo@aa.io");
    });
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });
});
