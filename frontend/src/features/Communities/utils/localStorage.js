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

export const getSidebarState = () => {
  try {
    const sidebarState = localStorage.getItem("sidebar-state");
    return sidebarState ? JSON.parse(sidebarState) : null;
  } catch (error) {
    console.error(
      "Failed to retrieve state of sidebar from localStorage:",
      error
    );
    return null;
  }
};

export const setSidebarState = (state) => {
  try {
    localStorage.setItem("sidebar-state", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to set sidebar state in localStorage:", error);
  }
};
