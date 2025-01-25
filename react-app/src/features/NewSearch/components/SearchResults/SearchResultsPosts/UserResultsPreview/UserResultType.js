import React from "react";
import { User } from "./User";

export function UserResultType({ isLoading, users }) {
  if (isLoading) {
    return (
      <div>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <User.UserSkeleton key={i} />
          ))}
      </div>
    );
  } else if (users.length === 0) {
    return <div className="no-results">No results</div>;
  } else {
    return users.map((user) => <User key={user.id} user={user} />).slice(0, 5);
  }
}
