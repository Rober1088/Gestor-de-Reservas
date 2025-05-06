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
    console.log("Eliminando evento con ID:", id); // Verifica el ID

    // Realizar la eliminación en la base de datos
    const { data, error } = await supabase.from("eventos").delete().eq("id", id);
    
    if (error) {
      message.error("Error al eliminar la cita");
      console.error("Error al eliminar el evento:", error);  // Ver detalles del error
    } else {
      message.success("Cita eliminada");
      console.log("Evento eliminado correctamente", data);

      // Actualizamos los estados para reflejar la eliminación en la UI
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
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

      <Button
        type="primary"
        style={{ marginTop: 16, marginRight: 8 }}
        onClick={() => navigate("/events/form")}
      >
        Añadir Evento
      </Button>

      <Button type="default" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
}
