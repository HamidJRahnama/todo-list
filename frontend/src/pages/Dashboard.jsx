import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Task from "../components/Task";
import TaskColumn from "../components/TaskColumn";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { useTheme } from "@mui/material/styles";
import useStore from "../store/store";

const Dashboard = () => {

  const {
    moveTask,
    inbox,
    addTaskToInbox,
    toggleInboxTaskStatus,
    editInboxTask,
    boards,
    toggleBoardTaskStatus,
    editBoardTask ,
    theme: storeTheme,
    themes,
  } = useStore();

  // --- State Management ---
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [activeId, setActiveId] = useState(null);

  // --- DnD Setup ---
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const findTaskById = (id) => {
    const taskInInbox = inbox.find((t) => t.id === id);
    if (taskInInbox) return taskInInbox;
    for (const board of boards) {
      for (const category of board.categories) {
        const taskInCategory = category.tasks.find((t) => t.id === id);
        if (taskInCategory) return taskInCategory;
      }
    }
    return null;
  };
  const activeTask = activeId ? findTaskById(activeId) : null;

  // --- Unified Handlers ---
  const handleToggleTask = (taskId) => {
    const isInboxTask = inbox.some((t) => t.id === taskId);
    if (isInboxTask) {
      toggleInboxTaskStatus(taskId);
    } else {
      for (const board of boards) {
        for (const category of board.categories) {
          if (category.tasks.some((t) => t.id === taskId)) {
            toggleBoardTaskStatus(board.id, category.id, taskId);
            break;
          }
        }
      }
    }
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;
    const newTask = { id: Date.now(), title: taskTitle, status: "in-progress" };
    addTaskToInbox(newTask);
    setTaskTitle("");
  };

  const handleSaveEdit = (taskId, newTitle) => {
    if (!editingTask) return;
    const isInboxTask = inbox.some((t) => t.id === taskId);
    if (isInboxTask) {
      editInboxTask(taskId, newTitle);
    } else {
      // Find the board and category for this task
      for (const board of boards) {
        for (const category of board.categories) {
          if (category.tasks.some((t) => t.id === taskId)) {
            // Call the editBoardTask function with the correct parameters
            editBoardTask(board.id, category.id, taskId, newTitle);
            break;
          }
        }
      }
    }
    setEditingTask(null);
  };
  
  const handleDragStart = (event) => setActiveId(event.active.id);
  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const dropZoneId = over.id;
    const { inbox, boards } = useStore.getState();
    let from = null;
    if (inbox.find((t) => t.id === taskId)) {
      from = { type: "inbox" };
    } else {
      for (const board of boards) {
        for (const category of board.categories) {
          if (category.tasks.find((t) => t.id === taskId)) {
            from = { type: "category", id: category.id };
            break;
          }
        }
        if (from) break;
      }
    }
    if (!from) return;
    let to = null;
    if (dropZoneId === "inbox") {
      to = { type: "inbox" };
    } else if (dropZoneId.startsWith("category-")) {
      to = { type: "category", id: parseInt(dropZoneId.split("-")[1]) };
    }
    if (from && to && !(from.type === to.type && from.id === to.id)) {
      moveTask({ taskId, from, to });
    }
  };

  // --- Data Structure for Rendering ---
  const board = boards[0];
  const muiTheme = themes[storeTheme];
  const allColumns = [
    { id: "inbox", name: "Inbox", type: "inbox", tasks: inbox },
    ...board.categories.map((category) => ({
      id: `category-${category.id}`,
      name: category.name,
      type: "category",
      tasks: category.tasks,
    })),
  ];

  // --- Render ---
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            padding: "10px",
            gap: 2,
            height: "90vh",
            boxSizing: "border-box",
          }}
        >
          {allColumns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              onToggleTask={handleToggleTask}
              onEditTask={setEditingTask}
              editingTask={editingTask}
              onAddTask={handleAddTask}
              newTaskTitle={taskTitle}
              onNewTaskTitleChange={(e) => setTaskTitle(e.target.value)}
              onCancelAdd={() => setTaskTitle("")}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={() => setEditingTask(null)}
            />
          ))}
        </Box>

        {/* --- Backdrop --- */}
        {editingTask && (
          <Box
            onClick={() => setEditingTask(null)} 
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)", 
              zIndex: 9, 
            }}
          />
        )}

        <DragOverlay>
          {activeTask ? <Task task={activeTask} onToggle={() => {}} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default Dashboard;