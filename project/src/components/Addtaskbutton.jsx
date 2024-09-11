import React from "react";
import Button from "@mui/material/Button";

export default function AddTaskButton({ onClick }) {
  return (
    <div>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          fontSize: "1.2rem",
          padding: "8px 16px",
          minWidth: "150px",
          color: "white",
          "&:hover": {
            backgroundColor: "#45a049",
          },
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        Add Task
      </Button>
    </div>
  );
}
