import { useState } from "react";
import { Box, Checkbox, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task, onToggle, isOverlay , onEdit }) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const isHoverActive = hover || task.status === "done";


  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { type: "task", task },
    disabled: isOverlay,
  });

  const baseStyles = {
    px: 1,
    py: 0.5,
    mb: 1,
    display: "flex",
    alignItems: "center",
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: "all 0.2s ease",
    cursor: isOverlay ? "grabbing" : isDragging ? "grabbing" : "grab",
    boxShadow: isOverlay ? theme.shadows[8] : isDragging ? "none" : theme.shadows[1],
    transform: isOverlay ? "rotate(2deg)" : undefined,
  };

  const style = !isOverlay
    ? {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.3 : 1,
        pointerEvents: isDragging ? "none" : "auto",
      }
    : undefined;

  return (
<Paper
  ref={!isOverlay ? setNodeRef : null}
  {...(!isOverlay ? { ...attributes, ...listeners } : {})}
  style={style}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  sx={{
    ...baseStyles,
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Checkbox */}
  <Checkbox
    size="small"
    checked={task.status === "done"}
    onChange={(e) => {
      e.stopPropagation();
      !isOverlay && onToggle?.(task.id);
    }}
    sx={{
      position: "absolute",
      left: isHoverActive ? 0 : -28, 
      opacity: isHoverActive ? 1 : 0,
      transition: "all 0.3s ease",
      "& .MuiSvgIcon-root": { borderRadius: "50%" },
      color: theme.palette.primary.main,
    }}
  />

  {/* Task title */}
  <Typography
    sx={{
      flex: 1,
      wordBreak: "break-word",
      transform: isHoverActive ? "translateX(28px)" : "translateX(0)",
      transition: "transform 0.3s ease, color 0.3s ease",
      textDecoration: task.status === "done" ? "line-through" : "none",
      color:
        task.status === "done"
          ? theme.palette.text.disabled
          : theme.palette.text.primary,
    }}
  >
    {task.title}
  </Typography>

  {/* Edit icon */}
  <Box
    onClick={(e) => {
      e.stopPropagation();
      !isOverlay && onEdit?.(task);
    }}
    sx={{
      display: "flex",
      gap: 0.5,
      opacity: isHoverActive ? 1 : 0,
      transition: "opacity 0.3s ease",
      color: theme.palette.text.primary,
      zIndex:1,
    }}
  >
    <EditIcon sx={{ fontSize: 16 }} />
  </Box>
</Paper>

  );
};

export default Task;
