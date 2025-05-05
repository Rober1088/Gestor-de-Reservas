// src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "./utils/supabase";
import HomeView from "./views/HomeView";
import EmployeesVista from "./views/EmployeesV";
import EventsV from "./views/EventsV";
import UsersV from "./views/UsersV";
import EmployeesForm from "./views/EmployeesForm";
import EventsForm from "./views/EventsForm"; 
import UsersForm from "./views/UsersForm"; 
import Login from "./views/LoginView";
import Header from "./views/Header";
import Botton from "./views/Bottom";
import "./App.css";
import ProtectedRoute from "./controllers/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && window.location.pathname !== "/login") {
        navigate("/login");
      }
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div>
      <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <HomeView />
        </ProtectedRoute>
      } />

      <Route path="/employees" element={
        <ProtectedRoute>
          <EmployeesVista />
        </ProtectedRoute>
      } />

      <Route path="/employees/form" element={
        <ProtectedRoute>
          <EmployeesForm />
        </ProtectedRoute>
      } />

      <Route path="/events" element={
        <ProtectedRoute>
          <EventsV />
        </ProtectedRoute>
      } />

      <Route path="/events/form" element={
        <ProtectedRoute>
          <EventsForm />
        </ProtectedRoute>
      } />

      <Route path="/users" element={
        <ProtectedRoute>
          <UsersV />
        </ProtectedRoute>
      } />

      <Route path="/users/form" element={
        <ProtectedRoute>
          <UsersForm />
        </ProtectedRoute>
      } />
    </Routes>
    <Botton />
    </div>
  );
}

export default App;
