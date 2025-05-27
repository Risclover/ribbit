export const getIdFromName = (name, communities) => {
  let result = Object.values(communities).find(
    (community) => community.name === name
  );
  return result ? result.id : null;
};
