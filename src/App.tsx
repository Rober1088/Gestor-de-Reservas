import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import EmployeesVista from "./views/EmployeesV";
import EventsV from "./views/EventsV";
import UsersV from "./views/UsersV";
import EmployeesList from "./views/EmployeesV";
import EmployeesForm from "./views/EmployeesForm";
import EventsForm from "./views/EventsForm"; 
import UsersForm from "./views/UsersForm"; 
import { useEffect } from "react";
import supabase from "./utils/supabase";
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
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<HomeView />} />
        <Route path="/employees" element={<EmployeesVista />} />
        <Route path="/events" element={<EventsV />} />
        <Route path="/users" element={<UsersV />} />
        <Route path="/employees" element={<EmployeesList />} />
        <Route path="/employees/form" element={<EmployeesForm />} />
        <Route path="/events/form" element={<EventsForm />} /> 
        <Route path="/users/form" element={<UsersForm />} />
      </Routes>
    </Router>
  );
}

export default App;
