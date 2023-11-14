import React from "react";
import CreatePostBar from "../components/CreatePostBar/CreatePostBar";

export default function Homepage() {
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
            <SortingBar
              sortMode={sortMode}
              setSortMode={setSortMode}
              setFormat={setFormat}
              format={format}
            />
          )}
          {noPosts && <div className="no-posts-div">
            <i className="fa-solid fa-people-group"></i>
            </div>}
        </div>
      )}
    </div>
  );
}
