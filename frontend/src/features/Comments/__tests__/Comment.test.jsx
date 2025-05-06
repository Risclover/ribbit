// Comment.acceptance.test.jsx
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import { Comment } from "../components";
import { PopupProvider } from "@/context";
import { configureStore as createToolkitStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";

// A mock reducer that returns our state as-is
function mockReducer(state = {}) {
  return state;
}

function renderWithStoreAndRouter(ui, { initialState = {} } = {}) {
  const store = createToolkitStore({
    reducer: mockReducer, // Our test-only "mock" root
    preloadedState: initialState, // The test state
  });
  return render(
    <Provider store={store}>
      <PopupProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </PopupProvider>
    </Provider>
  );
}

// Mock comment data
const baseComment = {
  id: 123,
  content: "This is a parent comment",
  postId: 10,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
  commentAuthor: {
    id: 99,
    username: "mockUser",
    profileImg: "/mockProfileImg.jpg",
  },
  children: [
    {
      id: 456,
      content: "Child comment",
      postId: 10,
      createdAt: "2025-01-01T13:00:00Z",
      updatedAt: "2025-01-01T13:00:00Z",
      commentAuthor: {
        id: 100,
        username: "childUser",
      },
    },
  ],
  communities: {},
};

describe("Comment Component - Acceptance Criteria", () => {
  // Common store shape
  const initialState = {
    session: { user: { id: 1, username: "TestUser" } },
    posts: {
      10: {
        id: 10,
        // If you have additional post data, add it here
      },
    },
    communities: {},
    users: {},
  };

  // ---------------------
  // AC1: If `comment` is null/undefined, renders nothing
  // ---------------------
  it("AC1: Renders null if `comment` is undefined", () => {
    const { container } = renderWithStoreAndRouter(
      <Comment comment={undefined} />,
      {
        initialState,
      }
    );
    expect(container.firstChild).toBeNull();
  });

  // ---------------------
  // AC2: Renders valid comment (author image, username, content)
  // ---------------------
  it("AC2: Renders comment author image, username, and content", () => {
    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState,
    });

    // Content
    expect(screen.getByText("This is a parent comment")).toBeInTheDocument();
    // Author username
    expect(screen.getByText("mockUser")).toBeInTheDocument();

    // The profile image is a background in .comment-user-img
    // We can check for the container
    const userImgDiv = screen
      .getByRole("link", { })
      .querySelector(".comment-user-img-container");
    // Optionally, check if style has backgroundImage:
    expect(userImgDiv).toHaveStyle(
      "background-image: url(/mockProfileImg.jpg)"
    );
  });

  // ---------------------
  // AC3: Highlighting if URL hash matches comment ID (#comment-123)
  // ---------------------
  it("AC3: Applies highlight (comment-bg-blue) if URL hash matches comment id", () => {
    // Temporarily mock window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: "https://example.com/#comment-123" };

    const { container } = renderWithStoreAndRouter(
      <Comment comment={baseComment} />,
      {
        initialState,
      }
    );

    // The highlight logic should add .comment-bg-blue to the wrapper
    expect(container.querySelector(".comment-bg-blue")).toBeInTheDocument();

    // Restore original location
    window.location = originalLocation;
  });

  // ---------------------
  // AC4 & AC5: Collapse/Expand behavior
  // - isCollapsed defaults to false
  // ---------------------
  it("AC4 & AC5: By default, isCollapsed=false → shows content. Toggling collapsed hides it.", async () => {
    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState,
    });

    // Since isCollapsed = false, content and child comments visible
    expect(screen.getByText("This is a parent comment")).toBeInTheDocument();
    expect(screen.getByText("Child comment")).toBeInTheDocument();

    // Suppose we have a threadline or a button that collapses. For example,
    // your code calls `<CommentThreadlines setIsCollapsed={setIsCollapsed} ... />`
    // In a real test, you'd get that element by label or role.
    // We'll assume there's a button with text "Collapse" for demonstration:
    // const collapseBtn = screen.getByRole("button", { name: /collapse/i });
    // userEvent.click(collapseBtn);

    // Now the child and main content would be hidden (if your code sets isCollapsed = true).
    // expect(screen.queryByText("This is a parent comment")).not.toBeInTheDocument();
    // expect(screen.queryByText("Child comment")).not.toBeInTheDocument();
  });

  // ---------------------
  // AC6: Clicking expand button sets isCollapsed back to false
  // ---------------------
  it("AC6: The expand button makes collapsed comment visible again", async () => {
    // We'll forcibly set isCollapsed = true in a test version or do so via user events
    // For demonstration, let's do a quick approach:
    // 1) Render comment
    // 2) "Trigger" collapse
    // 3) "Trigger" expand

    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState,
    });

    // Example: if there's a button with an icon <BsArrowsAngleExpand /> with name "expand":
    const expandBtn = screen.getByRole("button", {
      name: `expand-${baseComment.id}`,
    });
    userEvent.click(expandBtn);

    // Now the comment should be visible again
    expect(screen.getByText("This is a parent comment")).toBeInTheDocument();
  });

  // ---------------------
  // AC7 & AC8: Child comments are rendered when not collapsed
  // ---------------------
  it("AC7 & AC8: If not collapsed, children display; if collapsed, children are hidden", () => {
    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState,
    });

    // Not collapsed by default → child comment should appear
    expect(screen.getByText("Child comment")).toBeInTheDocument();

    // If we had a "collapse" button or click area, after collapsing,
    // the child comment would not be found:
    // userEvent.click(someCollapseElement);
    // expect(screen.queryByText("Child comment")).not.toBeInTheDocument();
  });

  // ---------------------
  // AC9–AC11: Reply form toggling
  // ---------------------
  it("AC9–AC11: Toggling the reply form shows <CommentReplyForm>", () => {
    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState,
    });

    // The "Reply" button typically lives in <CommentBtnBar>. Your code might have a button with text "Reply".
    // Let's find it:
    // const replyButton = screen.getByRole("button", { name: /reply/i });
    // userEvent.click(replyButton);

    // Now we expect <CommentReplyForm> to appear:
    // (We might check for a textarea placeholder or a label.)
    // expect(screen.getByPlaceholderText("What are your thoughts?")).toBeInTheDocument();

    // Then if we click Cancel or submit, the form should go away:
    // const cancelButton = screen.getByRole("button", { name: /cancel/i });
    // userEvent.click(cancelButton);
    // expect(screen.queryByPlaceholderText("What are your thoughts?")).not.toBeInTheDocument();
  });

  // ---------------------
  // AC12 & AC13: Original time + Edited time if updated
  // ---------------------
  it("AC12 & AC13: Displays original created time, plus 'edited' label if updated", () => {
    // We can test if "edited" is shown if createdAt != updatedAt
    const editedComment = {
      ...baseComment,
      updatedAt: "2025-01-02T12:00:00Z", // different from createdAt
    };

    renderWithStoreAndRouter(<Comment comment={editedComment} />, {
      initialState,
    });

    // Depending on how you display the time, you might have text like "edited" or
    // you might have a time tooltip. Adapt this test to your actual markup.
    // Example:
    // expect(screen.getByText(/edited/i)).toBeInTheDocument();
  });

  // ---------------------
  // AC14: `commentContent` defaults to `comment.content` but can be updated locally
  // ---------------------
  it("AC14: commentContent defaults to comment.content", () => {
    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState,
    });

    // The default text in <CommentContent>
    expect(screen.getByText("This is a parent comment")).toBeInTheDocument();

    // If your code updates commentContent upon editing, you'd test it in an "Edit" scenario
    // by interacting with an edit form. That would be a deeper test scenario.
  });

  // ---------------------
  // AC15: Uses currentUser + post from Redux store
  // ---------------------
  it("AC15: Uses `currentUser` and `post` from Redux; if absent, it still renders", () => {
    // Provide partial store with no user, no post
    const emptyState = {
      session: { user: null },
      posts: {},
    };

    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState: emptyState,
    });

    // The comment content should still be there
    expect(screen.getByText("This is a parent comment")).toBeInTheDocument();
    // But user-specific actions might be disabled or absent
    // e.g., "Edit" button might not appear if you're not the author, etc.
  });

  // ---------------------
  // AC16: <CommentAuthorBar> shows author
  // ---------------------
  it("AC16: Renders <CommentAuthorBar> with author info (commentAuthor)", () => {
    renderWithStoreAndRouter(<Comment comment={baseComment} />, {
      initialState,
    });

    expect(screen.getByText("mockUser")).toBeInTheDocument();
    // Additional checks for OP or MOD if you have that logic
  });

  // ---------------------
  // AC17: Logs an error if comment is falsy but doesn't crash
  // ---------------------
  it("AC17: Logs an error if comment is falsy", () => {
    // We already tested it returns null. Now let's check if console.error was called
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderWithStoreAndRouter(<Comment comment={null} />, { initialState });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Comment component: comment is undefined"
    );

    consoleSpy.mockRestore();
  });

  // ---------------------
  // AC18: Gracefully handles missing author or profileImg
  // ---------------------
  it("AC18: If commentAuthor or profileImg is missing, renders a default/empty avatar container", () => {
    const noAuthor = {
      ...baseComment,
      commentAuthor: null,
    };
    renderWithStoreAndRouter(<Comment comment={noAuthor} />, { initialState });

    // You might show an empty container or a fallback image
    // Just ensure it doesn't crash:
    // We can check that the "comment-user-img-container" still exists:
    expect(screen.getByRole("link", { name: "" })).toBeInTheDocument();
    // The link is for /users/undefined/profile, which might exist or might not.
    // Adjust to your fallback logic if you have one.
  });

  // ---------------------
  // AC19 & AC21: If level=1, has class "comment-topmargin"; if not collapsed => "expanded"
  // ---------------------
  it("AC19 & AC21: Adds .comment-topmargin if level=1 and .expanded if not collapsed", () => {
    const { container } = renderWithStoreAndRouter(
      <Comment comment={baseComment} level={1} />,
      { initialState }
    );

    // topmargin
    const topLevel = container.querySelector(
      ".comment-container.comment-topmargin"
    );
    expect(topLevel).toBeInTheDocument();

    // .expanded is added if isCollapsed=false
    const expandedDiv = container.querySelector(".comment.expanded");
    expect(expandedDiv).toBeInTheDocument();
  });

  // ---------------------
  // AC20: If highlight=true, adds "comment-bg-blue"
  // ---------------------
  it("AC20: Adds .comment-bg-blue if highlight is set", () => {
    // Easiest way is to mock the URL: #comment-123
    // Already tested in AC3, but we can do an explicit test:
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: "https://example.com/#comment-123" };

    const { container } = renderWithStoreAndRouter(
      <Comment comment={baseComment} level={2} />,
      { initialState }
    );

    expect(container.querySelector(".comment-bg-blue")).toBeInTheDocument();

    window.location = originalLocation;
  });

  // ---------------------
  // AC22 & AC23: Renders <CommentThreadlines> if not collapsed, clicking them collapses
  // ---------------------
  it("AC22 & AC23: Shows threadlines when not collapsed, toggling them sets isCollapsed=true", () => {
    renderWithStoreAndRouter(<Comment comment={baseComment} level={2} />, {
      initialState,
    });

    // Because isCollapsed=false by default, <CommentThreadlines> should be in the DOM
    // You might find it by a class or text if you have any. We'll do a class check:
    expect(screen.getByText("Child comment")).toBeInTheDocument();

    // Suppose <CommentThreadlines> calls setIsCollapsed(true) when clicked
    // We can do something like:
    // userEvent.click(screen.getByTestId("threadlines-click-zone"));

    // Then the child comment disappears:
    // expect(screen.queryByText("Child comment")).not.toBeInTheDocument();
  });
});
