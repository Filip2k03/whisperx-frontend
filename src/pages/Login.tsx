import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  InputAdornment, // Import InputAdornment
  IconButton,     // Import IconButton
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider"; // Assuming you want to use toast here
import API from "../api/api";

// Import icons for password visibility toggle
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast(); // Initialize useToast
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch(`${API}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.showToast("Login successful!", "success"); // Use toast for success
        navigate("/dashboard"); // Navigate to dashboard after successful login
      } else {
        setError(data.message);
        toast.showToast(data.message || "Login failed.", "error"); // Use toast for errors
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Check your connection.");
      toast.showToast("Login failed. Check your connection.", "error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'background.default', // Use theme background color
        color: 'text.primary', // Use theme text color
        p: 2,
      }}
    >
      <Paper
        elevation={6} // Added more elevation for a nicer look
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: '16px', // Rounded corners
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)', // Enhanced shadow
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Welcome back 👋
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          variant="outlined" // Use outlined variant
          sx={{ mb: 2 }} // Add margin bottom
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'} // Toggle type based on state
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          variant="outlined" // Use outlined variant
          sx={{ mb: 3 }} // Add margin bottom
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
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5, // Increase padding
            fontSize: '1rem',
            borderRadius: '10px', // More rounded button
            backgroundColor: 'primary.main', // Use theme primary color
            '&:hover': {
              backgroundColor: 'primary.dark', // Darken on hover
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/register")}
          sx={{
            mt: 2,
            textTransform: 'none', // Prevent ALL CAPS
            color: 'text.secondary', // Use theme text color
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          No account? Register →
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
