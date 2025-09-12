// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import ProtectedRoute from "./Context/ProtectedRoute";
import { Login } from "./Context/Login";
import UserDetails from "./StoreExample/UserDetails";
import Layout from "./Layout";
import Task from "./StoreExample/Task";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public route (no navbar) */}
        <Route path="/login" element={<Login />} />

        {/* Routes with Navbar */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <>Welcome to Dashboard Page</>
              // </ProtectedRoute>
            }
          />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/todos" element={<Task />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
