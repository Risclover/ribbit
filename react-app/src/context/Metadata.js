import React, { createContext, useState, useContext, useEffect } from "react";

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({});

  const fetchMetadata = (url) => {
    if (!metadata[url]) {
      fetch("https://api.linkpreview.net", {
        method: "POST",
        headers: {
          "X-Linkpreview-Api-Key": `${process.env.REACT_APP_LINK_PREVIEW_KEY}`,
        },
        mode: "cors",
        body: JSON.stringify({ q: url }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMetadata((prev) => ({ ...prev, [url]: data.image }));
        });
    }
  };

  return (
    <MetadataContext.Provider value={{ metadata, fetchMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => useContext(MetadataContext);
