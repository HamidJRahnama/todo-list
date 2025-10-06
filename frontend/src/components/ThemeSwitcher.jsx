import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useStore from "../store/store";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useStore();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Tooltip title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          transition: "all 0.3s ease",
          transform: "scale(1)",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: "action.hover",
          },
          color: theme === "light" ? "orange" : "skyblue",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.4s ease, opacity 0.4s ease",
            transform: theme === "light" ? "rotate(0deg)" : "rotate(180deg)",
            opacity: 1,
          }}
        >
          {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
        </span>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher;
