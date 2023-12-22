import React from "react";
import { CreatePostBar } from "../components";

export function Homepage() {
  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      {loader ? (
        <LoadingEllipsis loader={loader} />
      ) : (
        <div
          className={
            format === "Card" ? "posts-left-col" : "posts-left-col-alt"
          }
        >
          <CreatePostBar />
          {!noPosts && (
            <SortingBar sortMode={sortMode} setSortMode={setSortMode} />
          )}
          {noPosts && (
            <div className="no-posts-div">
              <i className="fa-solid fa-people-group"></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
