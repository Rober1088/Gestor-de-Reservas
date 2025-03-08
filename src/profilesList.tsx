// profilesList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { fetchProfilesData } from "./supabaseDataFetch";
import { Profile } from "./Interface/profiles";

export default function ProfilesList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    async function getProfiles() {
      const data = await fetchProfilesData();
      if (data) setProfiles(data);
    }
    getProfiles();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "full_name", key: "full_name" }
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lista de Perfiles</h1>
      <Table dataSource={profiles} columns={columns} rowKey="id" />
      <Link to="/addProfile"><Button type="primary">Agregar Perfil</Button></Link>
    </div>
  );
}
