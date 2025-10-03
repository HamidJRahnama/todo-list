import { create } from "zustand";
import { createThemeSlice } from "./slices/themeSlice";
import { createInboxSlice } from "./slices/inboxSlice";
import { createBoardsSlice } from "./slices/boardsSlice";

const useStore = create((set) => ({
  ...createThemeSlice(set),
  ...createInboxSlice(set),
  ...createBoardsSlice(set),
}));

export default useStore;
