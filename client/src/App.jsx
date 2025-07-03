import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminLoginPage />} />
        </Routes>
      </BrowserRouter>
  );
}
