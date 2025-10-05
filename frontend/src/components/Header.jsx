import { Box, Typography, Avatar, useTheme, alpha } from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "60px",
        px: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        bgcolor: alpha(theme.palette.background.rootBackground, 0.7),
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Logo */}
      <Typography
        variant="h6"
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        MyTodo
      </Typography>

      <ThemeSwitcher />

      {/* Profile */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src="https://via.placeholder.com/35"
          alt="profile"
          sx={{ width: 35, height: 35 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", fontSize: "13px" }}>
          <Typography sx={{ fontWeight: "bold", lineHeight: 1 }}>
            John Doe
          </Typography>
          <Typography
            sx={{ color: "#555", fontSize: "12px", lineHeight: 1 }}
          >
            john@example.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
