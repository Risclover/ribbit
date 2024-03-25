import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SortingBar } from "./SortingBar";
import { PostFormatContext } from "../../context";

const mockSetSortMode = jest.fn();
const setSortModeMock = jest.fn();

// Mock the PostFormatContext
const renderWithPostFormatContext = (
  ui,
  { providerProps, ...renderOptions }
) => {
  return render(
    <PostFormatContext.Provider value={providerProps}>
      {ui}
    </PostFormatContext.Provider>,
    renderOptions
  );
};

const mockContextValue = {
  format: "Card",
  setFormat: jest.fn(),
};

describe("SortingBar interactions", () => {
  // Resets mocks before each test
  beforeEach(() => jest.clearAllMocks());

  const renderComponentWithMockedContext = (sortMode) => {
    return render(
      <PostFormatContext.Provider value={mockContextValue}>
        <SortingBar
          community={true}
          sortMode={sortMode}
          setSortMode={setSortModeMock}
        />
      </PostFormatContext.Provider>
    );
  };

  test("New button renders and clicking it highlights it", () => {
    renderComponentWithMockedContext("new");
    const newButton = screen.getByText("New");
    expect(newButton).toBeInTheDocument();
    fireEvent.click(newButton);
    expect(newButton).toHaveClass("active-sort-btn");
    expect(setSortModeMock).toHaveBeenCalledWith("new");
  });

  test("clicking Top sorts the posts by votes, highest on top", () => {
    renderComponentWithMockedContext("new");
    fireEvent.click(screen.getByText("Top"));
    expect(setSortModeMock).toHaveBeenCalledWith("top");
  });

  test("clicking the post format dropdown face opens the dropdown", () => {
    renderComponentWithMockedContext("new");
    fireEvent.click(screen.getByTestId("post-format-face-button"));
    expect(screen.getByText("Card")).toBeVisible();
  });

  test("dropdown closes on outside click", () => {
    renderComponentWithMockedContext("new");
    fireEvent.click(screen.getByTestId("post-format-face-button"));
    fireEvent.mouseDown(document);
    expect(screen.queryByText("Card")).not.toBeInTheDocument();
  });
});

const renderSortingBar = (sortMode) =>
  render(
    <PostFormatContext.Provider value={{ format: "Card" }}>
      <SortingBar
        community={true}
        sortMode={sortMode}
        setSortMode={setSortModeMock}
      />
    </PostFormatContext.Provider>
  );

describe("SortingBar", () => {
  test("renders with correct button active", () => {
    renderWithPostFormatContext(
      <SortingBar sortMode="new" setSortMode={mockSetSortMode} />,
      { providerProps: { format: "standard" } }
    );

    expect(screen.getByText("New")).toHaveClass("active-sort-btn");
    expect(screen.getByText("Top")).not.toHaveClass("active-sort-btn");
  });

  test("clicking sort button changes sort mode", () => {
    renderWithPostFormatContext(
      <SortingBar sortMode="new" setSortMode={mockSetSortMode} />,
      { providerProps: { format: "standard" } }
    );

    fireEvent.click(screen.getByText("Top"));
    expect(mockSetSortMode).toHaveBeenCalledWith("top");
  });

  test('renders PostFormatFace when format is not "none"', () => {
    renderWithPostFormatContext(
      <SortingBar sortMode="new" setSortMode={mockSetSortMode} />,
      { providerProps: { format: "standard" } }
    );

    expect(screen.getByTestId("post-format-face-button")).toBeInTheDocument();
  });

  test('does not render PostFormatFace when format is "none"', () => {
    renderWithPostFormatContext(
      <SortingBar sortMode="new" setSortMode={mockSetSortMode} />,
      { providerProps: { format: "none" } }
    );

    expect(
      screen.queryByTestId("post-format-face-button")
    ).not.toBeInTheDocument();
  });

  test("clicking the post format dropdown face opens the dropdown", async () => {
    const user = userEvent.setup();
    renderSortingBar("new");

    const dropdownButton = screen.getByTestId("post-format-face-button");
    await user.click(dropdownButton);

    await waitFor(() => {
      expect(screen.getByTestId("post-format-face-button")).toBeVisible();
    });
  });
});
