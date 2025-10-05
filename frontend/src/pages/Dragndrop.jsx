import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { Box, Typography, Paper } from "@mui/material";

const DraggableTask = ({ task, listeners, attributes, transform, dragRef }) => {
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    marginBottom: "8px",
    padding: "8px",
    cursor: "grab",
    position: "relative",
    zIndex: transform ? 100 : "auto",
  };

  return (
    <Paper ref={dragRef} {...listeners} {...attributes} sx={style}>
      {task.title}
    </Paper>
  );
};

const DroppableCategory = ({ category, tasks, isOver, onTaskDrag }) => {
  const { setNodeRef } = useDroppable({ id: category.id.toString() });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: 260,
        bgcolor: "background.paper",
        borderRadius: 1,
        p: 1,
        maxHeight: "100%",
        overflowY: "auto",
        border: isOver ? "2px dashed #1976d2" : "1px solid #ccc",
        transition: "border 0.2s",
      }}
    >
      <Typography fontWeight="bold" mb={1}>
        {category.name}
      </Typography>
      {tasks.map((task) => (
        <TaskWrapper key={task.id} task={task} onDrag={onTaskDrag} />
      ))}
    </Box>
  );
};

const TaskWrapper = ({ task, onDrag }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id.toString() });
  onDrag && onDrag(task, { attributes, listeners, setNodeRef, transform });
  return <DraggableTask task={task} dragRef={setNodeRef} attributes={attributes} listeners={listeners} transform={transform} />;
};

export default function DndBoard() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Work", tasks: [{ id: 1, title: "Task 1" }, { id: 2, title: "Task 2" }] },
    { id: 2, name: "Personal", tasks: [{ id: 3, title: "Task 3" }, { id: 4, title: "Task 4" }] },
  ]);

  const [activeTask, setActiveTask] = useState(null);
  const [overId, setOverId] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const task = categories.flatMap(c => c.tasks).find(t => t.id.toString() === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setOverId(null);
    if (!over || !activeTask) {
      setActiveTask(null);
      return;
    }

    const sourceCategoryId = categories.find(cat => cat.tasks.some(t => t.id === activeTask.id))?.id;
    const targetCategoryId = Number(over.id);

    if (sourceCategoryId && sourceCategoryId !== targetCategoryId) {
      setCategories(prev => {
        const sourceCategory = prev.find(c => c.id === sourceCategoryId);
        const targetCategory = prev.find(c => c.id === targetCategoryId);

        return prev.map(cat => {
          if (cat.id === sourceCategoryId) {
            return { ...cat, tasks: cat.tasks.filter(t => t.id !== activeTask.id) };
          } else if (cat.id === targetCategoryId) {
            return { ...cat, tasks: [...cat.tasks, activeTask] };
          }
          return cat;
        });
      });
    }

    setActiveTask(null);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    setOverId(over ? over.id : null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>
      <Box sx={{ display: "flex", gap: 2, p: 2, overflowX: "auto" }}>
        {categories.map(category => (
          <DroppableCategory
            key={category.id}
            category={category}
            tasks={category.tasks}
            isOver={overId === category.id.toString()}
          />
        ))}
      </Box>

      <DragOverlay>
        {activeTask ? <Paper sx={{ p: 1 }}>{activeTask.title}</Paper> : null}
      </DragOverlay>
    </DndContext>
  );
}
