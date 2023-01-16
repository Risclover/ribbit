import React from "react";

export default function UpdateComment() {
  return (
    <div className="update-comment-container">
      <form className="update-comment-form" onSubmit={handleSubmit}></form>
    </div>
  );
}
