import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface AiTool {
  id: string;
  name: string;
  description: string;
  category: string;
  link: string;
}

// Curated list of AI Video Tools
const videoAiTools: AiTool[] = [
  { id: "runwayml", name: "RunwayML Gen-1/Gen-2", description: "AI video generation and editing from text or images.", category: "Video Generation", link: "https://runwayml.com/" },
  { id: "synthesys", name: "Synthesys", description: "AI video creation with realistic virtual presenters and avatars.", category: "Virtual Presenters", link: "https://synthesys.io/" },
  { id: "heygen", name: "HeyGen", description: "AI video generator for talking avatars from text or audio.", category: "Talking Avatars", link: "https://www.heygen.com/" },
  { id: "descript-video", name: "Descript (Video)", description: "AI-powered video editing, transcription, and screen recording.", category: "Video Editing", link: "https://www.descript.com/" },
  { id: "synthesia-io", name: "Synthesia", description: "Create professional AI videos from text in minutes.", category: "Video Generation", link: "https://www.synthesia.io/" },
  { id: "pictory", name: "Pictory AI", description: "Automatically creates short, highly shareable brand videos from long content.", category: "Content Repurposing", link: "https://pictory.ai/" },
  { id: "invideo-ai", name: "InVideo AI", description: "AI-powered online video editor for quick and easy video creation.", category: "Video Editing", link: "https://invideo.io/" },
  { id: "lumen5", name: "Lumen5", description: "Turns text into video with AI, ideal for social media content.", category: "Text-to-Video", link: "https://lumen5.com/" },
  { id: "fliki", name: "Fliki", description: "Text to video and text to speech with AI voices.", category: "Text-to-Video", link: "https://fliki.ai/" },
  { id: "veed-io", name: "Veed.io (AI features)", description: "Online video editor with AI tools for background removal, subtitles, and more.", category: "Video Editing", link: "https://www.veed.io/" },
  { id: "adobe-premiere-pro-ai", name: "Adobe Premiere Pro (AI features)", description: "Professional video editing with AI tools like Auto Reframe and Remix.", category: "Video Editing", link: "https://www.adobe.com/products/premiere/ai-features.html" },
  { id: "davinci-resolve-ai", name: "DaVinci Resolve (AI features)", description: "Advanced video editing, color correction, visual effects, and audio post-production with AI.", category: "Video Editing", link: "https://www.blackmagicdesign.com/products/davinciresolve/" },
  { id: "capcut-ai", name: "CapCut (AI features)", description: "Popular mobile video editor with AI effects, templates, and auto-captions.", category: "Mobile Video Editing", link: "https://www.capcut.com/" },
  { id: "filmora-ai", name: "Filmora (AI features)", description: "Easy-to-use video editor with AI tools for smart cutouts, audio stretch, and more.", category: "Video Editing", link: "https://filmora.wondershare.com/" },
  { id: "flexclip-ai", name: "FlexClip (AI features)", description: "Online video maker with AI-powered text-to-video, image generator, and script writer.", category: "Video Creation", link: "https://www.flexclip.com/" },
];

const allVideoCategories = ["All", ...Array.from(new Set(videoAiTools.map(tool => tool.category)))].sort();

const AiVideo = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTools, setFilteredTools] = useState<AiTool[]>(videoAiTools);

  useEffect(() => {
    let currentFiltered = videoAiTools;

    if (selectedCategory !== "All") {
      currentFiltered = currentFiltered.filter(tool => tool.category === selectedCategory);
    }

    if (searchTerm) {
      currentFiltered = currentFiltered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTools(currentFiltered);
  }, [searchTerm, selectedCategory]);

  const handleGoToTool = (link: string) => {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        🎬 AI for Video Tools
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Explore AI-powered tools for video generation, editing, and enhancement.
      </Typography>

      {/* Search and Filter Section */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Search Video AI Tools"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <TextField
          select
          label="Category"
          variant="outlined"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ width: '180px' }}
        >
          {allVideoCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* AI Tools Grid */}
      <Grid container spacing={3}>
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tool.id}>
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
                  <Typography gutterBottom variant="h6" component="div" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {tool.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: '40px' }}>
                    {tool.description}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                    Category: {tool.category}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleGoToTool(tool.link)}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' },
                      borderRadius: '8px',
                      padding: '8px 16px'
                    }}
                  >
                    Go to Tool
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center', mt: 3 }}>
              <Typography variant="h6" color="text.secondary">
                No AI video tools found matching your criteria.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default AiVideo;
