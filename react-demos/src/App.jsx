// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import ProtectedRoute from "./Context/ProtectedRoute";
import { Login } from "./Context/Login";
import UserDetails from "./StoreExample/UserDetails";
import Layout from "./Layout";
import Task from "./StoreExample/Task";
import FetchOld from "./TanstackQuery/FetchOld";
import ReactQuery from "./TanstackQuery/ReactQuery";
import ReactQueryIndv from "./TanstackQuery/ReactQueryIndv";
import DebouncedSearch from "./Debounce/DebouncedSearch";
import UserInfo from "./HOC/UserInfo";
import withAuth from "./HOC/withAuth";

export default function App() {
  const EnhancedComponent = withAuth(UserInfo);
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
          <Route path="/fetchOld" element={<FetchOld />} />
          <Route path="/rtq" element={<ReactQuery />} />
          <Route path="/rtq/:id" element={<ReactQueryIndv />} />
          <Route path="/debounce" element={<DebouncedSearch />} />
          <Route path="/hoc" element={<EnhancedComponent user="Alice" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
