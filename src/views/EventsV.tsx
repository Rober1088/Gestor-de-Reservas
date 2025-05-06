import { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, message } from "antd";
import { fetchEvents } from "../controllers/supabaseDataFetch";
import { Event } from "../Models/events";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

export default function EventsV() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data || []);
      setFilteredEvents(data || []);
      setLoading(false);
    }
    loadEvents();
  }, []);

  const handleSearch = (value: string) => {
    setSearchId(value);
    if (value.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.id.toString().includes(value.trim())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("eventos").delete().eq("id", id);
    if (error) {
      message.error("Error al eliminar la cita");
    } else {
      message.success("Cita eliminada");
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
    }
  };

  const handleDeleteAll = async () => {
    const { error } = await supabase.from("eventos").delete().neq("id", -1);
    if (error) {
      message.error("Error al eliminar todos los eventos");
    } else {
      message.success("Todos los eventos fueron eliminados");
      setEvents([]);
      setFilteredEvents([]);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Localización", dataIndex: "localizacion", key: "localizacion" },
    { title: "Inicio", dataIndex: "start_time", key: "start_time" },
    { title: "Fin", dataIndex: "end_time", key: "end_time" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: Event) => (
        <Popconfirm
          title="¿Seguro que deseas eliminar esta cita?"
          onConfirm={() => handleDelete(record.id)}
          okText="Sí"
          cancelText="No"
        >
          <Button danger>Eliminar</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Eventos</h2>

      <Input.Search
        placeholder="Buscar por ID"
        value={searchId}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />

      <Table
        dataSource={filteredEvents}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => navigate("/events/form")}
        >
          Añadir Evento
        </Button>

        <Popconfirm
          title="¿Seguro que deseas eliminar todos los eventos?"
          onConfirm={handleDeleteAll}
          okText="Sí, eliminar todos"
          cancelText="No"
        >
          <Button danger style={{ marginRight: 8 }}>
            Eliminar Todos
          </Button>
        </Popconfirm>

        <Button type="default" onClick={() => navigate("/")}>
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
}
