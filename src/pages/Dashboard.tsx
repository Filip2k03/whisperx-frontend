import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useToast } from "../components/ToastProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      const res = await fetch(`${API}/get_user.php?id=${parsed.id}`);
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // refresh local
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    toast.showToast("Logged out successfully", "info");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">👋 Welcome, {user?.username || "Guest"}</Typography>
        <ThemeToggle />
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">🧾 Account Info</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography><strong>Email:</strong> {user?.email}</Typography>
        <Typography><strong>Birthday:</strong> {user?.birthday}</Typography>
        <Typography><strong>Role:</strong> {user?.role || 'user'}</Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">💰 Points</Typography>
          <Button variant="outlined" onClick={fetchUser}>🔄 Refresh</Button>
        </Box>
        <Typography variant="h4" mt={2}>{user?.points || 0} pts</Typography>
      </Paper>

      <Box mt={4}>
        <Button variant="contained" color="error" onClick={logout}>
          🚪 Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
