import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Python } from 'lucide-react'; // Import Python icon

const PythonDeploy = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
        <Box sx={{ mb: 2, color: '#3776AB' }}>
          <Python size={60} />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Deploy Python Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This section will provide detailed guides and recommendations for deploying your Python web applications (e.g., Flask, Django) on free hosting platforms.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Key topics will include: virtual environments, WSGI servers, database connections, and common deployment pitfalls.
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/free-hosting')}>
          Back to Free Hosting List
        </Button>
      </Paper>
    </Box>
  );
};

export default PythonDeploy;
