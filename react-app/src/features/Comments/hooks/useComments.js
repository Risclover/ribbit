import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function useComments() {
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { postId } = useParams();

  const [sortedComments, setSortedComments] = useState(nestedComments || []);
  const [sortType, setSortType] = useState("New");
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [isLoaded, setIsLoaded] = useState(false);

  const commentIdPattern = /#comment-(\d+)/;

  const match = url.match(commentIdPattern);
  const commentUrl = match ? parseInt(match[1]) : null;

  const specificComment = commentUrl ? commentMap[commentUrl] : null;

  const url = window.location.href;

  const commentsState = useSelector((state) => state.comments);

  const { nestedComments, commentMap } = useMemo(() => {
    const commentsArray = Object.values(commentsState);
    const commentMap = {};

    commentsArray.forEach((comment) => {
      commentMap[comment.id] = { ...comment, children: [] };
    });

    const nestedComments = [];

    commentsArray.forEach((comment) => {
      const commentCopy = commentMap[comment.id];

      if (commentCopy.parentId) {
        if (commentMap[commentCopy.parentId]) {
          commentMap[commentCopy.parentId].children.push(commentCopy);
        } else {
          nestedComments.push(commentCopy);
        }
      } else {
        nestedComments.push(commentCopy);
      }
    });

    return { nestedComments, commentMap };
  }, [commentsState]);
}
