import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "./SignUpForm/SignUpFormMain";

import { configureStore } from "../../../store";

const store = configureStore();

describe("SignUpForm", () => {
  it("renders the Sign Up form", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );

    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Repeat Password")).toBeInTheDocument();
  });

  it("displays error messages for duplicate username and email", async () => {
    const user = userEvent.setup();
    const checkAvailabilityMock = jest.fn((field, value) => {
      if (field === "username" && value === "demo") {
        return Promise.resolve(false); // Username is taken
      } else if (field === "email" && value === "demo@aa.io") {
        return Promise.resolve(false); // Email is associated with an existing account
      }
      return Promise.resolve(true); // Available
    });

    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <SignUpForm checkAvailability={checkAvailabilityMock} />
      </Provider>
    );

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "existinguser" },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByLabelText("Repeat Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(getByText("Sign Up"));

    await waitFor(() => {
      expect(getByText("Username is already taken.")).toBeInTheDocument();
      expect(
        getByText("Email is already associated with an account.")
      ).toBeInTheDocument();
    });
  });
});
