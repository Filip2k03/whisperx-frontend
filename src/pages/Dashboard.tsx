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
  CircularProgress, // Import CircularProgress for loading indicator
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";

// Define types for better readability and type safety
interface User {
  id: string;
  username: string;
  email: string;
  birthday: string;
  role: string;
  points: number;
}

interface AiToolCategory {
  id: string;
  title: string;
  description: string;
  path: string;
  buttonText: string;
}

interface NewsArticle {
  id: string;
  title: string;
  snippet: string;
  source: string;
  link: string;
}

// Dummy data for AI Tool Categories
const aiToolCategories: AiToolCategory[] = [
  {
    id: "chat-ai",
    title: "AI Chat & General Tools",
    description: "Explore a comprehensive library of AI chat models and general AI tools.",
    path: "/ai-chat",
    buttonText: "Explore All AI Tools",
  },
  {
    id: "video-ai",
    title: "AI for Video",
    description: "Generate, edit, and enhance videos with powerful AI capabilities.",
    path: "/ai-video",
    buttonText: "Go to AI Video Tools",
  },
  {
    id: "music-ai",
    title: "AI for Music & Audio",
    description: "Create unique melodies, soundtracks, and process audio with AI.",
    path: "/ai-music",
    buttonText: "Go to AI Music & Audio Tools",
  },
];

// Dummy data for Trending AI Buzzwords
const trendingAiBuzzwords = [
  "Generative AI", "Large Language Models", "AI Ethics", "Computer Vision",
  "Natural Language Processing", "Machine Learning Ops", "Reinforcement Learning",
  "Deep Learning", "AI in Healthcare", "Autonomous Systems", "Edge AI",
  "AI for Creativity", "Explainable AI", "Federated Learning"
];

// Dummy data for Latest AI News
const latestAiNews: NewsArticle[] = [
  {
    id: "news1",
    title: "New Breakthrough in AI Drug Discovery",
    snippet: "Researchers announce a significant leap in using AI to identify potential drug candidates faster than ever before.",
    source: "Nature AI",
    link: "https://example.com/news1", // Replace with actual news links
  },
  {
    id: "news2",
    title: "AI Models Now Generating Hyper-Realistic Video",
    snippet: "The latest AI video generation models are producing stunningly realistic and coherent video clips, blurring lines with reality.",
    source: "TechCrunch",
    link: "https://example.com/news2",
  },
  {
    id: "news3",
    title: "Ethical Concerns Rise with AI's Rapid Advancement",
    snippet: "As AI capabilities grow, experts are calling for more robust ethical guidelines and regulations to ensure responsible development.",
    source: "AI Policy Review",
    link: "https://example.com/news3",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true); // State to track user data loading
  const [currentBuzzwordIndex, setCurrentBuzzwordIndex] = useState(0);

  // Effect for the trending AI buzzwords rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBuzzwordIndex((prevIndex) =>
        (prevIndex + 1) % trendingAiBuzzwords.length
      );
    }, 3000); // Change word every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Function to fetch user data from the server
  const fetchUser = async (userId: string) => {
    setIsLoadingUser(true); // Start loading when fetching user data
    try {
      const res = await fetch(`${API}/get_user.php?id=${userId}`);
      const data = await res.json();
      if (!data.error) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // Refresh local storage with latest data
      } else {
        toast.showToast(data.error, "error");
        localStorage.removeItem("user"); // Clear invalid user from local storage
        setUser(null); // Set user to null if server returns an error
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.showToast("Failed to load user data.", "error");
      localStorage.removeItem("user"); // Clear local storage on network error
      setUser(null); // Set user to null on network error
    } finally {
      setIsLoadingUser(false); // Stop loading regardless of success or failure
    }
  };

  // Effect to load user from localStorage on component mount
  // This ensures the dashboard always tries to get the latest user state
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser); // Set user state immediately for initial render
      fetchUser(parsedUser.id); // Then fetch fresh data from server
    } else {
      setUser(null); // No user found in local storage
      setIsLoadingUser(false); // Not loading if no user to fetch
    }
  }, []); // Empty dependency array: runs once on mount

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    navigate("/login");
    toast.showToast("Logged out successfully", "info");
  };

  // Display loading indicator if user data is still being fetched
  if (isLoadingUser && user === null) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} sx={{ color: '#1976d2' }} />
        <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      {/* Welcome and Trending AI Buzzwords */}
      <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: '16px', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', overflow: 'hidden' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          👋 Welcome, {user?.username || "Guest"}!
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'light', mb: 2 }}>
          Your Hub for AI Innovation
        </Typography>
        <Box sx={{ height: '30px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'medium',
              animation: `slide-up 0.5s ease-out forwards`,
              '@keyframes slide-up': {
                '0%': { transform: 'translateY(100%)', opacity: 0 },
                '100%': { transform: 'translateY(0)', opacity: 1 },
              },
              animationIterationCount: 1,
              animationFillMode: 'forwards',
              animationName: currentBuzzwordIndex !== 0 ? 'slide-up' : 'none',
            }}
            key={currentBuzzwordIndex}
          >
            {trendingAiBuzzwords[currentBuzzwordIndex]}
          </Typography>
        </Box>
      </Paper>

      {/* Account Info & Points / Login/Register Prompt */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          {user ? (
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
                🧾 Your Account Info
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography><strong>Email:</strong> {user.email || 'N/A'}</Typography>
              <Typography><strong>Birthday:</strong> {user.birthday || 'N/A'}</Typography>
              <Typography><strong>Role:</strong> {user.role || 'user'}</Typography>
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
                Access Your Account
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Log in to manage your profile, view points, and access exclusive content!
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="outlined" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {user ? (
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ color: '#555' }}>
                  💰 Your Points
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => user?.id && fetchUser(user.id)}
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
                {user.points || 0} pts
              </Typography>
              <Button
                  variant="contained"
                  onClick={() => navigate("/buy-token")}
                  sx={{ mt: 2, backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#FB8C00' }, borderRadius: '8px' }}
              >
                  Buy More Tokens
              </Button>
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
                Earn & Use Points
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Log in to earn points and use them to unlock premium prompts and courses!
              </Typography>
              <Button variant="contained" onClick={() => navigate("/buy-token")}>
                Buy Tokens
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Explore AI Tools */}
      <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: 'bold', color: '#333' }}>
        🚀 Explore AI Tools
      </Typography>
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

      {/* Latest AI News */}
      <Typography variant="h5" sx={{ mt: 6, mb: 3, fontWeight: 'bold', color: '#333' }}>
        📰 Latest AI News
      </Typography>
      <Grid container spacing={3}>
        {latestAiNews.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                }
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: '60px' }}>
                  {article.snippet}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                  Source: {article.source}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  size="small"
                  variant="text"
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#3f51b5', '&:hover': { textDecoration: 'underline' } }}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Free Hosting Providers Link */}
      <Typography variant="h5" sx={{ mt: 6, mb: 3, fontWeight: 'bold', color: '#333' }}>
        ☁️ Free Resources
      </Typography>
      <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: '16px', background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Looking for Free Hosting?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Discover a curated list of reliable free hosting providers for your projects.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/free-hosting")}
          sx={{
            backgroundColor: 'white',
            color: '#2196F3',
            '&:hover': { backgroundColor: '#e0f2f7' },
            borderRadius: '8px',
            padding: '10px 25px',
            fontWeight: 'bold'
          }}
        >
          View Free Hosting List
        </Button>
      </Paper>


      {/* Logout Button - Only show if logged in */}
      {user && (
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
      )}
    </Box>
  );
};

export default Dashboard;
