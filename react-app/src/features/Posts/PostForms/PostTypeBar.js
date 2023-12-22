import React from "react";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { PostTypeBtn } from "./PostTypeBtn";

export function PostTypeBar({ postType, setPostType }) {
  const postTypes = [
    {
      type: "post",
      icon: <CgNotes />,
      txt: "Post",
    },
    {
      type: "image",
      icon: <RxImage />,
      txt: "Image",
    },
    {
      type: "link",
      icon: <FiLink />,
      text: "Link",
    },
  ];

  return (
    <div className="post-type-bar">
      {postTypes.map((type) => (
        <PostTypeBtn
          type={type.type}
          postType={postType}
          setPostType={setPostType}
        >
          {type.icon} {type.text}
        </PostTypeBtn>
      ))}
    </div>
  );
}
