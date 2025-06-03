import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const AdComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.profitableratecpm.com/w80rzsx4b?key=8b4763ad6ff8ff8676cac22bb5e506b6';
    script.async = true;
    script.onload = () => setIsLoading(false);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      {isLoading ? (
        <Box>
          <CircularProgress />
          <Typography variant="caption" display="block" mt={1}>
            Loading sponsored content...
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Advertisement displayed below 👇
        </Typography>
      )}
    </Box>
  );
};

export default AdComponent;
