import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { theme } from './theme';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/new" element={<TaskForm />} />
              <Route path="/tasks/:taskId" element={<TaskForm />} />
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 