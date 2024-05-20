const { useSelector } = require("react-redux");

export const getIdFromName = (name) => {
  const communities = useSelector((state) => state.communities);
  let result = Object.values(communities).find(
    (community) => community.name === name
  );
  return result ? result.id : null;
};
