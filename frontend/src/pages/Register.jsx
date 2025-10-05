import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // it must connect to backend with Axios
    console.log({ name, email, password });
    navigate("/login"); 
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffffff", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 360,
          p: 3,
          borderRadius: "16px",
          bgcolor: "#d6e5fd", 
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >

        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
            p: 2,
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please fill in the details to register
          </Typography>
        </Box>

        
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
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

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
