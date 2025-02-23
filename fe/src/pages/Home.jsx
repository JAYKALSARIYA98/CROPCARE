import { useState } from 'react';
import { Container, Typography, Button, Box, Modal, Fade, AppBar, Toolbar } from '@mui/material';

function Home() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#333' }}>
        
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#f5f5f5', color: '#333', height: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, borderRadius: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Welcome to My Website
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
        Welcome to CropCare 🌱<br />
Empowering Farmers, One Click at a Time!

This is a simple and efficient tool designed to assist you in identifying crop diseases and providing reliable solutions. With CropCare, you can:
<br /><br />

Identify Plant Diseases: Upload a picture of the affected plant to diagnose the issue. <br />
Access Expert Advice: Interact with our chatbot for detailed information and recommendations. <br />
Simplify Crop Care: Save time and effort while ensuring healthy crops.
Navigate to:


        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}>
          Learn More
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: '#fff',
                color: '#333',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                About This Website
              </Typography>
              <Typography variant="body2" gutterBottom>
              Dive deeper into plant disease identification and effective solutions. Our chatbot is here to provide expert guidance tailored to your crop's needs. Explore now for healthier harvests! 🌿
              </Typography>
              <Button variant="contained" onClick={handleClose} sx={{ mt: 2, bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}>
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
