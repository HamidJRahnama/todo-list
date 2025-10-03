import React from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Task from "./Task";
import useStore from "../store/store";

const RightPanel = () => {
  const { boards, toggleBoardTaskStatus, theme, themes } = useStore();
  const board = boards[0]; // فقط یک بورد فعلاً
  const muiTheme = themes[theme]; // تم فعلی

  return (
    <Box
      sx={{
        width: "77%",
        height: "92%",        
        borderRadius: "10px 10px ",
        overflow: "hidden",
        bgcolor: muiTheme.palette.background.default, // بک‌گراند پنل
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 1,
          p: 1,
          bgcolor: "rgba(187, 187, 187, 0.44)",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" color={muiTheme.palette.text.primary}>
            {board.name}
          </Typography>
          <IconButton size="small" sx={{ color: muiTheme.palette.text.primary }}>
            <AddIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" sx={{ color: muiTheme.palette.text.primary }}>
            <FilterListIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: muiTheme.palette.text.primary }}>
            <StarBorderIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: muiTheme.palette.text.primary }}>
            <ShareIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: muiTheme.palette.text.primary }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Categories */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 1,
          overflowX: "auto",
          alignItems: "flex-start",
          flex: 1,
          px: "16px",
          pb: "16px",
        }}
      >
        {board.categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              minWidth: 260,
              bgcolor: muiTheme.palette.background.paper, // رنگ کارت
              borderRadius: 1,
              p: 1,
              display: "flex",
              flexDirection: "column",
              maxHeight: "100%",
              overflowY: "auto",
            }}
          >
            <Typography fontWeight="bold" mb={1} color={muiTheme.palette.text.primary}>
              {category.name}
            </Typography>

            {category.tasks.map((task) => (
              <Task
                task={task}
                key={task.id}
                onToggle={() =>
                  toggleBoardTaskStatus(board.id, category.id, task.id)
                }
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RightPanel;
