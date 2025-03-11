import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { fetchEmployees } from "../controllers/supabaseDataFetch";
import { Employee } from "../Models/employees";
import { useNavigate } from "react-router-dom";

const EmployeesVista: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

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
    { title: "Administrador", dataIndex: "is_admin", key: "is_admin", render: (isAdmin: boolean) => (isAdmin ? "No" : "Sí") },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Trabajadores</h2>
      <Table dataSource={employees} columns={columns} rowKey="id" />
      <Button type="primary" style={{ marginTop: "16px", marginRight: 8 }}onClick={() => navigate("/employees/form")}>
        Añadir Empleado
      </Button>
      <Button type="default" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
};

export default EmployeesVista;
