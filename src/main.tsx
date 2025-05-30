import React from 'react'; // Added React import
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AdComponent from './AdComponent';

// Define the dark mode state and theme here, similar to how you had it in App.js
// This ensures the theme is available to the entire application.
const darkMode = localStorage.getItem("theme") === "dark";

const theme = createTheme({
  palette: {
    mode: darkMode ? "dark" : "light",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode> {/* Added React.StrictMode for best practices */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline for consistent styling */}
        <ToastProvider>
          <App />
          <AdComponent /> {/* Include the AdComponent here */}
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);