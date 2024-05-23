import React, { useEffect } from "react";

export const PostPopup = ({ post }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--community-highlight",
      post.communitySettings[post.communityId].highlight
    );

    document.documentElement.style.setProperty(
      "--community-body-bg-img",
      `${post?.communitySettings[post?.communityId]?.bgColor} url(${
        post?.communitySettings[post?.communityId]?.backgroundImg
      }) no-repeat center / cover`
    );

    if (
      post?.communitySettings[post?.communityId]?.backgroundImgFormat === "fill"
    ) {
      document.documentElement.style.setProperty(
        "--community-body-bg-img",
        `${post?.communitySettings[post?.communityId]?.bgColor} url(${
          post?.communitySettings[post?.communityId]?.backgroundImg
        }) no-repeat center / cover`
      );
    } else if (
      post?.communitySettings[post?.communityId]?.backgroundImgFormat === "tile"
    ) {
      document.documentElement.style.setProperty(
        "--community-body-bg-img",
        `${post?.communitySettings[post?.communityId]?.bgColor} url(${
          post?.communitySettings[post?.communityId]?.backgroundImg
        }) repeat center top`
      );
    } else if (
      post?.communitySettings[post?.communityId]?.backgroundImgFormat ===
      "center"
    ) {
      document.documentElement.style.setProperty(
        "--community-body-bg-img",
        `${post?.communitySettings[post?.communityId]?.bgColor} url(${
          post?.communitySettings[post?.communityId]?.backgroundImg
        }) no-repeat center top`
      );
    }
  }, []);

  console.log("post?:", post);
  return <div>PostPopup</div>;
};
