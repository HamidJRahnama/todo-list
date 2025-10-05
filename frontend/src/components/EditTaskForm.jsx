import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const EditTaskForm = ({ title, onSave, onCancel }) => {
  const theme = useTheme();
  const [value, setValue] = useState(title);
  const inputRef = useRef(null);

  // Update value if title changes
  useEffect(() => {
    setValue(title);
  }, [title]);

  // Auto focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(value);
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
      }}
    >
      <TextField
        inputRef={inputRef}
        size="small"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            color: theme.palette.text.primary,
            "& fieldset": { borderColor: theme.palette.divider },
            "&:hover fieldset": { borderColor: theme.palette.primary.main },
          },
        }}
      />
      <Button
        type="submit"
        size="small"
        variant="contained"
        onClick={() => onSave(value)}
        sx={{
          height: 30,
          fontSize: 12,
          bgcolor: theme.palette.primary.main,
          "&:hover": { bgcolor: theme.palette.primary.dark },
        }}
      >
        Save
      </Button>
      <Button
        type="button"
        size="small"
        variant="text"
        sx={{
          height: 30,
          fontSize: 12,
          color: theme.palette.text.primary,
          "&:hover": { bgcolor: theme.palette.action.hover },
        }}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default EditTaskForm;
