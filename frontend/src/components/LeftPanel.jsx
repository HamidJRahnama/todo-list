import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import useStore from "../store/store";
import { useTheme } from "@mui/material/styles";
import { useDroppable } from "@dnd-kit/core";

const LeftPanel = () => {
  const theme = useTheme();
  const { inbox, addTaskToInbox, toggleInboxTaskStatus, editInboxTask } = useStore();

  const [taskTitle, setTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null); // currently editing task
  const taskRefs = useRef({}); // optional: to get task DOM position

  const { setNodeRef } = useDroppable({ id: "inbox" });

  // Add new task
  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;
    const newTask = { id: Date.now(), title: taskTitle, status: "in-progress" };
    addTaskToInbox(newTask);
    setTaskTitle("");
  };

  const handleCancelAdd = () => setTaskTitle("");

  // Save edited task
  const handleSaveTask = (newTitle) => {
    if (!editingTask) return;
    editInboxTask(editingTask.id, newTitle); // call store action to update task
    setEditingTask(null);
  };

  // Cancel editing
  const handleCancelEdit = () => setEditingTask(null);

  return (
    <Box
      sx={{
        width: "30%",
        height: "92%",
        p: 2,
        borderRadius: "10px 10px",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
        borderRight: `1px solid ${theme.palette.divider}`,
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
          Inbox
        </Typography>
      </Box>

      <Box sx={{ height: "48px" }} />

      {/* Add Task Form */}
      <AddTaskForm
        taskTitle={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onAddTask={handleAddTask}
        onCancel={handleCancelAdd}
      />

      {/* Tasks */}
      <Box
        ref={setNodeRef}
        sx={{
          pt: 1,
          flex: 1,
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
          borderTop: `1px solid ${theme.palette.divider}`,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "&:has([data-dragging='true'])": { overflow: "hidden" },
        }}
      >
        {inbox.length === 0 ? (
          <Typography variant="body2" color={theme.palette.text.secondary}>
            No cards yet
          </Typography>
        ) : (
          inbox.map((task) => (
         <Box key={task.id} sx={{ position: "relative" }}>
    <Task
      task={task}
      onToggle={() => toggleInboxTaskStatus(task.id)}
      onEdit={() => setEditingTask(task)}
    />

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
          title={editingTask.title}       // pass current task title
          onSave={(newTitle) => {
            editInboxTask(editingTask.id, newTitle); // update store
            setEditingTask(null);                     // close edit form
          }}
          onCancel={() => setEditingTask(null)}
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

export default LeftPanel;
