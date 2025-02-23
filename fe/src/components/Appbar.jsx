import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar, Toolbar, Typography, Button } from '@mui/material';

const styles = {
  appBar: {
    backgroundColor: '#000',
    color: '#fff',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    fontWeight: 700,
    letterSpacing: '0.1em',
    flexGrow: 1,
  },
  navButton: {
    color: '#fff',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

function AppBar() {
  return (
    <MuiAppBar position="static" style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        <Typography variant="h6" component="div" style={styles.logo}>
          JANAK ♥ SAD
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/" style={styles.navButton}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/upload" style={styles.navButton}>
            Upload Pic
          </Button>
          <Button color="inherit" component={Link} to="/chatbot" style={styles.navButton}>
            Chatbot
          </Button>
        </div>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;

