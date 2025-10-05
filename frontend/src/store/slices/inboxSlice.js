
export const createInboxSlice = (set) => ({
  inbox: [
    { id: 1, title: "Inbox => Task1", status: "in-progress" },
    { id: 2, title: "Inbox => Task2", status: "done" },
    { id: 3, title: "Inbox => Task3", status: "in-progress" },
    { id: 4, title: "Inbox => Task4", status: "in-progress" },
    { id: 5, title: "Inbox => Task5", status: "done" },
    { id: 6, title: "Inbox => Task6", status: "in-progress" },
  ],

  addTaskToInbox: (task) =>
    set((state) => ({
      inbox: [...state.inbox, task],
    })),

  toggleInboxTaskStatus: (taskId) =>
    set((state) => ({
      inbox: state.inbox.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: t.status === "done" ? "in-progress" : "done",
            }
          : t
      ),
    })),
});
