import React, { useState, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AddTaskForm = ({ taskTitle, onChange, onAddTask, onCancel }) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // handle clicks outside the form to hide buttons
  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsFocused(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box
      ref={containerRef}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onAddTask?.();
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Task Title"
        value={taskTitle}
        onChange={onChange}
        size="small"
        variant="outlined"
        fullWidth
        onFocus={() => setIsFocused(true)}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: theme.palette.text.primary,
            "& fieldset": { borderColor: theme.palette.divider },
            "&:hover fieldset": { borderColor: theme.palette.primary.main },
          },
          "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-start",
          my: 1,
          gap: 1,
          overflow: "hidden",
          maxHeight: isFocused ? 40 : 0,
          opacity: isFocused ? 1 : 0,
          transition: "all 0.3s ease",
        }}
      >
        <Button
          type="submit"
          size="small"
          variant="contained"
          sx={{
            width: 100,
            height: 30,
            fontSize: 12,
            fontWeight: "600",
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primary.dark },
          }}
        >
          Add Task
        </Button>

        <Button
          type="button"
          variant="text"
          sx={{
            width: 100,
            height: 30,
            fontSize: 12,
            fontWeight: "600",
            color: theme.palette.text.primary,
            "&:hover": { bgcolor: theme.palette.action.hover },
          }}
          onClick={() => {
            onCancel?.();
            setIsFocused(false);
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddTaskForm;
