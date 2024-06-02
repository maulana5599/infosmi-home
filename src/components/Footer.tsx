import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          &copy; 2024 Infosmi. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <IconButton href="https://www.facebook.com" target="_blank" aria-label="Facebook">
            <Facebook />
          </IconButton>
          <IconButton href="https://www.twitter.com" target="_blank" aria-label="Twitter">
            <Twitter />
          </IconButton>
          <IconButton href="https://www.instagram.com" target="_blank" aria-label="Instagram">
            <Instagram />
          </IconButton>
          <IconButton href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
            <LinkedIn />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
