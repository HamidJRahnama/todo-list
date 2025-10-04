export const createBoardsSlice = (set) => ({
  boards: [
    {
      id: 1,
      name: "My Board",
      categories: [
        {
          id: 1,
          name: "Work",
          tasks: [
            { id: 1, title: "Task 1", status: "in-progress" },
            { id: 2, title: "Task 2", status: "done" },
            { id: 3, title: "Task 3", status: "in-progress" },
          ],
        },
        {
          id: 2,
          name: "Personal",
          tasks: [
            { id: 4, title: "Task 4", status: "in-progress" },
            { id: 5, title: "Task 5", status: "done" },
          ],
        },
        {
          id: 3,
          name: "Shopping",
          tasks: [
            { id: 6, title: "Task 6", status: "in-progress" },
            { id: 7, title: "Task 7", status: "in-progress" },
          ],
        },
      ],
    },
  ],

  addTaskToBoard: (boardId, categoryId, task) =>
    set((state) => ({
      boards: state.boards.map((b) =>
        b.id === boardId
          ? {
              ...b,
              categories: b.categories.map((c) =>
                c.id === categoryId
                  ? { ...c, tasks: [...c.tasks, task] }
                  : c
              ),
            }
          : b
      ),
    })),

  toggleBoardTaskStatus: (boardId, categoryId, taskId) =>
    set((state) => ({
      boards: state.boards.map((b) =>
        b.id === boardId
          ? {
              ...b,
              categories: b.categories.map((c) =>
                c.id === categoryId
                  ? {
                      ...c,
                      tasks: c.tasks.map((t) =>
                        t.id === taskId
                          ? {
                              ...t,
                              status:
                                t.status === "done" ? "in-progress" : "done",
                            }
                          : t
                      ),
                    }
                  : c
              ),
            }
          : b
      ),
    })),
});
