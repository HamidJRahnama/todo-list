// pages/Dashboard.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Header from "../components/Header";
import Task from "../components/Task"; // برای نمایش در overlay باید ایمپورت شود
import {
  DndContext,
  DragOverlay, // 1. ایمپورت DragOverlay
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners, // برای تشخیص بهتر نقطه رها شدن
} from "@dnd-kit/core";
import useStore from "../store/store";

const Dashboard = () => {
  const { moveTask, inbox, boards } = useStore();
  const [activeId, setActiveId] = useState(null); // 2. state برای نگهداری id تسک در حال درگ

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // 3. تابعی برای پیدا کردن آبجکت تسک با استفاده از id
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

  // 4. تابع برای شروع درگ
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // 5. تابع برای پایان درگ (قبلی را اصلاح می‌کنیم)
  const handleDragEnd = (event) => {
    setActiveId(null); // در پایان، id فعال را ریست می‌کنیم

    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const dropZoneId = over.id;

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
    
    if (!from || (from.id === dropZoneId && from.type !== 'inbox')) {
      return;
    }

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
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart} // 6. اضافه کردن onDragStart
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
          <LeftPanel />
          <RightPanel />
        </Box>
        {/* 7. اضافه کردن DragOverlay */}
        <DragOverlay>
          {activeTask ? (
            <Task
              task={activeTask}
              onToggle={() => {}} // در overlay نیازی به toggle نیست
              isOverlay // یک پراپ برای استایل‌دهی متفاوت
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default Dashboard;