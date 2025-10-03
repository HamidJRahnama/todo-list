import { createTheme } from "@mui/material/styles";

const themes = {
  light: createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f0f2f5",      // روت فرانت (جدید و ملایم)
        paper: "#ffffff",         // کارت‌ها یا فرم‌ها
        panel: "#d6e5fd",         // Left/Right Panel
        rootBackground: "#fff", // پراپرتی جدید برای کل روت
      },
      primary: { main: "#1976d2" },
      secondary: { main: "#979797ff" },
    },
  }),
  dark: createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#181818",       // روت فرانت
        paper: "#1e1e1e",
        panel: "#2c2c3a",
        rootBackground: "#000000ff", // پراپرتی جدید
      },
      primary: { main: "#90caf9" },
      secondary: { main: "#f48fb1" },
    },
  }),
green: createTheme({
  palette: {
    mode: "light",
    background: {
      rootBackground: "#09250d",      // سبز تیره و غنی
      default: "#1f3a1d",             // روشن‌تر از rootBackground ولی تیره و هماهنگ
      paper: "#2e4d2c",               // کارت‌ها و فرم‌ها، کمی ملایم‌تر
      panel: "#3f5f3d",               // پنل‌ها، کمی روشن‌تر
    },
    primary: { main: "#43a047" },     // سبز زنده
    secondary: { main: "#66bb6a" },   // سبز ملایم‌تر برای accents
  },
}),

};

export default themes;
