import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  Link as MuiLink,
  CircularProgress,
  TextField,
  Dialog, // For confirmation dialog
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";
import { Trash2, Github } from 'lucide-react'; // Import icons

interface User {
  id: string;
  username: string;
  email: string;
  birthday: string;
  role: string;
  points: number;
}

interface GithubLink {
  id: string;
  project_name: string;
  github_url: string;
  created_at: string;
}

const MyGithubProjects = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [githubLinks, setGithubLinks] = useState<GithubLink[]>([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(true); // Loading state for links
  const [newProjectName, setNewProjectName] = useState("");
  const [newGithubUrl, setNewGithubUrl] = useState("");
  const [isAddingLink, setIsAddingLink] = useState(false); // Loading state for adding link

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [linkToDeleteId, setLinkToDeleteId] = useState<string | null>(null);


  // Fetch user from local storage (ProtectedLayout should ensure user exists)
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      // If user is not in local storage, redirect to login (should be handled by ProtectedLayout)
      navigate("/login");
    }
  }, [navigate]);

  // Function to fetch GitHub links for the logged-in user
  const fetchGithubLinks = async (userId: string) => {
    setIsLoadingLinks(true);
    try {
      const res = await fetch(`${API}/get_github_links.php?id=${userId}`);
      const data = await res.json();
      if (data.status === "success") {
        setGithubLinks(data.links);
      } else {
        toast.showToast(data.message || "Failed to load GitHub links.", "error");
        setGithubLinks([]);
      }
    } catch (error) {
      console.error("Failed to fetch GitHub links:", error);
      toast.showToast("Failed to load GitHub links due to network error.", "error");
      setGithubLinks([]);
    } finally {
      setIsLoadingLinks(false);
    }
  };

  // Fetch links when user is set
  useEffect(() => {
    if (user?.id) {
      fetchGithubLinks(user.id);
    }
  }, [user?.id]); // Re-fetch when user.id changes

  // Handle adding a new GitHub link
  const handleAddGithubLink = async () => {
    if (!user?.id) {
      toast.showToast("You must be logged in to add GitHub links.", "warning");
      return;
    }
    if (!newProjectName.trim() || !newGithubUrl.trim()) {
      toast.showToast("Project name and GitHub URL cannot be empty.", "warning");
      return;
    }
    if (!newGithubUrl.startsWith('http://') && !newGithubUrl.startsWith('https://')) {
        toast.showToast("GitHub URL must start with http:// or https://", "warning");
        return;
    }
    if (!newGithubUrl.includes('github.com')) {
        toast.showToast("Please provide a valid GitHub repository URL.", "warning");
        return;
    }

    setIsAddingLink(true);
    try {
      const res = await fetch(`${API}/add_github_link.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          project_name: newProjectName,
          github_url: newGithubUrl,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.showToast("GitHub link added successfully!", "success");
        setNewProjectName("");
        setNewGithubUrl("");
        fetchGithubLinks(user.id); // Refresh the list
      } else {
        toast.showToast(data.message || "Failed to add GitHub link.", "error");
      }
    } catch (error) {
      console.error("Failed to add GitHub link:", error);
      toast.showToast("Failed to add GitHub link due to network error.", "error");
    } finally {
      setIsAddingLink(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (linkId: string) => {
    setLinkToDeleteId(linkId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setLinkToDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (!user?.id || !linkToDeleteId) {
      toast.showToast("Error: Cannot delete link without user or link ID.", "error");
      return;
    }

    handleCloseConfirmDialog(); // Close dialog immediately

    try {
      const res = await fetch(`${API}/delete_github_link.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          link_id: linkToDeleteId,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.showToast("GitHub link deleted successfully!", "success");
        fetchGithubLinks(user.id); // Refresh the list
      } else {
        toast.showToast(data.message || "Failed to delete GitHub link.", "error");
      }
    } catch (error) {
      console.error("Failed to delete GitHub link:", error);
      toast.showToast("Failed to delete GitHub link due to network error.", "error");
    }
  };


  if (!user) {
    // This case should ideally be handled by ProtectedLayout redirecting to login
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Please log in to view your GitHub projects.</Typography>
        <Button onClick={() => navigate("/login")} sx={{ mt: 2 }}>Go to Login</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
        My GitHub Projects <Github size={36} style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
          Add a New Project Link
        </Typography>
        <Divider sx={{ my: 2 }} />
        <TextField
          label="GitHub Project Name"
          fullWidth
          variant="outlined"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="GitHub Repository URL"
          fullWidth
          variant="outlined"
          value={newGithubUrl}
          onChange={(e) => setNewGithubUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleAddGithubLink}
          disabled={isAddingLink}
          sx={{
            backgroundColor: '#28a745',
            '&:hover': { backgroundColor: '#218838' },
            borderRadius: '8px',
            padding: '8px 16px'
          }}
        >
          {isAddingLink ? <CircularProgress size={24} color="inherit" /> : 'Add Project'}
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
          Your Uploaded Projects
        </Typography>
        <Divider sx={{ my: 2 }} />

        {isLoadingLinks ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : githubLinks.length > 0 ? (
          <Grid container spacing={3}>
            {githubLinks.map((link) => (
              <Grid xs={12} sm={6} md={4} key={link.id}>
                <Card elevation={1} sx={{ borderRadius: '8px', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>{link.project_name}</Typography>
                    <MuiLink
                      href={link.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      sx={{ wordBreak: 'break-all' }}
                    >
                      {link.github_url}
                    </MuiLink>
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                      Added: {new Date(link.created_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(link.id)}
                      startIcon={<Trash2 size={16} />}
                      sx={{ borderRadius: '8px' }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            You haven't added any GitHub projects yet.
          </Typography>
        )}
      </Paper>

      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this GitHub project link? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyGithubProjects;
