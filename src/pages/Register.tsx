import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useToast } from "../components/ToastProvider";
import { ThemeToggle } from "../theme/ThemeToggle";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    birthday: "",
  });

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 6) return "Weak";
    if (/[A-Z]/.test(pass) && /\d/.test(pass) && pass.length >= 8)
      return "Strong";
    return "Medium";
  };

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!isEmailValid(form.email)) {
      toast.showToast("Invalid email format", "error");
      return;
    }

    if (getPasswordStrength(form.password) === "Weak") {
      toast.showToast("Password is too weak", "warning");
      return;
    }

    try {
      const res = await fetch(`${API}/register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.status === "pending") {
        toast.showToast("Check your email to verify account", "success");
        navigate("/login");
      } else {
        toast.showToast(data.message || "Failed to register", "error");
      }
    } catch {
      toast.showToast("Something went wrong!", "error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        color: "text.primary",
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 420 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Create your account ✨</Typography>
          <ThemeToggle />
        </Box>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {form.password && (
          <Typography
            variant="caption"
            sx={{
              color:
                getPasswordStrength(form.password) === "Strong"
                  ? "green"
                  : getPasswordStrength(form.password) === "Medium"
                  ? "orange"
                  : "red",
            }}
          >
            Strength: {getPasswordStrength(form.password)}
          </Typography>
        )}

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <TextField
          label="Birthday"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.birthday}
          onChange={(e) => setForm({ ...form, birthday: e.target.value })}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Button onClick={() => navigate("/login")} sx={{ mt: 1 }}>
          Already have an account? Login →
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
