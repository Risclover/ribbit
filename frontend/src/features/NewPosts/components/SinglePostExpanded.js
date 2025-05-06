import React from "react";
import parse from "html-react-parser";

export function SinglePostExpanded({ post }) {
  return (
    <div className="classic-post-expanded">
      {post.imgUrl ? (
        <div className="classic-post-expanded-img">
          <img src={post.imgUrl} alt="Post" />
        </div>
      ) : (
        <div className="classic-post-expanded-text">{parse(post.content)}</div>
      )}
    </div>
  );
}
