import React from "react";
import { Box, Typography } from "@mui/material";
import Task from "./Task";
import useStore from "../store/store";
import { useDroppable } from "@dnd-kit/core";

const CategoryColumn = ({ category, boardId, onToggleTask }) => {
  const { theme, themes } = useStore();
  const muiTheme = themes[theme];

  const { setNodeRef } = useDroppable({
    id: `category-${category.id}`,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: 260,
        bgcolor: muiTheme.palette.background.paper,
        borderRadius: 1,
        p: 1,
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        // overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "none", 
        "&::-webkit-scrollbar": {
          display: "none", 
        },

        
        position: "relative",
        "& > *": {
          flexShrink: 0,
        },

        // When a draggable item hovers, don’t let the box grow
        "&:has([data-dragging='true'])": {
          overflow: "hidden",
        },
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
          onToggle={() => onToggleTask(boardId, category.id, task.id)}
        />
      ))}
    </Box>
  );
};

export default CategoryColumn;