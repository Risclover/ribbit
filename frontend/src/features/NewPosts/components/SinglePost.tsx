import { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PostFormatContext } from "@/context";
import { RootState } from "@/store";

import CardPostFormat from "./CardPostFormat";
import ClassicPostFormat from "./ClassicPostFormat";
import CompactPostFormat from "./CompactPostFormat";

/* ───────────────────────── Types ───────────────────────── */

type Post = RootState["posts"][string];
type PageKind = "profile" | "singlepage" | string;

export interface SinglePostProps {
  link?: string;
  id: number | string;
  isPage?: PageKind;
  post: Post;
  handleCommentsBtnClick?: () => void;
}

/* ───────────────────────── Component ───────────────────── */

export const SinglePost: FC<SinglePostProps> = ({
  link,
  id,
  isPage,
  post,
  handleCommentsBtnClick,
}) => {
  const history = useHistory();
  const { format, setFormat } = useContext(PostFormatContext);

  /* initialise format once on mount */
  useEffect(() => {
    if (isPage === "singlepage") {
      setFormat("Card");
      return;
    }

    const stored = localStorage.getItem("selectedPostFormat") as
      | "Card"
      | "Classic"
      | "Compact"
      | null;

    setFormat(stored ?? "Card");
  }, [isPage, setFormat]);

  return (
    <article className="single-post">
      <span
        onClick={() => history.push(`/posts/${post.id}`)}
        /* Keep Card posts keyboard-focusable, others not */
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
          <CompactPostFormat post={post} id={id} isPage={isPage} />
        )}
      </span>
    </article>
  );
};
