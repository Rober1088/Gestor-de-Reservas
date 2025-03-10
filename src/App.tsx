import { useState } from "react";
import supabase from "./utils/supabase";
import { Form, Input, Button, message, Card } from "antd";
import { User } from "./Interface/users";

export default function InsertForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: User) => {
    setLoading(true);
    const { error } = await supabase.from("users").insert([values]);
    if (error) {
      message.error('Error: ${error.Message}');
    } else {
      message.success("Usuario agregado con exito.")
    }
    setLoading(false);
  };

  return (
    <Card title="Agregar Usuario" style={{ width: 400, margin: "20px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Correo"
          name="email"
          rules={[
            { required: true, message: "Por favor ingresa el correo" },
            { type: "email", message: "Correo no válido" }
          ]}
        >
          <Input placeholder="Correo electrónico" />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[
            { required: true, message: "Por favor ingresa el teléfono" },
            { pattern: /^[0-9]+$/, message: "Solo se permiten números" }
          ]}
        >
          <Input placeholder="Teléfono" />
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
