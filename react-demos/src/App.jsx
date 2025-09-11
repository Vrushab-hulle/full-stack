// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import ProtectedRoute from "./Context/ProtectedRoute";
import { Login } from "./Context/Login";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>Welcome to dashboard Page</>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
