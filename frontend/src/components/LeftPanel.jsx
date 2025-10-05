// LeftPanel.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import Task from "./Task";
import FilterListIcon from "@mui/icons-material/FilterList"; 
import ShareIcon from "@mui/icons-material/Share";         
import MoreVertIcon from "@mui/icons-material/MoreVert";  
import useStore from "../store/store";
import { useTheme } from "@mui/material/styles";
import { useDroppable } from "@dnd-kit/core";

const LeftPanel = () => {
  const theme = useTheme();
  const { inbox, addTaskToInbox, toggleInboxTaskStatus } = useStore();
  const [taskTitle, setTaskTitle] = useState("");

  
  const { setNodeRef } = useDroppable({
    id: 'inbox',
  });

  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;

    const newTask = { id: Date.now(), title: taskTitle, status: "in-progress" };
    addTaskToInbox(newTask);
    setTaskTitle("");
  };

  const handleCancel = () => setTaskTitle("");

  return (
    <Box
      sx={{
        width: "30%",
        height: "92%",
        p: 2,
        borderRadius: "10px 10px ",
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
        <Typography variant="h6" color={theme.palette.text.primary}>Inbox</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" sx={{ color: theme.palette.text.primary }}>
            <FilterListIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: theme.palette.text.primary }}>
            <ShareIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: theme.palette.text.primary }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ height: "48px" }} />

      {/* Form */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          label="Card Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: theme.palette.text.primary,
              "& fieldset": { borderColor: theme.palette.divider },
              "&:hover fieldset": { borderColor: theme.palette.primary.main },
            },
            "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
          }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddTask}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": { bgcolor: theme.palette.primary.dark },
            }}
          >
            Add Card
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={handleCancel}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": { bgcolor: theme.palette.secondary.main },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Cards */}
      <Box 
        ref={setNodeRef}
        sx={{ 
          mt: 2, 
          flex: 1, 
          overflowY: "auto", 
          borderTop: `1px solid ${theme.palette.divider}`, 
          pt: 1 
        }}
      >
        {inbox.length === 0 ? (
          <Typography variant="body2" color={theme.palette.text.secondary}>
            No cards yet
          </Typography>
        ) : (
          inbox.map((task) => (
            <Task key={task.id} task={task} onToggle={() => toggleInboxTaskStatus(task.id)} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default LeftPanel;
