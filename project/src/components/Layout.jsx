import React, { useState } from "react";
import Topbar from "./Topbar";
import Cardmodal from "./Cardmodal";
import CardItem from "./CardItem";
import Box from "@mui/material/Box";
import AddTaskButton from "./Addtaskbutton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Layout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the task to edit

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setEditIndex(null); // Reset edit index when closing modal
  };

  const handleCreateTask = (newTask) => {
    if (editIndex !== null) {
      // Edit existing task
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex ? newTask : task
      );
      setTasks(updatedTasks);
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    handleClose();
  };

  const taskToEdit = editIndex !== null ? tasks[editIndex] : null; // Get the task to edit

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) return;

    // Reorder tasks in the list
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <>
      <Topbar />
      <AddTaskButton onClick={handleOpen} />
      <Cardmodal
        open={modalOpen}
        handleClose={handleClose}
        onCreate={handleCreateTask}
        taskToEdit={taskToEdit}
      />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          width: "100%", // Full width of the container
          height: "calc(100vh - 64px)", // Adjust height based on the top bar's height
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="backlog">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  flex: 1,
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    padding: 1,
                    fontWeight: "bold",
                    borderBottom: "1px solid black",
                  }}
                >
                  Backlog
                </Box>
                {tasks.map((task, index) => (
                  <CardItem
                    key={task.taskName} // Ensure each CardItem has a unique key
                    task={task}
                    index={index}
                    tasks={tasks}
                    setTasks={setTasks}
                    setEditIndex={setEditIndex}
                    setOpen={setModalOpen}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <Droppable droppableId="inprogress">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  flex: 1,
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    padding: 1,
                    fontWeight: "bold",
                    borderBottom: "1px solid black",
                  }}
                >
                  In-Progress
                </Box>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <Droppable droppableId="completed">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  flex: 1,
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    padding: 1,
                    fontWeight: "bold",
                    borderBottom: "1px solid black",
                  }}
                >
                  Completed
                </Box>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
}
