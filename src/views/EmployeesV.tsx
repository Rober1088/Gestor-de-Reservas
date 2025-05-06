import React, { useEffect, useState } from "react";
import { Table, Button, Input, Popconfirm, message } from "antd";
import { fetchEmployees } from "../controllers/supabaseDataFetch";
import { Employee } from "../Models/employees";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const EmployeesVista: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);  
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);
      const data = await fetchEmployees();
      console.log("Empleados obtenidos:", data);
      setEmployees(data || []);
      setFilteredEmployees(data || []);
      setLoading(false);
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

  const handleDelete = async (id: number) => {
    setDeleting(true);  
    const { error } = await supabase.from("empleados").delete().eq("id", id);
    if (error) {
      console.error("Error al eliminar empleado:", error);
      message.error(`Error al eliminar: ${error.message}`);
    } else {
      message.success("Empleado eliminado correctamente");
      const updated = employees.filter(emp => emp.id !== id);
      setEmployees(updated);
      setFilteredEmployees(updated);
    }
    setDeleting(false);  
  };

  const handleDeleteAll = async () => {
    const ids = employees.map(emp => emp.id);
    if (ids.length === 0) {
      message.info("No hay empleados para eliminar.");
      return;
    }
    setDeleting(true);  
    const { error } = await supabase.from("empleados").delete().in("id", ids);
    if (error) {
      console.error("Error al eliminar todos los empleados:", error);
      message.error(`Error al eliminar todos: ${error.message}`);
    } else {
      message.success("Todos los empleados han sido eliminados");
      setEmployees([]);
      setFilteredEmployees([]);
    }
    setDeleting(false);  
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    {
      title: "Administrador",
      dataIndex: "is_admin",
      key: "is_admin",
      render: (is_admin: boolean) => (is_admin ? "Sí" : "No"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: Employee) => (
        <Popconfirm
          title="¿Estás seguro de eliminar este empleado?"
          onConfirm={() => handleDelete(record.id)}
          okText="Sí"
          cancelText="No"
        >
          <Button danger loading={deleting}>Eliminar</Button>
        </Popconfirm>
      ),
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

      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => navigate("/employees/form")}
        >
          Añadir Empleado
        </Button>

        <Popconfirm
          title="¿Estás seguro de eliminar todos los empleados?"
          onConfirm={handleDeleteAll}
          okText="Sí, eliminar todos"
          cancelText="No"
        >
          <Button danger style={{ marginRight: 8 }} loading={deleting}>
            Eliminar Todos
          </Button>
        </Popconfirm>

        <Button type="default" onClick={() => navigate("/")}>
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default EmployeesVista;
