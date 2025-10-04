// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import useStore from "./store/store";
import themes from "./theme";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dragndrop from "./pages/Dragndrop.jsx"

function App() {
  const { theme, themes } = useStore();  // اسم تم فعلی
  const muiTheme = themes[theme];

  const isAuthenticated = true; // بعدا با Zustand مدیریت می‌کنیم

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* ریست رنگ و بک‌گراند */}
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: muiTheme.palette.background.rootBackground, // بک‌گراند کل روت
        }}
      >
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/drag"
              element={<Dragndrop/>}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
