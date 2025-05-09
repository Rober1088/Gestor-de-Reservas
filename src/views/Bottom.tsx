// src/views/Bottom.tsx
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function Bottom() {
  const navigate = useNavigate();

  async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      console.log("Sesión cerrada correctamente");
      navigate("/login"); // Redirige al login después del logout
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button className="logout-button" onClick={logOut}>
        Cerrar Sesión
      </button>
    </div>
  );
}
