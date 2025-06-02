import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Tasks', icon: <AssignmentIcon />, path: '/tasks' },
    { text: 'Add Task', icon: <AddIcon />, path: '/tasks/new' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="text.primary" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.lighter',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 