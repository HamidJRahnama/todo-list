export const createInboxSlice = (set) => ({
  inbox: [
    { id: 1, title: "Task1", status: "in-progress" },
    { id: 2, title: "Task2", status: "done" },
    { id: 3, title: "Task3", status: "in-progress" },
  ],

  addTaskToInbox: (task) =>
    set((state) => ({ inbox: [...state.inbox, task] })),

  toggleInboxTaskStatus: (taskId) =>
    set((state) => ({
      inbox: state.inbox.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === "done" ? "in-progress" : "done" }
          : t
      ),
    })),

  // ✅ New edit function
  editInboxTask: (taskId, newTitle) =>
    set((state) => ({
      inbox: state.inbox.map((t) =>
        t.id === taskId ? { ...t, title: newTitle } : t
      ),
    })),
});
