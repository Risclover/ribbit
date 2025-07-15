import { useAppDispatch } from "@/store";
import { searchPostComments } from "@/store";

/**
 * Logic for CommentSearch component
 */
export function useCommentSearch({
  setSearchValue,
  searchValue,
  inputRef,
  setSearchActive,
  setSearchQuery,
  post,
}) {
  const dispatch = useAppDispatch();

  const handleDismiss = (e) => {
    e.preventDefault();
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleEnter = async (e) => {
    e.preventDefault();

    const trimmed = searchValue.trim();
    if (trimmed.length > 0) {
      await dispatch(searchPostComments(post.id, trimmed));
      setSearchValue(trimmed);
      setSearchActive(true);
      setSearchQuery(trimmed);
    }
  };
  return { handleDismiss, handleEnter };
}
