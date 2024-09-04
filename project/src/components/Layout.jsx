import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardItem from "./CardItem";
import CardComponent from "./CardComponent";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  const handleCreateTask = (task) => {
    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? task : t
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, task]);
    }
    handleClose();
  };

  return (
    <Box
      sx={{
        position: "relative",
        right: "30rem",
        bottom: "5rem",
        height: "100vh",
        padding: "16px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Button
        variant="contained"
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
        onClick={handleOpen}
      >
        Add Task
      </Button>
      <CardComponent
        open={open}
        handleClose={handleClose}
        onCreate={handleCreateTask}
        taskToEdit={editIndex !== null ? tasks[editIndex] : null}
      />
      <Box
        sx={{
          marginTop: "20px",
          marginLeft: "100px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {tasks.map((task, index) => (
          <CardItem
            key={index}
            task={task}
            index={index}
            tasks={tasks}
            setTasks={setTasks}
            setEditIndex={setEditIndex}
            setOpen={setOpen}
          />
        ))}
      </Box>
    </Box>
  );
}
