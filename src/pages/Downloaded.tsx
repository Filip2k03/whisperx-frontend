import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api"; // Ensure this path is correct

// Define a type for the prompt data for better type safety
interface UserPrompt {
  id: number;
  title: string;
  category: string;
  pdf_link: string;
  points_required: number;
  type: 'free' | 'purchased'; // 'free' or 'purchased'
}

const Downloaded = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userPrompts, setUserPrompts] = useState<UserPrompt[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from localStorage and navigate if not logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Please log in to view your downloaded prompts.");
      return navigate("/login");
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
  }, [navigate]);

  // Fetch user's acquired prompts
  useEffect(() => {
    if (!user?.id) return; // Only fetch if user ID is available

    const fetchUserPrompts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/get_user_prompts.php?user_id=${user.id}`);
        const data = await res.json();
        if (data.success) {
          setUserPrompts(data.prompts);
        } else {
          toast.error(data.error || "Failed to load your downloaded prompts.");
        }
      } catch (err) {
        console.error("Error fetching user prompts:", err);
        toast.error("Failed to connect to the server to load downloaded prompts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPrompts();
  }, [user]); // Re-fetch when user object changes

  // Handle viewing a prompt PDF
  const handleViewPdf = (pdfLink: string) => {
    window.open(`${API}${pdfLink}`, "_blank");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        My Downloaded Prompts
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading your prompts...</Typography>
        </Box>
      ) : userPrompts.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: '12px' }}>
          <Typography variant="h6" color="text.secondary">
            You haven't downloaded any prompts yet.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Explore the <Button onClick={() => navigate("/prompts")} sx={{ textTransform: 'none', p: 0, minWidth: 0 }}>Prompt Library</Button> to find some!
          </Typography>
        </Paper>
      ) : (
        <List sx={{ width: '100%' }}>
          {userPrompts.map((p) => (
            <Paper key={p.id} elevation={2} sx={{ p: 2, mb: 2, borderRadius: '10px' }}>
              <ListItem disableGutters secondaryAction={
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleViewPdf(p.pdf_link)}
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                    borderRadius: '6px'
                  }}
                >
                  View PDF
                </Button>
              }>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                      {p.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Category: {p.category}
                      </Typography>
                      <Typography variant="body2" color={p.type === 'free' ? 'success.main' : 'primary.main'}>
                        Status: {p.type === 'free' ? 'Free' : `Purchased (${p.points_required} points)`}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Downloaded;
