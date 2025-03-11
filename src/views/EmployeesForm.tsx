import { useState } from "react";
import supabase from "../utils/supabase";
import { Form, Input, Button, message, Card, Checkbox } from "antd";
import { Employee } from "../Models/employees";

export default function EmployeeInsertForm() {
  const [loading, setLoading] = useState(false);

  // Omitimos el "id" ya que es autogenerado por Supabase
  const onFinish = async (values: Omit<Employee, "id">) => {
    setLoading(true);
    const { error } = await supabase.from("employees").insert([values]);
    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      message.success("Empleado agregado con éxito.");
    }
    setLoading(false);
  };

  return (
    <Card title="Agregar Empleado" style={{ width: 400, margin: "20px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
        >
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item
          label="Rol"
          name="rol"
          rules={[{ required: true, message: "Por favor ingresa el rol" }]}
        >
          <Input placeholder="Rol del empleado" />
        </Form.Item>

        <Form.Item name="is_admin" valuePropName="checked" initialValue={false}>
          <Checkbox>Es administrador</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
