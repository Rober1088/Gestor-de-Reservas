import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { fetchEmployees } from "../controllers/supabaseDataFetch";
import { Employee } from "../Models/employees";

const EmployeesVista: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function loadEmployees() {
      const data = await fetchEmployees();
      if (data) setEmployees(data);
    }
    loadEmployees();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    { title: "Administrador", dataIndex: "is_admin", key: "is_admin", render: (isAdmin: boolean) => (isAdmin ? "No" : "Si") },
  ];

  return (
    <div>
      <Table dataSource={employees} columns={columns} rowKey="id" />
      <Button type="primary" style={{ marginTop: "16px" }}>Añadir Empleado</Button>
    </div>
  );
};

export default EmployeesVista;
