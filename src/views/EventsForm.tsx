import { useState } from "react";
import { Form, Input, Button, message, Card, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { insertEvent } from "../controllers/supabaseDataInsert";

// Interface del formulario (valores que captura el usuario)
interface EventFormValues {
  titulo: string;
  descripcion: string;
  localizacion: string;
  start_time: Dayjs;
  end_time: Dayjs;
}

export default function EventsForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: EventFormValues) => {
    setLoading(true);

    // Transformamos a los nombres que espera la base de datos
    const formattedValues = {
      titulo: values.titulo,
      descripcion: values.descripcion,
      localizacion: values.localizacion,
      fecha_inicio: values.start_time.toISOString(), // <-- nombre correcto
      fecha_fin: values.end_time.toISOString(),       // <-- nombre correcto
    };

    const result = await insertEvent(formattedValues);

    if (result) {
      message.success("Evento agregado con éxito.");
      form.resetFields();
    } else {
      message.error("Error al agregar evento.");
    }

    setLoading(false);
    navigate("/events");
  };

  return (
    <Card title="Agregar Evento" style={{ width: 400, margin: "20px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Título"
          name="titulo"
          rules={[{ required: true, message: "Por favor ingresa el título del evento" }]}
        >
          <Input placeholder="Título del Evento" />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[{ required: true, message: "Por favor ingresa la descripción del evento" }]}
        >
          <Input placeholder="Descripción del Evento" />
        </Form.Item>

        <Form.Item
          label="Localización"
          name="localizacion"
          rules={[{ required: true, message: "Por favor ingresa la localización" }]}
        >
          <Input placeholder="Localización" />
        </Form.Item>

        <Form.Item
          label="Inicio"
          name="start_time"
          rules={[{ required: true, message: "Por favor ingresa la fecha de inicio" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Fin"
          name="end_time"
          rules={[{ required: true, message: "Por favor ingresa la fecha de fin" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar Evento
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="default" onClick={() => navigate("/events")}>
            Cancelar   
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
