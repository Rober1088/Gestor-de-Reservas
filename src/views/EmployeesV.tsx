import React, { useEffect, useState } from "react";
import { Table, Button, Input } from "antd";
import { fetchEmployees } from "../controllers/supabaseDataFetch";
import { Employee } from "../Models/employees";
import { useNavigate } from "react-router-dom";

const EmployeesVista: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEmployees() {
      const data = await fetchEmployees();
      if (data) {
        setEmployees(data);
        setFilteredEmployees(data);
      }
    }
    loadEmployees();
  }, []);

  const handleSearch = (value: string) => {
    setSearchId(value);
    const filtered = employees.filter(emp =>
      emp.id.toString().includes(value.trim())
    );
    setFilteredEmployees(filtered);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    {
      title: "Administrador",
      dataIndex: "admin",
      key: "admin",
      render: (admin: boolean) => (admin ? "Sí" : "No"),
    },
    // ¡Contraseña eliminada!
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Trabajadores</h2>
      
      <Input.Search
        placeholder="Buscar por ID"
        value={searchId}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />

      <Table dataSource={filteredEmployees} columns={columns} rowKey="id" />

      <Button
        type="primary"
        style={{ marginTop: "16px", marginRight: 8 }}
        onClick={() => navigate("/employees/form")}
      >
        Añadir Empleado
      </Button>
      <Button type="default" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
};

export default EmployeesVista;
