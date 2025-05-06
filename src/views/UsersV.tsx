import { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, message } from "antd";
import { fetchUsers } from "../controllers/supabaseDataFetch";
import { User } from "../Models/users";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

export default function UsersV() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const data = await fetchUsers();
      console.log("Usuarios obtenidos:", data);
      setUsers(data || []);
      setFilteredUsers(data || []);
      setLoading(false);
    }
    loadUsers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const term = value.toLowerCase().trim();
    const filtered = users.filter(user =>
      user.id.toString().includes(term) ||
      user.nombre_usuario?.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) {
      console.error("Error al eliminar usuario:", error);
      message.error(`Error al eliminar: ${error.message}`);
    } else {
      message.success("Usuario eliminado");
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  };

  const handleDeleteAll = async () => {
    const { error } = await supabase.from("usuarios").delete().neq("id", -1);
    if (error) {
      console.error("Error al eliminar todos los usuarios:", error);
      message.error(`Error al eliminar todos: ${error.message}`);
    } else {
      message.success("Todos los usuarios fueron eliminados");
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Nombre usuario", dataIndex: "nombre_usuario", key: "nombre_usuario" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: User) => (
        <Popconfirm
          title="¿Seguro que deseas eliminar este usuario?"
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
      <h2>Usuarios</h2>

      <Input.Search
        placeholder="Buscar por ID o nombre de usuario"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => navigate("/users/form")}
        >
          Añadir Usuario
        </Button>

        <Popconfirm
          title="¿Seguro que deseas eliminar todos los usuarios?"
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
