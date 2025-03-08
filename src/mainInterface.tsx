// mainInterface.tsx
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function MainInterface() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Interfaz Principal</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <Link to="/remindersList"><Button type="primary">Ir a Recordatorios</Button></Link>
        <Link to="/profilesList"><Button type="primary">Ir a Perfiles</Button></Link>
        <Link to="/eventsList"><Button type="primary">Ir a Eventos</Button></Link>
        <Link to="/userList"><Button type="primary">Ir a Usuarios</Button></Link>
      </div>
    </div>
  );
}
