import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Dummy data for AI Chat Models
interface ChatModel {
  id: string;
  name: string;
  description: string;
  link: string; // External link or internal route
  buttonText: string;
}

const chatModels: ChatModel[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "A powerful language model for various conversations.",
    link: "https://chat.openai.com/", // External link
    buttonText: "Go to ChatGPT",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's versatile AI model for text, images, and more.",
    link: "https://gemini.google.com/", // External link
    buttonText: "Go to Gemini",
  },
  {
    id: "bolt-ai",
    name: "Bolt AI (Placeholder)",
    description: "Your custom or integrated Bolt AI solution.",
    link: "/bolt-ai-chat", // Could be an internal route or external
    buttonText: "Go to Bolt AI",
  },
  {
    id: "coming-soon",
    name: " Coming Soon",
    description: "Stay tuned for more AI chat models coming soon!",
    link: "#", // Internal anchor or placeholder
    buttonText: "Coming Soon",
  },
];

const ChatAi = () => {
  const navigate = useNavigate();

  const handleGoToChat = (link: string) => {
    // Check if it's an external link or internal route
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, "_blank"); // Open external links in a new tab
    } else {
      navigate(link); // Navigate to internal routes
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        💬 AI Chat Models
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choose your preferred AI model to start a conversation.
      </Typography>

      <Grid container spacing={3}>
        {chatModels.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model.id}>
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
                  {model.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {model.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleGoToChat(model.link)}
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                    borderRadius: '8px',
                    padding: '8px 16px'
                  }}
                >
                  {model.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default ChatAi;