import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Task from "./Task";
import EditTaskForm from "./EditTaskForm";
import { useDroppable } from "@dnd-kit/core";
import { useTheme } from "@mui/material/styles";

const TaskColumn = ({
  column,
  onToggleTask,
  onEditTask,
  editingTask,
  onAddTask,
  newTaskTitle,
  onNewTaskTitleChange,
  onCancelAdd,
  onSaveEdit,
  onCancelEdit,
}) => {
  const theme = useTheme();

  // ✅ هوک در سطح بالای کامپوننت فراخوانی شده است. این کار صحیح است.
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: column.type === "inbox" ? "30%" : "260px",
        height: "92%",
        p: 2,
        borderRadius: "10px 10px",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
        borderRight:
          column.type === "inbox"
            ? `1px solid ${theme.palette.divider}`
            : "none",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          p: 1,
          bgcolor: "rgba(187, 187, 187, 0.44)",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <Typography variant="h6" color={theme.palette.text.primary}>
          {column.name}
        </Typography>
      </Box>

      <Box sx={{ height: "48px" }} />

      {/* Add Task Form (فقط برای اینباکس) */}
      {column.type === "inbox" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1 }}>
          <TextField
            label="Card Title"
            size="small"
            value={newTaskTitle}
            onChange={onNewTaskTitleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: theme.palette.text.primary,
                "& fieldset": { borderColor: theme.palette.divider },
              },
              "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={onAddTask}>
              Add Card
            </Button>
            <Button variant="text" onClick={onCancelAdd}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {/* Tasks List */}
      <Box
        sx={{
          pt: 1,
          flex: 1,
          overflowY: "auto",
          borderTop: `1px solid ${theme.palette.divider}`,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {column.tasks.length === 0 ? (
          <Typography variant="body2" color={theme.palette.text.secondary}>
            No cards yet
          </Typography>
        ) : (
          column.tasks.map((task) => (
            <Box key={task.id} sx={{ position: "relative" }}>
              <Task
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onEdit={() => onEditTask(task)}
              />
              {/* Edit Task Form (برای تمام ستون‌ها) */}
              {editingTask?.id === task.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    bgcolor: theme.palette.background.paper,
                    p: 0.5,
                  }}
                >
                  <EditTaskForm
                    title={editingTask.title}
                    onSave={(newTitle) => onSaveEdit(editingTask.id, newTitle)}
                    onCancel={onCancelEdit}
                  />
                </Box>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default TaskColumn;