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
import MyGithubProjects from "./pages/MyGithubProjects"; // NEW: Import MyGithubProjects
import CommunityGithubProjects from "./pages/CommunityGithubProjects"; // NEW: Import CommunityGithubProjects
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes - Accessible to everyone */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/free-hosting" element={<FreeHosting />} />
        <Route path="/free-hosting/python" element={<PythonDeploy />} />
        <Route path="/free-hosting/node" element={<NodeDeploy />} />
        <Route path="/free-hosting/php" element={<PHPDeploy />} />
        <Route path="/community-github-projects" element={<CommunityGithubProjects />} /> {/* NEW: Public Community Projects */}

        {/* Protected Routes - These routes require authentication. */}
        <Route path="/courses" element={<ProtectedLayout><Courses /></ProtectedLayout>} />
        <Route path="/prompts" element={<ProtectedLayout><Prompts /></ProtectedLayout>} />
        <Route path="/buy-token" element={<ProtectedLayout><BuyToken /></ProtectedLayout>} />
        <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
        <Route path="/downloads" element={<ProtectedLayout><Downloaded /></ProtectedLayout>} />
        <Route path="/ai-chat" element={<ProtectedLayout><ChatAi /></ProtectedLayout>} />
        <Route path="/ai-video" element={<ProtectedLayout><AiVideo /></ProtectedLayout>} />
        <Route path="/ai-music" element={<ProtectedLayout><AiMusic /></ProtectedLayout>} />
        <Route path="/my-github-projects" element={<ProtectedLayout><MyGithubProjects /></ProtectedLayout>} /> {/* NEW: Protected My Projects */}

        {/* Optional: Fallback route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
