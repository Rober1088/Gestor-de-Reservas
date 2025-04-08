import { useState } from "react";
import { Button, Form, Input, Typography, message, Card } from "antd";
import supabase from "../utils/supabase";

const { Title } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });

      if (error) {
        message.error("Error al iniciar sesión: " + error.message);
      } else {
        message.success("Correo enviado. Revisa tu bandeja de entrada.");
      }
    } catch (err: any) {
      message.error("Ocurrió un error inesperado.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title={<Title level={2}>Manejo de citas</Title>}
        bordered={false}
        style={{ width: 400, textAlign: "center" }}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              { required: true, message: "Por favor ingresa tu correo." },
              { type: "email", message: "Correo no válido." },
            ]}
          >
            <Input placeholder="correo@ejemplo.com" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
