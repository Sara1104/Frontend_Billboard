// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // Importa el UserProvider
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SetPasswordForm from "./pages/RegisterPage/SetPasswordForm";
import BillboardRegisterForm from "./pages/RegisterPage/BillboardRegisterForm";
import BillboardRentalForm from "./pages/RegisterPage/BillboardRentalForm";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import BillboardTable from "./pages/BillboardTable";
import RentalTable from "./pages/RentalTable";
import EditBillboardForm from "./pages/EditBillboardForm"; 
import EditRentalForm from "./pages/EditRentalForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider> {/* Mueve UserProvider dentro de Router */}
          <Header />
          <Routes>
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/set-password" element={<SetPasswordForm />} />
            <Route path="/create-billboard" element={<ProtectedRoute><BillboardRegisterForm /></ProtectedRoute>} />
            <Route path="/create-billboard-rental" element={<ProtectedRoute><BillboardRentalForm /></ProtectedRoute>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/billboards" element={<ProtectedRoute><BillboardTable /></ProtectedRoute>} />
            <Route path="/rentals" element={<ProtectedRoute><RentalTable /></ProtectedRoute>} />
            <Route path="/edit-billboard/:idBillboard" element={<EditBillboardForm />} />
            <Route path="/edit-rental/:idRental" element={<EditRentalForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
