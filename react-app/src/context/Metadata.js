import React, { createContext, useState, useContext } from "react";

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({});
  console.log("key:", process.env.REACT_APP_LINK_PREVIEW_KEY);
  console.log("KEYY:", REACT_APP_LINK_PREVIEW_KEY);

  const fetchMetadata = (url) => {
    if (!metadata[url]) {
      fetch("https://api.linkpreview.net", {
        method: "POST",
        headers: {
          "X-Linkpreview-Api-Key": `f7d9b6f0db216f15c913946daf46eb38`,
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
