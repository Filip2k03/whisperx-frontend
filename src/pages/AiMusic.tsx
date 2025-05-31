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

// Curated list of AI Music & Audio Tools
const musicAiTools: AiTool[] = [
  { id: "elevenlabs", name: "ElevenLabs", description: "Generates realistic AI voices for various applications.", category: "Text-to-Speech", link: "https://elevenlabs.io/" },
  { id: "aiva", name: "AIVA", description: "AI music composer that creates original soundtracks for various projects.", category: "Music Generation", link: "https://www.aiva.ai/" },
  { id: "soundraw", name: "Soundraw", description: "AI music generator for various moods, genres, and instruments.", category: "Music Generation", link: "https://soundraw.io/" },
  { id: "murf-ai", name: "Murf AI", description: "Text-to-speech with natural-sounding AI voices and customizability.", category: "Text-to-Speech", link: "https://murf.ai/" },
  { id: "adobe-podcast", name: "Adobe Podcast (AI features)", description: "AI audio enhancement for podcasts, including noise reduction and clarity.", category: "Audio Enhancement", link: "https://podcast.adobe.com/enhance" },
  { id: "krisp", name: "Krisp", description: "AI-powered noise cancellation for calls and recordings.", category: "Audio Enhancement", link: "https://krisp.ai/" },
  { id: "descript-audio", name: "Descript (Audio)", description: "AI-powered audio editing, transcription, and voice cloning.", category: "Audio Editing", link: "https://www.descript.com/" },
  { id: "amper-music", name: "Amper Music", description: "AI music creation platform for unique and customizable tracks.", category: "Music Generation", link: "https://www.ampermusic.com/" },
  { id: "lovo-ai", name: "LOVO AI", description: "AI voice generator and text-to-speech with a wide range of voices and emotions.", category: "Text-to-Speech", link: "https://www.lovo.ai/" },
  { id: "play-ht", name: "Play.ht", description: "AI voice generator and realistic text-to-speech with voice cloning.", category: "Text-to-Speech", link: "https://play.ht/" },
  { id: "mubert", name: "Mubert", description: "AI music for content creators, generating royalty-free tracks.", category: "Music Generation", link: "https://mubert.com/" },
  { id: "juke-deck", name: "Jukebox (OpenAI)", description: "Generates music with vocals in various genres and artist styles.", category: "Music Generation", link: "https://openai.com/blog/jukebox/" },
  { id: "lyrebird-ai", name: "Lyrebird AI (now Descript)", description: "AI voice synthesis for creating unique voice models.", category: "Voice Cloning", link: "https://www.descript.com/" },
  { id: "speechify", name: "Speechify", description: "Text-to-speech reader with natural-sounding AI voices.", category: "Text-to-Speech", link: "https://speechify.com/" },
  { id: "otter-ai", name: "Otter.ai", description: "AI meeting assistant that records and transcribes conversations.", category: "Audio-to-Text", link: "https://otter.ai/" },
];

const allMusicCategories = ["All", ...Array.from(new Set(musicAiTools.map(tool => tool.category)))].sort();

const AiMusic = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTools, setFilteredTools] = useState<AiTool[]>(musicAiTools);

  useEffect(() => {
    let currentFiltered = musicAiTools;

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
        🎶 AI for Music & Audio Tools
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Explore AI-powered tools for music generation, audio enhancement, and voice synthesis.
      </Typography>

      {/* Search and Filter Section */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Search Audio AI Tools"
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
          {allMusicCategories.map((category) => (
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
                No AI music or audio tools found matching your criteria.
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

export default AiMusic;
