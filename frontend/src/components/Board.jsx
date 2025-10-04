import React from "react";
import { Box, Typography } from "@mui/material";
import Task from "./Task";
import useStore from "../store/store";

const Board = ({ board }) => {
  const { toggleBoardTaskStatus, theme, themes } = useStore();
  const muiTheme = themes[theme];

  return (
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
            bgcolor: muiTheme.palette.background.paper,
            borderRadius: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          <Typography
            fontWeight="bold"
            mb={1}
            color={muiTheme.palette.text.primary}
          >
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
  );
};

export default Board;
