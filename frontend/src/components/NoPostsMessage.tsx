type Props = {
  type: string;
};

export function NoPostsMessage({ type }: Props) {
  return (
    <div className="no-posts-div-container">
      <div className="no-posts-div"></div>
      <div className="no-posts-div-txt">
        {type === "all" ? (
          <>
            <p>Sorry - there are no posts on Ribbit right now!</p>
          </>
        ) : (
          <>
            <i className="fa-solid fa-people-group"></i>
            <h1>No Subscriptions Yet</h1>
            <p>
              Explore the All feed or the Communities Directory to discover new
              communities.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
