import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createTask, updateTask, fetchTasks } from '../services/api';

const TaskForm = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: null,
  });

  useEffect(() => {
    if (taskId) {
      loadTask();
    }
  }, [taskId]);

  const loadTask = async () => {
    try {
      setLoading(true);
      const tasks = await fetchTasks();
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setFormData({
          ...task,
          due_date: task.due_date ? new Date(task.due_date) : null,
        });
      }
    } catch (error) {
      console.error('Error loading task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      due_date: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (taskId) {
        await updateTask(taskId, formData);
      } else {
        await createTask(formData);
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {taskId ? 'Edit Task' : 'Create New Task'}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Due Date"
                value={formData.due_date}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/tasks')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {taskId ? 'Update' : 'Create'} Task
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default TaskForm; 