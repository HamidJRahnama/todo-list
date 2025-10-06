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
            { id: 7, title: "Task 1", status: "in-progress" },
            { id: 8, title: "Task 2", status: "done" },
            { id: 9, title: "Task 3", status: "in-progress" },
          ],
        },
        {
          id: 2,
          name: "Personal",
          tasks: [
            { id: 10, title: "Task 1", status: "in-progress" },
            { id: 11, title: "Task 4", status: "in-progress" },
          ],
        },
        {
          id: 3,
          name: "Shopping",
          tasks: [
            { id: 13, title: "Task 1", status: "in-progress" },
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
  editBoardTask: (boardId, categoryId, taskId, newTitle) =>
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
                      t.id === taskId ? { ...t, title: newTitle } : t
                    ),
                  }
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

    moveTask: ({ taskId, from, to }) =>
  set((state) => {
    // Find the target task
    let task = null;
    let newState = { ...state };
    
    // Find the task from the source
    if (from.type === 'inbox') {
      const inboxIndex = state.inbox.findIndex(t => t.id === taskId);
      if (inboxIndex !== -1) {
        task = { ...state.inbox[inboxIndex] };
        newState.inbox = [...state.inbox];
        newState.inbox.splice(inboxIndex, 1);
      }
    } else if (from.type === 'category') {
      newState.boards = state.boards.map(board => {
        const newCategories = board.categories.map(category => {
          if (category.id === from.id) {
            const taskIndex = category.tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
              task = { ...category.tasks[taskIndex] };
              const newTasks = [...category.tasks];
              newTasks.splice(taskIndex, 1);
              return { ...category, tasks: newTasks };
            }
          }
          return category;
        });
        return { ...board, categories: newCategories };
      });
    }
    
    // If the task is not found, return the state unchanged
    if (!task) return state;
    
    // Add the task to the destination
    if (to.type === 'inbox') {
      newState.inbox = [...newState.inbox, task];
    } else if (to.type === 'category') {
      newState.boards = newState.boards.map(board => {
        const newCategories = board.categories.map(category => {
          if (category.id === to.id) {
            return { ...category, tasks: [...category.tasks, task] };
          }
          return category;
        });
        return { ...board, categories: newCategories };
      });
    }
    
    return newState;
  }),


});

