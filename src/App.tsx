import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // Dashboard will now be public
import Courses from "./pages/Courses";
import Prompts from "./pages/Prompts";
import BuyToken from "./pages/BuyToken";
import Profile from "./pages/Profile";
import Downloaded from "./pages/Downloaded";
import ChatAi from "./pages/ChatAi";
import AiVideo from "./pages/AiVideo";
import AiMusic from "./pages/AiMusic";
import Layout from "./components/Layout"; // Layout will wrap both public and protected content
import ProtectedLayout from "./components/ProtectedLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public Routes (wrapped by Layout) */}
      <Route
        path="/" // Make the root path (and dashboard) public
        element={
          <Layout> {/* Layout provides the header/sidebar */}
            <Routes>
              <Route index element={<Dashboard />} /> {/* Default route for / */}
              <Route path="/dashboard" element={<Dashboard />} /> {/* Explicit dashboard route */}
            </Routes>
          </Layout>
        }
      />

      {/* Protected Routes (wrapped by ProtectedLayout, which then uses Layout) */}
      <Route
        path="/*" // All other routes fall under this catch-all for protection
        element={
          <ProtectedLayout>
            <Layout> {/* Layout is nested inside ProtectedLayout for consistent UI */}
              <Routes>
                {/* These routes require authentication */}
                <Route path="/courses" element={<Courses />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/buy-token" element={<BuyToken />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/downloads" element={<Downloaded />} />
                <Route path="/ai-chat" element={<ChatAi />} />
                <Route path="/ai-video" element={<AiVideo />} />
                <Route path="/ai-music" element={<AiMusic />} />
              </Routes>
            </Layout>
          </ProtectedLayout>
        }
      />
    </Routes>
  );
}

export default App;
