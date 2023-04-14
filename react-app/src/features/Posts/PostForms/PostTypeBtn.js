import React from "react";

export default function PostTypeBtn({ children, type, postType, setPostType }) {
  const handlePostType = (e, type) => {
    e.preventDefault();
    setPostType(type);
  };
  return (
    <button
      className={
        postType === type ? "post-type-post active-type" : "post-type-post"
      }
      onClick={(e) => handlePostType(e, type)}
    >
      {children}
    </button>
  );
}
