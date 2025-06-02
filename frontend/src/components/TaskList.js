import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { fetchTasks, deleteTask } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="400px">
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={loadTasks}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/tasks/new')}
        >
          Add Task
        </Button>
      </Box>

      {tasks.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="textSecondary">
            No tasks found. Create a new task to get started!
          </Typography>
        </Paper>
      ) : (
        <Paper>
          <List>
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1">{task.title}</Typography>
                        <Chip
                          label={task.priority}
                          size="small"
                          color={getPriorityColor(task.priority)}
                        />
                        <Chip
                          label={task.status}
                          size="small"
                          color={getStatusColor(task.status)}
                        />
                      </Box>
                    }
                    secondary={
                      <Box mt={1}>
                        <Typography variant="body2" color="textSecondary">
                          {task.description}
                        </Typography>
                        {task.due_date && (
                          <Typography variant="caption" color="textSecondary">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < tasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default TaskList; 