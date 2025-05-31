import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import API from "../api/api"; // Example: "https://yourdomain.com/api"

const promptCategories = ["All", "ChatGPT", "DALL·E", "MidJourney", "Claude", "Copilot"];

const Prompts = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem("user") || "{}"));

  // Fetch all prompts
  useEffect(() => {
    fetch(`${API}/get_prompts.php`)
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data);
        setFiltered(data);
      })
      .catch(() => toast.error("Failed to load prompts."));
  }, []);

  // Filter by search and category
  useEffect(() => {
    let results = prompts;
    if (category !== "All") {
      results = results.filter((p) => p.category === category);
    }
    if (search) {
      results = results.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(results);
  }, [search, category, prompts]);

  // Handle view
  const handleViewPrompt = async (id: number) => {
    try {
      const res = await fetch(`${API}/view_prompt.php?id=${id}&user_id=${user.id}`);
      const data = await res.json();

      if (data.success) {
        window.open(`${API}${data.pdf_link}`, "_blank");

        const updatedUser = { ...user, points: data.new_points };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        toast.error(data.error || "Not enough points.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch prompt.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>AI Prompt Library</Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Category"
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ width: "200px" }}
        >
          {promptCategories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Typography variant="subtitle1" mb={2}>
        Your Points: {user.points}
      </Typography>

      {filtered.map((p) => (
        <Paper key={p.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{p.title}</Typography>
          <Typography variant="body2" color="text.secondary">{p.category}</Typography>
          <Typography variant="body1">Points Required: {p.points_required}</Typography>

          {p.points_required === 0 ? (
            <Button variant="outlined" onClick={() => window.open(`${API}/${p.pdf_link}`, "_blank")}>
              View Free Prompt
            </Button>
          ) : user.points >= p.points_required ? (
            <Button variant="contained" onClick={() => handleViewPrompt(p.id)}>
              Use {p.points_required} Points
            </Button>
          ) : (
            <Typography color="error" mt={1}>
              Not enough points to view this prompt.
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default Prompts;
