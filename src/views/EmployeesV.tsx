import React, { useEffect, useState } from "react";
import { Table, Button, Input } from "antd";
import { fetchEmployees } from "../controllers/supabaseDataFetch";
import { Employee } from "../Models/employees";
import { useNavigate } from "react-router-dom";

const EmployeesVista: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
    setSearchTerm(value);
    const term = value.toLowerCase().trim();
    const filtered = employees.filter(emp =>
      emp.id.toString().includes(term) ||
      emp.nombre?.toLowerCase().includes(term)
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
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Trabajadores</h2>

      <Input.Search
        placeholder="Buscar por ID o Nombre"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
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
