import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import API from "../api/api";

const promptCategories = ["All", "ChatGPT", "DALL·E", "MidJourney", "Claude", "Copilot"];

// PDF Button Component
const PDFPreviewButton = ({ url }: { url: string }) => (
  <a
    href={url.startsWith("http") ? url : `${API}/${url}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none" }}
  >
    <Typography color="primary" fontWeight="bold">
      📄 View PDF
    </Typography>
  </a>
);

const Prompts = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetch(`${API}/get_prompts.php`)
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Failed to fetch prompts:", err));
  }, []);

  useEffect(() => {
    let results = prompts;
    if (category !== "All") {
      results = results.filter((p: any) => p.category === category);
    }
    if (search) {
      results = results.filter((p: any) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(results);
  }, [search, category, prompts]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        AI Prompt Library
      </Typography>

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
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {filtered.map((p: any) => (
        <Paper key={p.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{p.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {p.category}
          </Typography>
          <Typography variant="body1" mb={1}>
            Points: {p.points_required}
          </Typography>
          {(user.points || 0) >= p.points_required ? (
            <PDFPreviewButton url={p.pdf_link} />
          ) : (
            <Typography color="error">Not enough points</Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default Prompts;
