import React from "react";
import { imgPostErrors } from "../utils/validateImgPost";

export function CreatePostFormErrors({
  postType,
  linkErrors,
  imageErrors,
  errors,
}) {
  return (
    <div className="create-post-form-errors">
      {postType === "link" &&
        linkErrors.length > 0 &&
        linkErrors.map((error, idx) => <div key={idx}>{error}</div>)}
      {postType === "image" &&
        imageErrors.length > 0 &&
        imageErrors.map((error, idx) => <div key={idx}>{error}</div>)}

      {postType === "post" &&
        errors.length > 0 &&
        errors.map((error, idx) => <div key={idx}>{error}</div>)}
    </div>
  );
}
