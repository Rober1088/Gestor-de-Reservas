// eventsList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { fetchEventsData } from "./supabaseDataFetch";
import { Event } from "./Interface/events";

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function getEvents() {
      const data = await fetchEventsData();
      if (data) setEvents(data);
    }
    getEvents();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Título", dataIndex: "title", key: "title" }
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lista de Eventos</h1>
      <Table dataSource={events} columns={columns} rowKey="id" />
      <Link to="/addEvent"><Button type="primary">Agregar Evento</Button></Link>
    </div>
  );
}
