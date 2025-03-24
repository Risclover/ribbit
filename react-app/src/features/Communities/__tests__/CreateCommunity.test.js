import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreateCommunity } from "../components/CreateCommunity";

describe("<CreateCommunity />", () => {
  it("should render", () => {
    render(<CreateCommunity />);
  });

  it("should contain a button that says 'Create Community'", () => {
    render(<CreateCommunity />);
    expect(
      screen.getByRole("button", { name: /create community/i })
    ).toBeInTheDocument();
  });

  it("should contain a button that when clicked opens the community creation modal", () => {
    render(<CreateCommunity />);

    userEvent.click(screen.getByRole("button", { name: /create community/i }));
  });
});
