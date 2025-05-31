import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Prompts from "./pages/Prompts";
import BuyToken from "./pages/BuyToken";
import Profile from "./pages/Profile";
import Downloaded from "./pages/Downloaded";
import ChatAi from "./pages/ChatAi";
import AiVideo from "./pages/AiVideo";
import AiMusic from "./pages/AiMusic";
import FreeHosting from "./pages/FreeHosting";
import PythonDeploy from "./pages/PythonDeploy";
import NodeDeploy from "./pages/NodeDeploy";
import PHPDeploy from "./pages/PHPDeploy";
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout"; // Still used for individual route protection
import "./App.css";

function App() {
  return (
    <Layout> {/* Layout now wraps the entire application */}
      <Routes>
        {/* Authentication Routes (no Layout or ProtectedLayout needed here) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes - Accessible to everyone */}
        <Route path="/" element={<Dashboard />} /> {/* Root path points to Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Explicit Dashboard route */}
        <Route path="/free-hosting" element={<FreeHosting />} />
        <Route path="/free-hosting/python" element={<PythonDeploy />} />
        <Route path="/free-hosting/node" element={<NodeDeploy />} />
        <Route path="/free-hosting/php" element={<PHPDeploy />} />

        {/* Protected Routes - These routes require authentication.
            They are individually wrapped by ProtectedLayout. */}
        <Route path="/courses" element={<ProtectedLayout><Courses /></ProtectedLayout>} />
        <Route path="/prompts" element={<ProtectedLayout><Prompts /></ProtectedLayout>} />
        <Route path="/buy-token" element={<ProtectedLayout><BuyToken /></ProtectedLayout>} />
        <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
        <Route path="/downloads" element={<ProtectedLayout><Downloaded /></ProtectedLayout>} />
        <Route path="/ai-chat" element={<ProtectedLayout><ChatAi /></ProtectedLayout>} />
        <Route path="/ai-video" element={<ProtectedLayout><AiVideo /></ProtectedLayout>} />
        <Route path="/ai-music" element={<ProtectedLayout><AiMusic /></ProtectedLayout>} />

        {/* Optional: Fallback route for any unmatched paths */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
