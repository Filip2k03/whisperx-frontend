import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/login");
    setUser(JSON.parse(storedUser));
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.username}
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography>Your email: {user?.email}</Typography>
        <Typography>Your point balance: {user?.points}</Typography>
      </Paper>
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={() => navigate("/buy-token")}>
          Buy Token
        </Button>
        <Button variant="outlined" onClick={() => navigate("/courses")}>
          Courses
        </Button>
        <Button variant="outlined" onClick={() => navigate("/prompts")}>
          AI Prompt Library
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
