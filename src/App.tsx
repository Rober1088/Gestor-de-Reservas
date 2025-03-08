// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainInterface from "./mainInterface";
import RemindersList from "./remindersList";
import ProfilesList from "./profilesList";
import EventsList from "./eventsList";
import UserList from "./userList";
import User from "./User";
import Reminder from "./Reminders";
import Profile from "./Profiles";
import Event from "./Events";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainInterface />} />
        <Route path="/remindersList" element={<RemindersList />} />
        <Route path="/profilesList" element={<ProfilesList />} />
        <Route path="/eventsList" element={<EventsList />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/addUser" element={<User/>} />
        <Route path="/addReminder" element={<Reminder />} />
        <Route path="/addProfile" element={<Profile />} />
        <Route path="/addEvent" element={<Event />} />
      </Routes>
    </Router>
  );
}
