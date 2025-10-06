
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import useStore from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const { theme, themes } = useStore();  
  const muiTheme = themes[theme];

  const isAuthenticated = true; 

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline /> 
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: muiTheme.palette.background.rootBackground, 
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
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
