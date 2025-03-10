import { useState } from "react";
import { Form, Input, Button, message, Card, Select } from "antd";
import supabase from "./utils/supabase";
import { Reminder } from "./Interface/reminders";

export default function InsertForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Reminder) => {
    setLoading(true);

    const sendTime = new Date(values.send_time).toISOString(); 
    const reminderData = {
      ...values,
      send_time: sendTime,
    };

    const { error } = await supabase.from("reminders").insert([reminderData]);
    if (error) {
      message.error("Error: ${error.message}");
    } else {
      message.success("Recordatorio agregado con éxito.");
    }
    setLoading(false);
  };

  return (
    <Card title="Agregar Recordatorio" style={{ width: 400, margin: "20px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="ID de Reserva" name="booking_id">
          <Input placeholder="ID de la reserva (opcional)" />
        </Form.Item>

        <Form.Item
          label="Hora de Envío"
          name="send_time"
          rules={[{ required: true, message: "Por favor ingrese la hora de envío" }]}
        >
          <Input placeholder="YYYY-MM-DD HH:MM:SS" />
        </Form.Item>

        <Form.Item label="Estado" name="status">
          <Select placeholder="Seleccione un estado">
            <Select.Option value="pending">Pendiente</Select.Option>
            <Select.Option value="sent">Enviado</Select.Option>
            <Select.Option value="failed">Fallido</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
