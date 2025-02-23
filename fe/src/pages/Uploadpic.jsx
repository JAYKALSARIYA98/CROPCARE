import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress, Paper, AppBar, Toolbar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadPic() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPrediction(null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPrediction(data.disease || 'No prediction available');
      } catch (error) {
        console.error('Error:', error);
        setPrediction('Error occurred during prediction');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKnowMore = () => {
    navigate('/chatbot', { state: { disease: prediction } });
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#333' }}>
        
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#f5f5f5', color: '#333', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Upload Crop Picture
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} sx={{ bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}>
              Choose File
            </Button>
          </label>
          {previewUrl && (
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '16px', borderRadius: '8px', border: '1px solid #ddd' }} />
          )}
          {selectedFile && (
            <Typography variant="body1" sx={{ mt: 2, color: '#555' }}>
              Selected file: {selectedFile.name}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            sx={{ bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Upload and Predict'}
          </Button>
          {prediction && (
            <Paper elevation={3} sx={{ p: 2, mt: 3, bgcolor: '#fff', width: '100%', textAlign: 'center', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom>
                Predicted Disease:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {prediction}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleKnowMore}
                sx={{ mt: 1, borderColor: '#007bff', color: '#007bff', '&:hover': { borderColor: '#0056b3', color: '#0056b3' } }}
              >
                Know More
              </Button>
            </Paper>
          )}
        </Box>
      </Container>
    </>
  );
}

export default UploadPic;
