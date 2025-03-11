import { useState } from "react";
import { Form, Input, Button, message, Card, DatePicker } from "antd";
import { Event } from "../Models/events";
import { insertEvent } from "../controllers/supabaseDataInsert";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";  // Para el formato de fecha

export default function EventsForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: Event) => {
    setLoading(true);

    // Formateamos las fechas antes de enviarlas
    const formattedValues = {
      ...values,
      start_time: dayjs(values.start_time).toISOString(),
      end_time: dayjs(values.end_time).toISOString(),
    };

    const result = await insertEvent(formattedValues);

    if (result) {
      message.success("Evento agregado con éxito.");
      form.resetFields();
    } else {
      message.error("Error al agregar evento.");
    }

    setLoading(false);
  };

  return (
    <Card title="Agregar Evento" style={{ width: 400, margin: "20px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Título"
          name="titulo"
          rules={[{ required: true, message: "Por favor ingresa el título del evento" }]}>
          <Input placeholder="Título del Evento" />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[{ required: true, message: "Por favor ingresa la descripción del evento" }]}>
          <Input placeholder="Descripción del Evento" />
        </Form.Item>

        <Form.Item
          label="Localización"
          name="localizacion"
          rules={[{ required: true, message: "Por favor ingresa la localización" }]}>
          <Input placeholder="Localización" />
        </Form.Item>

        <Form.Item
          label="Inicio"
          name="start_time"
          rules={[{ required: true, message: "Por favor ingresa la fecha de inicio" }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Fin"
          name="end_time"
          rules={[{ required: true, message: "Por favor ingresa la fecha de fin" }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar Evento
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="default" onClick={() => navigate("/events")}>
            Volver a la Vista de Eventos
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
