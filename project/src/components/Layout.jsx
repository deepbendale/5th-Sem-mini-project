import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
        index === editIndex ? { ...task, status: t.status } : t
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, { ...task, status: "backlog" }]);
    }
    handleClose();
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

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
      <Box
        sx={{
          position: "absolute",
          top: "16px",
          left: "16px",
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
      </Box>
      <CardComponent
        open={open}
        handleClose={handleClose}
        onCreate={handleCreateTask}
        taskToEdit={editIndex !== null ? tasks[editIndex] : null}
      />
      {tasks.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "80px", // Adjust as needed to fit below the button
          }}
        >
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="backlog" direction="vertical">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "8px",
                    minHeight: "300px",
                  }}
                >
                  <h2>Backlog</h2>
                  {getTasksByStatus("backlog").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <CardItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={task.id}
                          task={task}
                          index={index}
                          tasks={tasks}
                          setTasks={setTasks}
                          setEditIndex={setEditIndex}
                          setOpen={setOpen}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <Droppable droppableId="in-progress" direction="vertical">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#e4e4e4",
                    borderRadius: "8px",
                    minHeight: "300px",
                  }}
                >
                  <h2>In Progress</h2>
                  {getTasksByStatus("in-progress").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <CardItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={task.id}
                          task={task}
                          index={index}
                          tasks={tasks}
                          setTasks={setTasks}
                          setEditIndex={setEditIndex}
                          setOpen={setOpen}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <Droppable droppableId="completed" direction="vertical">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#d4edda",
                    borderRadius: "8px",
                    minHeight: "300px",
                  }}
                >
                  <h2>Completed</h2>
                  {getTasksByStatus("completed").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <CardItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={task.id}
                          task={task}
                          index={index}
                          tasks={tasks}
                          setTasks={setTasks}
                          setEditIndex={setEditIndex}
                          setOpen={setOpen}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      )}
    </Box>
  );
}
