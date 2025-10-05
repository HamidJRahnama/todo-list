import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Task from "./Task";
import EditTaskForm from "./EditTaskForm";
import useStore from "../store/store";
import { useDroppable } from "@dnd-kit/core";

const CategoryColumn = ({ category, boardId, onToggleTask }) => {
  const { theme, themes, editBoardTask } = useStore();
  const muiTheme = themes[theme];
  const [editingTask, setEditingTask] = useState(null);
  const taskRefs = useRef({}); // store refs for tasks

  const { setNodeRef } = useDroppable({
    id: `category-${category.id}`,
  });

  const handleSaveTask = (taskId, newTitle) => {
    editBoardTask(boardId, category.id, taskId, newTitle);
    setEditingTask(null);
  };

  const handleCancelEdit = () => setEditingTask(null);

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
        overflowX: "hidden",
        position: "relative",
        "& > *": { flexShrink: 0 },
        "&:has([data-dragging='true'])": { overflow: "hidden" },
      }}
    >
      <Typography fontWeight="bold" mb={1} color={muiTheme.palette.text.primary}>
        {category.name}
      </Typography>

      {category.tasks.map((task) => (
        <Box key={task.id} sx={{ position: "relative" }} ref={(el) => (taskRefs.current[task.id] = el)}>
          <Task
            task={task}
            onToggle={() => onToggleTask(boardId, category.id, task.id)}
            onEdit={() => setEditingTask(task)}
          />

          {/* Inline Edit Form */}
          {editingTask?.id === task.id && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
              }}
            >
              <EditTaskForm
                title={editingTask.title}
                onSave={(newTitle) => handleSaveTask(task.id, newTitle)}
                onCancel={handleCancelEdit}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CategoryColumn;
