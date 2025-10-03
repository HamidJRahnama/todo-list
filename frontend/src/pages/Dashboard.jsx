import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Header from "../components/Header";
import ThemeSwitcher from "../components/ThemeSwitcher";
// import LeftPanel from "./LeftPanel";
// import RightPanel from "./RightPanel";

const Dashboard = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header/>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "#1976d2",
          color: "#fff",
        }}
      >
        <Typography variant="h6">MyTodo</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src="https://via.placeholder.com/35" alt="profile" />
          <Box>
            <Typography variant="body1">John Doe</Typography>
            <Typography variant="body2">john@example.com</Typography>
          </Box>
        </Box>
      </Box> */}

      {/* Main Content */}
      <Box sx={{ display: "flex", flex: 1 ,padding:"10px" ,
    gap: 2,               // ← فاصله بین left و right
    height: "90vh",      // ارتفاع کل صفحه (یا والد)
    // p: 2,
    boxSizing: "border-box",
      }}>
        <LeftPanel />
        <RightPanel />
      </Box>
    </Box>
  );
};

export default Dashboard;
