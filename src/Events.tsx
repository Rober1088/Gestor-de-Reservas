import { useState } from "react";
import supabase from "./utils/supabase";
import { Form, Input, Button, DatePicker, Switch, message, Card } from "antd";
import { Event } from "./Interface/events";

export default function InsertEventForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: Event) => {
    setLoading(true);
    const { error } = await supabase.from("events").insert(values);
    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      message.success("Evento agregado con éxito.");
    }
    setLoading(false);
  };

  return (
    <Card title="Agregar Evento" style={{ width: 400, margin: "20px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Usuario (ID)"
          name="user_id"
          rules={[{ required: true, message: "Ingresa un ID de usuario válido" }]}
        >
          <Input placeholder="ID del usuario" />
        </Form.Item>

        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: "Ingresa un título" }]}
        >
          <Input placeholder="Título del evento" />
        </Form.Item>

        <Form.Item label="Descripción" name="description">
          <Input.TextArea placeholder="Descripción del evento" />
        </Form.Item>

        <Form.Item label="Ubicación" name="location">
          <Input placeholder="Ubicación del evento" />
        </Form.Item>

        <Form.Item
          label="Fecha y hora de inicio"
          name="start_time"
          rules={[{ required: true, message: "Selecciona una fecha y hora de inicio" }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Fecha y hora de fin"
          name="end_time"
          rules={[{ required: true, message: "Selecciona una fecha y hora de fin" }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Evento recurrente" name="is_recurring" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Regla de recurrencia (opcional)" name="recurrence_rule">
          <Input placeholder="Ejemplo: FREQ=WEEKLY;INTERVAL=1" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar Evento
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}