import React from "react";
import { useParams } from "react-router-dom";

export default function UpdatePost() {
  const { postId } = useParams();

  return (
    <div className="update-post-form-container">
      <form className="update-post-form"></form>
    </div>
  );
}
