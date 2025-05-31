import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AiMusic = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        🎶 AI for Music
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        This page will feature AI tools for music composition and sound design.
      </Typography>
      <Button variant="outlined" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default AiMusic;