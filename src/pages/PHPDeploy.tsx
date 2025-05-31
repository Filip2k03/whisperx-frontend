import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FilePhp } from 'lucide-react'; // Import PHP icon

const PHPDeploy = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
        <Box sx={{ mb: 2, color: '#777BB4' }}>
          <FilePhp size={60} />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Deploy PHP Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Find resources and guides for deploying your PHP-based websites and applications (e.g., WordPress, Laravel) on free hosting.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Topics will include database setup (MySQL), file uploads via FTP, and common configuration for PHP applications.
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/free-hosting')}>
          Back to Free Hosting List
        </Button>
      </Paper>
    </Box>
  );
};

export default PHPDeploy;
