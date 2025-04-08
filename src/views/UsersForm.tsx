import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { User } from "../Models/users";
import { insertUser } from "../controllers/supabaseDataInsert";
import { useNavigate } from "react-router-dom";

export default function UserInsertForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: User) => {
    setLoading(true);

    const result = await insertUser(values);

    if (result) {
      message.success("Usuario agregado con éxito.");
      form.resetFields();
    } else {
      message.error("Error al agregar usuario.");
    }

    setLoading(false);
  };

  return (
    <Card title="Agregar Usuario" style={{ width: 400, margin: "20px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Por favor ingresa el email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[{ required: true, message: "Por favor ingresa el teléfono" }]}
        >
          <Input placeholder="Teléfono" />
        </Form.Item>

        <Form.Item
          label="Nombre de Usuario"
          name="nombre_usuario"
          rules={[{ required: true, message: "Por favor ingresa el nombre de usuario" }]}
        >
          <Input placeholder="Nombre de Usuario" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar Usuario
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="default" onClick={() => navigate("/users")}>
            Volver a la Vista de Usuarios
          </Button>
        </Form.Item>
      </Form>
    </Card>
  ); }