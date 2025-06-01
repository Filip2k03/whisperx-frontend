import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Link as MuiLink,
  CircularProgress,
  Divider, // Ensure Divider is imported
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/api"; // Assuming your API base URL is defined here
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider"; // Assuming you have a ToastProvider
import { Github } from 'lucide-react'; // Import Github icon

// Define the interface for a single community GitHub link object
interface CommunityGithubLink {
  id: string;
  project_name: string;
  github_url: string;
  created_at: string;
  username: string;
}

const CommunityGithubProjects = () => {
  const navigate = useNavigate();
  const toast = useToast(); // Initialize the toast hook
  const [communityLinks, setCommunityLinks] = useState<CommunityGithubLink[]>([]);
  const [isLoadingCommunityLinks, setIsLoadingCommunityLinks] = useState(true);

  // Function to fetch all GitHub links from the API
  const fetchAllGithubLinks = async () => {
    setIsLoadingCommunityLinks(true); // Set loading state to true before fetching
    try {
      const res = await fetch(`${API}/get_all_github_links.php`);
      // Check if the response is OK (status code 200)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json(); // Parse the JSON response
      
      if (data.status === "success") {
        setCommunityLinks(data.links); // Set the received links to state
      } else {
        // Show an error toast if the API returns a 'fail' status
        toast.showToast(data.message || "Failed to load community GitHub links.", "error");
        setCommunityLinks([]); // Clear links on failure
      }
    } catch (error) {
      console.error("Failed to fetch community GitHub links:", error);
      // Show an error toast for network or parsing errors
      toast.showToast("Failed to load community GitHub links due to network error or invalid response.", "error");
      setCommunityLinks([]); // Clear links on error
    } finally {
      setIsLoadingCommunityLinks(false); // Set loading state to false after fetch attempt
    }
  };

  // Fetch links when the component mounts
  useEffect(() => {
    fetchAllGithubLinks();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
        Community GitHub Projects <Github size={36} style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
          Explore Shared Projects
        </Typography>
        <Divider sx={{ my: 2 }} />

        {isLoadingCommunityLinks ? (
          // Display a loading spinner while data is being fetched
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : communityLinks.length > 0 ? (
          // If there are links, display them in a responsive grid
          <Grid container spacing={3}>
            {communityLinks.map((link) => (
              <Grid item xs={12} sm={6} md={4} key={link.id}> {/* Changed xs={12} to item xs={12} for Grid item */}
                <Card elevation={1} sx={{ borderRadius: '8px', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>{link.project_name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      Uploaded by: {link.username}
                    </Typography>
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
                      variant="contained"
                      href={link.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderRadius: '8px' }}
                    >
                      View on GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // If no links are found after loading, display a message
          <Typography variant="body2" color="text.secondary">
            No community GitHub projects shared yet. Be the first to add one!
          </Typography>
        )}
      </Paper>

      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default CommunityGithubProjects;
