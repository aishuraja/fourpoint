import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewSemester from "./pages/NewSemester";
import Login from "./pages/Login";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <div className="">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<NewSemester />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
