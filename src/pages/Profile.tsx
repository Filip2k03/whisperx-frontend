import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
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

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ username: "", birthday: "" });
  const [userPrompts, setUserPrompts] = useState<UserPrompt[]>([]);
  const [loadingPrompts, setLoadingPrompts] = useState(true);

  // Fetch user data from localStorage and navigate if not logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Please log in to view your profile.");
      return navigate("/login");
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setForm({
      username: parsed.username,
      birthday: parsed.birthday,
    });
  }, [navigate]);

  // Fetch user's acquired prompts
  useEffect(() => {
    if (!user?.id) return; // Only fetch if user ID is available

    const fetchUserPrompts = async () => {
      setLoadingPrompts(true);
      try {
        const res = await fetch(`${API}/get_user_prompts.php?user_id=${user.id}`);
        const data = await res.json();
        if (data.success) {
          setUserPrompts(data.prompts);
        } else {
          toast.error(data.error || "Failed to load your prompts.");
        }
      } catch (err) {
        console.error("Error fetching user prompts:", err);
        toast.error("Failed to connect to the server to load prompts.");
      } finally {
        setLoadingPrompts(false);
      }
    };

    fetchUserPrompts();
  }, [user]); // Re-fetch when user object changes (e.g., after login)

  // Handle profile update
  const updateProfile = async () => {
    try {
      const res = await fetch(`${API}/update_profile.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, ...form }),
      });

      const data = await res.json();
      if (data.status === "success") {
        toast.success("Profile updated successfully!"); // Replaced alert with toast
        localStorage.setItem("user", JSON.stringify({ ...user, ...form }));
        // Update the user state to reflect changes immediately
        setUser((prevUser: any) => ({ ...prevUser, ...form }));
      } else {
        toast.error(data.message || "Failed to update profile."); // Replaced alert with toast
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to connect to the server to update profile.");
    }
  };

  // Handle viewing a prompt PDF
  const handleViewPdf = (pdfLink: string) => {
    window.open(`${API}/${pdfLink}`, "_blank");
  };

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  const freePrompts = userPrompts.filter(p => p.type === 'free');
  const purchasedPrompts = userPrompts.filter(p => p.type === 'purchased');

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        My Profile
      </Typography>

      {/* User Information */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#555' }}>
          Account Details
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <span style={{ fontWeight: 'bold' }}>Current Points:</span> {user.points}
        </Typography>
        <TextField
          label="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Birthday"
          type="date"
          value={form.birthday}
          onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          onClick={updateProfile}
          sx={{
            mt: 1,
            backgroundColor: '#4CAF50',
            '&:hover': { backgroundColor: '#45a049' },
            borderRadius: '8px',
            padding: '10px 20px'
          }}
        >
          Save Changes
        </Button>
      </Paper>

      {/* Acquired Prompts Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#555' }}>
          My Acquired Prompts
        </Typography>

        {loadingPrompts ? (
          <Typography>Loading your prompts...</Typography>
        ) : userPrompts.length === 0 ? (
          <Typography>You haven't acquired any prompts yet. Explore the <a href="/prompts" style={{ color: '#1976d2', textDecoration: 'none' }}>Prompt Library</a>!</Typography>
        ) : (
          <Box>
            {/* Purchased Prompts */}
            {purchasedPrompts.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>
                  Purchased Prompts ({purchasedPrompts.length})
                </Typography>
                <List>
                  {purchasedPrompts.map((p) => (
                    <ListItem key={p.id} divider sx={{ py: 1 }}>
                      <ListItemText
                        primary={p.title}
                        secondary={`Category: ${p.category} - Points Spent: ${p.points_required}`}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewPdf(p.pdf_link)}
                        sx={{ ml: 2, borderRadius: '6px' }}
                      >
                        View PDF
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Free Prompts */}
            {freePrompts.length > 0 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 1, color: '#28a745' }}>
                  Free Prompts ({freePrompts.length})
                </Typography>
                <List>
                  {freePrompts.map((p) => (
                    <ListItem key={p.id} divider sx={{ py: 1 }}>
                      <ListItemText
                        primary={p.title}
                        secondary={`Category: ${p.category}`}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewPdf(p.pdf_link)}
                        sx={{ ml: 2, borderRadius: '6px' }}
                      >
                        View PDF
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
