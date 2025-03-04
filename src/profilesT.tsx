import { useState } from "react";
import supabase from "./utils/supabase";
import { Form, Input, Button, message, Card } from "antd";
import { Profile } from "./Interface/profiles";

export default function InsertProfileForm() {
  const [loading, setLoading] = useState<boolean>(false);
  
  const onFinish = async (values: Profile) => {
    setLoading(true);
    console.log("Valores enviados:", values);
    
    const { data, error } = await supabase.from("profiles").insert([values]).select();
  
    if (error) {
      console.error("Error en Supabase:", error);
      message.error(`Error: ${error.message}`);
    } else {
      console.log("Registro insertado:", data);
      message.success("Perfil agregado con éxito.");
    }
    setLoading(false);
  };
  

  return (
    <Card title="Agregar Perfil" style={{ width: 400, margin: "20px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nombre Completo"
          name="full_name"
          rules={[{ required: true, message: "Por favor ingresa el nombre completo" }]}
        >
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item
          label="URL del Avatar"
          name="avatar_url"
          rules={[{ type: "url", message: "Ingresa una URL válida" }]}
        >
          <Input placeholder="URL del avatar" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar Perfil
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
