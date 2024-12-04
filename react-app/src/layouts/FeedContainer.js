import React, { useContext } from "react";
import { PostFormatContext } from "../context";
import "../features/Posts/Posts.css";

export function FeedContainer({ children }) {
  const { format } = useContext(PostFormatContext);
  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      {children}
    </div>
  );
}

export function FeedLeftColContainer({ children }) {
  const { format } = useContext(PostFormatContext);
  return (
    <div
      className={format === "Card" ? "posts-left-col" : "posts-left-col-alt"}
    >
      {children}
    </div>
  );
}

export function FeedRightColContainer({ children }) {
  return <div className="posts-right-col">{children}</div>;
}
