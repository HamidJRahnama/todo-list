import { createTheme } from "@mui/material/styles";

const themes = {
  light: createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f0f2f5",
        paper: "#ffffff",
        panel: "#d6e5fd",         
        rootBackground: "#fff", 
      },
      primary: { main: "#1976d2" },
      secondary: { main: "#979797ff" },
    },
  }),
  dark: createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#181818",       
        paper: "#1e1e1e",
        panel: "#2c2c3a",
        rootBackground: "#000000ff", 
      },
      primary: { main: "#90caf9" },
      secondary: { main: "#f48fb1" },
    },
  }),
green: createTheme({
  palette: {
    mode: "light",
    background: {
      rootBackground: "#09250d",     
      default: "#1f3a1d",            
      paper: "#2e4d2c",              
      panel: "#3f5f3d",              
    },
    primary: { main: "#43a047" },     
    secondary: { main: "#66bb6a" },   
  },
}),

};

export default themes;
