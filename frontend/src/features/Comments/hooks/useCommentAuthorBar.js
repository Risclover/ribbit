import { useSelector } from "react-redux";
import { convertTime } from "../utils/convertTime";

export function useCommentAuthorBar({ comment }) {
  const communities = useSelector((state) => Object.values(state.communities));
  const post = useSelector((state) => state.posts[comment?.postId]);

  const editedTime = convertTime(comment, "edit");
  const commentTime = convertTime(comment);
  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  const isOP = post?.author?.username === comment?.commentAuthor?.username;
  const isMOD = comment?.userId === communities[post?.community.id]?.userId;

  return { editedTime, commentTime, wasEdited, isOP, isMOD };
}
