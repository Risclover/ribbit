import React from "react";
import PostTypeBtn from "./PostTypeBtn";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";

export default function PostTypeBar({ postType, setPostType }) {
  return (
    <div className="post-type-bar">
      <PostTypeBtn type="post" postType={postType} setPostType={setPostType}>
        <CgNotes /> Post
      </PostTypeBtn>
      <PostTypeBtn type="image" postType={postType} setPostType={setPostType}>
        <RxImage /> Image
      </PostTypeBtn>
      <PostTypeBtn type="link" postType={postType} setPostType={setPostType}>
        <FiLink /> Link
      </PostTypeBtn>
    </div>
  );
}
