import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";

export const ThemeToggle = () => {
  const mode = localStorage.getItem("theme") === "dark";
  const toggle = () => {
    const newMode = mode ? "light" : "dark";
    localStorage.setItem("theme", newMode);
    window.location.reload(); // refresh to apply theme
  };

  return (
    <IconButton onClick={toggle}>
      {mode ? <LightModeIcon /> : <Brightness4Icon />}
    </IconButton>
  );
};
