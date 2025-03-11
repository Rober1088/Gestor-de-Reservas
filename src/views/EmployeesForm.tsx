import { useState } from "react";
import { Form, Input, Button, message, Card, Checkbox } from "antd";
import { Employee } from "../Models/employees";
import { insertEmployee } from "../controllers/supabaseDataInsert";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación

export default function EmployeeInsertForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Manejo de estado del formulario
  const navigate = useNavigate(); // Hook para la navegación

  const onFinish = async (values: Omit<Employee, "id">) => {
    setLoading(true);

    
    const formattedValues = { ...values, admin: !!values.is_admin };

    const result = await insertEmployee(formattedValues);

    if (result) {
      message.success("Empleado agregado con éxito.");
      form.resetFields(); // Limpiamos el formulario tras la inserción
    } else {
      message.error("Error al agregar empleado.");
    }

    setLoading(false);
  };

  return (
    <Card title="Agregar Empleado" style={{ width: 400, margin: "20px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Por favor ingresa el nombre" }]}>
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item
          label="Rol"
          name="rol"
          rules={[{ required: true, message: "Por favor ingresa el rol" }]}>
          <Input placeholder="Rol del empleado" />
        </Form.Item>

        <Form.Item name="is_admin" valuePropName="checked" initialValue={false}>
          <Checkbox>Es administrador</Checkbox>
        </Form.Item>

        {/* Agregar campo de contraseña */}
        <Form.Item
          label="Contraseña"
          name="contrasena"
          rules={[{ required: true, message: "Por favor ingresa la contraseña" }]}>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar
          </Button>
        </Form.Item>

        {/* Botón para regresar a la vista de empleados centrado */}
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="default" onClick={() => navigate("/employees")}>
            Volver a la Vista de Empleados
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
