import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Prompts from "./pages/Prompts";
import BuyToken from "./pages/BuyToken";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";

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
              </Routes>
            </Layout>
          </ProtectedLayout>
        }
      />
    </Routes>
  );
}

export default App;
