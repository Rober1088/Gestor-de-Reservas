import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import EmployeesVista from "./views/EmployeesV";
import EventsV from "./views/EventsV";
import UsersV from "./views/UsersV";
import EmployeesList from "./views/EmployeesV";
import EmployeesForm from "./views/EmployeesForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Renderiza HomeView cuando la URL es "/" */}
        <Route path="/" element={<HomeView />} />
        <Route path="/employees" element={<EmployeesVista />} />
        <Route path="/events" element={<EventsV />} />
        <Route path="/users" element={<UsersV />} />
        <Route path="/employees" element={<EmployeesList />} />
        <Route path="/employees/form" element={<EmployeesForm />} />
      </Routes>
    </Router>
  );
}

export default App;
