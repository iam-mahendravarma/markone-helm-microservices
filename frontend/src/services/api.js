import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTasks = async (view = null, status = null, priority = null) => {
  try {
    const params = {};
    if (view) params.view = view;
    if (status) params.status = status;
    if (priority) params.priority = priority;
    
    const response = await api.get('/tasks/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchDashboard = async () => {
  try {
    const response = await api.get('/tasks/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks/', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}; 