import { useState } from "react";
import { Box, Checkbox, Paper, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTheme } from "@mui/material/styles";

const Task = ({ task, onToggle }) => {
  const [hover, setHover] = useState(false);
  const isHoverActive = hover || task.status === "done";
  const theme = useTheme();

  return (
    <Paper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        px: 1,
        py: 0.1,
        mb: 1,
        display: "flex",
        alignItems: "center",
        bgcolor: theme.palette.background.paper,
        transition: "all 0.2s",
      }}
    >
      <Checkbox
        size="small"
        checked={task.status === "done"}
        onChange={() => onToggle(task.id)}
        sx={{
          mr: 1,
          opacity: isHoverActive ? 1 : 0,
          transition: "opacity 0.2s",
          "& .MuiSvgIcon-root": { borderRadius: "50%" },
          color: theme.palette.primary.main,
        }}
      />
      <Typography
        sx={{
          wordBreak: "break-word",
          flex: 1,
          textDecoration: task.status === "done" ? "line-through" : "none",
          color: task.status === "done" ? theme.palette.text.disabled : theme.palette.text.primary,
        }}
      >
        {task.title}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5, opacity: isHoverActive ? 1 : 0, transition: "opacity 0.2s", color: theme.palette.text.primary }}>
        <BorderColorIcon sx={{ fontSize: "16px" }} />
      </Box>
    </Paper>
  );
};

export default Task;
