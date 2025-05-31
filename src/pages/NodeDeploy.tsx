import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SquareTerminal } from 'lucide-react'; // Import Node.js icon

const NodeDeploy = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
        <Box sx={{ mb: 2, color: '#68A063' }}>
          <SquareTerminal size={60} />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Deploy Node.js Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This section will guide you through deploying your Node.js applications (e.g., Express, React apps) on free hosting services.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          We'll cover topics like package management, environment variables, serverless functions, and continuous deployment.
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/free-hosting')}>
          Back to Free Hosting List
        </Button>
      </Paper>
    </Box>
  );
};

export default NodeDeploy;
