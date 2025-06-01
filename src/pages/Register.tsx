import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useToast } from "../components/ToastProvider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    birthday: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 6) return "Weak";
    if (/[A-Z]/.test(pass) && /\d/.test(pass) && pass.length >= 8)
      return "Strong";
    return "Medium";
  };

  const handleRegister = async () => {
    if (!isEmailValid(form.email)) {
      toast.showToast("❌ Invalid email format", "error");
      return;
    }

    if (getPasswordStrength(form.password) === "Weak") {
      toast.showToast(
        "⚠️ Weak password. Use 8+ characters, mix upper/lowercase & numbers.",
        "warning"
      );
      return;
    }

    try {
      const res = await fetch(
        "https://api.z267312-o74cz.ls01.zwhhosting.com/register.php", // <-- use your API
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        toast.showToast(data.message || "✅ Registered successfully!", "success");
        navigate("/login");
      } else {
        toast.showToast(data.message || "Registration failed.", "error");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.showToast("🚫 Server error. Try again later.", "error");
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
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
        >
          Create your account ✨
        </Typography>

        {/* Email */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          variant="outlined"
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
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
              mt: 1,
              color:
                getPasswordStrength(form.password) === "Strong"
                  ? "success.main"
                  : getPasswordStrength(form.password) === "Medium"
                  ? "warning.main"
                  : "error.main",
            }}
          >
            Strength: {getPasswordStrength(form.password)}
          </Typography>
        )}

        {/* Username */}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          variant="outlined"
        />

        {/* Birthday */}
        <TextField
          label="Birthday"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.birthday}
          onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: "10px",
          }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Button
          onClick={() => navigate("/login")}
          sx={{
            mt: 2,
            color: "text.secondary",
            textTransform: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Already have an account? Login →
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
