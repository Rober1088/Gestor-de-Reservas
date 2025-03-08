import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { fetchUsersData } from "./supabaseDataFetch";
import { User } from "./Interface/users";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const data = await fetchUsersData();
      if (data) setUsers(data);
    }
    getUsers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" }
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lista de Usuarios</h1>
      <Table dataSource={users} columns={columns} rowKey="id" />
      <Link to="/addUser"><Button type="primary">Agregar Usuario</Button></Link>
    </div>
  );
}
