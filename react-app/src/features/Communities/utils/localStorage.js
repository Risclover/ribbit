export const getCommunityThemes = () => {
  try {
    const themes = localStorage.getItem("community-themes");
    return themes ? JSON.parse(themes) : {};
  } catch (error) {
    console.error("Failed to parse community-themes from localStorage:", error);
    return {};
  }
};

export const setCommunityThemes = (themes) => {
  try {
    localStorage.setItem("community-themes", JSON.stringify(themes));
  } catch (error) {
    console.error("Failed to set community-themes in localStorage:", error);
  }
};
