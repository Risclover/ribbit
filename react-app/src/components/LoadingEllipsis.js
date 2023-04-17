import React from "react";

export default function LoadingEllipsis({ loader }) {
  return (
    <div className="loading-component">
      {loader && (
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}
