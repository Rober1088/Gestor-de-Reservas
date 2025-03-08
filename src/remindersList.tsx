// remindersList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { fetchRemindersData } from "./supabaseDataFetch";
import { Reminder } from "./Interface/reminders";

export default function RemindersList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    async function getReminders() {
      const data = await fetchRemindersData();
      if (data) setReminders(data);
    }
    getReminders();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Estado", dataIndex: "status", key: "status" }
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lista de Recordatorios</h1>
      <Table dataSource={reminders} columns={columns} rowKey="id" />
      <Link to="/addReminder"><Button type="primary">Agregar Recordatorio</Button></Link>
    </div>
  );
}