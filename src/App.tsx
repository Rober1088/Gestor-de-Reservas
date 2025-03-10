import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import EmployeesV from "./views/EmployeesV";
import EventsV from "./views/EventsV";
import UsersV from "./views/UsersV";

function App() {
  return (
    <Router>
      <Routes>
        {/* Renderiza HomeView cuando la URL es "/" */}
        <Route path="/" element={<HomeView />} />
        <Route path="/employees" element={<EmployeesV />} />
        <Route path="/events" element={<EventsV />} />
        <Route path="/users" element={<UsersV />} />
      </Routes>
    </Router>
  );
}

export default App;
