import Skeleton from "@mui/material/Skeleton";
import { useDarkMode } from "@/hooks";

export const CommentResultSkeleton = () => {
  const { theme } = useDarkMode();

  return (
    <div className="search-results-page-comment">
      <div className="comments-results-skeleton">
        <div className="comments-results-skeleton-top">
          <Skeleton
            variant="circular"
            height={20}
            width={20}
            animation="wave"
            sx={{ bgcolor: theme === "dark" && "grey.500" }}
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.75rem",
              bgcolor: theme === "dark" && "grey.500",
            }}
            width={200}
            animation="wave"
          />
        </div>
        <div className="comments-results-skeleton-title">
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.75rem",
              bgcolor: theme === "dark" && "grey.500",
            }}
            width={"80%"}
            animation="wave"
          />
        </div>
        <div className="comments-results-skeleton-comment">
          <div className="comments-results-skeleton-comment-left">
            <Skeleton
              variant="circular"
              height={20}
              width={20}
              animation="wave"
              sx={{ bgcolor: theme === "dark" && "grey.500" }}
            />
          </div>
          <div className="comments-results-skeleton-comment-right">
            <div className="comments-results-skeleton-comment-author-box">
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: theme === "dark" && "grey.500",
                }}
                width={100}
                animation="wave"
              />
              <div className="comments-results-skeleton-comment-body">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "1rem",
                    bgcolor: theme === "dark" && "grey.500",
                  }}
                  width={"100%"}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "1rem",
                    bgcolor: theme === "dark" && "grey.500",
                  }}
                  width={"80%"}
                  animation="wave"
                />
              </div>
              <div className="comments-results-skeleton-comment-upvotes">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "0.75rem",
                    bgcolor: theme === "dark" && "grey.500",
                  }}
                  width={50}
                  animation="wave"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="comments-results-skeleton-link">
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.75rem",
              bgcolor: theme === "dark" && "grey.500",
            }}
            width={75}
            animation="wave"
          />
        </div>
        <div className="comments-results-skeleton-bottom">
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.75rem",
              bgcolor: theme === "dark" && "grey.500",
            }}
            width={125}
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
};
