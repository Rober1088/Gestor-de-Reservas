import { useState } from "react";
import supabase from "./utils/supabase";
import { Form, Input, Button, message, Card } from "antd";
import { Profile } from "./Interface/profiles";

export default function InsertForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: Profile) => {
    setLoading(true);
    const { error } = await supabase.from("profiles").insert([values]);
    if (error) {
      message.error('Error: ${error.Message}');

    } else {
      message.success("Usuario agregado con exito.")
    }
    setLoading(false);
  };

  return (
    <Card title="Agregar Profile" style={{ width: 400, margin: "20px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nombre"
          name="full_name"
          rules={[
            { required: true, message: "Por favor ingrese su nombre" },
            { message: "Nombre no válido" }
          ]}
        >
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item
          label="Foto"
          name="avatar_url"
          rules={[
            { required: true, message: "Por favor suba una foto" },
            { type: "url", message: "No válido" }
          ]}
        >
          <Input placeholder="Url de su foto" />
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
