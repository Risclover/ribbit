import React from "react";
import { UserResult } from "./UserResult";
import { NoResults } from "../NoResults";

export function UserResultType({ isLoading, query, users, focusSearchBox }) {
  if (isLoading) {
    return (
      <div>
        {Array(18)
          .fill(null)
          .map((_, i) => (
            <UserResult.Skeleton key={i} />
          ))}
      </div>
    );
  } else if (users.length === 0) {
    return <NoResults query={query} focusSearchBox={focusSearchBox} />;
  } else {
    return users.map((user) => <UserResult key={user.id} user={user} />);
  }
}
