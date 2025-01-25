import { NoResults } from "../NoResults";
import { PostResult } from "./PostResult";
import { v4 as uuidv4 } from "uuid";

export function PostResultType({ isLoading, posts, query, focusSearchBox }) {
  if (isLoading) {
    return (
      <div>
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <PostResult.PostSkeleton key={i} />
          ))}
      </div>
    );
  } else if (posts.length === 0) {
    return <NoResults query={query} focusSearchBox={focusSearchBox} />;
  } else {
    return posts?.map((post) => <PostResult key={uuidv4()} post={post} />);
  }
}
