import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { fetchEvents } from "../controllers/supabaseDataFetch";
import { Event } from "../Models/events";
import { useNavigate } from "react-router-dom";

export default function EventsV() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data || []);
      setLoading(false);
    }
    loadEvents();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Localización", dataIndex: "localizacion", key: "localizacion" },
    { title: "Inicio", dataIndex: "start_time", key: "start_time" },
    { title: "Fin", dataIndex: "end_time", key: "end_time" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Eventos</h2>
      <Table
        dataSource={events}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Button 
        type="primary" 
        style={{ marginTop: 16, marginRight: 8 }} 
        onClick={() => navigate("/events/form")} // Cambiar a la ruta correcta
      >
        Añadir Evento
      </Button>
      <Button type="default" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
}
