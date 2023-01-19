import React from "react";
import { useParams } from "react-router-dom";

export default function CreateCommunityPost() {
  const { communityId } = useParams();

  return <div className="create-community-post-page"></div>;
}
