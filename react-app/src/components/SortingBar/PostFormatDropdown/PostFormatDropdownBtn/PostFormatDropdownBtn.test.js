import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PostFormatDropdownBtn } from "./PostFormatDropdownBtn";

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

describe("PostFormatDropdownBtn", () => {
  beforeEach(() => {
    // Clear all mock function data before each test
    mockSetShowDropdown.mockClear();
    mockSetActive.mockClear();
    mockSetHighlight.mockClear();
    mockSetFormat.mockClear();
  });

  const mockItem = {
    format: "Card",
    icons: {
      blue: "http://localhost/card-blue.png",
      black: "http://localhost/card-icon-thicker.png",
      grey: "http://localhost/card-grey-thicker.png",
    },
  };

  it("renders with correct format and grey icon by default", () => {
    const { getByText, getByAltText } = render(
      <PostFormatDropdownBtn
        item={mockItem}
        setShowDropdown={mockSetShowDropdown}
      />
    );

    expect(getByText(mockItem.format)).toBeInTheDocument();
    expect(
      getByAltText(`${mockItem.format.toLowerCase()} format icon`).src
    ).toContain(mockItem.icons.grey);
  });

  it("click event triggers setShowDropdown, setActive, and setFormat", () => {
    const { getByText } = render(
      <PostFormatDropdownBtn
        item={mockItem}
        setShowDropdown={mockSetShowDropdown}
      />
    );

    fireEvent.click(getByText(mockItem.format));
    expect(mockSetShowDropdown).toHaveBeenCalledWith(false);
    expect(mockSetActive).toHaveBeenCalledWith(true);
    expect(mockSetFormat).toHaveBeenCalledWith(mockItem.format);
  });

  it("mouse over and mouse leave trigger setHighlight", () => {
    const { getByText } = render(
      <PostFormatDropdownBtn
        item={mockItem}
        setShowDropdown={mockSetShowDropdown}
      />
    );

    const button = getByText(mockItem.format);
    fireEvent.mouseOver(button);
    expect(mockSetHighlight).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(button);
    expect(mockSetHighlight).toHaveBeenCalledWith(false);
  });
});
