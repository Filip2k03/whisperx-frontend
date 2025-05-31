import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid, // Import Grid for layout
  Card, // Import Card for section showcase
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

import { useToast } from "../components/ToastProvider";

// Define a type for AI tool categories for better organization
interface AiToolCategory {
  id: string;
  title: string;
  description: string;
  path: string; // The route to navigate to
  buttonText: string;
}

const aiToolCategories: AiToolCategory[] = [
  {
    id: "chat-ai",
    title: "AI Chat",
    description: "Engage in intelligent conversations with various AI models.",
    path: "/ai-chat", // This will be the route for the ChatAi component
    buttonText: "Go to AI Chat",
  },
  {
    id: "video-ai",
    title: "AI for Video",
    description: "Generate and edit videos with cutting-edge AI capabilities.",
    path: "/ai-video", // Placeholder for AI Video page
    buttonText: "Go to AI Video",
  },
  {
    id: "music-ai",
    title: "AI for Music",
    description: "Create unique melodies, soundtracks, and audio effects.",
    path: "/ai-music", // Placeholder for AI Music page
    buttonText: "Go to AI Music",
  },
  // You can add more categories here
];

const Dashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      // It's good practice to fetch updated user data, but ensure your get_user.php
      // is secured and only returns necessary info (no passwords etc.)
      try {
        const res = await fetch(`${API}/get_user.php?id=${parsed.id}`);
        const data = await res.json();
        if (!data.error) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // refresh local
        } else {
          toast.showToast(data.error, "error");
          // Optionally, if user not found, clear localStorage and navigate to login
          // localStorage.removeItem("user");
          // navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.showToast("Failed to load user data.", "error");
      }
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
    } else {
      setUser(JSON.parse(stored));
      fetchUser(); // Fetch latest user data on component mount
    }
  }, [navigate]); // Added navigate to dependency array

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    toast.showToast("Logged out successfully", "info");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          👋 Welcome, {user?.username || "Guest"}
        </Typography>
      </Box>

      {/* Account Info Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
          🧾 Account Info
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography><strong>Email:</strong> {user?.email || 'N/A'}</Typography>
        <Typography><strong>Birthday:</strong> {user?.birthday || 'N/A'}</Typography>
        <Typography><strong>Role:</strong> {user?.role || 'user'}</Typography>
      </Paper>

      {/* Points Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ color: '#555' }}>
            💰 Your Points
          </Typography>
          <Button
            variant="outlined"
            onClick={fetchUser}
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': { borderColor: '#1565c0', color: '#1565c0' },
              borderRadius: '8px'
            }}
          >
            🔄 Refresh
          </Button>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
          {user?.points || 0} pts
        </Typography>
        <Button
            variant="contained"
            onClick={() => navigate("/buy-token")}
            sx={{ mt: 2, backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#FB8C00' }, borderRadius: '8px' }}
        >
            Buy More Tokens
        </Button>
      </Paper>

      <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: 'bold', color: '#333' }}>
        🚀 Explore AI Tools
      </Typography>

      {/* AI Tool Categories Showcase */}
      <Grid container spacing={3}>
        {aiToolCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              elevation={4}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate(category.path)}
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                    borderRadius: '8px',
                    padding: '8px 16px'
                  }}
                >
                  {category.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Logout Button */}
      <Box mt={6} sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="error"
          onClick={logout}
          sx={{
            padding: '12px 30px',
            borderRadius: '10px',
            fontSize: '1rem'
          }}
        >
          🚪 Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;