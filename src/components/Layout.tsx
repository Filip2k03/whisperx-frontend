import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ThemeToggle } from "../theme/ThemeToggle";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Courses", path: "/courses", icon: <SchoolIcon /> },
  { label: "Prompts", path: "/prompts", icon: <TextSnippetIcon /> },
  { label: "Downloads", path: "/downloads", icon: <DownloadIcon /> },
  { label: "Buy Token", path: "/buy-token", icon: <MonetizationOnIcon /> },
  { label: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
  { label: "My GitHub Projects", path: "/my-github-projects", icon: <GitHubIcon /> },
  { label: "Community GitHub", path: "/community-github-projects", icon: <GitHubIcon /> },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const drawer = (
    <Box onClick={() => setMobileOpen(false)} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        }}
      >
        WhisperX
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => navigate(item.path)}
            component="button"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              backgroundColor: isActive(item.path)
                ? theme.palette.action.selected
                : 'inherit',
            }}
          >
            {item.icon && <ListItemIcon sx={{ color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.secondary }}>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} sx={{ color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary }} />
          </ListItem>
        ))}
        <ListItem
          onClick={logout}
          component="button"
          sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}
        >
          <ListItemIcon><LogoutIcon sx={{ color: theme.palette.error.main }} /></ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: theme.palette.error.main }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: '#2c3e50',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          {/* Hamburger Icon for Mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* App Name for Desktop */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: 'bold',
              letterSpacing: 1.2,
              color: '#ffffff',
              flexGrow: 1,
            }}
          >
            WhisperX
          </Typography>

          {/* Navigation Buttons for Desktop */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  color: '#ffffff',
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                  borderBottom: isActive(item.path) ? '2px solid #fdbb2d' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderBottom: '2px solid #fdbb2d',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  py: '12px',
                  px: '16px'
                }}
              >
                {item.label}
              </Button>
            ))}
            {/* Theme Toggle Button */}
            <ThemeToggle />
            <Button
              onClick={logout}
              sx={{
                color: '#fff',
                backgroundColor: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: theme.palette.error.dark,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                },
                borderRadius: '8px',
                ml: 2,
                py: '8px',
                px: '20px'
              }}
            >
              Logout
            </Button>
          </Box>

          {/* App Name for Mobile (centered, absolute, avoids overlap) */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "block", sm: "none" },
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: "auto",
              width: "fit-content",
              height: "fit-content",
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: "center",
              pointerEvents: "none",
              zIndex: 0,
              lineHeight: { xs: "56px", sm: "64px" },
            }}
          >
            WhisperX
          </Typography>

          {/* Theme Toggle for Mobile */}
          <Box sx={{ display: { xs: "block", sm: "none" }, zIndex: 1 }}>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content with Responsive Padding */}
      <Box
        component="main"
        sx={{
          width: "100%",
          px: { xs: 1, sm: 3 },
          pt: { xs: 7, sm: 8 }, // enough top padding for AppBar on mobile/desktop
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
