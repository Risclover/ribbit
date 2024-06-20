import React, { useState } from "react";

export const PostFormatContext = React.createContext({ format: "Card" });

export default function PostFormatProvider() {
  return <div>PostFormat</div>;
}

export const PostFormat = () => {
  const [format, setFormat] = useState();

  return (
    <PostFormatContext.Provider value={{ format, setFormat }}>
      {children}
    </PostFormatContext.Provider>
  );
};
