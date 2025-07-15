import { fromNowLocal } from "@/utils/fromNowLocal";

export function convertTime(comment, type = "create") {
  const ts = type === "edit" ? comment?.updatedAt : comment?.createdAt;
  return fromNowLocal(ts, "en-comment");
}
