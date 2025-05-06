import { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import { fetchUsers } from "../controllers/supabaseDataFetch";
import { User } from "../Models/users";
import { useNavigate } from "react-router-dom";

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

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Nombre usuario", dataIndex: "nombre_usuario", key: "nombre_usuario" },
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

      <Button
        type="primary"
        style={{ marginTop: 16, marginRight: 8 }}
        onClick={() => navigate("/users/form")}
      >
        Añadir Usuario
      </Button>

      <Button type="default" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
}
