import React from "react";
import { Box } from "@mui/material";
import useStore from "../store/store";
import CategoryColumn from "./CategoryColumn";

const Board = ({ board }) => {

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mt: 1,
        overflowX: "auto",
        alignItems: "flex-start",
        flex: 1,
        px: "16px",
        pb: "16px",
      }}
    >
      {board.categories.map((category) => (
        <CategoryColumn
          key={category.id}
          category={category}
          boardId={board.id}
          onToggleTask={toggleBoardTaskStatus}
        />
      ))}
    </Box>
  );
};

export default Board;