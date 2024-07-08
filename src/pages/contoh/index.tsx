import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [icon, setIcon] = useState(<MenuIcon />);

  useEffect(() => {
    if (isMobile) {
      setIcon(<HomeIcon />);
    } else {
      setIcon(<MenuIcon />);
    }
  }, [isMobile]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          {icon}
        </IconButton>
        {/* Add other toolbar content here */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
