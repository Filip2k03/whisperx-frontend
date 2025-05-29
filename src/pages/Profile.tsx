import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ username: "", birthday: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/login");
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setForm({
      username: parsed.username,
      birthday: parsed.birthday,
    });
  }, []);

  const updateProfile = async () => {
    const res = await fetch(`${API}/update_profile.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, ...form }),
    });

    const data = await res.json();
    if (data.status === "success") {
      alert("Profile updated");
      localStorage.setItem("user", JSON.stringify({ ...user, ...form }));
    } else {
      alert(data.message);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <Paper sx={{ p: 3 }}>
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
        <Button variant="contained" onClick={updateProfile}>
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
