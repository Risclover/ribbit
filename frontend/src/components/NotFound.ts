import React from "react";
import { useHistory } from "react-router-dom";
import { ribbitLogos } from "@/assets";
import { usePageSettings } from "@/hooks";

export function NotFound() {
  const history = useHistory();

  usePageSettings({
    documentTitle: "PAGE NOT FOUND",
    pageTitle: "PAGE NOT FOUND",
  });
  return (
    <div className="not-found-page">
      <img src={ribbitLogos.angry} />
      <div className="not-found-page-p">
        <p>page not found</p>
        <p>the page you requested does not exist</p>
        <button onClick={() => history.goBack()}>Go Back!</button>
      </div>
    </div>
  );
}
