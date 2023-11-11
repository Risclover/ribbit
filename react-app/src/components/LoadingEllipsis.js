import React from "react";

export function LoadingEllipsis({ loader }) {
  return (
    <div className="loading-component">
      {loader && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}
