import React, { useEffect, useState } from "react";
import { validateImgPost } from "../../utils/validateImgPost";
import { validateLinkPost } from "../../utils/validateLinkPost";
import { validatePost } from "../../utils/validatePost";
import { v4 as uuidv4 } from "uuid";

export function CreatePostFormErrors({
  postType,
  community,
  title,
  linkUrl,
  imgUrl,
}) {
  const [linkErrors, setLinkErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleErrors = () => {
    switch (postType) {
      case "link":
        setLinkErrors(validateLinkPost(community, title, linkUrl));
      case "image":
        setImageErrors(validateImgPost(community, title, imgUrl));
      case "post":
        setErrors(validatePost(community, title));
      default:
        return null;
    }
  };

  useEffect(() => {
    handleErrors();
  }, [postType, title, community, linkUrl, imgUrl]);
  return (
    <div className="create-post-form-errors">
      {postType === "link" &&
        linkErrors.length > 0 &&
        linkErrors.map((error) => <div key={uuidv4()}>{error}</div>)}
      {postType === "image" &&
        imageErrors.length > 0 &&
        imageErrors.map((error) => <div key={uuidv4()}>{error}</div>)}

      {postType === "post" &&
        errors.length > 0 &&
        errors.map((error) => <div key={uuidv4()}>{error}</div>)}
    </div>
  );
}
