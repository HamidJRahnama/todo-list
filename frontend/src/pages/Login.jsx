import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import useStore from "../store/store";

const Login = () => {
  const navigate = useNavigate();
  const { theme, themes } = useStore();
  const muiTheme = themes[theme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // it must connect to backend with Axios
    console.log({ email, password });
    navigate("/dashboard"); // after login
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: muiTheme.palette.background.rootBackground || muiTheme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 360,
          p: 3,
          borderRadius: "16px",
          bgcolor: muiTheme.palette.background.panel,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: `linear-gradient(rgba(255,255,255,0.6), ${muiTheme.palette.background.panel})`,
            backdropFilter: "blur(6px)",
            p: 2,
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please login to your account
          </Typography>
        </Box>

        
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: muiTheme.palette.primary.main,
              "&:hover": { bgcolor: muiTheme.palette.primary.dark },
            }}
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: muiTheme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
