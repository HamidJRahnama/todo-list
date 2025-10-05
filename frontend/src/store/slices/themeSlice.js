
import themes from "../../theme";

export const createThemeSlice = (set) => ({
  theme: localStorage.getItem("appTheme") || "light", 
  themes,
  setTheme: (themeName) => {
    localStorage.setItem("appTheme", themeName);
    set({ theme: themeName });
  },
});
