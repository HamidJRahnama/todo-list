import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useStore from "../store/store";
import Board from "./Board";

const RightPanel = () => {
  const { boards, theme, themes } = useStore();
  const board = boards[0]; 
  const muiTheme = themes[theme];

  return (
    <Box
      sx={{
        width: "77%",
        height: "92%",
        borderRadius: "10px 10px ",
        overflow: "hidden",
        bgcolor: muiTheme.palette.background.default,
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
          {/* <IconButton size="small" sx={{ color: muiTheme.palette.text.primary }}>
            <AddIcon />
          </IconButton> */}
        </Box>

        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
        </Box> */}
      </Box>

      {/* Board */}
      <Board board={board} />
    </Box>
  );
};

export default RightPanel;
