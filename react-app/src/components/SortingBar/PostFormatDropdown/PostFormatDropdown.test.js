import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PostFormatDropdown } from "./PostFormatDropdown";

const mockSetShowDropdown = jest.fn();
const mockSetActive = jest.fn();
const mockSetHighlight = jest.fn();
const mockSetFormat = jest.fn();

jest.mock("@/hooks/useButtonState", () => ({
  useButtonState: () => ({
    active: false,
    setActive: mockSetActive,
    highlight: false,
    setHighlight: mockSetHighlight,
    setFormat: mockSetFormat,
  }),
}));

const mockFormats = [
  {
    format: "Card",
    icons: {
      blue: "http://localhost/card-blue.png",
      black: "http://localhost/card-icon-thicker.png",
      grey: "http://localhost/card-grey-thicker.png",
    },
  },

  {
    format: "Classic",
    icons: {
      blue: "http://localhost/classic-blue-wide.png",
      black: "http://localhost/classic-icon-thick.png",
      grey: "http://localhost/classic-icon-thick-grey.png",
    },
  },
  {
    format: "Compact",
    icons: {
      blue: "http://localhost/compact-blue-thin.png",
      black: "http://localhost/compact-icon-thin.png",
      grey: "http://localhost/compact-grey-thin.png",
    },
  },
];

describe("PostFormatDropdown", () => {
  it("renders buttons for all formats", () => {
    const { getByText } = render(
      <PostFormatDropdown
        formats={mockFormats}
        setShowDropdown={mockSetShowDropdown}
      />
    );

    mockFormats.forEach((item) => {
      expect(getByText(item.format)).toBeInTheDocument();
    });
  });
});

describe("PostFormatDropdown - Keyboard Accessibility", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSetShowDropdown.mockClear();
    mockSetActive.mockClear();
    mockSetHighlight.mockClear();
    mockSetFormat.mockClear();
  });

  it("navigates between items with ArrowDown and ArrowUp", () => {
    const { getByTestId } = render(
      <PostFormatDropdown
        formats={mockFormats}
        setShowDropdown={mockSetShowDropdown}
      />
    );

    // Focus the first item initially
    const firstItem = getByTestId("dropdown-btn-Card");
    firstItem.focus();
    expect(document.activeElement).toBe(firstItem);

    // Simulate pressing ArrowDown, should focus the next item
    fireEvent.keyDown(document.activeElement, { key: "ArrowDown" });
    const secondItem = getByTestId("dropdown-btn-Classic");
    expect(document.activeElement).toBe(secondItem);

    // Simulate pressing ArrowUp, should focus back the first item
    fireEvent.keyDown(document.activeElement, { key: "ArrowUp" });
    expect(document.activeElement).toBe(firstItem);
  });

  it("closes the dropdown with the Escape key", () => {
    const { getByTestId } = render(
      <PostFormatDropdown
        formats={mockFormats}
        setShowDropdown={mockSetShowDropdown}
      />
    );

    // Assume dropdown is initially shown
    expect(getByTestId("post-format-dropdown")).toBeInTheDocument();

    // Simulate pressing Escape, should call setShowDropdown with false
    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockSetShowDropdown).toHaveBeenCalledWith(false);
  });
});
