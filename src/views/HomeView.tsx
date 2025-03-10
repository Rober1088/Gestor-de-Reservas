import { Link } from "react-router-dom";

export default function HomeView() {
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1>Bienvenido a la Plataforma de Reservas</h1>
        <p>Administra trabajadores y eventos de manera sencilla.</p>

        <div style={{ marginTop: "2rem" }}>
          <Link to="/employees" style={buttonStyle}>Ver Trabajadores</Link>
          <Link to="/events" style={buttonStyle}>Ver Eventos</Link>
          <Link to="/users" style={buttonStyle}>Ver Usuarios</Link>
        </div>
      </div>
    </div>
  );
}

// 🎨 Estilos en línea
const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // Ocupa toda la altura de la pantalla
  textAlign: "center",
};

const contentStyle: React.CSSProperties = {
  padding: "2rem",
};

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  margin: "1rem",
  padding: "10px 20px",
  fontSize: "16px",
  color: "white",
  backgroundColor: "#007BFF",
  textDecoration: "none",
  borderRadius: "5px",
};
