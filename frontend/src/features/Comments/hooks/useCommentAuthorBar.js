import { useAppSelector } from "@/store";
import { convertTime } from "../utils/convertTime";

export function useCommentAuthorBar({ comment }) {
  const communities = useAppSelector((state) =>
    Object.values(state.communities.communities)
  );
  const post = useAppSelector((state) => state.posts.posts[comment?.postId]);
  const community = useAppSelector(
    (state) => state.communities.communities[post?.community?.id]
  );
  const postAuthor = useAppSelector(
    (state) => state.users.users[post?.authorId]
  );
  const editedTime = convertTime(comment, "edit");
  const commentTime = convertTime(comment);
  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  const isOP = postAuthor.username === comment?.commentAuthor?.username;
  const isMOD = comment?.userId === communities[post?.communityId]?.userId;

  return { editedTime, commentTime, wasEdited, isOP, isMOD };
}
