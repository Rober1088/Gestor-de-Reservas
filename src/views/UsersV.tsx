import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { fetchUsers } from "../controllers/supabaseDataFetch";
import { User } from "../Models/users";
import { useNavigate } from "react-router-dom";

export default function UsersV() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data || []);
      setLoading(false);
    }
    loadUsers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Nombre usuario", dataIndex: "nombre_usuario", key: "nombre_usuario" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Usuarios</h2>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Button type="primary" style={{ marginTop: 16, marginRight: 8 }}>
        Añadir Usuario
      </Button>
      <Button type="default" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
}
