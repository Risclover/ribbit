import { renderHook } from "@testing-library/react-hooks";
import { useOutsideClick } from "./useOutsideClick";
import { fireEvent } from "@testing-library/react";

describe("useOutsideClick", () => {
  it("calls handler on outside click", () => {
    const handler = jest.fn();

    // Mock ref with an element that would simulate being "outside"
    const mockRef = {
      current: document.createElement("div"),
    };

    // Use the `renderHook` method to test the hook with the mock ref and handler
    renderHook(() => useOutsideClick(mockRef, handler));

    // Simulate a click event on the document body, outside the mock ref's current element
    fireEvent.mouseDown(document.body);

    // Assert that the handler was called
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
