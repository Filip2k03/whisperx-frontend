import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Prompts from "./pages/Prompts";
import BuyToken from "./pages/BuyToken";
import Profile from "./pages/Profile";
import Downloaded from "./pages/Downloaded"; // Already added in previous step
import ChatAi from "./pages/ChatAi";       // NEW: Import ChatAi
import AiVideo from "./pages/AiVideo";     // NEW: Import AiVideo
import AiMusic from "./pages/AiMusic";     // NEW: Import AiMusic
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedLayout>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/buy-token" element={<BuyToken />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/downloads" element={<Downloaded />} />
                <Route path="/ai-chat" element={<ChatAi />} />       {/* NEW ROUTE */}
                <Route path="/ai-video" element={<AiVideo />} />     {/* NEW ROUTE */}
                <Route path="/ai-music" element={<AiMusic />} />     {/* NEW ROUTE */}
                {/* You might want a default protected route, e.g., index or dashboard */}
                <Route index element={<Dashboard />} /> {/* Redirects '/' inside ProtectedLayout to Dashboard */}
              </Routes>
            </Layout>
          </ProtectedLayout>
        }
      />
    </Routes>
  );
}

export default App;