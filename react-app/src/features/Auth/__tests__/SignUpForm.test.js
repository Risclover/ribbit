import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Components
import { SignUpForm } from "../components";

// Mocks & context
// ----------------
// We’ll mock the useAuthFlow context since SignUpForm depends on it.
jest.mock("@/context", () => ({
  ...jest.requireActual("@/context"),
  useAuthFlow: () => ({
    signupFormData: { email: "" },
    setSignupFormData: jest.fn(),
    view: "signup-first",
    openSignupPage2: jest.fn(),
    closeModal: jest.fn(),
  }),
}));

describe("SignUpForm", () => {
  let mockUseAuthFlow;
  beforeEach(() => {
    // Reset mock implementations before each test
    jest.clearAllMocks();
    mockUseAuthFlow = require("@/context").useAuthFlow();
  });

  it("renders user agreement text from FormHeader", () => {
    render(<SignUpForm formType="default" />);

    expect(
      screen.getByText(/By continuing, you agree to abide by Ribbit's/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continue as Demo User/i })
    ).toBeInTheDocument();
  });

  it("renders the email input and label", () => {
    render(<SignUpForm formType="default" />);

    // Verify the label
    const emailLabel = screen.getByLabelText(/Email/i);
    expect(emailLabel).toBeInTheDocument();

    // The input’s placeholder is blank but it should be recognized by label
    expect(emailLabel).toHaveAttribute("type", "email");
  });

  it("renders the SignInSwitch prompting user to Log In", () => {
    render(<SignUpForm formType="default" />);

    const signInSwitchText = screen.getByText(/Already a ribbitor\?/i);
    expect(signInSwitchText).toBeInTheDocument();

    // "Log In" link is clickable
    const logInLink = screen.getByText(/Log In/i);
    expect(logInLink).toHaveAttribute("tabindex", "0");
  });

  it("shows close button by default (formType !== 'protected')", () => {
    render(<SignUpForm formType="default" />);
    const closeButton = screen.getByRole("button", { name: /Close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("hides top bar button if formType is 'protected'", () => {
    render(<SignUpForm formType="protected" />);
    const closeButton = screen.queryByRole("button", { name: /Close/i });
    // Should not exist
    expect(closeButton).not.toBeInTheDocument();

    // Instead, we might see a "Go home" link or no button at all
    // depending on how 'none' is implemented in your code.
  });

  it("disables Continue button when email is empty or invalid", async () => {
    render(<SignUpForm formType="default" />);
    const continueBtn = screen.getByRole("button", { name: /Continue/i });

    // Initially empty, so it should be disabled.
    expect(continueBtn).toBeDisabled();

    // Type an invalid email
    await userEvent.type(screen.getByLabelText(/Email/i), "invalid-email");
    // On blur triggers validation
    fireEvent.blur(screen.getByLabelText(/Email/i));
    // The button should remain disabled due to invalid format
    expect(continueBtn).toBeDisabled();
  });

  it("enables Continue button with valid email and calls openSignupPage2 on submit", async () => {
    render(<SignUpForm formType="default" />);
    const continueBtn = screen.getByRole("button", { name: /Continue/i });
    const emailInput = screen.getByLabelText(/Email/i);

    // Type a valid email
    await userEvent.type(emailInput, "test@example.com");
    fireEvent.blur(emailInput);

    // Suppose the mock checks pass, so let's simulate that setSignupFormData
    // or internal validation would re-enable the button
    // We can force the button to become enabled by the logic that after
    // a valid email, 'disabled' becomes false
    // But we'll just check if your code does it automatically:
    expect(continueBtn).not.toBeDisabled();

    // Click continue
    await userEvent.click(continueBtn);

    // openSignupPage2 is called
    expect(mockUseAuthFlow.openSignupPage2).toHaveBeenCalledTimes(1);
  });

  it("displays the demo account warning when user clicks 'Continue as Demo User'", () => {
    render(<SignUpForm formType="default" />);

    const demoBtn = screen.getByRole("button", {
      name: /Continue as Demo User/i,
    });
    fireEvent.click(demoBtn);

    // The warning overlay should appear
    // This might show a heading or text like:
    expect(screen.getByText(/WARNING: Shared Account/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Avoid sharing personal information/i)
    ).toBeInTheDocument();
  });
});
