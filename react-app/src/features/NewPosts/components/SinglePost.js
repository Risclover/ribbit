import { PostFormatContext } from "@/context";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CardPostFormat from "./CardPostFormat";
import ClassicPostFormat from "./ClassicPostFormat";
import CompactPostFormat from "./CompactPostFormat";

export function SinglePost({ link, id, isPage, post, handleCommentsBtnClick }) {
  const history = useHistory();
  const { format, setFormat } = useContext(PostFormatContext);

  useEffect(() => {
    if (isPage !== "profile") {
      if (localStorage.getItem("selectedPostFormat")) {
        const savedFormat = localStorage.getItem("selectedPostFormat");
        setFormat(savedFormat);
      } else {
        setFormat("Card");
      }
    }

    if (isPage === "singlepage") {
      setFormat("Card");
    }
  }, []);

  return (
    <article className="single-post">
      <span
        onClick={() => history.push(`/posts/${post.id}`)}
        tabIndex={format !== "Card" ? -1 : undefined}
      >
        {(isPage === "profile" || format === "Card") && (
          <CardPostFormat
            post={post}
            handleCommentsBtnClick={handleCommentsBtnClick}
            link={link}
            isPage={isPage}
          />
        )}
        {isPage !== "profile" && format === "Classic" && (
          <ClassicPostFormat post={post} id={id} isPage={isPage} />
        )}
        {isPage !== "profile" && format === "Compact" && (
          <CompactPostFormat id={id} isPage={isPage} post={post} />
        )}
      </span>
    </article>
  );
}
