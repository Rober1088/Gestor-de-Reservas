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

function App() {
  const navigator = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigator("/login");
      } else {
        navigator("/");
      }
    });
  }, [navigator]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeView />} />
      <Route path="/employees" element={<EmployeesVista />} />
      <Route path="/employees/form" element={<EmployeesForm />} />
      <Route path="/events" element={<EventsV />} />
      <Route path="/events/form" element={<EventsForm />} />
      <Route path="/users" element={<UsersV />} />
      <Route path="/users/form" element={<UsersForm />} />
    </Routes>
  );
}

export default App;
