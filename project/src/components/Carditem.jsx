import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Draggable from "react-draggable"; // Importing react-draggable

export default function CardItem({
  task,
  index,
  tasks,
  setTasks,
  setEditIndex,
  setOpen,
}) {
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#d32f2f";
      case "Medium":
        return "#1976d2";
      case "Low":
        return "#388e3c";
      default:
        return "#757575";
    }
  };

  const handleEditTask = () => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleViewTask = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  return (
    <>
      <Draggable>
        <Card
          sx={{
            minWidth: 275,
            mb: 0.5,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: 1,
            border: "2px solid #e0e0e0",
            backgroundColor: "#f9f9f9",
            padding: 0.7,
          }}
        >
          <CardContent sx={{ paddingBottom: "4px !important" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: 600, mt: 1 }}
            >
              {task.taskName}
            </Typography>
            <Box
              sx={{
                display: "inline-block",
                backgroundColor: getPriorityColor(task.taskPriority),
                color: "white",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                mt: 1,
              }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                {task.taskPriority} Priority
              </Typography>
            </Box>
            <Typography sx={{ color: "text.secondary", mt: 1, fontSize: 18 }}>
              Assigned to: {task.taskAssignee}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 16, mt: 0.5 }}>
              {task.taskDescription}
            </Typography>
          </CardContent>
          <CardActions sx={{ paddingTop: 2, paddingBottom: 0 }}>
            <Box sx={{ marginLeft: "auto", display: "flex", gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={handleViewTask}
                aria-label="view"
                sx={{ color: "#1976d2" }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleEditTask}
                aria-label="edit"
                sx={{ color: "#f57c00" }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDeleteTask}
                aria-label="delete"
                sx={{ color: "#d32f2f" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </Draggable>

      <Dialog
        open={openViewModal}
        onClose={handleCloseViewModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography sx={{ fontSize: 26, fontWeight: 700 }}>
            {task.taskName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: getPriorityColor(task.taskPriority),
              color: "white",
              px: 2,
              py: 0.7,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
              {task.taskPriority} Priority
            </Typography>
          </Box>
          <Typography sx={{ color: "text.secondary", mb: 1, fontSize: 20 }}>
            Assigned to: {task.taskAssignee}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 18, mt: 0.5 }}>
            {task.taskDescription}
          </Typography>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <Button
            variant="contained"
            onClick={handleCloseViewModal}
            sx={{ backgroundColor: "#1976d2" }}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
