import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Cardmodal({
  open,
  handleClose,
  onCreate,
  taskToEdit,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] =  useState("");
  const [taskAssignee, setTaskAssignee] = useState("");

  useEffect(() => {
    if (open && taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setTaskDescription(taskToEdit.taskDescription);
      setTaskPriority(taskToEdit.taskPriority);
      setTaskAssignee(taskToEdit.taskAssignee);
    } else {
      setTaskName("");
      setTaskDescription("");
      setTaskPriority("");
      setTaskAssignee("");
    }
  }, [open, taskToEdit]);

  const handleCreate = () => {
    onCreate({ taskName, taskDescription, taskPriority, taskAssignee });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="card-modal-title"
      aria-describedby="card-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="card-modal-title" variant="h6" component="h2">
          {taskToEdit ? "Edit Task" : "Add a New Task"}
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Enter Task Name"
            variant="outlined"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Enter Task Description"
            variant="outlined"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="task-priority-label">Task Priority</InputLabel>
            <Select
              labelId="task-priority-label"
              id="task-priority"
              value={taskPriority}
              label="Task Priority"
              onChange={(e) => setTaskPriority(e.target.value)}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="task-assignee-label">Task Assignee</InputLabel>
            <Select
              labelId="task-assignee-label"
              id="task-assignee"
              value={taskAssignee}
              label="Task Assignee"
              onChange={(e) => setTaskAssignee(e.target.value)}
            >
              <MenuItem value="Deep">Deep</MenuItem>
              <MenuItem value="Aviral">Aviral</MenuItem>
              <MenuItem value="Anushka">Anushka</MenuItem>
              <MenuItem value="Lalit">Lalit</MenuItem>
              <MenuItem value="Nehali">Nehali</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={handleCreate}>
              {taskToEdit ? "Update" : "Create"}
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
