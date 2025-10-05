// Dashboard.jsx
import React from "react";
import { Box } from "@mui/material";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Header from "../components/Header";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useStore from "../store/store";

const Dashboard = () => {
  const { moveTask } = useStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = active.id;
    const dropZoneId = over.id;

    // Find the source of the task
    const { inbox, boards } = useStore.getState();
    let from = null;
    
    if (inbox.find(t => t.id === taskId)) {
      from = { type: 'inbox' };
    } else {
      for (const board of boards) {
        for (const category of board.categories) {
          if (category.tasks.find(t => t.id === taskId)) {
            from = { type: 'category', id: category.id };
            break;
          }
        }
        if (from) break;
      }
    }
    
    // If the source is not found or the task was dropped in the same place, do nothing
    if (!from || (from.id === dropZoneId && from.type !== 'inbox')) {
      return;
    }

    // Determine the destination (to)
    let to = null;
    if (dropZoneId === 'inbox') {
      to = { type: 'inbox' };
    } else if (dropZoneId.startsWith('category-')) {
      to = { type: 'category', id: parseInt(dropZoneId.split('-')[1]) };
    }
    
    if (from && to) {
      moveTask({ taskId, from, to });
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
          <LeftPanel />
          <RightPanel />
        </Box>
      </DndContext>
    </Box>
  );
};

export default Dashboard;