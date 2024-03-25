import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostFormatContext } from "../../../../context/PostFormat";
import { PostFormatFace } from "./PostFormatFace";

const renderWithPostFormatContext = (ui, { format } = {}) => {
  return render(
    <PostFormatContext.Provider value={{ format }}>
      {ui}
    </PostFormatContext.Provider>
  );
};

describe("PostFormatFace", () => {
  it("renders the component correctly", () => {
    renderWithPostFormatContext(<PostFormatFace />, { format: "Card" });

    const button = screen.getByTestId("post-format-face-button");
    expect(button).toBeInTheDocument();
    expect(screen.getByAltText("Card format icon")).toBeInTheDocument();
  });

  it("toggles the dropdown on button click", () => {
    renderWithPostFormatContext(<PostFormatFace />, { format: "Classic" });
    const button = screen.getByTestId("post-format-face-button");

    expect(
      screen.queryByTestId("post-format-dropdown")
    ).not.toBeInTheDocument();

    fireEvent.click(button); // Open dropdown
    expect(screen.queryByTestId("post-format-dropdown")).toBeInTheDocument();

    fireEvent.click(button); // Close dropdown
    expect(
      screen.queryByTestId("post-format-dropdown")
    ).not.toBeInTheDocument();
  });

  it("displays the correct icon based on the context", () => {
    renderWithPostFormatContext(<PostFormatFace />, { format: "Compact" });

    expect(screen.getByAltText("Compact format icon")).toBeInTheDocument();

    // Change the context value and re-render
    rerender(
      <PostFormatContext.Provider value={{ format: "Card" }}>
        <PostFormatFace />
      </PostFormatContext.Provider>
    );

    expect(screen.getByAltText("Card format icon")).toBeInTheDocument();
  });
});
