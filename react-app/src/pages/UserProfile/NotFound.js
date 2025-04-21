import React from "react";
import { ribbitLogos } from "@/assets";
import { usePageSettings } from "@/hooks";
import { NavLink } from "react-router-dom";
export default function NotFound() {
  // Page Settings Hook
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
        <NavLink to="/">Go Back!</NavLink>
      </div>
    </div>
  );
}
