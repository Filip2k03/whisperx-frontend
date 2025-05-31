import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment, // Import InputAdornment
  IconButton,     // Import IconButton
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useToast } from "../components/ToastProvider";
// import { ThemeToggle } from "../theme/ThemeToggle"; // ThemeToggle is now in Layout.tsx

// Import icons for password visibility toggle
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    birthday: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
      toast.showToast("Password is too weak. Please use at least 8 characters, including uppercase letters and numbers.", "warning");
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
        toast.showToast("Registration successful! Check your email to verify account.", "success");
        navigate("/login");
      } else {
        toast.showToast(data.message || "Failed to register.", "error");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.showToast("Something went wrong! Check your connection.", "error");
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
      <Paper
        elevation={6} // Added more elevation for a nicer look
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: '16px', // Rounded corners
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)', // Enhanced shadow
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Create your account ✨
          </Typography>
          {/* ThemeToggle is now in Layout.tsx, remove from here */}
          {/* <ThemeToggle /> */}
        </Box>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'} // Toggle type based on state
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          variant="outlined"
          sx={{ mb: 1 }} // Reduced margin as strength text is below
          InputProps={{ // Add InputProps for the adornment
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {form.password && (
          <Typography
            variant="caption"
            sx={{
              color:
                getPasswordStrength(form.password) === "Strong"
                  ? "success.main" // Use theme colors
                  : getPasswordStrength(form.password) === "Medium"
                  ? "warning.main" // Use theme colors
                  : "error.main", // Use theme colors
              display: 'block', // Ensure it's on its own line
              mb: 2, // Add margin bottom
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
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Birthday"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.birthday}
          onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: '1rem',
            borderRadius: '10px',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            },
          }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Button
          onClick={() => navigate("/login")}
          sx={{
            mt: 2,
            textTransform: 'none',
            color: 'text.secondary',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Already have an account? Login →
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
