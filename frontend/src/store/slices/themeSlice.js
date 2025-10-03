// store/slices/themeSlice.js
import themes from "../../theme";

export const createThemeSlice = (set) => ({
  theme: localStorage.getItem("appTheme") || "light", // مقدار ذخیره‌شده
  themes,
  setTheme: (themeName) => {
    localStorage.setItem("appTheme", themeName);
    set({ theme: themeName });
  },
});
