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
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";
import { Github } from 'lucide-react'; // Import Github icon

interface CommunityGithubLink {
  id: string;
  project_name: string;
  github_url: string;
  created_at: string;
  username: string; // Added to show who uploaded it
}

const CommunityGithubProjects = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [communityLinks, setCommunityLinks] = useState<CommunityGithubLink[]>([]);
  const [isLoadingCommunityLinks, setIsLoadingCommunityLinks] = useState(true);

  // Function to fetch all GitHub links
  const fetchAllGithubLinks = async () => {
    setIsLoadingCommunityLinks(true);
    try {
      const res = await fetch(`${API}/get_all_github_links.php`);
      const data = await res.json();
      if (data.status === "success") {
        setCommunityLinks(data.links);
      } else {
        toast.showToast(data.message || "Failed to load community GitHub links.", "error");
        setCommunityLinks([]);
      }
    } catch (error) {
      console.error("Failed to fetch community GitHub links:", error);
      toast.showToast("Failed to load community GitHub links due to network error.", "error");
      setCommunityLinks([]);
    } finally {
      setIsLoadingCommunityLinks(false);
    }
  };

  useEffect(() => {
    fetchAllGithubLinks();
  }, []);

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
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : communityLinks.length > 0 ? (
          <Grid container spacing={3}>
            {communityLinks.map((link) => (
              <Grid xs={12} sm={6} md={4} key={link.id}>
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
