import { useState } from "react";
import { Form, Input, Button, message, Card, Checkbox } from "antd";
import { Employee } from "../Models/employees";
import { insertEmployee } from "../controllers/supabaseDataInsert";
import { useNavigate } from "react-router-dom";

export default function EmployeeInsertForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);

    // Eliminamos confirmarContrasena antes de enviar
    const { confirmarContrasena, ...formattedValues } = values;
    formattedValues.is_admin = !!formattedValues.is_admin;

    const result = await insertEmployee(formattedValues);

    if (result) {
      message.success("Empleado agregado con éxito.");
      form.resetFields();
    } else {
      message.error("Error al agregar empleado.");
    }

    setLoading(false);
  };

  return (
    <Card title="Agregar Empleado" style={{ width: 400, margin: "20px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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

        <Form.Item
          name="is_admin"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Es administrador</Checkbox>
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="contrasena"
          rules={[
            { required: true, message: "Por favor ingresa la contraseña" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message:
                "Debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item
          label="Confirmar Contraseña"
          name="confirmarContrasena"
          dependencies={["contrasena"]}
          hasFeedback
          rules={[
            { required: true, message: "Por favor confirma la contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("contrasena") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Repite la contraseña" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="default" onClick={() => navigate("/employees")}>
            Volver a la Vista de Empleados
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
