import React from "react";

export default function LoadingEllipsis({ loader }) {
  return (
    <>
      {loader && (
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
}
