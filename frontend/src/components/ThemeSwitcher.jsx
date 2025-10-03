import React from "react";
import { Button } from "@mui/material";
import useStore from "../store/store";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useStore();

  return (
    <div>
      <Button onClick={() => setTheme("light")}>Light</Button>
      <Button onClick={() => setTheme("dark")}>Dark</Button>
      {/* <Button onClick={() => setTheme("green")}>Green</Button> */}
    </div>
  );
};

export default ThemeSwitcher;
