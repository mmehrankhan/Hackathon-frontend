import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side - Saylani Welfare Trust Microfinance App */}
        <Typography variant="h6">
          Saylani Welfare Trust Microfinance App
        </Typography>

        {/* Right side - Links */}
        <Box sx={{ display: 'flex' }}>
          <Button color="inherit" href="/Home">Home</Button>
          <Button color="inherit" href="/loginForm">Login</Button>
          <Button color="inherit" href="/UserDashboard">User-Dashboard</Button>
          <Button color="inherit" href="/AdminDashboard">Admin-Dashboard</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
